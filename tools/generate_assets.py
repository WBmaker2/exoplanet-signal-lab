#!/usr/bin/env python3
"""P0 자산 생성 파이프라인 (재현용 기록).

- 모델: gemini-2.5-flash-image (사용자 지정 'image 2.5')
- 입력: tools/asset-prompts.json
- 출력: --out-dir 아래 PNG 원본 + .prompt.txt 프롬프트 사이드카
- 스타일 일관성: referenceId 자산의 원본 PNG를 참조 이미지로 함께 보낸다.
- 실패 처리: 자산당 재시도 1회, 연속 3회 실패 시 중단(공통 원칙 §5).

사용:
  python3 tools/generate_assets.py --out-dir <dir> [--only <id> ...]
환경변수: GEMINI_API_KEY
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("google-genai 미설치: python3 -m venv <venv> && pip install google-genai pillow")
    sys.exit(1)

MODEL = "gemini-2.5-flash-image"
ROOT = Path(__file__).resolve().parent.parent
SPEC = ROOT / "tools" / "asset-prompts.json"


def image_part(data: bytes, mime: str):
    return types.Part.from_bytes(data=data, mime_type=mime)


def extract_image(response) -> bytes | None:
    candidates = getattr(response, "candidates", None) or []
    for cand in candidates:
        content = getattr(cand, "content", None)
        for part in getattr(content, "parts", []) or []:
            inline = getattr(part, "inline_data", None)
            if inline and (inline.mime_type or "").startswith("image/"):
                return inline.data
    return None


def response_text(response) -> str:
    try:
        return (response.text or "")[:400]
    except Exception:
        return ""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-dir", required=True)
    ap.add_argument("--only", nargs="*", default=None)
    ap.add_argument("--sleep", type=float, default=1.5)
    args = ap.parse_args()

    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)
    client = genai.Client()
    consecutive_failures = 0
    done: dict[str, bytes] = {}

    for asset in spec["assets"]:
        aid = asset["id"]
        if args.only and aid not in args.only:
            continue
        png_path = out / f"{aid}.png"
        prompt_path = out / f"{aid}.prompt.txt"
        prompt_path.write_text(asset["prompt"], encoding="utf-8")

        contents = []
        ref_id = asset.get("referenceId")
        if ref_id:
            ref_png = out / f"{ref_id}.png"
            if ref_png.exists():
                contents.append(image_part(ref_png.read_bytes(), "image/png"))
            else:
                print(f"  [warn] 참조 자산 없음: {ref_id} — 텍스트만으로 생성")
        contents.append(types.Part.from_text(text=asset["prompt"]) if hasattr(types.Part, "from_text") else asset["prompt"])

        ok = False
        for attempt in (1, 2):
            print(f"[{aid}] 시도 {attempt} — {MODEL} {asset['aspectRatio']}")
            try:
                resp = client.models.generate_content(
                    model=MODEL,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE", "TEXT"],
                        image_config=types.ImageConfig(aspect_ratio=asset["aspectRatio"]),
                    ),
                )
                data = extract_image(resp)
                if data:
                    png_path.write_bytes(data)
                    note = response_text(resp)
                    if note:
                        (out / f"{aid}.note.txt").write_text(note, encoding="utf-8")
                    print(f"  저장: {png_path} ({len(data)} bytes)")
                    ok = True
                    break
                print(f"  이미지 없음. 모델 텍스트: {response_text(resp)!r}")
            except Exception as exc:  # noqa: BLE001 - 원인 보고 후 재시도 판단
                print(f"  오류: {exc}")
            time.sleep(args.sleep)

        if ok:
            consecutive_failures = 0
        else:
            consecutive_failures += 1
            print(f"  [fail] {aid} 실패 (연속 {consecutive_failures}회)")
            if consecutive_failures >= 3:
                print("연속 3회 실패 — 중단하고 사용자와 협의합니다 (공통 원칙 §5).")
                return 2
        time.sleep(args.sleep)

    print("완료")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

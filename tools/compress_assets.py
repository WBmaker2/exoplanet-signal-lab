#!/usr/bin/env python3
"""생성한 PNG 원본을 WebP로 압축하고 자산 기록을 갱신한다.

- 입력: assets/raw/*.png (파일명 규칙은 assets/생성-가이드.md)
- 출력: src/assets/*.webp
- 기록: assets/assets-manifest.json (자산 레코드, 공통 원칙 §5)
- 압축: cwebp (macOS에 기본 제공되는 도구). 없으면 sips로 PNG 유지·리사이즈.

사용:
  python3 tools/compress_assets.py [--raw-dir assets/raw] [--out-dir src/assets]
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / "tools" / "asset-prompts.json"
MANIFEST = ROOT / "assets" / "assets-manifest.json"

BANNER_MAX_W = 1280
PLANET_MAX_W = 768
BANNER_BUDGET = 500 * 1024
PLANET_BUDGET = 150 * 1024

LICENSE_NOTE = (
    "AI 생성 삽화(사용자 생성). SynthID 워터마크 포함. 실제 관측 사진이 아니며 "
    "교육용 상상 삽화로만 표기. 미션 배경/상상도 용도."
)


def dims(path: Path) -> tuple[int, int]:
    out = subprocess.run(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth" in line:
            w = int(line.split(":")[1])
        if "pixelHeight" in line:
            h = int(line.split(":")[1])
    return w, h


def convert(src: Path, dst: Path, max_w: int) -> tuple[int, int, int]:
    """cwebp로 변환(가능하면 리사이즈 포함). 반환: (w, h, bytes)"""
    w, h = dims(src)
    tmp = dst.with_suffix(".tmp.png")
    if w > max_w:
        subprocess.run(["sips", "-Z", str(max_w), str(src), "--out", str(tmp)],
                       capture_output=True, check=True)
        src2 = tmp
        w, h = dims(src2)
    else:
        src2 = src
    if shutil.which("cwebp"):
        subprocess.run(["cwebp", "-q", "82", "-m", "6", "-quiet", str(src2), "-o", str(dst)],
                       capture_output=True, check=True)
    else:
        subprocess.run(["sips", "-s", "format", "webp", str(src2), "--out", str(dst)],
                       capture_output=True, check=True)
    tmp.unlink(missing_ok=True)
    return w, h, dst.stat().st_size


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()[:16]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--raw-dir", default=str(ROOT / "assets" / "raw"))
    ap.add_argument("--out-dir", default=str(ROOT / "src" / "assets"))
    args = ap.parse_args()
    raw_dir = Path(args.raw_dir)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    spec = json.loads(PROMPTS.read_text(encoding="utf-8"))
    existing: dict = {}
    if MANIFEST.exists():
        existing = json.loads(MANIFEST.read_text(encoding="utf-8"))
    records: dict[str, dict] = existing.get("assets", {})

    converted, missing = [], []
    for asset in spec["assets"]:
        aid = asset["id"]
        src = raw_dir / f"{aid}.png"
        if not src.exists():
            missing.append(aid)
            continue
        dst = out_dir / f"{aid}.webp"
        budget = BANNER_BUDGET if asset["aspectRatio"] == "16:9" else PLANET_BUDGET
        w, h, size = convert(src, dst, BANNER_MAX_W if asset["aspectRatio"] == "16:9" else PLANET_MAX_W)
        records[aid] = {
            "id": aid,
            "purpose": asset["purpose"],
            "promptVersion": spec["promptVersion"],
            "modelUsed": spec["model"],
            "referenceIds": [asset["referenceId"]] if asset.get("referenceId") else [],
            "sourceFile": f"assets/raw/{aid}.png",
            "shippedFile": f"src/assets/{aid}.webp",
            "dimensions": f"{w}x{h}",
            "bytes": size,
            "overBudget": size > budget,
            "sha256_16": sha256(dst),
            "semanticLabels": ["가상", "상상 삽화", "관측 아님"],
            "alt": None,
            "licenseNote": LICENSE_NOTE,
            "reviewStatus": "pending-human-review",
            "compressedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        }
        converted.append(f"{aid}: {w}x{h} {size // 1024}KB{' (예산 초과)' if size > budget else ''}")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(
        json.dumps({"schemaVersion": 1, "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
                    "assets": records}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print("변환:")
    for line in converted:
        print("  " + line)
    if missing:
        print("아직 없는 자산:")
        for aid in missing:
            print("  " + aid)
    return 0


if __name__ == "__main__":
    sys.exit(main())

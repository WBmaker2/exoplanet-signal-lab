# 외계행성 신호 수사대 — 중·고등학생 관점 UX 감사 보고서

- 날짜: 2026-09-23
- 작업: 화면·흐름 감사 및 개선점 발굴
- 모드: audit-only
- 앱 코드 변경: 없음
- 대상: 교사 주도 30분 수업의 한국 중학생·고등학생
- 결과: 62/100, fail — 미해결 P1 4건

## 요약

앱은 예측 → 모형 조절 → 후보 비교 → 추가 관측 → 근거와 한계 기록의 수업 흐름을 갖추고 있습니다. 밝은 화면, 키보드 포커스, 수치표 대체 경로, 합성 자료와 상상 그림 구분도 확인했습니다.

현재 먼저 바로잡을 점은 네 가지입니다. 미션 3의 단일 감소와 공통 반복 지시가 충돌하고, 예측하기 전에 정답에 가까운 수치가 나오며, 초기화 뒤 조절값과 그래프가 달라 보이고, 후속 자료를 받은 뒤 비교표가 이전 적합도를 현재 결과처럼 구분 없이 보여 줍니다. 이 상태로는 핵심 과학 추론을 학생이 화면과 함께 검증하기 어렵습니다.

## 흐름 한눈에 보기

```mermaid
flowchart LR
  A[관측 그래프 선택] --> B[예측 기록]
  B --> C[후보 모형 조절]
  C --> D[후보 저장]
  D --> E[후보 비교]
  E --> F[추가 관측 창 선택]
  F --> G[후보 재검토]
  G --> H[결론과 근거·한계 기록]
  A -. 미션 3 지시 충돌 .-> A
  B -. 1.4%·1.44% 사전 노출 .-> B
  C -. 초기화 표시값 불일치 .-> C
  G -. 비교표 자료 시점 불명 .-> E
```

## 먼저 권하는 개선

1. 관측 지시를 미션마다 다르게 보여 주고, 미션 3에서는 한 번뿐인 감소를 추가 관측 계획으로 이어 주세요.
2. 관측 전에는 목표 수치를 숨기고, 예측을 저장한 다음 기준 관계식과 비교하게 해 주세요.
3. 초기화 시 입력·그래프·지표를 한 상태로 동기화해 주세요.
4. 후보 비교에서 각 적합도에 사용한 자료점 수와 자료 시점을 표시하고, 후속 자료로 같은 후보를 비교할 방법을 제공해 주세요.
5. 모바일 그래프 글자, 후보 저장 피드백, 보고 양식과 상상도 갤러리 순서를 다듬어 주세요.

## 학년별 관점

- 중학생: 패턴 찾기, 감소 깊이 예상, 다음 행동을 쉬운 단위와 한 번에 하나의 안내로 제시할 필요가 있습니다.
- 고등학생: 잔차·적합도·불확실성과 서로 다른 자료점 수의 비교 근거를 설명해야 숫자가 과학적 판단에 연결됩니다.
- 두 관점은 실제 학생 인터뷰가 아닌 모의 학습자 리뷰입니다. 다음 단계에서 핵심 지시 재진술과 버튼 결과 예측을 실제 학생에게 짧게 확인하면 좋겠습니다.

## 관련 기록

- [상세 UX 감사와 이슈 장부](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-audit.md>)
- [언어 감사 장부와 문구 후보](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-language-audit.md>)
- [시뮬레이션 결정 기록](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-simulation-decision.md>)
- [기존 상호작용 테스트 기록](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-simulation-test.md>)
- [감사 계획](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-plan.md>)
- [Stage 0 환경 점검](</Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab/work/elementary-webapp-ux-bootstrap.md>)

미리보기는 감사 중 http://127.0.0.1:5175/에서 확인했습니다. 임시 개발 서버는 사용자 브라우저에서도 열린 상태여서 계속 실행 중입니다. 앱은 배포하지 않았습니다.

## 점수 및 수용 판정

개선 전 점수는 62/100입니다. P1 이슈와 미확인 학습자 재진술이 남아 있어 현재 수용 게이트는 fail입니다. 총점은 비교 보조 지표이며 공식 성취기준 평가가 아닙니다. 이미지 생성은 하지 않았습니다. 기존 이미지의 사실·관측 자료 오인 방지 라벨은 화면에서 확인했습니다.

## UI/UX route contract

route=ui-ux-pro-max
observed-statuses=ui-ux-pro-max:runtime-available, design-system:runtime-available, impeccable:runtime-available, product-design:audit:missing-optional, design-review:runtime-available, qa:runtime-available, built-in:built-in
action=continue
fallback-reason=첫 runtime-available 후보를 선언된 순서로 선택했습니다.

## 검증 범위와 다음 행동

320×800, 375×812, 1280×900에서 시작부터 기록 완료까지 주요 흐름을 브라우저로 확인했습니다. 페이지 수평 넘침과 error/warn 로그는 없었습니다. 터치 하드웨어, 실행 중 모션 축소, WebGL 실패 fallback, 학생 인터뷰, 공식 과학 모형 검토, 빌드·자동화 테스트는 not run입니다. VoiceOver 검증은 범위에서 제외했습니다.

다음 단계는 네 P1 수정안을 검토하고 구현 범위를 정하는 것입니다. 현재 이 보고서 작업은 개선점 탐색과 기록까지만 수행했습니다.

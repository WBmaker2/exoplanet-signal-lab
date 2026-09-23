# 회귀 점검 후속 수정 계획

- 일자: 2026-09-23
- 모드: `regression-only`
- 승인: 사용자의 “1~2번 진행, 수정 사항이 있다면 커밋·푸시·배포” 요청
- 기준 계획: `work/elementary-webapp-ux-implementation-plan.md`
- 대상: 중·고등학생용 외계행성 신호 수사대, 기존 핵심 흐름

## 재현된 이슈와 조치

1. **빌드 오류** — `npm run build`가 `src/views/decide.ts:148`에서 비교 카드 항목을 `string | undefined`로 추론해 TypeScript 오류 2건으로 중단됩니다. 비교 항목을 `[string, string]` 튜플 목록으로 명시합니다.
2. **저장 뒤 오래된 안내 (P2)** — 예측 저장 전에 다음 단계로 이동을 시도하면 안내가 표시됩니다. 이후 예측을 저장해도 “저장해 주세요” 문구가 남습니다. 성공 저장 직후 해당 차단 안내를 제거합니다.
3. **모바일 입력까지 긴 스크롤 (P2)** — 320×800에서 미션 목록이 1,062px, 상세 그래프와 안내가 뒤따라 예측 입력이 문서 y≈1,889px에 있습니다. 현재 미션을 먼저 보여 주고 다른 미션 목록은 접힌 선택기로 제공해 핵심 예측 입력을 앞당깁니다. 기본 미션을 확인·변경할 수 있다는 문구도 함께 맞춥니다. 회귀 중 `.missions { display: grid }`가 닫힌 `<details>`의 기본 숨김 규칙을 덮어 목록이 계속 펼쳐지는 것도 재현했습니다. 닫힌 선택기에서 목록을 명시적으로 숨기고, 열기·미션 전환 동작을 다시 확인합니다.

## 수용 확인

- 같은 경로에서 저장 전 차단, 빈 입력 오류와 포커스, 정상 저장 뒤 이전 안내 제거, 새로고침 후 예측 복구와 미션 전환 초기화를 확인합니다.
- 후보 초기화의 숫자 입력·슬라이더 동기화, 후보 저장 피드백, 후속 자료 추가 뒤 같은 현재 관측점 수로 후보 비교, 보고 기록 저장을 확인합니다.
- 320×800, 375×812, 1280×900에서 첫 예측 입력 위치와 가로 넘침, 비교 카드, 그래프 크기를 확인합니다.
- 키보드의 시작·핵심 슬라이더 조작·포커스 표시와 `prefers-reduced-motion`의 정적 강조를 확인합니다. VoiceOver는 제외합니다.
- 수정 후 `npm test`, `npm run build`, 동일 브라우저 시나리오를 다시 실행합니다.
- 승인된 범위에 따라 수정이 확인되면 커밋·푸시·배포하고 공개 URL을 확인합니다. HVC 등록은 포함하지 않습니다.

## 브라우저 경로

`route=ui-ux-pro-max`

`observed-statuses=ui-ux-pro-max:runtime-available, design-system:runtime-available, impeccable:runtime-available, product-design:audit:missing-optional, design-review:runtime-available, qa:runtime-available, built-in:built-in`

`action=continue`

`fallback-reason=선언된 fallback 순서에서 첫 runtime-available UI/UX 경로를 선택했습니다.`

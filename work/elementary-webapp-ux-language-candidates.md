# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/exoplanet-signal-lab`
- Files scanned: `19`
- Candidates: `340`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| index.html:6:39 | text | 별빛 곡선에서 행성 후보를 추정하고 추가 관측을 계획하는 30분 교실 실험실 | learner-text-candidate | — |
| index.html:7:12 | text | 외계행성 신호 수사대 | learner-text-candidate | repeated-text |
| index.html:12:54 | text | 이 실험실은 JavaScript가 필요합니다. 브라우저 설정에서 JavaScript를 켠 뒤 다시 열어주세요. | learner-text-candidate | long-or-dense |
| src/data/missions.ts:45:6 | text | 미션 1 · 또렷한 반복 신호 | learner-text-candidate | — |
| src/data/missions.ts:46:6 | text | 어느 구간에서 같은 깊이의 감소가 반복되나요? | learner-text-candidate | — |
| src/data/missions.ts:47:6 | text | 깊이 약 1.4%, 4일 남짓 간격으로 반복되는 후보. 먼저 반복 구간을 고르고 예측 깊이를 적어보세요. | learner-text-candidate | — |
| src/data/missions.ts:54:14 | text | m1-w1 | learner-text-candidate | — |
| src/data/missions.ts:54:30 | text | 21.0–22.4일 창 | learner-text-candidate | — |
| src/data/missions.ts:55:14 | text | m1-w2 | learner-text-candidate | — |
| src/data/missions.ts:55:30 | text | 25.2–26.6일 창 | learner-text-candidate | — |
| src/data/missions.ts:56:14 | text | m1-w3 | learner-text-candidate | — |
| src/data/missions.ts:56:30 | text | 29.4–30.8일 창 | learner-text-candidate | — |
| src/data/missions.ts:57:14 | text | m1-w4 | learner-text-candidate | — |
| src/data/missions.ts:57:30 | text | 33.6–35.0일 창 | learner-text-candidate | — |
| src/data/missions.ts:59:6 | text | 중심 통과에서 F=1−k² 관계를 확인하는 기준 미션. | learner-text-candidate | — |
| src/data/missions.ts:63:6 | text | 미션 2 · 잡음 속 얕은 신호 | learner-text-candidate | — |
| src/data/missions.ts:64:6 | text | 잡음과 신호를 어떻게 구분할 건가요? | learner-text-candidate | — |
| src/data/missions.ts:65:6 | text | 깊이 약 0.4%의 얕은 후보. 같은 깊이가 주기적으로 나타나는지 잔차와 함께 따져보세요. | learner-text-candidate | — |
| src/data/missions.ts:72:14 | text | m2-w1 | learner-text-candidate | — |
| src/data/missions.ts:72:30 | text | 28.0–29.6일 창 | learner-text-candidate | — |
| src/data/missions.ts:73:14 | text | m2-w2 | learner-text-candidate | — |
| src/data/missions.ts:73:30 | text | 30.8–32.4일 창 | learner-text-candidate | — |
| src/data/missions.ts:74:14 | text | m2-w3 | learner-text-candidate | — |
| src/data/missions.ts:74:30 | text | 37.6–39.2일 창 | learner-text-candidate | — |
| src/data/missions.ts:75:14 | text | m2-w4 | learner-text-candidate | — |
| src/data/missions.ts:75:30 | text | 40.4–42.0일 창 | learner-text-candidate | — |
| src/data/missions.ts:77:6 | text | 얕은 통과 + 큰 잡음: 여러 후보가 구분 불가할 수 있음을 보여준다. | learner-text-candidate | — |
| src/data/missions.ts:81:6 | text | 미션 3 · 한 번의 감소 | learner-text-candidate | — |
| src/data/missions.ts:82:6 | text | 한 번 어두워졌다고 행성이 있을까요? | learner-text-candidate | — |
| src/data/missions.ts:83:6 | text | 관측 구간에 감소가 한 번뿐인 후보. 주기가 길어 다음 통과를 잡으려면 관측 계획이 필요합니다. | learner-text-candidate | — |
| src/data/missions.ts:90:14 | text | m3-w1 | learner-text-candidate | — |
| src/data/missions.ts:90:30 | text | 21.0–23.0일 창 | learner-text-candidate | — |
| src/data/missions.ts:91:14 | text | m3-w2 | learner-text-candidate | — |
| src/data/missions.ts:91:30 | text | 23.5–25.5일 창 | learner-text-candidate | — |
| src/data/missions.ts:92:14 | text | m3-w3 | learner-text-candidate | — |
| src/data/missions.ts:92:30 | text | 40.0–43.0일 창 | learner-text-candidate | — |
| src/data/missions.ts:93:14 | text | m3-w4 | learner-text-candidate | — |
| src/data/missions.ts:93:30 | text | 57.5–60.5일 창 | learner-text-candidate | — |
| src/data/missions.ts:95:6 | text | 자료 부족 → 적합 실패가 아니라 ‘구분할 정보 부족’을 선언하는 법을 배운다. | feedback-or-error | — |
| src/data/missions.ts:101:28 | text | 알 수 없는 미션: ${id} | feedback-or-error | technical-or-internal |
| src/engine/fitMetrics.ts:1:17 | text | 0) · RMSE (σ=0). 작은 잔차는 일치도이지 존재 증명이 아니다. export interface FitResult { kind: 'chi2' \| 'rmse'; value: number; reduced: number; // χ²/dof 또는 RMSE (비교용) dof: number; } export function chiSquared(observed: number[], predicted: number[], sigma: number[]): number { let s = 0; for (let i = 0; i | learner-text-candidate | long-or-dense, multiple-conditions, technical-or-internal |
| src/engine/fitMetrics.ts:41:40 | text | 0); const dof = Math.max(1, observed.length - nParams); if (!useChi2) { const v = rmse(observed, predicted); return { kind: 'rmse', value: v, reduced: v, dof }; } const v = chiSquared(observed, predicted, sigma); return { kind: 'chi2', value: v, reduced: v / dof, dof }; } /** * 두 후보의 구분 가능성 (교실용 휴리스틱). * \|Δχ²\| ≤ 9면 관측상 구분 불가로 함께 인정한다. (엄밀한 모형선택이 아님을 UI에 명시) */ export const INDISTINGUISHABLE_DELTA = 9; export function indistinguishable(a: FitResult, b: FitResult): boolean { if (a.kind !== b.kind) return false; return Math.abs(a.value - b.value) | learner-text-candidate | long-or-dense |
| src/engine/lightCurve.ts:65:81 | text | sigma) }; } /** 불규칙 샘플링 시각 생성: 구간 내 균등 + 관측 공백 1개. seed 고정. */ export function irregularTimes(startDay: number, endDay: number, count: number, seed: number): number[] { const rng = mulberry32(seed ^ 0x9e3779b9); const times: number[] = []; for (let i = 0; i | learner-text-candidate | long-or-dense |
| src/engine/observationWindows.ts:22:37 | text | = option.cost; } export interface FollowUp { timesDays: number[]; fluxes: number[]; uncertainties: number[]; } /** 선택한 창 구간에 후속 관측점을 합성해 추가한다 (참 모형 + 잡음, seed 파생). */ export function followUpInWindow( option: WindowOption, star: StarParams, truth: CandidateParams, sigma: number, seed: number, pointsPerDay = 6, ): FollowUp { const rng = mulberry32(seed ^ option.id.length ^ Math.floor(option.startDay * 97)); const n = Math.max(4, Math.round(option.durationDay * pointsPerDay)); const times: number[] = []; for (let i = 0; i | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/overlap.ts:7:12 | text | 0) && d !== 0) return 0; // NaN 방어 if (r | learner-text-candidate | — |
| src/engine/overlap.ts:9:10 | text | = R + r) return 0; // 분리 if (d | learner-text-candidate | — |
| src/engine/types.ts:37:45 | text | 후보 파라미터가 비어 있습니다. | learner-text-candidate | — |
| src/engine/types.ts:38:43 | text | 주기 P는 유한한 숫자여야 합니다. | feedback-or-error | — |
| src/engine/types.ts:39:65 | text | LIMITS.periodDays[1]) errors.push(`주기 P는 ${LIMITS.periodDays[0]}–${LIMITS.periodDays[1]}일 범위여야 합니다.`); if (!finite(p.radiusRatio)) errors.push('반지름 비 k는 유한한 숫자여야 합니다.'); else if (p.radiusRatio | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:40:18 | text | 주기 P는 ${LIMITS.periodDays[0]}–${LIMITS.periodDays[1]}일 범위여야 합니다. | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:41:44 | text | 반지름 비 k는 유한한 숫자여야 합니다. | feedback-or-error | — |
| src/engine/types.ts:42:68 | text | LIMITS.radiusRatio[1]) errors.push(`반지름 비 k는 ${LIMITS.radiusRatio[0]}–${LIMITS.radiusRatio[1]} 범위여야 합니다.`); if (!finite(p.inclinationDeg)) errors.push('기울기 i는 유한한 숫자여야 합니다.'); else if (p.inclinationDeg | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:43:18 | text | 반지름 비 k는 ${LIMITS.radiusRatio[0]}–${LIMITS.radiusRatio[1]} 범위여야 합니다. | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:44:47 | text | 기울기 i는 유한한 숫자여야 합니다. | feedback-or-error | — |
| src/engine/types.ts:45:77 | text | LIMITS.inclinationDeg[1]) errors.push(`기울기 i는 ${LIMITS.inclinationDeg[0]}–${LIMITS.inclinationDeg[1]}° 범위여야 합니다.`); if (!finite(p.transitEpochDays)) errors.push('통과 중심 시각 t0은 유한한 숫자여야 합니다.'); return errors; } export function validateStar(s: StarParams): string[] { const errors: string[] = []; if (!s \|\| typeof s !== 'object') return ['별 정보가 비어 있습니다.']; if (!finite(s.massKg) \|\| s.massKg | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:46:18 | text | 기울기 i는 ${LIMITS.inclinationDeg[0]}–${LIMITS.inclinationDeg[1]}° 범위여야 합니다. | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/types.ts:47:49 | text | 통과 중심 시각 t0은 유한한 숫자여야 합니다. | feedback-or-error | — |
| src/engine/types.ts:53:45 | text | 별 정보가 비어 있습니다. | learner-text-candidate | — |
| src/engine/types.ts:54:56 | text | 별 질량은 0보다 큰 유한값이어야 합니다. | feedback-or-error | — |
| src/engine/types.ts:55:58 | text | 별 반지름은 0보다 큰 유한값이어야 합니다. | feedback-or-error | — |
| src/main.ts:12:10 | text | observe | learner-text-candidate | — |
| src/main.ts:12:28 | text | 관측 | learner-text-candidate | — |
| src/main.ts:13:10 | text | fit | learner-text-candidate | — |
| src/main.ts:13:24 | text | 후보 | learner-text-candidate | — |
| src/main.ts:14:10 | text | compare | learner-text-candidate | — |
| src/main.ts:14:28 | text | 비교 | learner-text-candidate | — |
| src/main.ts:15:10 | text | schedule | learner-text-candidate | — |
| src/main.ts:15:29 | text | 일정 | learner-text-candidate | — |
| src/main.ts:16:10 | text | report | learner-text-candidate | — |
| src/main.ts:16:27 | text | 보고 | learner-text-candidate | — |
| src/main.ts:29:59 | text | 본문으로 건너뛰기 | learner-text-candidate | — |
| src/main.ts:34:48 | text | 외계행성 신호 수사대 | learner-text-candidate | repeated-text |
| src/main.ts:35:33 | text | 밝기 곡선으로 행성 후보를 찾는다 | learner-text-candidate | — |
| src/main.ts:37:21 | text | nav | learner-text-candidate | — |
| src/main.ts:37:37 | text | steps | learner-text-candidate | — |
| src/main.ts:37:46 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/main.ts:37:60 | text | 실험 단계 | learner-text-candidate | — |
| src/main.ts:39:19 | text | button | button-or-action | repeated-text |
| src/main.ts:39:38 | text | step | button-or-action | — |
| src/main.ts:39:52 | text | button | button-or-action | repeated-text |
| src/main.ts:39:62 | text | data-tab | button-or-action | — |
| src/main.ts:48:23 | text | button | button-or-action | repeated-text |
| src/main.ts:48:42 | text | update-link | button-or-action | — |
| src/main.ts:48:63 | text | button | button-or-action | repeated-text |
| src/main.ts:48:75 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/main.ts:61:8 | text | 모든 밝기 곡선은 수업용 합성 가상 자료입니다. 배경·행성 그림은 상상 삽화이며 관측 사진이 아닙니다. | learner-text-candidate | — |
| src/main.ts:62:8 | text | 3D 장면은 궤도 기하 관계도이며 크기와 거리는 시각적으로 확대되었습니다. | learner-text-candidate | — |
| src/main.ts:63:8 | text | 상상도·가상 데이터·실제 관측을 구분해 표시합니다. 참고: | learner-text-candidate | — |
| src/main.ts:68:23 | text | NASA Exoplanet Watch 자료 (외부 학습 링크) | learner-text-candidate | technical-or-internal |
| src/main.ts:85:57 | text | { if ((b as HTMLElement).dataset.tab === active) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); }); if (!started) { sheet.append(startCard()); placeAura(); return; } const builders: Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/main.ts:122:20 | text | section | learner-text-candidate | — |
| src/main.ts:122:40 | text | start-card | learner-text-candidate | — |
| src/main.ts:122:54 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/main.ts:122:73 | text | q | learner-text-candidate | — |
| src/main.ts:123:38 | text | 별빛이 어두워졌다는 사실만으로, 행성이 있다고 말할 수 있을까? | learner-text-candidate | — |
| src/main.ts:126:8 | text | 30분 수사: 반복되는 감소를 고르고 → 후보 모형을 맞추고 → 3D에서 빗겨가는 궤도와 비교하고 → | learner-text-candidate | multiple-actions |
| src/main.ts:127:8 | text | 3개의 관측 창으로 다음 증거를 노린 뒤, ‘행성 후보’와 ‘추가 검증 필요’를 갈라 보고합니다. | learner-text-candidate | abstract-or-formal |
| src/main.ts:129:21 | text | button | button-or-action | repeated-text |
| src/main.ts:129:40 | text | btn primary signal | button-or-action | — |
| src/main.ts:129:68 | text | button | button-or-action | repeated-text |
| src/main.ts:129:82 | text | start-btn | button-or-action | — |
| src/main.ts:129:97 | text | 수사 시작하기 | button-or-action | — |
| src/main.ts:140:8 | text | 밝은 교실 화면 · 키보드만으로 전 과정 가능 · 모션 축소 시 정적 테두리 · VoiceOver 검증은 범위 밖입니다. | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/state.ts:101:14 | text | 결론:${this.verdict.choice === 'candidate' ? '행성 후보' : '추가 검증 필요'} / 근거:${this.verdict.reasons} / 한계:${this.verdict.limits} | learner-text-candidate | abstract-or-formal, long-or-dense, technical-or-internal |
| src/views/curve.ts:58:27 | text | padT + (1 - (f - fMin) / (fMax - fMin)) * (H - padT - 14); // 격자 + 축 ctx.strokeStyle = '#e3ded1'; ctx.lineWidth = 1; ctx.fillStyle = '#4a545e'; ctx.font = '11px ui-monospace, monospace'; for (let g = 0; g | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/curve.ts:75:17 | text | 시간 (일) | learner-text-candidate | repeated-text |
| src/views/curve.ts:76:17 | text | 정규화 밝기 | learner-text-candidate | — |
| src/views/curve.ts:145:17 | text | 잔차 (관측−모형) | learner-text-candidate | — |
| src/views/decide.ts:14:29 | text | ; const PLANET_LABELS: Record | learner-text-candidate | — |
| src/views/decide.ts:17:31 | text | 바다 상상 | learner-text-candidate | — |
| src/views/decide.ts:17:45 | text | 가상 행성 상상도: 바다와 구름이 있는 파란 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:18:32 | text | 사막 상상 | learner-text-candidate | — |
| src/views/decide.ts:18:46 | text | 가상 행성 상상도: 모래 언덕과 얇은 대기가 있는 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:19:29 | text | 얼음 상상 | learner-text-candidate | — |
| src/views/decide.ts:19:43 | text | 가상 행성 상상도: 얼음 표면과 금이 있는 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:20:32 | text | 고리 상상 | learner-text-candidate | — |
| src/views/decide.ts:20:46 | text | 가상 행성 상상도: 고리가 있는 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:21:33 | text | 구름 상상 | learner-text-candidate | — |
| src/views/decide.ts:21:47 | text | 가상 행성 상상도: 구름 띠로 덮인 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:22:33 | text | 한쪽만 낮인 상상 | learner-text-candidate | — |
| src/views/decide.ts:22:51 | text | 가상 행성 상상도: 한쪽은 낮, 한쪽은 밤이 계속되는 행성 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:32:21 | text | 상상도 갤러리 — 행성의 모습은 증거가 아닙니다 | learner-text-candidate | — |
| src/views/decide.ts:37:8 | text | 아래 그림은 모두 상상 삽화입니다. 실제 관측 사진이 아니며, 미션의 정답(주기·반지름 비)과도 무관합니다. | feedback-or-error | long-or-dense |
| src/views/decide.ts:38:8 | text | 후보를 판단하는 근거는 언제나 밝기 곡선과 잔차입니다. | learner-text-candidate | — |
| src/views/decide.ts:49:30 | text | 가상 행성 상상도 (관측 사진 아님) | learner-text-candidate | — |
| src/views/decide.ts:53:53 | text | 상상도 · 가상 | learner-text-candidate | — |
| src/views/decide.ts:54:20 | text | b | learner-text-candidate | repeated-text |
| src/views/decide.ts:60:23 | text | hint statusline | hint | repeated-text |
| src/views/decide.ts:61:8 | text | P0의 밝기 곡선 3종은 모두 수업용 합성 자료입니다. 실제 관측 자료 도입은 P1에서 이용 조건과 함께 검토합니다. | learner-text-candidate | long-or-dense |
| src/views/decide.ts:72:8 | text | 3단계 · 저장한 후보들을 나란히 놓고 잔차로 비교하세요. 허용 잔차를 만족하면 둘 다 인정됩니다. | learner-text-candidate | — |
| src/views/decide.ts:76:8 | text | 아직 저장된 후보가 없습니다. 후보 탭에서 모형을 맞춘 뒤 ‘후보 저장 → 비교로’를 눌러보세요. 2개 이상 저장하면 구분 가능 여부를 알려드립니다. | learner-text-candidate | long-or-dense, multiple-actions |
| src/views/decide.ts:84:43 | text | 주기 P (일) | learner-text-candidate | — |
| src/views/decide.ts:84:63 | text | 반지름 비 k | learner-text-candidate | — |
| src/views/decide.ts:84:82 | text | 기울기 i (°) | learner-text-candidate | — |
| src/views/decide.ts:85:7 | text | t0 (일) | learner-text-candidate | — |
| src/views/decide.ts:85:44 | text | 적합도 | learner-text-candidate | — |
| src/views/decide.ts:104:32 | text | χ²/자유도 ${fmt(s.fit.reduced, 2)} | learner-text-candidate | — |
| src/views/decide.ts:104:68 | text | RMSE 기준 | learner-text-candidate | technical-or-internal |
| src/views/decide.ts:113:22 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:113:41 | text | btn | button-or-action | repeated-text |
| src/views/decide.ts:113:54 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:113:66 | text | 불러오기 | button-or-action | — |
| src/views/decide.ts:118:21 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:118:40 | text | btn danger | button-or-action | — |
| src/views/decide.ts:118:60 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:118:72 | text | 삭제 | button-or-action | — |
| src/views/decide.ts:140:64 | text | ${a + 1}번–${b + 1}번 | learner-text-candidate | — |
| src/views/decide.ts:144:25 | text | 관측상 구분 불가: ${pairs.join(', ')} (\|Δχ²\|≤9, 교실용 기준). 두 후보를 함께 인정하고, 다음 관측으로 가를 이유를 일정 탭에서 찾으세요. | learner-text-candidate | long-or-dense |
| src/views/decide.ts:145:21 | text | 저장된 후보들은 현재 자료에서 서로 구분됩니다. 그래도 작은 잔차는 일치도일 뿐, 존재의 증명이 아닙니다. | learner-text-candidate | long-or-dense |
| src/views/decide.ts:147:29 | text | 후보를 하나 더 저장하면(조건을 바꿔 저장) 구분 가능 여부를 판정해 드립니다. | learner-text-candidate | — |
| src/views/decide.ts:158:8 | text | 4단계 · 다음 관측을 고르세요. 예산은 시간 창 ${3}개, 창마다 비용 1입니다. 선택한 창은 실제 신청처럼 취소할 수 없습니다. | learner-text-candidate | long-or-dense, multiple-actions |
| src/views/decide.ts:162:29 | text | 남은 예산 | learner-text-candidate | — |
| src/views/decide.ts:162:38 | text | ${remain} / 3 창 | learner-text-candidate | — |
| src/views/decide.ts:163:29 | text | 확보한 후속 자료 | learner-text-candidate | — |
| src/views/decide.ts:163:42 | text | ${state.followUpCount}점 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:170:22 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:170:41 | text | mission | button-or-action | — |
| src/views/decide.ts:170:58 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:170:68 | text | aria-pressed | button-or-action | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:170:92 | text | true | button-or-action | — |
| src/views/decide.ts:170:101 | text | false | button-or-action | — |
| src/views/decide.ts:172:21 | text | b | learner-text-candidate | repeated-text |
| src/views/decide.ts:173:41 | text | 신청됨 — 후속 자료에 반영되었습니다. | learner-text-candidate | — |
| src/views/decide.ts:173:67 | text | 비용 ${w.cost}창 · 이 구간에 후속 관측점을 추가합니다. | learner-text-candidate | — |
| src/views/decide.ts:185:33 | text | 예산을 다 썼습니다. 후보 탭에서 후속 자료가 겹쳐진 곡선을 확인하고 보고 탭에서 결론을 기록하세요. | learner-text-candidate | multiple-actions |
| src/views/decide.ts:187:33 | text | 후속 자료가 곡선에 추가되었습니다. 후보 탭으로 돌아가 잔차가 어떻게 바뀌었는지 확인해 보세요. | learner-text-candidate | — |
| src/views/decide.ts:199:8 | text | 5단계 · ‘행성 후보’와 ‘추가 검증 필요’를 구분해 보고합니다. 근거·대안·한계를 함께 적어야 기록이 됩니다. | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/views/decide.ts:203:27 | text | 증거 묶음 (자동 정리) | learner-text-candidate | — |
| src/views/decide.ts:206:13 | text | 미션 | learner-text-candidate | — |
| src/views/decide.ts:207:13 | text | 관측 전 예측 | learner-text-candidate | — |
| src/views/decide.ts:207:44 | text | (없음) | learner-text-candidate | — |
| src/views/decide.ts:208:13 | text | 저장 후보 | learner-text-candidate | — |
| src/views/decide.ts:208:22 | text | ${state.saved.length}개 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:209:13 | text | 관측 창 | learner-text-candidate | — |
| src/views/decide.ts:209:21 | text | ${state.windows.length}/3 사용 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:210:13 | text | 자료점 | learner-text-candidate | repeated-text |
| src/views/decide.ts:210:20 | text | ${obs.times.length}개 | learner-text-candidate | — |
| src/views/decide.ts:214:6 | text | 작은 잔차는 후보 모형과 자료의 일치도입니다. 존재의 증명으로 적지 마세요. | learner-text-candidate | — |
| src/views/decide.ts:221:29 | text | 결론 기록 | learner-text-candidate | — |
| src/views/decide.ts:222:22 | text | div | learner-text-candidate | repeated-text |
| src/views/decide.ts:222:38 | text | row | learner-text-candidate | repeated-text |
| src/views/decide.ts:222:51 | text | radiogroup | learner-text-candidate | — |
| src/views/decide.ts:222:65 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/decide.ts:222:79 | text | 결론 선택 | learner-text-candidate | — |
| src/views/decide.ts:223:31 | text | candidate | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:223:44 | text | 행성 후보 | learner-text-candidate | — |
| src/views/decide.ts:223:55 | text | hold | learner-text-candidate | — |
| src/views/decide.ts:223:63 | text | 추가 검증 필요 | learner-text-candidate | abstract-or-formal |
| src/views/decide.ts:224:21 | text | label | learner-text-candidate | repeated-text |
| src/views/decide.ts:224:39 | text | row | learner-text-candidate | repeated-text |
| src/views/decide.ts:224:53 | text | gap:0.35rem | learner-text-candidate | — |
| src/views/decide.ts:238:27 | text | label | learner-text-candidate | repeated-text |
| src/views/decide.ts:238:43 | text | v-reasons | learner-text-candidate | — |
| src/views/decide.ts:238:58 | text | 근거 (무엇이 후보를 지지하나요?) | learner-text-candidate | — |
| src/views/decide.ts:243:26 | placeholder | 예: 4.2일 간격으로 같은 깊이의 감소가 4회 반복되고, 잔차에 구조가 남지 않음 | placeholder, input | — |
| src/views/decide.ts:248:26 | text | label | learner-text-candidate | repeated-text |
| src/views/decide.ts:248:42 | text | v-limits | learner-text-candidate | — |
| src/views/decide.ts:248:56 | text | 대안과 한계 (무엇이 아직 불확실한가요?) | learner-text-candidate | — |
| src/views/decide.ts:253:25 | placeholder | 예: 별 자체 변동·잡음 가능성, 한 번뿐인 감소는 주기 미확정, 스침 통과와 작은 행성 구분 불가 | placeholder, input | — |
| src/views/decide.ts:261:23 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:261:42 | text | btn signal | button-or-action | repeated-text |
| src/views/decide.ts:261:62 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:261:76 | text | save-record | button-or-action | — |
| src/views/decide.ts:261:93 | text | 기록 저장 | button-or-action | — |
| src/views/decide.ts:265:26 | text | 결론을 먼저 고르세요 (행성 후보 / 추가 검증 필요). | learner-text-candidate | abstract-or-formal |
| src/views/decide.ts:269:26 | text | 근거와 대안·한계를 한 줄씩이라도 적어야 저장됩니다. | learner-text-candidate | — |
| src/views/decide.ts:277:10 | text | 저장됨 (${rec.createdAt}). 이 브라우저의 실험 기록 ${all.length}개. | learner-text-candidate | long-or-dense |
| src/views/decide.ts:278:10 | text | 브라우저 저장소를 쓸 수 없어 이번 세션 + JSON 내보내기만 가능합니다. 아래 버튼으로 내려받으세요. | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/views/decide.ts:281:22 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:281:41 | text | btn | button-or-action | repeated-text |
| src/views/decide.ts:281:54 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:281:66 | text | JSON 내보내기 | button-or-action | missing-term-explanation, technical-or-internal |
| src/views/decide.ts:284:33 | text | 0 ? all : [state.toRecord(mission.id, mission.seed, obs.times.length)]; downloadJson('exoplanet-signal-lab-records.json', JSON.stringify(payload, null, 2)); }); btnRow.append(saveBtn, expBtn); form.append(btnRow, msg); wrap.append(form); const hist = el('div', { class: 'plate' }); hist.append(el('h3', {}, '이 브라우저의 실험 기록')); const recList = el('div', { class: 'ledger' }); hist.append(recList); wrap.append(hist); function renderRecords(): void { recList.innerHTML = ''; const all = loadPersisted(); if (all.length === 0) { recList.append(el('p', { class: 'statusline' }, '아직 저장된 기록이 없습니다.')); return; } for (const r of all.slice(-8).reverse()) { recList.append(el('p', { class: 'statusline' }, `${r.createdAt} · ${r.scenarioId} · P=${fmt(r.parameters.periodDays, 2)}일 k=${fmt(r.parameters.radiusRatio, 3)} i=${fmt(r.parameters.inclinationDeg, 1)}° · ${r.explanation}`)); } } renderRecords(); return wrap; } export interface ChangeEntry { date: string; text: string; } export const CHANGELOG: ChangeEntry[] = [ { date: '2026-09-17', text: '최초 개발: P0 합성 3종 미션, 원궤도 후보 비교, 관측 예산 3창, 결론 기록.' }, { date: '2026-09-18', text: '미션 배경·상상도 자산 파이프라인과 상상도 갤러리 슬롯 추가 (자산 준비 시 표시).' }, { date: '2026-09-18', text: '미션 배경 상상 일러스트 3장 삽입 (Nano Banana 2 Lite 생성).' }, { date: '2026-09-18', text: '가상 행성 상상도 6장 삽입, 보고 탭 상상도 갤러리 표시 (Nano Banana 2 Lite 생성).' }, ]; /** 항상 찾을 수 있는 ‘업데이트 내역’ 다이얼로그 */ export function openHistory(): void { let dlg = document.querySelector | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/views/decide.ts:292:29 | text | 이 브라우저의 실험 기록 | learner-text-candidate | — |
| src/views/decide.ts:301:56 | text | 아직 저장된 기록이 없습니다. | learner-text-candidate | — |
| src/views/decide.ts:306:10 | text | ${r.createdAt} · ${r.scenarioId} · P=${fmt(r.parameters.periodDays, 2)}일 k=${fmt(r.parameters.radiusRatio, 3)} i=${fmt(r.parameters.inclinationDeg, 1)}° · ${r.explanation} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/decide.ts:319:32 | text | 최초 개발: P0 합성 3종 미션, 원궤도 후보 비교, 관측 예산 3창, 결론 기록. | learner-text-candidate | multiple-actions |
| src/views/decide.ts:320:32 | text | 미션 배경·상상도 자산 파이프라인과 상상도 갤러리 슬롯 추가 (자산 준비 시 표시). | learner-text-candidate | — |
| src/views/decide.ts:321:32 | text | 미션 배경 상상 일러스트 3장 삽입 (Nano Banana 2 Lite 생성). | learner-text-candidate | — |
| src/views/decide.ts:322:32 | text | 가상 행성 상상도 6장 삽입, 보고 탭 상상도 갤러리 표시 (Nano Banana 2 Lite 생성). | learner-text-candidate | — |
| src/views/decide.ts:331:23 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/decide.ts:331:37 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/views/decide.ts:333:22 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/views/decide.ts:340:43 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:342:26 | text | 닫기 | learner-text-candidate | — |
| src/views/decide.ts:344:41 | text | button | button-or-action | repeated-text |
| src/views/decide.ts:346:24 | text | 실험으로 복귀 | learner-text-candidate | — |
| src/views/fit.ts:26:21 | text | 관측 · 모형 · 잔차 | learner-text-candidate | — |
| src/views/fit.ts:31:51 | text | 관측 밝기 (점 + 오차 막대) | learner-text-candidate | — |
| src/views/fit.ts:32:53 | text | 후보 모형 (파란 실선) | learner-text-candidate | — |
| src/views/fit.ts:33:53 | text | 잔차 = 관측 − 모형 (아래띠 점선) | learner-text-candidate | — |
| src/views/fit.ts:39:24 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:39:38 | text | 정규화 밝기에 대한 시간 그래프. 표 형태의 수치 자료가 아래에 이어집니다. | learner-text-candidate | — |
| src/views/fit.ts:48:26 | text | 수치표로 보기 (그래프와 같은 자료) | learner-text-candidate | — |
| src/views/fit.ts:59:21 | text | 후보 모형 조절 | learner-text-candidate | — |
| src/views/fit.ts:80:22 | text | label | learner-text-candidate | repeated-text |
| src/views/fit.ts:80:38 | text | f-${key} | learner-text-candidate | — |
| src/views/fit.ts:80:52 | text | ${label} (${unit}) | learner-text-candidate | — |
| src/views/fit.ts:89:26 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:89:40 | text | ${label} 슬라이더 | learner-text-candidate | — |
| src/views/fit.ts:96:23 | text | aria-label | input | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:96:37 | text | ${label} 숫자 입력 | input | abstract-or-formal |
| src/views/fit.ts:116:36 | text | hint statusline | hint | repeated-text |
| src/views/fit.ts:116:57 | text | ${hint} · 유효 범위 ${min}–${max}${unit} | hint | abstract-or-formal |
| src/views/fit.ts:120:30 | text | 공전 주기 P | learner-text-candidate | — |
| src/views/fit.ts:120:41 | text | 일 | learner-text-candidate | repeated-text |
| src/views/fit.ts:121:6 | text | 반복 간격이 여기에 맞는지 곡선에서 확인 | learner-text-candidate | ambiguous-reference |
| src/views/fit.ts:122:31 | text | 반지름 비 k = Rp/Rs | learner-text-candidate | — |
| src/views/fit.ts:122:50 | text | 비율 | learner-text-candidate | — |
| src/views/fit.ts:123:6 | text | 통과 깊이 ≈ k² (중심 통과 기준) | learner-text-candidate | — |
| src/views/fit.ts:124:34 | text | 궤도 기울기 i | learner-text-candidate | — |
| src/views/fit.ts:125:6 | text | 90°=정면 통과, 작을수록 빗겨 지나감 | learner-text-candidate | — |
| src/views/fit.ts:126:36 | text | 통과 중심 시각 t0 | learner-text-candidate | — |
| src/views/fit.ts:126:51 | text | 일 | learner-text-candidate | repeated-text |
| src/views/fit.ts:127:6 | text | 모형 감소가 관측 감소와 같은 시각에 오도록 | learner-text-candidate | — |
| src/views/fit.ts:130:23 | text | button | button-or-action | repeated-text |
| src/views/fit.ts:130:42 | text | btn signal | button-or-action | repeated-text |
| src/views/fit.ts:130:62 | text | button | button-or-action | repeated-text |
| src/views/fit.ts:130:76 | text | save-candidate | button-or-action | missing-term-explanation, technical-or-internal |
| src/views/fit.ts:130:96 | text | 후보 저장 → 비교로 | button-or-action | — |
| src/views/fit.ts:135:71 | text | 저장 ${state.saved.length + 1} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/fit.ts:139:24 | text | button | button-or-action | repeated-text |
| src/views/fit.ts:139:43 | text | btn | button-or-action | repeated-text |
| src/views/fit.ts:139:56 | text | button | button-or-action | repeated-text |
| src/views/fit.ts:139:68 | text | 초기값으로 | button-or-action | — |
| src/views/fit.ts:156:21 | text | 같은 시각 함께 보기 | learner-text-candidate | — |
| src/views/fit.ts:168:23 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:168:37 | text | 탐색 시각 t (일). 방향키로 미세 조절 | learner-text-candidate | — |
| src/views/fit.ts:173:26 | text | aria-label | input | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:173:40 | text | 탐색 시각 t 숫자 입력 (일) | input | abstract-or-formal |
| src/views/fit.ts:192:37 | text | hint statusline | hint | repeated-text |
| src/views/fit.ts:192:58 | text | 그래프 커서 · 3D 행성 위치 · 겹침 도식이 같은 t를 공유합니다. | hint | — |
| src/views/fit.ts:201:8 | text | 3D는 별·행성·관측 방향의 관계만 보여줍니다. 거리와 반지름은 시각적으로 확대됨. 파란 고리가 궤도, 검은 원뿔이 관측자 방향입니다. | learner-text-candidate | long-or-dense |
| src/views/fit.ts:239:35 | text | χ² (일치도) | learner-text-candidate | — |
| src/views/fit.ts:239:48 | text | RMSE (일치도) | learner-text-candidate | technical-or-internal |
| src/views/fit.ts:240:35 | text | χ²/자유도 | learner-text-candidate | — |
| src/views/fit.ts:240:46 | text | 자료점 | learner-text-candidate | repeated-text |
| src/views/fit.ts:241:15 | text | 자료점 | learner-text-candidate | repeated-text |
| src/views/fit.ts:241:22 | text | ${obs.times.length}개${state.followUpCount > 0 ? | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/views/fit.ts:241:65 | text | 0 ? ` (후속 ${state.followUpCount} 포함)` : ''}`), ); const s = modelFluxAt(state.scrubT, m.star, cand.periodDays, cand.radiusRatio, cand.inclinationDeg, cand.transitEpochDays); const b = impactParameter(semiMajorAxisM(cand.periodDays, m.star.massKg), cand.inclinationDeg, m.star.radiusM); const where = !s.isFront ? '별 뒤 (감소 없음)' : s.flux | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/fit.ts:246:33 | text | 별 뒤 (감소 없음) | learner-text-candidate | — |
| src/views/fit.ts:246:69 | text | 별 앞 · 통과 중 | learner-text-candidate | — |
| src/views/fit.ts:246:84 | text | 별 앞 · 통과 바깥 | learner-text-candidate | — |
| src/views/fit.ts:248:8 | text | t=${fmt(state.scrubT, 2)}일 · 모형 밝기 ${fmt(s.flux, 5)} · 투영거리 ${(s.distanceM / m.star.radiusM).toFixed(2)}Rs · ${where} · 충격 매개변수 b=${fmt(b, 2)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/fit.ts:250:34 | text | · 스침 통과(중심이 별 가장자리 근처) | learner-text-candidate | — |
| src/views/fit.ts:263:30 | text | 0) { errBox.append(notice('bad', `입력 오류: ${state.errors.join(' ')} 범위 안의 값으로 돌려주세요.`)); } tableWrap.innerHTML = ''; tableWrap.append(buildTable(obs.times, obs.fluxes, model)); } disposers.push(state.subscribe(requestRefresh)); refresh(); return root; } function denseGrid(times: number[], count: number): number[] { const lo = Math.min(...times); const hi = Math.max(...times); const out: number[] = []; for (let i = 0; i | feedback-or-error, input | abstract-or-formal, long-or-dense, technical-or-internal |
| src/views/fit.ts:264:29 | text | bad | feedback-or-error, input | — |
| src/views/fit.ts:264:36 | text | 입력 오류: ${state.errors.join(' ')} 범위 안의 값으로 돌려주세요. | feedback-or-error, input | abstract-or-formal, technical-or-internal |
| src/views/fit.ts:290:21 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/fit.ts:290:35 | text | 원 겹침 도식. 투영거리 ${dRs.toFixed(2)}별반지름, 모형 밝기 ${flux.toFixed(4)} | learner-text-candidate | long-or-dense |
| src/views/fit.ts:317:12 | text | 앞쪽 반궤도: 겹친 만큼 어두워집니다 (F=${fmt(flux, 4)}). | learner-text-candidate | — |
| src/views/fit.ts:318:12 | text | 뒤쪽 반궤도: 같은 위치라도 감소가 생기지 않습니다. | learner-text-candidate | — |
| src/views/fit.ts:328:29 | text | 시간 (일) | learner-text-candidate | repeated-text |
| src/views/fit.ts:328:48 | text | 관측 밝기 | learner-text-candidate | — |
| src/views/fit.ts:328:66 | text | 모형 밝기 | learner-text-candidate | — |
| src/views/fit.ts:328:84 | text | 잔차 | learner-text-candidate | — |
| src/views/observe.ts:21:8 | text | 1단계 · 별빛 곡선 3개 중 반복되는 감소 후보를 고르세요. 답을 보기 전, 예상 통과 깊이(%)를 먼저 적습니다. | learner-text-candidate | long-or-dense |
| src/views/observe.ts:24:20 | text | div | learner-text-candidate | repeated-text |
| src/views/observe.ts:24:36 | text | missions | learner-text-candidate | — |
| src/views/observe.ts:24:54 | text | group | learner-text-candidate | — |
| src/views/observe.ts:24:63 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/observe.ts:24:77 | text | 미션 선택 | learner-text-candidate | — |
| src/views/observe.ts:26:22 | text | button | button-or-action | repeated-text |
| src/views/observe.ts:28:14 | text | button | button-or-action | repeated-text |
| src/views/observe.ts:41:77 | text | 상상 일러스트 | learner-text-candidate | — |
| src/views/observe.ts:45:21 | text | b | learner-text-candidate | repeated-text |
| src/views/observe.ts:45:30 | text | ${m.title} — ${m.question} | learner-text-candidate | — |
| src/views/observe.ts:69:22 | text | h3 | learner-text-candidate | — |
| src/views/observe.ts:69:32 | text | 예측 기록 — ${mission.title} | learner-text-candidate | — |
| src/views/observe.ts:71:23 | text | hint statusline | hint | repeated-text |
| src/views/observe.ts:72:8 | text | 예: “반지름 비 0.1인 중심 통과라면 최대 약 1% 감소”. 조건·결과·해석은 따로 저장됩니다. | learner-text-candidate | — |
| src/views/observe.ts:79:24 | placeholder | 예상 통과 깊이 % 또는 반복 구간 (짧게) | placeholder, input | — |
| src/views/observe.ts:81:23 | text | aria-label | input | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/observe.ts:81:37 | text | 관측 전 예측 기록 | input | — |
| src/views/observe.ts:83:20 | text | button | button-or-action | repeated-text |
| src/views/observe.ts:83:39 | text | btn signal | button-or-action | repeated-text |
| src/views/observe.ts:83:59 | text | button | button-or-action | repeated-text |
| src/views/observe.ts:83:71 | text | 예측 저장 | button-or-action | — |
| src/views/observe.ts:94:36 | text | 저장된 예측: ${state.prediction} — 실행 뒤에 조건을 바꿔도 이 기록은 덮어쓰지 않습니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/observe.ts:99:8 | text | 참고: 중심 완전 통과의 이상적 최대 감소는 1−F=k² 입니다. 이 미션의 설계 예시는 약 ${(depth * 100).toFixed(2)}%이며, 정답이 아니라 검증용 수치입니다. | feedback-or-error | abstract-or-formal, long-or-dense |
| src/views/orbitScene.ts:16:17 | text | void; } const DEG = Math.PI / 180; export function createOrbitScene(container: HTMLElement): OrbitHandle { let renderer: THREE.WebGLRenderer \| null = null; try { // MSAA 없이 · 저전력 기기에서도 한 프레임 안에 끝나도록 요구를 낮춘다. renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' }); } catch { renderer = null; } if (!renderer) { container.innerHTML = ''; const note = document.createElement('p'); note.className = 'statusline'; note.textContent = '3D를 표시할 수 없어 2D 도식으로 대체합니다. 학습 핵심(통과 기하)은 아래 겹침 도식과 표로 동일하게 확인할 수 있습니다.'; container.append(note); const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 360 150'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', '2D 궤도·겹침 대체 도식'); svg.innerHTML = ' | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/orbitScene.ts:34:8 | text | 3D를 표시할 수 없어 2D 도식으로 대체합니다. 학습 핵심(통과 기하)은 아래 겹침 도식과 표로 동일하게 확인할 수 있습니다. | learner-text-candidate | long-or-dense |
| src/views/orbitScene.ts:39:23 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/orbitScene.ts:39:37 | text | 2D 궤도·겹침 대체 도식 | learner-text-candidate | — |
| src/views/orbitScene.ts:47:67 | text | undefined }; } const W = 640; const H = 400; renderer.setSize(W, H, false); renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio \|\| 1)); container.innerHTML = ''; container.append(renderer.domElement); renderer.domElement.style.width = '100%'; renderer.domElement.style.height = 'auto'; renderer.domElement.setAttribute('role', 'img'); renderer.domElement.setAttribute('aria-label', '별과 행성 궤도의 3차원 도식. 거리와 크기는 시각적으로 확대됨.'); const scene = new THREE.Scene(); scene.background = new THREE.Color('#f4f1e8'); const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100); camera.position.set(0, 2.4, 7.2); camera.lookAt(0, 0, 0); scene.add(new THREE.AmbientLight(0xffffff, 0.85)); const starLight = new THREE.PointLight(0xffffff, 60, 0, 1.8); starLight.position.set(0, 0, 0); scene.add(starLight); const star = new THREE.Mesh( new THREE.SphereGeometry(1, 40, 28), new THREE.MeshBasicMaterial({ color: '#ffdf9e' }), ); scene.add(star); const planetMat = new THREE.MeshStandardMaterial({ color: '#22303c', roughness: 0.9, metalness: 0 }); const planet = new THREE.Mesh(new THREE.SphereGeometry(0.22, 28, 20), planetMat); scene.add(planet); // 관측자 방향 (+z): 원뿔 + 막대 const obsGroup = new THREE.Group(); const rod = new THREE.Mesh( new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8), new THREE.MeshBasicMaterial({ color: '#16181a' }), ); rod.rotation.x = Math.PI / 2; rod.position.z = 4.6; const cone = new THREE.Mesh( new THREE.ConeGeometry(0.12, 0.34, 16), new THREE.MeshBasicMaterial({ color: '#16181a' }), ); cone.rotation.x = -Math.PI / 2; cone.position.z = 3.7; obsGroup.add(rod, cone); scene.add(obsGroup); const A_VIS = 3; let orbitLine: THREE.Line \| null = null; function rebuildOrbit(inclDeg: number): void { if (orbitLine) { scene.remove(orbitLine); orbitLine.geometry.dispose(); } const pts: THREE.Vector3[] = []; const cosI = Math.cos(inclDeg * DEG); const sinI = Math.sin(inclDeg * DEG); for (let s = 0; s | learner-text-candidate | long-or-dense, technical-or-internal |
| src/views/orbitScene.ts:59:37 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/views/orbitScene.ts:59:51 | text | 별과 행성 궤도의 3차원 도식. 거리와 크기는 시각적으로 확대됨. | learner-text-candidate | — |
| src/views/ui.ts:24:19 | text | span | learner-text-candidate | — |
| src/views/ui.ts:24:36 | text | statusline | learner-text-candidate | — |
| tests/engine.test.ts:12:7 | text | k=0.1 중심 완전 겹침에서 F=0.99 | learner-text-candidate | — |
| tests/engine.test.ts:16:7 | text | d ≥ Rs+Rp면 F=1 | learner-text-candidate | — |
| tests/engine.test.ts:20:7 | text | 반지름 0 경계에서 F=1, NaN 없음 | learner-text-candidate | — |
| tests/engine.test.ts:24:7 | text | 접촉 경계에서 연속 (계단 없음) | learner-text-candidate | — |
| tests/engine.test.ts:36:7 | text | arccos 경계 반올림에도 NaN 없음 (스침 통과) | learner-text-candidate | — |
| tests/engine.test.ts:52:7 | text | 행성이 뒤쪽이면 감소 없음 | learner-text-candidate | — |
| tests/engine.test.ts:65:7 | text | φ와 φ+2π는 같은 모형값 | learner-text-candidate | — |
| tests/engine.test.ts:87:7 | text | seed를 바꾸지 않은 재실행은 같은 관측 | learner-text-candidate | — |
| tests/engine.test.ts:92:7 | text | 후보 변경으로 관측 원자료가 바뀌지 않음 (예측은 원자료를 변형하지 않음) | learner-text-candidate | — |
| tests/engine.test.ts:107:7 | text | 유효 후보는 오류 없음 | feedback-or-error | abstract-or-formal |
| tests/engine.test.ts:110:7 | text | 범위 밖·NaN·무한대를 차단 | learner-text-candidate | — |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`

// 공유 물리량·단위 (SI 내부 계산, 화면은 일·별 반지름 단위).

export const G = 6.6743e-11; // m^3 kg^-1 s^-2
export const SOLAR_MASS_KG = 1.98847e30;
export const SOLAR_RADIUS_M = 6.957e8;
export const DAY_S = 86400;

export interface StarParams {
  massKg: number;
  radiusM: number;
}

export interface CandidateParams {
  /** 공전 주기 (일). P0 범위 [2, 20] */
  periodDays: number;
  /** 행성/별 반지름 비. P0 범위 [0.03, 0.2] */
  radiusRatio: number;
  /** 궤도 기울기 (도). P0 범위 [85, 90] */
  inclinationDeg: number;
  /** 통과 중심 시각 (일) */
  transitEpochDays: number;
}

export const LIMITS = {
  periodDays: [2, 20] as const,
  radiusRatio: [0.03, 0.2] as const,
  inclinationDeg: [85, 90] as const,
} as const;

function finite(n: number): boolean {
  return typeof n === 'number' && Number.isFinite(n);
}

/** 후보 파라미터 유효성. 빈 배열 = 유효. 범위 밖·NaN·무한대를 차단한다. */
export function validateCandidate(p: CandidateParams): string[] {
  const errors: string[] = [];
  if (!p || typeof p !== 'object') return ['후보 파라미터가 비어 있습니다.'];
  if (!finite(p.periodDays)) errors.push('주기 P는 유한한 숫자여야 합니다.');
  else if (p.periodDays < LIMITS.periodDays[0] || p.periodDays > LIMITS.periodDays[1])
    errors.push(`주기 P는 ${LIMITS.periodDays[0]}–${LIMITS.periodDays[1]}일 범위여야 합니다.`);
  if (!finite(p.radiusRatio)) errors.push('반지름 비 k는 유한한 숫자여야 합니다.');
  else if (p.radiusRatio < LIMITS.radiusRatio[0] || p.radiusRatio > LIMITS.radiusRatio[1])
    errors.push(`반지름 비 k는 ${LIMITS.radiusRatio[0]}–${LIMITS.radiusRatio[1]} 범위여야 합니다.`);
  if (!finite(p.inclinationDeg)) errors.push('기울기 i는 유한한 숫자여야 합니다.');
  else if (p.inclinationDeg < LIMITS.inclinationDeg[0] || p.inclinationDeg > LIMITS.inclinationDeg[1])
    errors.push(`기울기 i는 ${LIMITS.inclinationDeg[0]}–${LIMITS.inclinationDeg[1]}° 범위여야 합니다.`);
  if (!finite(p.transitEpochDays)) errors.push('통과 중심 시각 t0은 유한한 숫자여야 합니다.');
  return errors;
}

export function validateStar(s: StarParams): string[] {
  const errors: string[] = [];
  if (!s || typeof s !== 'object') return ['별 정보가 비어 있습니다.'];
  if (!finite(s.massKg) || s.massKg <= 0) errors.push('별 질량은 0보다 큰 유한값이어야 합니다.');
  if (!finite(s.radiusM) || s.radiusM <= 0) errors.push('별 반지름은 0보다 큰 유한값이어야 합니다.');
  return errors;
}

/** 기본 P0 별: 1 태양질량 · 1 태양반지름 */
export const DEFAULT_STAR: StarParams = {
  massKg: SOLAR_MASS_KG,
  radiusM: SOLAR_RADIUS_M,
};

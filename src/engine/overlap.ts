// 원 겹침 면적 → 정규화 밝기. 분리·포함·부분 겹침 세 경우 + 경계 연속성.
import type { StarParams } from './types';
import { projected, semiMajorAxisM } from './orbit';

/** 두 원(별 R, 행성 r, 중심거리 d)의 겹침 면적 (m²) */
export function circleOverlapAreaM2(d: number, R: number, r: number): number {
  if (!(d > 0) && d !== 0) return 0; // NaN 방어
  if (r <= 0) return 0;
  if (d >= R + r) return 0; // 분리
  if (d <= Math.abs(R - r)) return Math.PI * r * r; // 완전 포함 (P0는 항상 r < R)
  // 부분 겹침
  const arg1 = clamp((d * d + r * r - R * R) / (2 * d * r));
  const arg2 = clamp((d * d + R * R - r * r) / (2 * d * R));
  const term = Math.max(0, (-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
  return r * r * Math.acos(arg1) + R * R * Math.acos(arg2) - 0.5 * Math.sqrt(term);
}

function clamp(x: number): number {
  if (x > 1) return 1;
  if (x < -1) return -1;
  return x;
}

/** 투영 거리에서의 정규화 밝기 F(t) = 1 − A_overlap / (πRs²) */
export function fluxAtDistance(distanceM: number, starRadiusM: number, planetRadiusM: number): number {
  const area = circleOverlapAreaM2(distanceM, starRadiusM, planetRadiusM);
  return 1 - area / (Math.PI * starRadiusM * starRadiusM);
}

export interface FluxSample {
  flux: number;
  distanceM: number;
  isFront: boolean;
}

/** 단일 시각의 모형 밝기. 뒤쪽 반궤도에서는 감소 없음(F = 1). */
export function modelFluxAt(
  tDays: number,
  star: StarParams,
  periodDays: number,
  radiusRatio: number,
  inclinationDeg: number,
  epochDays: number,
): FluxSample {
  const a = semiMajorAxisM(periodDays, star.massKg);
  const proj = projected(tDays, periodDays, epochDays, a, inclinationDeg);
  if (!proj.isFront) return { flux: 1, distanceM: proj.distanceM, isFront: false };
  const rp = star.radiusM * radiusRatio;
  return {
    flux: fluxAtDistance(proj.distanceM, star.radiusM, rp),
    distanceM: proj.distanceM,
    isFront: true,
  };
}

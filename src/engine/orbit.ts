// 원궤도 기하: 내부 SI(m), 위상은 무차원. DOM·Three.js에 의존하지 않는다.
import { DAY_S, G } from './types';

export function semiMajorAxisM(periodDays: number, massKg: number): number {
  const p = periodDays * DAY_S;
  return Math.cbrt((G * massKg * p * p) / (4 * Math.PI * Math.PI));
}

/** 위상 φ = 2π(t − t0)/P (라디안, 정규화하지 않아 φ≡φ+2π가 정확히 성립) */
export function phaseRad(tDays: number, periodDays: number, epochDays: number): number {
  return (2 * Math.PI * (tDays - epochDays)) / periodDays;
}

export interface Projected {
  /** 별 중심–행성 중심 투영 거리 (m) */
  distanceM: number;
  /** 앞쪽 반궤도(cosφ > 0)에서만 별을 가린다 */
  isFront: boolean;
  /** 위상 (rad) */
  phase: number;
}

const DEG = Math.PI / 180;

export function projected(
  tDays: number,
  periodDays: number,
  epochDays: number,
  semiMajorM: number,
  inclinationDeg: number,
): Projected {
  const phase = phaseRad(tDays, periodDays, epochDays);
  const cosPhi = Math.cos(phase);
  const sinPhi = Math.sin(phase);
  const cosI = Math.cos(inclinationDeg * DEG);
  const d = semiMajorM * Math.sqrt(sinPhi * sinPhi + cosI * cosI * cosPhi * cosPhi);
  return { distanceM: d, isFront: cosPhi > 0, phase };
}

/** 충격 매개변수 b = a·cos i / Rs (중심 통과 ≈ 0) */
export function impactParameter(semiMajorM: number, inclinationDeg: number, starRadiusM: number): number {
  return (semiMajorM * Math.cos(inclinationDeg * DEG)) / starRadiusM;
}

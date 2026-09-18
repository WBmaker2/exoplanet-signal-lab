// 광도곡선 합성: 실제 시각 t에 모형 계산 + 고정 seed 정규잡음. 재현 가능.
import type { CandidateParams, StarParams } from './types';
import { modelFluxAt } from './overlap';

/** 재현 가능한 난수 (mulberry32) */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 표준정규분포 난수 (Box–Muller, spare 캐시) */
export function makeGaussian(rng: () => number): () => number {
  let spare: number | null = null;
  return () => {
    if (spare !== null) {
      const v = spare;
      spare = null;
      return v;
    }
    let u = 0;
    let v = 0;
    do {
      u = rng();
    } while (u <= 0);
    v = rng();
    const mag = Math.sqrt(-2 * Math.log(u));
    spare = mag * Math.sin(2 * Math.PI * v);
    return mag * Math.cos(2 * Math.PI * v);
  };
}

export interface SyntheticObservation {
  timesDays: number[];
  fluxes: number[];
  uncertainties: number[];
}

/** 주어진 시각들에 참 모형 + σ 정규잡음을 입힌 합성 관측. 같은 seed면 항상 같다. */
export function synthesize(
  timesDays: number[],
  star: StarParams,
  truth: CandidateParams,
  sigma: number,
  seed: number,
): SyntheticObservation {
  const rng = mulberry32(seed);
  const gauss = makeGaussian(rng);
  const fluxes = timesDays.map((t) => {
    const { flux } = modelFluxAt(
      t,
      star,
      truth.periodDays,
      truth.radiusRatio,
      truth.inclinationDeg,
      truth.transitEpochDays,
    );
    return flux + gauss() * sigma;
  });
  return { timesDays: [...timesDays], fluxes, uncertainties: timesDays.map(() => sigma) };
}

/** 불규칙 샘플링 시각 생성: 구간 내 균등 + 관측 공백 1개. seed 고정. */
export function irregularTimes(startDay: number, endDay: number, count: number, seed: number): number[] {
  const rng = mulberry32(seed ^ 0x9e3779b9);
  const times: number[] = [];
  for (let i = 0; i < count; i += 1) {
    times.push(startDay + rng() * (endDay - startDay));
  }
  times.sort((a, b) => a - b);
  // 중간 15% 구간을 공백으로 둔다 (자료 공백 P1 맛보기, P0는 표시만)
  const gapStart = startDay + (endDay - startDay) * 0.45;
  const gapEnd = startDay + (endDay - startDay) * 0.6;
  return times.filter((t) => t < gapStart || t > gapEnd);
}

/** 후보 모형의 예측 곡선 */
export function predictCurve(
  timesDays: number[],
  star: StarParams,
  candidate: CandidateParams,
): number[] {
  return timesDays.map(
    (t) =>
      modelFluxAt(t, star, candidate.periodDays, candidate.radiusRatio, candidate.inclinationDeg, candidate.transitEpochDays)
        .flux,
  );
}

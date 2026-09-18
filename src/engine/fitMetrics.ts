// 적합 지표: χ² (σ>0) · RMSE (σ=0). 작은 잔차는 일치도이지 존재 증명이 아니다.

export interface FitResult {
  kind: 'chi2' | 'rmse';
  value: number;
  reduced: number; // χ²/dof 또는 RMSE (비교용)
  dof: number;
}

export function chiSquared(observed: number[], predicted: number[], sigma: number[]): number {
  let s = 0;
  for (let i = 0; i < observed.length; i += 1) {
    const o = observed[i] ?? 0;
    const p = predicted[i] ?? 0;
    const sd = sigma[i] ?? 0;
    if (sd > 0) {
      const r = (o - p) / sd;
      s += r * r;
    }
  }
  return s;
}

export function rmse(observed: number[], predicted: number[]): number {
  if (observed.length === 0) return Number.NaN;
  let s = 0;
  for (let i = 0; i < observed.length; i += 1) {
    const d = (observed[i] ?? 0) - (predicted[i] ?? 0);
    s += d * d;
  }
  return Math.sqrt(s / observed.length);
}

/** σ=0 자료에는 RMSE를 사용한다 (0으로 나누기 방지). */
export function fit(
  observed: number[],
  predicted: number[],
  sigma: number[],
  nParams: number,
): FitResult {
  const useChi2 = sigma.some((v) => v > 0);
  const dof = Math.max(1, observed.length - nParams);
  if (!useChi2) {
    const v = rmse(observed, predicted);
    return { kind: 'rmse', value: v, reduced: v, dof };
  }
  const v = chiSquared(observed, predicted, sigma);
  return { kind: 'chi2', value: v, reduced: v / dof, dof };
}

/**
 * 두 후보의 구분 가능성 (교실용 휴리스틱).
 * |Δχ²| ≤ 9면 관측상 구분 불가로 함께 인정한다. (엄밀한 모형선택이 아님을 UI에 명시)
 */
export const INDISTINGUISHABLE_DELTA = 9;

export function indistinguishable(a: FitResult, b: FitResult): boolean {
  if (a.kind !== b.kind) return false;
  return Math.abs(a.value - b.value) <= INDISTINGUISHABLE_DELTA;
}

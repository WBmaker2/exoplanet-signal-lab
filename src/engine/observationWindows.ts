// 추가 관측 창: 예산 3개, 창당 비용 1. 선택은 관측 자료를 추가할 뿐 바꾸지 않는다.
import type { CandidateParams, StarParams } from './types';
import { mulberry32, synthesize } from './lightCurve';

export interface WindowOption {
  id: string;
  label: string;
  startDay: number;
  durationDay: number;
  cost: number;
}

export const BUDGET_TOTAL = 3;

export function remainingBudget(selected: WindowOption[]): number {
  const spent = selected.reduce((s, w) => s + w.cost, 0);
  return BUDGET_TOTAL - spent;
}

export function canSelect(selected: WindowOption[], option: WindowOption): boolean {
  if (selected.some((w) => w.id === option.id)) return false;
  return remainingBudget(selected) >= option.cost;
}

export interface FollowUp {
  timesDays: number[];
  fluxes: number[];
  uncertainties: number[];
}

/** 선택한 창 구간에 후속 관측점을 합성해 추가한다 (참 모형 + 잡음, seed 파생). */
export function followUpInWindow(
  option: WindowOption,
  star: StarParams,
  truth: CandidateParams,
  sigma: number,
  seed: number,
  pointsPerDay = 6,
): FollowUp {
  const rng = mulberry32(seed ^ option.id.length ^ Math.floor(option.startDay * 97));
  const n = Math.max(4, Math.round(option.durationDay * pointsPerDay));
  const times: number[] = [];
  for (let i = 0; i < n; i += 1) {
    times.push(option.startDay + rng() * option.durationDay);
  }
  times.sort((a, b) => a - b);
  const synth = synthesize(times, star, truth, sigma, seed ^ 0x51ed);
  return { timesDays: synth.timesDays, fluxes: synth.fluxes, uncertainties: synth.uncertainties };
}

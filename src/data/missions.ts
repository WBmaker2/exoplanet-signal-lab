// P0 합성 자료 3종: 검수된 고정 자료처럼 항상 같은 관측을 낸다 (seed 고정).
import { DEFAULT_STAR } from '../engine/types';
import type { CandidateParams, StarParams } from '../engine/types';
import { irregularTimes, synthesize } from '../engine/lightCurve';
import type { SyntheticObservation } from '../engine/lightCurve';
import type { WindowOption } from '../engine/observationWindows';

export interface Mission {
  id: string;
  title: string;
  question: string;
  blurb: string;
  star: StarParams;
  truth: CandidateParams;
  sigma: number;
  seed: number;
  spanDays: [number, number];
  base: SyntheticObservation;
  windows: WindowOption[];
  teaching: string;
}

function build(
  id: string,
  title: string,
  question: string,
  blurb: string,
  truth: CandidateParams,
  sigma: number,
  seed: number,
  spanDays: [number, number],
  count: number,
  windows: WindowOption[],
  teaching: string,
): Mission {
  const star = DEFAULT_STAR;
  const times = irregularTimes(spanDays[0], spanDays[1], count, seed);
  const base = synthesize(times, star, truth, sigma, seed);
  return { id, title, question, blurb, star, truth, sigma, seed, spanDays, base, windows, teaching };
}

export const MISSIONS: Mission[] = [
  build(
    'mission-1',
    '미션 1 · 또렷한 반복 신호',
    '어느 구간에서 같은 깊이의 감소가 반복되나요?',
    '별빛 곡선에서 같은 모양의 감소가 반복되는지 찾아보세요. 먼저 그래프에서 예상 깊이와 반복 간격을 기록하세요.',
    { periodDays: 4.2, radiusRatio: 0.12, inclinationDeg: 89.4, transitEpochDays: 1.0 },
    0.002,
    1101,
    [0, 21],
    220,
    [
      { id: 'm1-w1', label: '21.0–22.4일 창', startDay: 21.0, durationDay: 1.4, cost: 1 },
      { id: 'm1-w2', label: '25.2–26.6일 창', startDay: 25.2, durationDay: 1.4, cost: 1 },
      { id: 'm1-w3', label: '29.4–30.8일 창', startDay: 29.4, durationDay: 1.4, cost: 1 },
      { id: 'm1-w4', label: '33.6–35.0일 창', startDay: 33.6, durationDay: 1.4, cost: 1 },
    ],
    '중심 통과에서 F=1−k² 관계를 확인하는 기준 미션.',
  ),
  build(
    'mission-2',
    '미션 2 · 잡음 속 얕은 신호',
    '잡음과 신호를 어떻게 구분할 건가요?',
    '잡음에 묻힌 작은 감소가 실제 신호인지 살펴보세요. 반복 간격과 잔차를 함께 비교하세요.',
    { periodDays: 9.6, radiusRatio: 0.062, inclinationDeg: 88.2, transitEpochDays: 2.0 },
    0.0035,
    2202,
    [0, 28],
    200,
    [
      { id: 'm2-w1', label: '28.0–29.6일 창', startDay: 28.0, durationDay: 1.6, cost: 1 },
      { id: 'm2-w2', label: '30.8–32.4일 창', startDay: 30.8, durationDay: 1.6, cost: 1 },
      { id: 'm2-w3', label: '37.6–39.2일 창', startDay: 37.6, durationDay: 1.6, cost: 1 },
      { id: 'm2-w4', label: '40.4–42.0일 창', startDay: 40.4, durationDay: 1.6, cost: 1 },
    ],
    '얕은 통과 + 큰 잡음: 여러 후보가 구분 불가할 수 있음을 보여준다.',
  ),
  build(
    'mission-3',
    '미션 3 · 한 번의 감소',
    '한 번 어두워졌다고 행성이 있을까요?',
    '관측 구간에 감소가 한 번뿐입니다. 반복을 확인할 수 없는 상황에서 다음에 어떤 자료가 필요한지 생각해 보세요.',
    { periodDays: 17.5, radiusRatio: 0.09, inclinationDeg: 89.7, transitEpochDays: 6.0 },
    0.0025,
    3303,
    [0, 21],
    180,
    [
      { id: 'm3-w1', label: '21.0–23.0일 창', startDay: 21.0, durationDay: 2.0, cost: 1 },
      { id: 'm3-w2', label: '23.5–25.5일 창', startDay: 23.5, durationDay: 2.0, cost: 1 },
      { id: 'm3-w3', label: '40.0–43.0일 창', startDay: 40.0, durationDay: 3.0, cost: 1 },
      { id: 'm3-w4', label: '57.5–60.5일 창', startDay: 57.5, durationDay: 3.0, cost: 1 },
    ],
    '자료 부족 → 적합 실패가 아니라 ‘구분할 정보 부족’을 선언하는 법을 배운다.',
  ),
];

export function getMission(id: string): Mission {
  const m = MISSIONS.find((v) => v.id === id);
  if (!m) throw new Error(`알 수 없는 미션: ${id}`);
  return m;
}

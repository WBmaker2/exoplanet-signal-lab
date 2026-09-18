// P0 검증 (§10): 겹침·주기성·연속성·seed 재현·입력 차단.
import { describe, expect, it } from 'vitest';
import { DEFAULT_STAR, SOLAR_RADIUS_M, validateCandidate } from '../src/engine/types';
import type { CandidateParams } from '../src/engine/types';
import { circleOverlapAreaM2, fluxAtDistance, modelFluxAt } from '../src/engine/overlap';
import { predictCurve, synthesize } from '../src/engine/lightCurve';

const STAR = DEFAULT_STAR;
const Rs = SOLAR_RADIUS_M;

describe('overlap', () => {
  it('k=0.1 중심 완전 겹침에서 F=0.99', () => {
    const f = fluxAtDistance(0, Rs, Rs * 0.1);
    expect(f).toBeCloseTo(0.99, 10);
  });
  it('d ≥ Rs+Rp면 F=1', () => {
    expect(fluxAtDistance(Rs + Rs * 0.1, Rs, Rs * 0.1)).toBe(1);
    expect(fluxAtDistance(Rs * 3, Rs, Rs * 0.1)).toBe(1);
  });
  it('반지름 0 경계에서 F=1, NaN 없음', () => {
    expect(fluxAtDistance(0, Rs, 0)).toBe(1);
    expect(circleOverlapAreaM2(Rs, Rs, 0)).toBe(0);
  });
  it('접촉 경계에서 연속 (계단 없음)', () => {
    const k = 0.1;
    let prev = fluxAtDistance(0, Rs, Rs * k);
    let worst = 0;
    for (let i = 1; i <= 2000; i += 1) {
      const d = ((Rs + Rs * k + Rs * 0.05) * i) / 2000;
      const f = fluxAtDistance(d, Rs, Rs * k);
      worst = Math.max(worst, Math.abs(f - prev));
      prev = f;
    }
    expect(worst).toBeLessThan(0.002);
  });
  it('arccos 경계 반올림에도 NaN 없음 (스침 통과)', () => {
    for (let i = 0; i <= 100; i += 1) {
      const d = Rs * (0.9 + (0.3 * i) / 100);
      const f = fluxAtDistance(d, Rs, Rs * 0.2);
      expect(Number.isNaN(f)).toBe(false);
    }
  });
});

describe('orbit phase', () => {
  const cand: CandidateParams = {
    periodDays: 4.2,
    radiusRatio: 0.1,
    inclinationDeg: 89.0,
    transitEpochDays: 1.0,
  };
  it('행성이 뒤쪽이면 감소 없음', () => {
    // φ=π: t = t0 + P/2
    const s = modelFluxAt(
      cand.transitEpochDays + cand.periodDays / 2,
      STAR,
      cand.periodDays,
      cand.radiusRatio,
      cand.inclinationDeg,
      cand.transitEpochDays,
    );
    expect(s.isFront).toBe(false);
    expect(s.flux).toBe(1);
  });
  it('φ와 φ+2π는 같은 모형값', () => {
    const a = modelFluxAt(2.3, STAR, cand.periodDays, cand.radiusRatio, cand.inclinationDeg, cand.transitEpochDays);
    const b = modelFluxAt(
      2.3 + cand.periodDays,
      STAR,
      cand.periodDays,
      cand.radiusRatio,
      cand.inclinationDeg,
      cand.transitEpochDays,
    );
    expect(b.flux).toBeCloseTo(a.flux, 12);
  });
});

describe('synthesis', () => {
  const truth: CandidateParams = {
    periodDays: 4.2,
    radiusRatio: 0.12,
    inclinationDeg: 89.4,
    transitEpochDays: 1.0,
  };
  const times = [0.5, 1.0, 1.5, 5.2, 9.4];
  it('seed를 바꾸지 않은 재실행은 같은 관측', () => {
    const a = synthesize(times, STAR, truth, 0.002, 1101);
    const b = synthesize(times, STAR, truth, 0.002, 1101);
    expect(a.fluxes).toEqual(b.fluxes);
  });
  it('후보 변경으로 관측 원자료가 바뀌지 않음 (예측은 원자료를 변형하지 않음)', () => {
    const obs = synthesize(times, STAR, truth, 0.002, 1101);
    const before = [...obs.fluxes];
    predictCurve(times, STAR, { ...truth, periodDays: 9.9, radiusRatio: 0.05 });
    expect(obs.fluxes).toEqual(before);
  });
});

describe('validation', () => {
  const good: CandidateParams = {
    periodDays: 4.2,
    radiusRatio: 0.1,
    inclinationDeg: 89.0,
    transitEpochDays: 1.0,
  };
  it('유효 후보는 오류 없음', () => {
    expect(validateCandidate(good)).toEqual([]);
  });
  it('범위 밖·NaN·무한대를 차단', () => {
    expect(validateCandidate({ ...good, periodDays: 1 }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, periodDays: 21 }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, radiusRatio: 0 }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, radiusRatio: 0.25 }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, inclinationDeg: 80 }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, periodDays: Number.NaN }).length).toBeGreaterThan(0);
    expect(validateCandidate({ ...good, periodDays: Number.POSITIVE_INFINITY }).length).toBeGreaterThan(0);
  });
});

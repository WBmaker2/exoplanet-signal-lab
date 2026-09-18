// 세션: 상태 + 후속관측 누적. 후보 변경은 원자료를 바꾸지 않는다.
import { LabState } from '../state';
import { getMission } from '../data/missions';
import type { Mission } from '../data/missions';
import type { FollowUp } from '../engine/observationWindows';

export interface ObsSet {
  times: number[];
  fluxes: number[];
  sigmas: number[];
}

export class LabSession {
  readonly state = new LabState();
  private follow = new Map<string, FollowUp[]>();
  private listeners = new Set<() => void>();

  constructor() {
    const m = getMission('mission-1');
    this.state.status = 'loading';
    this.state.missionId = m.id;
    this.state.candidate = {
      periodDays: 4.2,
      radiusRatio: 0.1,
      inclinationDeg: 89.0,
      transitEpochDays: m.truth.transitEpochDays,
    };
    this.state.scrubT = m.truth.transitEpochDays;
  }

  mission(): Mission {
    return getMission(this.state.missionId);
  }

  observations(): ObsSet {
    const m = this.mission();
    const extra = this.follow.get(m.id) ?? [];
    const times = [...m.base.timesDays];
    const fluxes = [...m.base.fluxes];
    const sigmas = [...m.base.uncertainties];
    for (const f of extra) {
      times.push(...f.timesDays);
      fluxes.push(...f.fluxes);
      sigmas.push(...f.uncertainties);
    }
    const order = times.map((_, i) => i).sort((a, b) => (times[a] ?? 0) - (times[b] ?? 0));
    return {
      times: order.map((i) => times[i] ?? 0),
      fluxes: order.map((i) => fluxes[i] ?? 0),
      sigmas: order.map((i) => sigmas[i] ?? 0),
    };
  }

  addFollowUp(f: FollowUp): void {
    const m = this.mission();
    const list = this.follow.get(m.id) ?? [];
    list.push(f);
    this.follow.set(m.id, list);
    this.state.followUpCount += f.timesDays.length;
    this.state.emit();
  }

  selectMission(id: string): void {
    const m = getMission(id);
    this.state.setMission(id, m.truth.transitEpochDays);
  }

  onRerender(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  rerender(): void {
    this.listeners.forEach((fn) => fn());
  }
}

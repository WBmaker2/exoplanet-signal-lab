// 앱 상태: loading → exploring → fitting → scheduled → comparing + 기록 저장.
import type { CandidateParams } from './engine/types';
import { validateCandidate } from './engine/types';
import type { FitResult } from './engine/fitMetrics';
import type { WindowOption } from './engine/observationWindows';

export type Status = 'loading' | 'exploring' | 'fitting' | 'scheduled' | 'comparing';

export interface SavedCandidate {
  params: CandidateParams;
  fit: FitResult;
  observations: number;
  note: string;
}

export interface Verdict {
  choice: 'candidate' | 'hold' | null;
  reasons: string;
  limits: string;
}

export interface ExperimentRecord {
  schemaVersion: 1;
  appId: 'exoplanet-signal-lab';
  createdAt: string;
  scenarioId: string;
  parameters: CandidateParams;
  seed: number;
  observations: number;
  prediction: string;
  explanation: string;
}

const STORAGE_KEY = 'exoplanet-signal-lab/v1';

export class LabState {
  status: Status = 'loading';
  missionId = 'mission-1';
  candidate: CandidateParams = { periodDays: 4.2, radiusRatio: 0.1, inclinationDeg: 89.0, transitEpochDays: 1.0 };
  prediction = '';
  predictionDraft = '';
  saved: SavedCandidate[] = [];
  windows: WindowOption[] = [];
  followUpCount = 0;
  verdict: Verdict = { choice: null, reasons: '', limits: '' };
  scrubT = 1.0;
  errors: string[] = [];
  private listeners = new Set<() => void>();

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  emit(): void {
    this.listeners.forEach((fn) => fn());
  }

  setMission(id: string, defaultT0: number): void {
    clearPredictionDraft(this.missionId);
    this.missionId = id;
    this.saved = [];
    this.windows = [];
    this.followUpCount = 0;
    this.verdict = { choice: null, reasons: '', limits: '' };
    this.prediction = '';
    this.predictionDraft = '';
    this.candidate = { periodDays: 4.2, radiusRatio: 0.1, inclinationDeg: 89.0, transitEpochDays: defaultT0 };
    this.scrubT = defaultT0;
    this.status = 'exploring';
    this.emit();
  }

  updateCandidate(patch: Partial<CandidateParams>): void {
    this.candidate = { ...this.candidate, ...patch };
    this.errors = validateCandidate(this.candidate);
    if (this.status === 'exploring' || this.status === 'loading') this.status = 'fitting';
    this.emit();
  }

  markScheduled(): void {
    if (this.status === 'fitting' || this.status === 'exploring') this.status = 'scheduled';
    this.emit();
  }

  markCompared(): void {
    this.status = 'comparing';
    this.emit();
  }

  toRecord(scenarioId: string, seed: number, observations: number): ExperimentRecord {
    return {
      schemaVersion: 1,
      appId: 'exoplanet-signal-lab',
      createdAt: new Date().toISOString(),
      scenarioId,
      parameters: { ...this.candidate },
      seed,
      observations,
      prediction: this.prediction,
      explanation:
        this.verdict.choice === null
          ? ''
          : `결론:${this.verdict.choice === 'candidate' ? '행성 후보' : '추가 검증 필요'} / 근거:${this.verdict.reasons} / 한계:${this.verdict.limits}`,
    };
  }
}

const DRAFT_KEY = 'exoplanet-signal-lab/prediction-draft/v1';
const MISSION_KEY = 'exoplanet-signal-lab/selected-mission/v1';
const MISSION_IDS = new Set(['mission-1', 'mission-2', 'mission-3']);
interface PredictionState { missionId: string; prediction: string; draft: string }

export function loadSelectedMissionId(): string {
  try {
    const id = sessionStorage.getItem(MISSION_KEY) ?? '';
    return MISSION_IDS.has(id) ? id : 'mission-1';
  } catch {
    return 'mission-1';
  }
}

export function saveSelectedMissionId(missionId: string): void {
  try {
    if (MISSION_IDS.has(missionId)) sessionStorage.setItem(MISSION_KEY, missionId);
  } catch { /* 선택 미션 복구를 사용할 수 없는 환경 */ }
}

export function loadPredictionState(missionId: string): { prediction: string; draft: string } {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? 'null') as PredictionState | null;
    return parsed?.missionId === missionId && typeof parsed.prediction === 'string' && typeof parsed.draft === 'string'
      ? { prediction: parsed.prediction, draft: parsed.draft }
      : { prediction: '', draft: '' };
  } catch { return { prediction: '', draft: '' }; }
}

export function savePredictionDraft(missionId: string, draft: string): void {
  try {
    const current = loadPredictionState(missionId);
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ missionId, prediction: current.prediction, draft } satisfies PredictionState));
  } catch { /* 세션 저장을 사용할 수 없는 환경에서는 입력창 상태로만 유지 */ }
}

export function savePrediction(missionId: string, prediction: string): void {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ missionId, prediction, draft: prediction } satisfies PredictionState));
  } catch { /* 세션 저장을 사용할 수 없는 환경에서는 입력창 상태로만 유지 */ }
}

export function clearPredictionDraft(missionId: string): void {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? 'null') as PredictionState | null;
    if (!parsed || parsed.missionId === missionId) sessionStorage.removeItem(DRAFT_KEY);
  } catch { /* 세션 저장소 접근 불가 */ }
}

interface PersistedShape {
  records: ExperimentRecord[];
}

/** localStorage 저장 (불가 시 세션 메모리 + JSON 내보내기로 대체) */
export function loadPersisted(): ExperimentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersistedShape;
    return Array.isArray(parsed.records) ? parsed.records : [];
  } catch {
    return [];
  }
}

export function savePersisted(records: ExperimentRecord[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ records } satisfies PersistedShape));
    return true;
  } catch {
    return false;
  }
}

export function downloadJson(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

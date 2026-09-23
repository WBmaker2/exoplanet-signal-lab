// 관측 탭: 미션 3종 선택 + 예측 기록 (짧은 선택·숫자, 긴 글 강제 없음).
import { MISSIONS } from '../data/missions';
import type { LabSession } from './context';
import { el, notice } from './ui';
import { renderCurve } from './curve';
import type { CurveData } from './curve';

// 자산은 assets/생성-가이드.md 규칙으로 생성되어 src/assets/에 들어온다.
// 아직 없으면 빈 객체라 배너 없이 그대로 동작한다.
const MISSION_BANNERS = import.meta.glob('../assets/mission-*-banner.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function buildObserveTab(session: LabSession): HTMLElement {
  const { state } = session;
  const wrap = el('div', { class: 'ledger' });
  const cleanups: Array<() => void> = [];
  (wrap as HTMLElement & { __dispose?: () => void }).__dispose = () => cleanups.forEach((cleanup) => cleanup());
  const mission = session.mission();

  wrap.append(
    el('p', { class: 'statusline' },
      `1단계 · 현재 ‘${mission.title}’ 미션이 선택돼 있습니다. 아래 그래프를 보고 예측을 저장하세요. 다른 미션은 아래 선택기에서 바꿀 수 있습니다.`),
  );

  const selected = el('section', { class: 'plate selected-mission', 'aria-labelledby': 'selected-mission-title' });
  wrap.append(selected);
  selected.append(el('h2', { id: 'selected-mission-title' }, mission.title));
  selected.append(el('p', { class: 'statusline' }, `${mission.question} ${mission.blurb}`));
  const detailGraph = document.createElement('canvas');
  detailGraph.className = 'curve mission-detail-curve';
  detailGraph.setAttribute('role', 'img');
  detailGraph.setAttribute('aria-label', `시간(일)에 따른 정규화 밝기 그래프, ${mission.base.timesDays.length}개 합성 관측점. ${mission.question}`);
  selected.append(detailGraph);
  cleanups.push(drawWhenSized(detailGraph, { times: mission.base.timesDays, fluxes: mission.base.fluxes,
    sigmas: mission.base.uncertainties, model: mission.base.timesDays.map(() => 1), cursorT: Number.NaN }));
  selected.append(el('p', { class: 'statusline' }, '그래프는 시간(일)과 정규화 밝기를 보여 줍니다. 점의 흔들림은 관측 불확실성을 포함한 수업용 합성 자료입니다.'));
  const predBox = el('div', { class: 'plate' });
  predBox.append(el('h3', {}, `예측 기록 — ${mission.title}`));
  predBox.append(
    el('p', { class: 'hint statusline' },
      '그래프를 보고 예상 감소 깊이(%)와 반복 간격을 짧게 적으세요. 먼저 기록한 뒤 기준 관계와 비교합니다.'),
  );
  const row = el('div', { class: 'row' });
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'caret-signal';
  input.maxLength = 120;
  input.placeholder = '예상 통과 깊이 % 또는 반복 구간 (짧게)';
  input.value = state.predictionDraft;
  input.setAttribute('aria-label', '관측 전 예측 기록');
  input.style.flex = '1 1 16rem';
  const save = el('button', { class: 'btn signal', type: 'button' }, '예측 저장');
  const feedback = el('p', { class: 'statusline', role: 'status' });
  const savedDetails = el('div', { class: 'ledger' });
  input.addEventListener('input', () => session.setPredictionDraft(input.value));
  const showSavedDetails = () => {
    savedDetails.innerHTML = '';
    if (!state.prediction) return;
    savedDetails.append(notice('info', `저장된 예측: ${state.prediction} — 이후 조건을 바꾸어도 관측 전 기록은 유지됩니다.`));
    const depth = predictDepth(mission.truth.radiusRatio);
    savedDetails.append(el('p', { class: 'statusline' },
      `비교 기준: 균일한 별 표면을 행성 원반이 완전히 가리는 중심 통과에서는 가려진 면적 비가 k²이므로 정규화 밝기 F=1−k², 감소 깊이 δ=1−F=k²입니다 (k=행성 반지름/별 반지름). 이 가상 미션의 설계값은 약 ${(depth * 100).toFixed(2)}% 감소입니다. 가장자리 통과나 별 가장자리 어두워짐이 있으면 이 단순 관계와 차이가 납니다.`));
  };
  const saveIt = () => {
    const text = input.value.trim();
    if (!text) {
      feedback.textContent = '먼저 예상 깊이나 반복 간격을 입력해 주세요.';
      input.focus();
      return;
    }
    session.savePrediction(text);
    if (state.status === 'loading') state.status = 'exploring';
    feedback.textContent = '예측을 저장했습니다. 이제 후보 모형을 조절하며 비교할 수 있습니다.';
    showSavedDetails();
    state.emit();
  };
  save.addEventListener('click', saveIt);
  row.append(input, save);
  predBox.append(row, feedback);
  showSavedDetails();
  predBox.append(savedDetails);
  wrap.append(predBox);

  const selector = document.createElement('details');
  selector.className = 'mission-selector';
  const selectorSummary = document.createElement('summary');
  selectorSummary.textContent = `다른 미션 선택 · 현재: ${mission.title}`;
  selector.append(selectorSummary);
  const list = el('div', { class: 'missions', role: 'group', 'aria-label': '다른 미션 선택' });
  for (const m of MISSIONS) {
    if (m.id === mission.id) continue;
    const card = el('button', { class: 'mission', type: 'button', 'aria-pressed': 'false' });
    const bannerUrl = MISSION_BANNERS[`../assets/${m.id}-banner.webp`];
    if (bannerUrl) {
      const banner = el('div', { class: 'mission-banner-wrap' });
      const img = document.createElement('img');
      img.src = bannerUrl;
      img.alt = '';
      img.loading = 'lazy';
      img.className = 'mission-banner';
      banner.append(img, el('span', { class: 'mission-banner-tag', 'aria-hidden': 'true' }, '상상 일러스트'));
      card.append(banner);
    }
    card.append(el('b', {}, `${m.title} — ${m.question}`));
    card.append(el('span', {}, m.blurb));
    const thumb = document.createElement('canvas');
    thumb.className = 'curve mission-preview';
    thumb.setAttribute('aria-hidden', 'true');
    card.append(thumb);
    card.addEventListener('click', () => {
      session.selectMission(m.id);
      session.rerender();
    });
    list.append(card);
    cleanups.push(drawWhenSized(thumb, {
      times: m.base.timesDays,
      fluxes: m.base.fluxes,
      sigmas: m.base.uncertainties,
      model: m.base.timesDays.map(() => 1),
      cursorT: Number.NaN,
    }));
  }
  selector.append(list);
  wrap.append(selector);
  return wrap;
}

function drawWhenSized(canvas: HTMLCanvasElement, data: CurveData): () => void {
  let lastWidth = 0;
  let frame = 0;
  const draw = () => {
    frame = 0;
    const width = canvas.clientWidth;
    if (width < 1 || width === lastWidth) return;
    lastWidth = width;
    renderCurve(canvas, data);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };
  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
  observer?.observe(canvas.parentElement ?? canvas);
  window.addEventListener('resize', schedule);
  schedule();
  return () => {
    if (frame) cancelAnimationFrame(frame);
    observer?.disconnect();
    window.removeEventListener('resize', schedule);
  };
}

function predictDepth(k: number): number {
  return k * k;
}

// 후보 탭: 모형 조절(P/k/i/t0) · 곡선+잔차 · 시간 탐색(커브+3D+겹침 공유 t).
import { LIMITS } from '../engine/types';
import { modelFluxAt } from '../engine/overlap';
import { impactParameter, phaseRad, semiMajorAxisM } from '../engine/orbit';
import { predictCurve } from '../engine/lightCurve';
import { fit } from '../engine/fitMetrics';
import type { LabSession } from './context';
import { el, fmt, metric, notice } from './ui';
import { renderCurve } from './curve';
import { createOrbitScene } from './orbitScene';
import type { OrbitHandle } from './orbitScene';

export function buildFitTab(session: LabSession): HTMLElement {
  const { state } = session;
  const root = el('div', { class: 'lab-grid' });
  const disposers: Array<() => void> = [];
  (root as HTMLElement & { __dispose?: () => void }).__dispose = () => {
    disposers.forEach((d) => d());
  };

  // ---------- 왼쪽: 곡선 plate ----------
  const left = el('div', { class: 'plate' });
  left.append(
    el('div', { class: 'plate-head' },
      el('span', { class: 'tag' }, '밝기 곡선'),
      el('h2', {}, '관측 · 모형 · 잔차'),
    ),
  );
  const legend = el('div', { class: 'legend' });
  legend.append(
    el('span', {}, el('i', { class: 'sw obs' }), '관측 밝기 (점 + 오차 막대)'),
    el('span', {}, el('i', { class: 'sw model' }), '후보 모형 (파란 실선)'),
    el('span', {}, el('i', { class: 'sw resid' }), '잔차 = 관측 − 모형 (아래띠 점선)'),
  );
  left.append(legend);
  const canvas = document.createElement('canvas');
  canvas.className = 'curve';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', '정규화 밝기에 대한 시간 그래프. 표 형태의 수치 자료가 아래에 이어집니다.');
  left.append(canvas);
  const statusLine = el('p', { class: 'statusline' });
  left.append(statusLine);
  const metricsRow = el('div', { class: 'row' });
  left.append(metricsRow);

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = '수치표로 보기 (그래프와 같은 자료)';
  details.append(summary);
  const tableWrap = el('div', { class: 'table-wrap', style: 'max-height:16rem;overflow:auto' });
  details.append(tableWrap);
  left.append(details);

  // ---------- 오른쪽: 조건 ledger ----------
  const right = el('div', { class: 'plate' });
  right.append(
    el('div', { class: 'plate-head' },
      el('span', { class: 'tag' }, '모형 조건'),
      el('h2', {}, '후보 모형 조절'),
    ),
  );
  const ledger = el('div', { class: 'ledger' });
  right.append(ledger);
  const errBox = el('div', {});
  right.append(errBox);
  const controlRefs = new Map<string, { slider: HTMLInputElement; num: HTMLInputElement }>();

  const mission = session.mission();
  const [span0, span1] = mission.spanDays;

  function sliderField(
    key: 'periodDays' | 'radiusRatio' | 'inclinationDeg' | 'transitEpochDays',
    label: string,
    unit: string,
    min: number,
    max: number,
    step: number,
    hint: string,
  ): void {
    const field = el('div', { class: 'field' });
    field.append(el('label', { for: `f-${key}` }, `${label} (${unit})`));
    const row = el('div', { class: 'row' });
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = `f-${key}`;
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = String(state.candidate[key]);
    slider.setAttribute('aria-label', `${label} 슬라이더`);
    const num = document.createElement('input');
    num.type = 'number';
    num.min = String(min);
    num.max = String(max);
    num.step = String(step);
    num.value = String(state.candidate[key]);
    num.setAttribute('aria-label', `${label} 숫자 입력`);
    controlRefs.set(key, { slider, num });
    slider.addEventListener('input', () => {
      const v = Number(slider.value);
      if (Number.isFinite(v)) {
        num.value = slider.value;
        state.updateCandidate({ [key]: v } as Partial<typeof state.candidate>);
      }
    });
    num.addEventListener('change', () => {
      const v = Number(num.value);
      if (Number.isFinite(v)) {
        slider.value = num.value;
        state.updateCandidate({ [key]: v } as Partial<typeof state.candidate>);
      } else {
        num.value = String(state.candidate[key]);
      }
    });
    // 드래그 대체 조작: 슬라이더는 방향키로도 조절됩니다 (네이티브 지원).
    row.append(slider, num);
    field.append(row);
    field.append(el('p', { class: 'hint statusline' }, `${hint} · 유효 범위 ${min}–${max}${unit}`));
    ledger.append(field);
  }

  sliderField('periodDays', '공전 주기 P', '일', LIMITS.periodDays[0], LIMITS.periodDays[1], 0.1,
    '반복 간격이 여기에 맞는지 곡선에서 확인');
  sliderField('radiusRatio', '반지름 비 k = Rp/Rs', '비율', LIMITS.radiusRatio[0], LIMITS.radiusRatio[1], 0.002,
    '통과 깊이 ≈ k² (중심 통과 기준)');
  sliderField('inclinationDeg', '궤도 기울기 i', '°', LIMITS.inclinationDeg[0], LIMITS.inclinationDeg[1], 0.1,
    '90°=정면 통과, 작을수록 빗겨 지나감');
  sliderField('transitEpochDays', '통과 중심 시각 t0', '일', span0, span1, 0.1,
    '모형 감소가 관측 감소와 같은 시각에 오도록');

  const btnRow = el('div', { class: 'row' });
  const saveBtn = el('button', { class: 'btn signal', type: 'button', id: 'save-candidate' }, '후보 저장');
  const saveFeedback = el('p', { class: 'statusline', role: 'status' });
  saveBtn.addEventListener('click', () => {
    const obs = session.observations();
    const model = predictCurve(obs.times, mission.star, state.candidate);
    const f = fit(obs.fluxes, model, obs.sigmas, 4);
    state.saved.push({ params: { ...state.candidate }, fit: f, observations: obs.times.length, note: `저장 ${state.saved.length + 1}` });
    saveFeedback.textContent = `후보 ${state.saved.length}번을 ${obs.times.length}개 관측 자료로 저장했습니다. 비교 탭에서 확인할 수 있습니다.`;
    state.emit();
  });
  const resetBtn = el('button', { class: 'btn', type: 'button' }, '초기값으로');
  resetBtn.addEventListener('click', () => {
    state.updateCandidate({
      periodDays: 4.2,
      radiusRatio: 0.1,
      inclinationDeg: 89.0,
      transitEpochDays: mission.truth.transitEpochDays,
    });
  });
  btnRow.append(saveBtn, resetBtn);
  right.append(btnRow, saveFeedback);

  // ---------- 시간 탐색 + 3D + 겹침 ----------
  const scrubPlate = el('div', { class: 'plate', style: 'margin-top:1rem' });
  scrubPlate.append(
    el('div', { class: 'plate-head' },
      el('span', { class: 'tag' }, '시간 탐색'),
      el('h2', {}, '같은 시각 함께 보기'),
    ),
  );
  const scrubBox = el('div', { class: 'scrub' });
  const scrubRow = el('div', { class: 'row' });
  const scrub = document.createElement('input');
  scrub.type = 'range';
  const obs0 = session.observations();
  scrub.min = String(Math.min(...obs0.times));
  scrub.max = String(Math.max(...obs0.times));
  scrub.step = '0.05';
  scrub.value = String(state.scrubT);
  scrub.setAttribute('aria-label', '탐색 시각 t (일). 방향키로 미세 조절');
  const scrubNum = document.createElement('input');
  scrubNum.type = 'number';
  scrubNum.step = '0.05';
  scrubNum.value = String(state.scrubT);
  scrubNum.setAttribute('aria-label', '탐색 시각 t 숫자 입력 (일)');
  scrub.addEventListener('input', () => {
    const v = Number(scrub.value);
    if (Number.isFinite(v)) {
      state.scrubT = v;
      scrubNum.value = scrub.value;
      requestRefresh();
    }
  });
  scrubNum.addEventListener('change', () => {
    const v = Number(scrubNum.value);
    if (Number.isFinite(v)) {
      state.scrubT = v;
      scrub.value = scrubNum.value;
      requestRefresh();
    }
  });
  scrubRow.append(scrub, scrubNum);
  scrubBox.append(scrubRow);
  scrubBox.append(el('p', { class: 'hint statusline' }, '그래프 커서 · 3D 행성 위치 · 겹침 도식이 같은 t를 공유합니다.'));
  scrubPlate.append(scrubBox);

  const orbitWrap = el('div', { class: 'orbit-wrap', style: 'margin-top:0.6rem' });
  scrubPlate.append(orbitWrap);
  const orbit: OrbitHandle = createOrbitScene(orbitWrap);
  disposers.push(() => orbit.dispose());
  scrubPlate.append(
    el('p', { class: 'statusline' },
      '3D는 별·행성·관측 방향의 관계만 보여줍니다. 거리와 반지름은 시각적으로 확대됨. 파란 고리가 궤도, 검은 원뿔이 관측자 방향입니다.'),
  );
  const overlapBox = el('div', { class: 'fallback-2d', style: 'margin-top:0.6rem' });
  scrubPlate.append(overlapBox);
  right.append(scrubPlate);

  root.append(left, right);

  // ---------- 갱신 (DOM 재구성 없이 · 드래그 연타는 rAF로 묶는다) ----------
  let queued = false;
  function requestRefresh(): void {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      refresh();
    });
  }
  let lastCanvasWidth = 0;
  const refreshForWidth = () => {
    const width = canvas.clientWidth;
    if (width > 0 && width !== lastCanvasWidth) {
      lastCanvasWidth = width;
      requestRefresh();
    }
  };
  const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refreshForWidth);
  resizeObserver?.observe(canvas);
  window.addEventListener('resize', refreshForWidth);
  disposers.push(() => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', refreshForWidth);
  });
  function refresh(): void {
    const canvasWidth = canvas.clientWidth;
    if (canvasWidth > 0) lastCanvasWidth = canvasWidth;
    const m = session.mission();
    const obs = session.observations();
    const cand = state.candidate;
    controlRefs.forEach((refs, key) => {
      const value = String(cand[key as keyof typeof cand]);
      if (refs.slider.value !== value) refs.slider.value = value;
      if (refs.num.value !== value) refs.num.value = value;
    });
    const model = predictCurve(obs.times, m.star, cand);
    const dense = denseGrid(obs.times, 360);
    const denseM = predictCurve(dense, m.star, cand);
    renderCurve(canvas, {
      times: obs.times,
      fluxes: obs.fluxes,
      sigmas: obs.sigmas,
      model,
      cursorT: state.scrubT,
      denseT: dense,
      denseM,
    });

    const f = fit(obs.fluxes, model, obs.sigmas, 4);
    metricsRow.innerHTML = '';
    metricsRow.append(
      metric(f.kind === 'chi2' ? 'χ² (일치도)' : 'RMSE (일치도)', fmt(f.value, f.kind === 'chi2' ? 1 : 5)),
      metric(f.kind === 'chi2' ? 'χ²/자유도' : '자료점', f.kind === 'chi2' ? fmt(f.reduced, 2) : String(obs.times.length)),
      metric('자료점', `${obs.times.length}개${state.followUpCount > 0 ? ` (후속 ${state.followUpCount} 포함)` : ''}`),
    );

    const s = modelFluxAt(state.scrubT, m.star, cand.periodDays, cand.radiusRatio, cand.inclinationDeg, cand.transitEpochDays);
    const b = impactParameter(semiMajorAxisM(cand.periodDays, m.star.massKg), cand.inclinationDeg, m.star.radiusM);
    const where = !s.isFront ? '별 뒤 (감소 없음)' : s.flux < 0.999999 ? '별 앞 · 통과 중' : '별 앞 · 통과 바깥';
    statusLine.textContent =
      `t=${fmt(state.scrubT, 2)}일 · 모형 밝기 ${fmt(s.flux, 5)} · 투영거리 ${(s.distanceM / m.star.radiusM).toFixed(2)}Rs · ${where} · 충격 매개변수 b=${fmt(b, 2)}`;
    if (b + cand.radiusRatio > 1 && b - cand.radiusRatio < 1) {
      statusLine.textContent += ' · 스침 통과(중심이 별 가장자리 근처)';
    }

    orbit.update({
      phase: phaseRad(state.scrubT, cand.periodDays, cand.transitEpochDays),
      radiusRatio: cand.radiusRatio,
      inclinationDeg: cand.inclinationDeg,
      isFront: s.isFront,
      transiting: s.isFront && s.flux < 0.999999,
    });
    renderOverlap(overlapBox, s.distanceM / m.star.radiusM, cand.radiusRatio, s.isFront, s.flux);

    errBox.innerHTML = '';
    if (state.errors.length > 0) {
      errBox.append(notice('bad', `입력 오류: ${state.errors.join(' ')} 범위 안의 값으로 돌려주세요.`));
    }

    tableWrap.innerHTML = '';
    tableWrap.append(buildTable(obs.times, obs.fluxes, model));
  }

  disposers.push(state.subscribe(requestRefresh));
  requestRefresh();
  return root;
}

function denseGrid(times: number[], count: number): number[] {
  const lo = Math.min(...times);
  const hi = Math.max(...times);
  const out: number[] = [];
  for (let i = 0; i < count; i += 1) out.push(lo + ((hi - lo) * i) / (count - 1));
  return out;
}

function renderOverlap(box: HTMLElement, dRs: number, k: number, front: boolean, flux: number): void {
  box.innerHTML = '';
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 220 120');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `원 겹침 도식. 투영거리 ${dRs.toFixed(2)}별반지름, 모형 밝기 ${flux.toFixed(4)}`);
  const R = 48;
  const cx = 80;
  const cy = 60;
  const star = document.createElementNS(NS, 'circle');
  star.setAttribute('cx', String(cx));
  star.setAttribute('cy', String(cy));
  star.setAttribute('r', String(R));
  star.setAttribute('fill', '#fff7dd');
  star.setAttribute('stroke', '#16181a');
  star.setAttribute('stroke-width', '2');
  svg.append(star);
  const px = cx + Math.max(-2.6, Math.min(2.6, dRs)) * R * 0.85;
  const planet = document.createElementNS(NS, 'circle');
  planet.setAttribute('cx', String(px));
  planet.setAttribute('cy', String(cy));
  planet.setAttribute('r', String(Math.max(3, R * k)));
  planet.setAttribute('fill', front ? '#16181a' : 'none');
  planet.setAttribute('stroke', '#16181a');
  planet.setAttribute('stroke-width', '2');
  if (!front) planet.setAttribute('stroke-dasharray', '4 3');
  svg.append(planet);
  box.append(svg);
  box.append(
    Object.assign(document.createElement('p'), {
      className: 'statusline',
      textContent: front
        ? `앞쪽 반궤도: 겹친 만큼 어두워집니다 (F=${fmt(flux, 4)}).`
        : '뒤쪽 반궤도: 같은 위치라도 감소가 생기지 않습니다.',
    }),
  );
}

function buildTable(times: number[], fluxes: number[], model: number[]): HTMLElement {
  const table = document.createElement('table');
  table.className = 'data';
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');
  for (const [t, cls] of [['시간 (일)', 'num'], ['관측 밝기', 'num'], ['모형 밝기', 'num'], ['잔차', 'num']] as const) {
    const th = document.createElement('th');
    th.textContent = t;
    th.className = cls;
    th.scope = 'col';
    hr.append(th);
  }
  thead.append(hr);
  table.append(thead);
  const tbody = document.createElement('tbody');
  const stride = Math.max(1, Math.floor(times.length / 120));
  for (let i = 0; i < times.length; i += stride) {
    const tr = document.createElement('tr');
    const vals = [times[i] ?? 0, fluxes[i] ?? 1, model[i] ?? 1, (fluxes[i] ?? 1) - (model[i] ?? 1)];
    for (const v of vals) {
      const td = document.createElement('td');
      td.className = 'num';
      td.textContent = fmt(v, 4);
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

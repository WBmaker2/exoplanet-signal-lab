// 비교 · 일정 · 보고 탭 + 업데이트 내역.
import { canSelect, followUpInWindow, remainingBudget } from '../engine/observationWindows';
import { indistinguishable } from '../engine/fitMetrics';
import { loadPersisted, savePersisted, downloadJson } from '../state';
import type { ExperimentRecord } from '../state';
import type { LabSession } from './context';
import { el, fmt, metric, notice } from './ui';

export function buildCompareTab(session: LabSession): HTMLElement {
  const { state } = session;
  const wrap = el('div', { class: 'ledger' });
  wrap.append(
    el('p', { class: 'statusline' },
      '3단계 · 저장한 후보들을 나란히 놓고 잔차로 비교하세요. 허용 잔차를 만족하면 둘 다 인정됩니다.'),
  );
  if (state.saved.length === 0) {
    wrap.append(notice('',
      '아직 저장된 후보가 없습니다. 후보 탭에서 모형을 맞춘 뒤 ‘후보 저장 → 비교로’를 눌러보세요. 2개 이상 저장하면 구분 가능 여부를 알려드립니다.'));
    return wrap;
  }
  const tableWrap = el('div', { class: 'table-wrap' });
  const table = document.createElement('table');
  table.className = 'data';
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');
  for (const [t, num] of [['#', false], ['주기 P (일)', true], ['반지름 비 k', true], ['기울기 i (°)', true],
    ['t0 (일)', true], ['χ²/RMSE', true], ['적합도', true], ['', false]] as const) {
    const th = document.createElement('th');
    th.textContent = t;
    if (num) th.className = 'num';
    th.scope = 'col';
    hr.append(th);
  }
  thead.append(hr);
  table.append(thead);
  const tbody = document.createElement('tbody');
  state.saved.forEach((s, i) => {
    const tr = document.createElement('tr');
    const cells: string[] = [
      String(i + 1),
      fmt(s.params.periodDays, 2),
      fmt(s.params.radiusRatio, 4),
      fmt(s.params.inclinationDeg, 2),
      fmt(s.params.transitEpochDays, 2),
      s.fit.kind === 'chi2' ? fmt(s.fit.value, 1) : fmt(s.fit.value, 5),
      s.fit.kind === 'chi2' ? `χ²/자유도 ${fmt(s.fit.reduced, 2)}` : 'RMSE 기준',
    ];
    cells.forEach((c, ci) => {
      const td = document.createElement('td');
      td.textContent = c;
      if (ci > 0) td.className = 'num';
      tr.append(td);
    });
    const act = document.createElement('td');
    const load = el('button', { class: 'btn', type: 'button' }, '불러오기');
    load.addEventListener('click', () => {
      state.updateCandidate({ ...s.params });
      session.rerender();
    });
    const del = el('button', { class: 'btn danger', type: 'button' }, '삭제');
    del.addEventListener('click', () => {
      state.saved.splice(i, 1);
      state.emit();
      session.rerender();
    });
    const box = el('div', { class: 'row' });
    box.append(load, del);
    act.append(box);
    tr.append(act);
    tbody.append(tr);
  });
  table.append(tbody);
  tableWrap.append(table);
  wrap.append(tableWrap);

  if (state.saved.length >= 2) {
    const pairs: string[] = [];
    for (let a = 0; a < state.saved.length; a += 1) {
      for (let b = a + 1; b < state.saved.length; b += 1) {
        const fa = state.saved[a]?.fit;
        const fb = state.saved[b]?.fit;
        if (fa && fb && indistinguishable(fa, fb)) pairs.push(`${a + 1}번–${b + 1}번`);
      }
    }
    wrap.append(pairs.length > 0
      ? notice('info', `관측상 구분 불가: ${pairs.join(', ')} (|Δχ²|≤9, 교실용 기준). 두 후보를 함께 인정하고, 다음 관측으로 가를 이유를 일정 탭에서 찾으세요.`)
      : notice('', '저장된 후보들은 현재 자료에서 서로 구분됩니다. 그래도 작은 잔차는 일치도일 뿐, 존재의 증명이 아닙니다.'));
  } else {
    wrap.append(notice('', '후보를 하나 더 저장하면(조건을 바꿔 저장) 구분 가능 여부를 판정해 드립니다.'));
  }
  return wrap;
}

export function buildScheduleTab(session: LabSession): HTMLElement {
  const { state } = session;
  const mission = session.mission();
  const wrap = el('div', { class: 'ledger' });
  wrap.append(
    el('p', { class: 'statusline' },
      `4단계 · 다음 관측을 고르세요. 예산은 시간 창 ${3}개, 창마다 비용 1입니다. 선택한 창은 실제 신청처럼 취소할 수 없습니다.`),
  );
  const budgetLine = el('div', { class: 'row' });
  const remain = remainingBudget(state.windows);
  budgetLine.append(metric('남은 예산', `${remain} / 3 창`));
  budgetLine.append(metric('확보한 후속 자료', `${state.followUpCount}점`));
  wrap.append(budgetLine);

  const list = el('div', { class: 'missions' });
  for (const w of mission.windows) {
    const taken = state.windows.some((v) => v.id === w.id);
    const ok = canSelect(state.windows, w);
    const card = el('button', { class: 'mission', type: 'button', 'aria-pressed': taken ? 'true' : 'false' });
    if (taken || !ok) card.setAttribute('disabled', '');
    card.append(el('b', {}, w.label));
    card.append(el('span', {}, taken ? '신청됨 — 후속 자료에 반영되었습니다.' : `비용 ${w.cost}창 · 이 구간에 후속 관측점을 추가합니다.`));
    card.addEventListener('click', () => {
      if (!canSelect(state.windows, w)) return;
      state.windows.push(w);
      session.addFollowUp(followUpInWindow(w, mission.star, mission.truth, mission.sigma, mission.seed));
      state.markScheduled();
      session.rerender();
    });
    list.append(card);
  }
  wrap.append(list);
  if (remain === 0) {
    wrap.append(notice('good', '예산을 다 썼습니다. 후보 탭에서 후속 자료가 겹쳐진 곡선을 확인하고 보고 탭에서 결론을 기록하세요.'));
  } else if (state.windows.length > 0) {
    wrap.append(notice('info', '후속 자료가 곡선에 추가되었습니다. 후보 탭으로 돌아가 잔차가 어떻게 바뀌었는지 확인해 보세요.'));
  }
  return wrap;
}

export function buildReportTab(session: LabSession): HTMLElement {
  const { state } = session;
  const mission = session.mission();
  const obs = session.observations();
  const wrap = el('div', { class: 'ledger' });
  wrap.append(
    el('p', { class: 'statusline' },
      '5단계 · ‘행성 후보’와 ‘추가 검증 필요’를 구분해 보고합니다. 근거·대안·한계를 함께 적어야 기록이 됩니다.'),
  );

  const ev = el('div', { class: 'plate' });
  ev.append(el('h3', {}, '증거 묶음 (자동 정리)'));
  const rows = el('div', { class: 'row' });
  rows.append(
    metric('미션', mission.id),
    metric('관측 전 예측', state.prediction || '(없음)'),
    metric('저장 후보', `${state.saved.length}개`),
    metric('관측 창', `${state.windows.length}/3 사용`),
    metric('자료점', `${obs.times.length}개`),
  );
  ev.append(rows);
  ev.append(el('p', { class: 'statusline' },
    '작은 잔차는 후보 모형과 자료의 일치도입니다. 존재의 증명으로 적지 마세요.'));
  wrap.append(ev);

  const form = el('div', { class: 'plate' });
  form.append(el('h3', {}, '결론 기록'));
  const radios = el('div', { class: 'row', role: 'radiogroup', 'aria-label': '결론 선택' });
  for (const [v, label] of [['candidate', '행성 후보'], ['hold', '추가 검증 필요']] as const) {
    const lab = el('label', { class: 'row', style: 'gap:0.35rem' });
    const r = document.createElement('input');
    r.type = 'radio';
    r.name = 'verdict';
    r.value = v;
    r.checked = state.verdict.choice === v;
    r.addEventListener('change', () => {
      state.verdict.choice = v;
      state.emit();
    });
    lab.append(r, label);
    radios.append(lab);
  }
  form.append(radios);
  const reasonLabel = el('label', { for: 'v-reasons' }, '근거 (무엇이 후보를 지지하나요?)');
  const reasons = document.createElement('textarea');
  reasons.id = 'v-reasons';
  reasons.className = 'caret-signal';
  reasons.maxLength = 500;
  reasons.placeholder = '예: 4.2일 간격으로 같은 깊이의 감소가 4회 반복되고, 잔차에 구조가 남지 않음';
  reasons.value = state.verdict.reasons;
  reasons.addEventListener('input', () => {
    state.verdict.reasons = reasons.value;
  });
  const limitLabel = el('label', { for: 'v-limits' }, '대안과 한계 (무엇이 아직 불확실한가요?)');
  const limits = document.createElement('textarea');
  limits.id = 'v-limits';
  limits.className = 'caret-signal';
  limits.maxLength = 500;
  limits.placeholder = '예: 별 자체 변동·잡음 가능성, 한 번뿐인 감소는 주기 미확정, 스침 통과와 작은 행성 구분 불가';
  limits.value = state.verdict.limits;
  limits.addEventListener('input', () => {
    state.verdict.limits = limits.value;
  });
  form.append(reasonLabel, reasons, limitLabel, limits);

  const btnRow = el('div', { class: 'row' });
  const saveBtn = el('button', { class: 'btn signal', type: 'button', id: 'save-record' }, '기록 저장');
  const msg = el('p', { class: 'statusline', role: 'status' });
  saveBtn.addEventListener('click', () => {
    if (!state.verdict.choice) {
      msg.textContent = '결론을 먼저 고르세요 (행성 후보 / 추가 검증 필요).';
      return;
    }
    if (!state.verdict.reasons.trim() || !state.verdict.limits.trim()) {
      msg.textContent = '근거와 대안·한계를 한 줄씩이라도 적어야 저장됩니다.';
      return;
    }
    const rec: ExperimentRecord = state.toRecord(mission.id, mission.seed, obs.times.length);
    const all = loadPersisted();
    all.push(rec);
    const ok = savePersisted(all);
    msg.textContent = ok
      ? `저장됨 (${rec.createdAt}). 이 브라우저의 실험 기록 ${all.length}개.`
      : '브라우저 저장소를 쓸 수 없어 이번 세션 + JSON 내보내기만 가능합니다. 아래 버튼으로 내려받으세요.';
    renderRecords();
  });
  const expBtn = el('button', { class: 'btn', type: 'button' }, 'JSON 내보내기');
  expBtn.addEventListener('click', () => {
    const all = loadPersisted();
    const payload = all.length > 0 ? all : [state.toRecord(mission.id, mission.seed, obs.times.length)];
    downloadJson('exoplanet-signal-lab-records.json', JSON.stringify(payload, null, 2));
  });
  btnRow.append(saveBtn, expBtn);
  form.append(btnRow, msg);
  wrap.append(form);

  const hist = el('div', { class: 'plate' });
  hist.append(el('h3', {}, '이 브라우저의 실험 기록'));
  const recList = el('div', { class: 'ledger' });
  hist.append(recList);
  wrap.append(hist);

  function renderRecords(): void {
    recList.innerHTML = '';
    const all = loadPersisted();
    if (all.length === 0) {
      recList.append(el('p', { class: 'statusline' }, '아직 저장된 기록이 없습니다.'));
      return;
    }
    for (const r of all.slice(-8).reverse()) {
      recList.append(el('p', { class: 'statusline' },
        `${r.createdAt} · ${r.scenarioId} · P=${fmt(r.parameters.periodDays, 2)}일 k=${fmt(r.parameters.radiusRatio, 3)} i=${fmt(r.parameters.inclinationDeg, 1)}° · ${r.explanation}`));
    }
  }
  renderRecords();
  return wrap;
}

export interface ChangeEntry {
  date: string;
  text: string;
}

export const CHANGELOG: ChangeEntry[] = [
  { date: '2026-09-17', text: '최초 개발: P0 합성 3종 미션, 원궤도 후보 비교, 관측 예산 3창, 결론 기록.' },
];

/** 항상 찾을 수 있는 ‘업데이트 내역’ 다이얼로그 */
export function openHistory(): void {
  let dlg = document.querySelector<HTMLDialogElement>('dialog.changelog');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.className = 'changelog';
    dlg.setAttribute('aria-label', '업데이트 내역');
    const h = document.createElement('h2');
    h.textContent = '업데이트 내역';
    const list = document.createElement('ul');
    for (const c of CHANGELOG) {
      const li = document.createElement('li');
      li.textContent = `${c.date} — ${c.text}`;
      list.append(li);
    }
    const close = document.createElement('button');
    close.className = 'btn';
    close.textContent = '닫기';
    close.addEventListener('click', () => dlg?.close());
    const ret = document.createElement('button');
    ret.className = 'btn';
    ret.textContent = '실험으로 복귀';
    ret.addEventListener('click', () => dlg?.close());
    const row = document.createElement('div');
    row.className = 'row';
    row.append(close, ret);
    dlg.append(h, list, row);
    document.body.append(dlg);
  }
  dlg.showModal();
}

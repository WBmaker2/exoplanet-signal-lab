// 앱 셸: 첫 화면 질문+시작 버튼 → 5단계 토큰 바 + 탭. 밝은 교실 UI.
import './style.css';
import { LabSession } from './views/context';
import { buildObserveTab } from './views/observe';
import { buildFitTab } from './views/fit';
import { buildCompareTab, buildReportTab, buildScheduleTab, openHistory } from './views/decide';
import { el } from './views/ui';

type TabId = 'observe' | 'fit' | 'compare' | 'schedule' | 'report';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'observe', label: '관측' },
  { id: 'fit', label: '후보' },
  { id: 'compare', label: '비교' },
  { id: 'schedule', label: '일정' },
  { id: 'report', label: '보고' },
];

const session = new LabSession();
let started = false;
let active: TabId = 'observe';
let navigationMessage = '';

function boot(): void {
  const app = document.getElementById('app');
  if (!app) return;
  app.className = 'app';
  app.innerHTML = '';

  const skip = el('a', { class: 'skip', href: '#main' }, '본문으로 건너뛰기');
  app.append(skip);

  const bar = el('div', { class: 'tokenbar' });
  const inner = el('div', { class: 'tokenbar-inner' });
  const brand = el('div', { class: 'brand' }, '외계행성 신호 수사대');
  brand.append(el('small', {}, '밝기 곡선으로 행성 후보를 찾는다'));
  inner.append(brand);
  const steps = el('nav', { class: 'steps', 'aria-label': '실험 단계' });
  for (const t of TABS) {
    const b = el('button', { class: 'step', type: 'button', 'data-tab': t.id });
    b.textContent = t.label;
    if (t.id === active) b.setAttribute('aria-current', 'step');
    b.addEventListener('click', () => {
      const predictionNeedsSave = !session.state.prediction ||
        session.state.predictionDraft.trim() !== session.state.prediction;
      if (started && t.id !== 'observe' && predictionNeedsSave) {
        active = 'observe';
        navigationMessage = '다음 단계로 가기 전에 관측 탭에서 예측을 입력하고 저장해 주세요.';
        render();
        return;
      }
      navigationMessage = '';
      active = t.id;
      render();
    });
    steps.append(b);
  }
  const histBtn = el('button', { class: 'update-link', type: 'button' }, '업데이트 내역');
  histBtn.addEventListener('click', openHistory);
  steps.append(histBtn);
  inner.append(steps);
  bar.append(inner);
  app.append(bar);

  const sheet = el('main', { class: 'sheet', id: 'main', tabindex: '-1' });
  app.append(sheet);

  const foot = el('footer', { class: 'sheet footer' });
  foot.append(
    el('p', {},
      '모든 밝기 곡선은 수업용 합성 가상 자료입니다. 배경·행성 그림은 상상 삽화이며 관측 사진이 아닙니다. ' +
      '3D 장면은 궤도 기하 관계도이며 크기와 거리는 시각적으로 확대되었습니다. ' +
      '상상도·가상 데이터·실제 관측을 구분해 표시합니다. 참고: ',
    ),
  );
  const link = document.createElement('a');
  link.href = 'https://science.nasa.gov/citizen-science/exoplanet-watch/exoplanet-watch-resources/';
  link.textContent = 'NASA Exoplanet Watch 자료 (외부 학습 링크)';
  link.rel = 'noopener';
  foot.firstChild?.appendChild(link);
  app.append(foot);

  render();

  session.onRerender(() => render());
  session.state.subscribe(() => {
    const { prediction, predictionDraft } = session.state;
    if (prediction && predictionDraft.trim() === prediction) {
      navigationMessage = '';
      document.querySelector('.navigation-block-message')?.remove();
    }
    placeAura();
  });
}

function render(): void {
  const sheet = document.querySelector('main.sheet');
  if (!sheet) return;
  teardown(sheet);
  sheet.innerHTML = '';

  document.querySelectorAll('[data-tab]').forEach((b) => {
    if ((b as HTMLElement).dataset.tab === active) b.setAttribute('aria-current', 'step');
    else b.removeAttribute('aria-current');
  });

  if (!started) {
    sheet.append(startCard(session.mission().title));
    placeAura();
    return;
  }

  if (navigationMessage) {
    sheet.append(el('p', { class: 'notice bad navigation-block-message', role: 'status' }, navigationMessage));
  }

  const builders: Record<TabId, () => HTMLElement> = {
    observe: () => buildObserveTab(session),
    fit: () => buildFitTab(session),
    compare: () => buildCompareTab(session),
    schedule: () => buildScheduleTab(session),
    report: () => buildReportTab(session),
  };
  sheet.append(builders[active]());
  placeAura();
}

function teardown(sheet: Element): void {
  sheet.querySelectorAll('*').forEach((n) => {
    const d = (n as HTMLElement & { __dispose?: () => void }).__dispose;
    if (typeof d === 'function') {
      try {
        d();
      } catch {
        /* 정리 실패 무시 */
      }
    }
  });
}

/** 첫 화면: 질문 하나 + 시작 버튼 하나 */
function startCard(selectedMissionTitle: string): HTMLElement {
  const card = el('section', { class: 'start-card', 'aria-labelledby': 'q' });
  card.append(el('h1', { id: 'q' }, '별빛이 어두워졌다는 사실만으로, 행성이 있다고 말할 수 있을까?'));
  card.append(
    el('p', {},
      `현재 ‘${selectedMissionTitle}’ 미션이 선택돼 있습니다. 필요하면 미션을 바꾸고, 그래프의 밝기 변화가 행성 때문인지 자료를 살펴봅니다.`),
  );
  const steps = el('ol', { class: 'start-steps' });
  for (const label of ['선택된 미션을 확인하고 예측을 적습니다.', '관측 자료에 후보 모형을 맞춥니다.', '후보와 다음 관측 계획을 비교합니다.', '근거와 아직 모르는 점을 보고합니다.']) {
    steps.append(el('li', {}, label));
  }
  card.append(steps);
  const start = el('button', { class: 'btn primary signal', type: 'button', id: 'start-btn' }, '수사 시작하기');
  start.addEventListener('click', () => {
    started = true;
    if (session.state.status === 'loading') session.state.status = 'exploring';
    active = 'observe';
    render();
    document.getElementById('main')?.focus({ preventScroll: true });
  });
  card.append(start);
  card.append(
    el('p', { class: 'statusline' },
      '밝은 교실 화면 · 키보드로 조작 가능 · 모션 축소 설정에서는 정적 강조 테두리를 사용합니다.'),
  );
  return card;
}

/** 한 번에 하나의 다음 행동에만 gi-pulse 아우라 */
function placeAura(): void {
  document.querySelectorAll('.gi-pulse').forEach((n) => n.classList.remove('gi-pulse'));
  const { state } = session;
  let target: HTMLElement | null = null;
  if (!started) {
    target = document.getElementById('start-btn');
  } else if (active === 'observe' && (!state.prediction || state.predictionDraft.trim() !== state.prediction)) {
    target = document.querySelector('.plate .btn.signal');
  } else if (active === 'fit' && state.saved.length === 0) {
    target = document.getElementById('save-candidate');
  } else if (active === 'compare' && state.saved.length > 0 && state.windows.length === 0) {
    target = document.querySelector('[data-tab="schedule"]');
  } else if (active === 'schedule' && state.windows.length > 0 && !state.verdict.choice) {
    target = document.querySelector('[data-tab="report"]');
  } else if (active === 'report' && state.verdict.choice) {
    target = document.getElementById('save-record');
  }
  target?.classList.add('gi-pulse');
}

boot();

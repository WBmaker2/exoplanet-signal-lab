// 관측 탭: 미션 3종 선택 + 예측 기록 (짧은 선택·숫자, 긴 글 강제 없음).
import { MISSIONS } from '../data/missions';
import type { LabSession } from './context';
import { el, notice } from './ui';
import { renderCurve } from './curve';

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

  wrap.append(
    el('p', { class: 'statusline' },
      '1단계 · 별빛 곡선 3개 중 반복되는 감소 후보를 고르세요. 답을 보기 전, 예상 통과 깊이(%)를 먼저 적습니다.'),
  );

  const list = el('div', { class: 'missions', role: 'group', 'aria-label': '미션 선택' });
  for (const m of MISSIONS) {
    const card = el('button', {
      class: 'mission',
      type: 'button',
      'aria-pressed': state.missionId === m.id ? 'true' : 'false',
    });
    const bannerUrl = MISSION_BANNERS[`../assets/${m.id}-banner.webp`];
    if (bannerUrl) {
      const wrapBanner = el('div', { class: 'mission-banner-wrap' });
      const img = document.createElement('img');
      img.src = bannerUrl;
      img.alt = '';
      img.loading = 'lazy';
      img.className = 'mission-banner';
      wrapBanner.append(
        img,
        el('span', { class: 'mission-banner-tag', 'aria-hidden': 'true' }, '상상 일러스트'),
      );
      card.append(wrapBanner);
    }
    card.append(el('b', {}, `${m.title} — ${m.question}`));
    card.append(el('span', {}, m.blurb));
    const thumb = document.createElement('canvas');
    thumb.className = 'curve';
    thumb.setAttribute('aria-hidden', 'true');
    card.append(thumb);
    const flat = m.base.timesDays.map(() => 1);
    renderCurve(thumb, {
      times: m.base.timesDays,
      fluxes: m.base.fluxes,
      sigmas: m.base.uncertainties,
      model: flat,
      cursorT: Number.NaN,
    });
    card.addEventListener('click', () => {
      session.selectMission(m.id);
      session.rerender();
    });
    list.append(card);
  }
  wrap.append(list);

  const mission = session.mission();
  const predBox = el('div', { class: 'plate' });
  predBox.append(el('h3', {}, `예측 기록 — ${mission.title}`));
  predBox.append(
    el('p', { class: 'hint statusline' },
      '예: “반지름 비 0.1인 중심 통과라면 최대 약 1% 감소”. 조건·결과·해석은 따로 저장됩니다.'),
  );
  const row = el('div', { class: 'row' });
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'caret-signal';
  input.maxLength = 120;
  input.placeholder = '예상 통과 깊이 % 또는 반복 구간 (짧게)';
  input.value = state.prediction;
  input.setAttribute('aria-label', '관측 전 예측 기록');
  input.style.flex = '1 1 16rem';
  const save = el('button', { class: 'btn signal', type: 'button' }, '예측 저장');
  const saveIt = () => {
    state.prediction = input.value.trim();
    if (state.status === 'loading') state.status = 'exploring';
    state.emit();
    session.rerender();
  };
  save.addEventListener('click', saveIt);
  row.append(input, save);
  predBox.append(row);
  if (state.prediction) {
    predBox.append(notice('info', `저장된 예측: ${state.prediction} — 실행 뒤에 조건을 바꿔도 이 기록은 덮어쓰지 않습니다.`));
  }
  const depth = predictDepth(mission.truth.radiusRatio);
  predBox.append(
    el('p', { class: 'statusline' },
      `참고: 중심 완전 통과의 이상적 최대 감소는 1−F=k² 입니다. 이 미션의 설계 예시는 약 ${(depth * 100).toFixed(2)}%이며, 정답이 아니라 검증용 수치입니다.`),
  );
  wrap.append(predBox);
  return wrap;
}

function predictDepth(k: number): number {
  return k * k;
}

// 광도곡선 캔버스: 관측(점+오차) · 모형(실선) · 잔차(파선) · 커서. 색+모양+범례 병기.
export interface CurveData {
  times: number[];
  fluxes: number[];
  sigmas: number[];
  /** 관측 시각에서의 모형값 (잔차 계산용) */
  model: number[];
  cursorT: number;
  /** 매끈한 모형선을 위한 조밀 격자 (없으면 관측 격자로 그림) */
  denseT?: number[];
  denseM?: number[];
}

const INK = '#16181a';
const MODEL = '#1d4ed8';
const RESID = '#8a5a00';

export function renderCurve(canvas: HTMLCanvasElement, d: CurveData): void {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = Math.max(280, canvas.clientWidth || 720);
  const H = Math.round(W * 300 / 720);
  const RH = Math.round(W * 90 / 720); // 잔차 띠
  canvas.width = W * dpr;
  canvas.height = (H + RH) * dpr;
  canvas.style.aspectRatio = `${W} / ${H + RH}`;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H + RH);

  const padL = 56;
  const padR = 12;
  const padT = 24;
  const n = d.times.length;
  if (n === 0) return;
  let tMin = d.times[0] ?? 0;
  let tMax = d.times[0] ?? 1;
  let fMin = 1;
  let fMax = 1;
  for (let i = 0; i < n; i += 1) {
    const t = d.times[i] ?? 0;
    const f = d.fluxes[i] ?? 1;
    if (t < tMin) tMin = t;
    if (t > tMax) tMax = t;
    if (f < fMin) fMin = f;
    if (f > fMax) fMax = f;
  }
  for (const m of d.model) {
    if (m < fMin) fMin = m;
    if (m > fMax) fMax = m;
  }
  if (tMax - tMin < 1e-9) tMax = tMin + 1;
  const pad = Math.max(0.0008, (fMax - fMin) * 0.25);
  fMin -= pad;
  fMax += pad;

  const X = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
  const Y = (f: number) => padT + (1 - (f - fMin) / (fMax - fMin)) * (H - padT - 14);

  // 격자 + 축
  ctx.strokeStyle = '#e3ded1';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#4a545e';
  ctx.font = '12px ui-monospace, monospace';
  for (let g = 0; g <= 4; g += 1) {
    const f = fMin + ((fMax - fMin) * g) / 4;
    const y = Y(f);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillText(f.toFixed(4), 4, y + 3);
  }
  ctx.fillStyle = '#4a545e';
  ctx.fillText('시간 (일)', W - 70, H + RH - 4);
  ctx.fillText('정규화 밝기', padL, 12);

  // 오차 막대 (표본만 그려 혼잡 방지)
  ctx.strokeStyle = 'rgba(22,24,26,0.35)';
  const stride = Math.max(1, Math.floor(n / 220));
  ctx.beginPath();
  for (let i = 0; i < n; i += stride) {
    const t = d.times[i] ?? 0;
    const f = d.fluxes[i] ?? 1;
    const s = d.sigmas[i] ?? 0;
    const x = X(t);
    ctx.moveTo(x, Y(f - s));
    ctx.lineTo(x, Y(f + s));
  }
  ctx.stroke();

  // 관측점
  ctx.fillStyle = INK;
  for (let i = 0; i < n; i += stride) {
    const t = d.times[i] ?? 0;
    const f = d.fluxes[i] ?? 1;
    ctx.beginPath();
    ctx.arc(X(t), Y(f), 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 모형 곡선 (조밀 격자가 있으면 그걸로, 없으면 관측 격자로)
  ctx.strokeStyle = MODEL;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const lt = d.denseT ?? d.times;
  const lm = d.denseM ?? d.model;
  for (let i = 0; i < lt.length; i += 1) {
    const x = X(lt[i] ?? 0);
    const y = Y(lm[i] ?? 1);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 잔차 띠
  const rTop = H + 8;
  let rMax = 0.001;
  const resid: number[] = new Array(n);
  for (let i = 0; i < n; i += 1) {
    const r = (d.fluxes[i] ?? 1) - (d.model[i] ?? 1);
    resid[i] = r;
    const a = Math.abs(r);
    if (a > rMax) rMax = a;
  }
  const RY = (r: number) => rTop + RH / 2 - (r / rMax) * (RH / 2 - 6);
  ctx.strokeStyle = '#e3ded1';
  ctx.beginPath();
  ctx.moveTo(padL, RY(0));
  ctx.lineTo(W - padR, RY(0));
  ctx.stroke();
  ctx.strokeStyle = RESID;
  ctx.setLineDash([4, 3]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < n; i += stride) {
    const x = X(d.times[i] ?? 0);
    const y = RY(resid[i] ?? 0);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#4a545e';
  ctx.fillText('잔차 (관측−모형)', 4, rTop + 10);

  // 커서
  const cx = X(d.cursorT);
  if (cx >= padL && cx <= W - padR) {
    ctx.strokeStyle = '#b3261e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, 4);
    ctx.lineTo(cx, H + RH - 16);
    ctx.stroke();
  }
}

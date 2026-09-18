// 작은 DOM 도우미. 프레임워크 없이 일관된 어휘를 유지한다.

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: Array<Node | string>
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.append(c);
  return node;
}

export function notice(kind: 'info' | 'good' | 'bad' | '', text: string): HTMLElement {
  const cls = kind === '' ? 'notice' : `notice ${kind}`;
  return el('p', { class: cls, role: 'status' }, text);
}

export function metric(label: string, value: string): HTMLElement {
  const wrap = el('span', { class: 'row', style: 'gap:0.4rem' });
  wrap.append(el('span', { class: 'statusline' }, label));
  wrap.append(el('span', { class: 'metric' }, value));
  return wrap;
}

export function fmt(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return '—';
  return n.toFixed(digits);
}

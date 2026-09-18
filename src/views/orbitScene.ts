// 3D 궤도 장면: 별·행성·관측 방향의 관계만 보여준다.
// 밝기는 3D 픽셀로 계산하지 않으며, 거리·반지름은 시각적 확대로 표시한다.
import * as THREE from 'three';

export interface OrbitSnapshot {
  phase: number;
  radiusRatio: number;
  inclinationDeg: number;
  isFront: boolean;
  transiting: boolean;
}

export interface OrbitHandle {
  webgl: boolean;
  update: (s: OrbitSnapshot) => void;
  dispose: () => void;
}

const DEG = Math.PI / 180;

export function createOrbitScene(container: HTMLElement): OrbitHandle {
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    // MSAA 없이 · 저전력 기기에서도 한 프레임 안에 끝나도록 요구를 낮춘다.
    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
  } catch {
    renderer = null;
  }
  if (!renderer) {
    container.innerHTML = '';
    const note = document.createElement('p');
    note.className = 'statusline';
    note.textContent =
      '3D를 표시할 수 없어 2D 도식으로 대체합니다. 학습 핵심(통과 기하)은 아래 겹침 도식과 표로 동일하게 확인할 수 있습니다.';
    container.append(note);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 360 150');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', '2D 궤도·겹침 대체 도식');
    svg.innerHTML =
      '<circle cx="90" cy="75" r="44" fill="#fff7dd" stroke="#16181a" stroke-width="2"/>' +
      '<circle cx="90" cy="75" r="10" fill="#16181a"/>' +
      '<ellipse cx="250" cy="75" rx="90" ry="26" fill="none" stroke="#1d4ed8" stroke-width="2"/>' +
      '<circle cx="250" cy="75" r="14" fill="#fff7dd" stroke="#16181a" stroke-width="2"/>' +
      '<circle cx="292" cy="66" r="6" fill="#16181a"/>';
    container.append(svg);
    return { webgl: false, update: () => undefined, dispose: () => undefined };
  }

  const W = 640;
  const H = 400;
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
  container.innerHTML = '';
  container.append(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = 'auto';
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', '별과 행성 궤도의 3차원 도식. 거리와 크기는 시각적으로 확대됨.');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f4f1e8');
  const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
  camera.position.set(0, 2.4, 7.2);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const starLight = new THREE.PointLight(0xffffff, 60, 0, 1.8);
  starLight.position.set(0, 0, 0);
  scene.add(starLight);

  const star = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 28),
    new THREE.MeshBasicMaterial({ color: '#ffdf9e' }),
  );
  scene.add(star);

  const planetMat = new THREE.MeshStandardMaterial({ color: '#22303c', roughness: 0.9, metalness: 0 });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(0.22, 28, 20), planetMat);
  scene.add(planet);

  // 관측자 방향 (+z): 원뿔 + 막대
  const obsGroup = new THREE.Group();
  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8),
    new THREE.MeshBasicMaterial({ color: '#16181a' }),
  );
  rod.rotation.x = Math.PI / 2;
  rod.position.z = 4.6;
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.34, 16),
    new THREE.MeshBasicMaterial({ color: '#16181a' }),
  );
  cone.rotation.x = -Math.PI / 2;
  cone.position.z = 3.7;
  obsGroup.add(rod, cone);
  scene.add(obsGroup);

  const A_VIS = 3;
  let orbitLine: THREE.Line | null = null;

  function rebuildOrbit(inclDeg: number): void {
    if (orbitLine) {
      scene.remove(orbitLine);
      orbitLine.geometry.dispose();
    }
    const pts: THREE.Vector3[] = [];
    const cosI = Math.cos(inclDeg * DEG);
    const sinI = Math.sin(inclDeg * DEG);
    for (let s = 0; s <= 128; s += 1) {
      const ph = (s / 128) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(A_VIS * Math.sin(ph), A_VIS * Math.cos(ph) * cosI, A_VIS * Math.cos(ph) * sinI),
      );
    }
    orbitLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: '#1d4ed8' }),
    );
    scene.add(orbitLine);
  }

  let lastIncl = Number.NaN;
  let last: OrbitSnapshot | null = null;
  let lastW = 0;
  function paint(s: OrbitSnapshot): void {
    const cosI = Math.cos(s.inclinationDeg * DEG);
    const sinI = Math.sin(s.inclinationDeg * DEG);
    planet.position.set(
      A_VIS * Math.sin(s.phase),
      A_VIS * Math.cos(s.phase) * cosI,
      A_VIS * Math.cos(s.phase) * sinI,
    );
    planetMat.emissive.set(s.transiting ? '#7a1f1a' : '#000000');
    planetMat.emissiveIntensity = s.transiting ? 0.55 : 0;
    renderer?.render(scene, camera);
  }
  const ro = new ResizeObserver(() => {
    const w = Math.round(container.clientWidth) || W;
    if (w === lastW) return; // 같은 크기 재설정은 루프 경고만 만든다
    lastW = w;
    // 버퍼 크기를 바꾸면 그려진 내용이 지워지므로 즉시 다시 그린다.
    renderer?.setSize(w, (w * H) / W, false);
    if (last) paint(last);
  });
  ro.observe(container);

  return {
    webgl: true,
    update(s: OrbitSnapshot) {
      if (s.inclinationDeg !== lastIncl) {
        rebuildOrbit(s.inclinationDeg);
        lastIncl = s.inclinationDeg;
        const r = Math.max(0.12, Math.min(0.5, s.radiusRatio * 2.2));
        planet.geometry.dispose();
        planet.geometry = new THREE.SphereGeometry(r, 28, 20);
      }
      last = s;
      paint(s);
    },
    dispose() {
      ro.disconnect();
      renderer?.dispose();
    },
  };
}

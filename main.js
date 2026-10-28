const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const header = $('#siteHeader');
const menuButton = $('#menuButton');
const mobileNav = $('#mobileNav');

const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', setHeader, { passive: true });
setHeader();

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('open', !open);
});
$$('#mobileNav a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
}));

$('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .13 });
$$('.reveal').forEach(item => revealObserver.observe(item));

const formatNumber = value => Math.round(value).toLocaleString('en-GB');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.target || 0);
    const prefix = node.dataset.prefix || '';
    const suffix = node.dataset.suffix || '';
    const start = performance.now();
    const render = now => {
      const progress = Math.min((now - start) / 1300, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${prefix}${formatNumber(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    countObserver.unobserve(node);
  });
}, { threshold: .5 });
$$('.counter').forEach(item => countObserver.observe(item));

$$('.screen-tab').forEach(tab => tab.addEventListener('click', () => {
  const key = tab.dataset.screen;
  $$('.screen-tab').forEach(button => {
    const active = button === tab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  $$('.screen-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
}));

const leadRange = $('#leadRange');
const valueRange = $('#valueRange');
const lostRange = $('#lostRange');
const calculate = () => {
  const leads = Number(leadRange.value);
  const value = Number(valueRange.value);
  const lost = Number(lostRange.value);
  $('#leadOutput').textContent = leads.toLocaleString('en-GB');
  $('#valueOutput').textContent = `£${value.toLocaleString('en-GB')}`;
  $('#lostOutput').textContent = `${lost}%`;
  const recoveredRevenue = leads * (lost / 100) * .2 * value * 12;
  const adminSaving = leads * .2 * 15 * 12;
  $('#revenueOutput').textContent = `£${Math.round(recoveredRevenue).toLocaleString('en-GB')}`;
  $('#savingOutput').textContent = `£${Math.round(adminSaving).toLocaleString('en-GB')}`;
};
[leadRange, valueRange, lostRange].forEach(range => range?.addEventListener('input', calculate));
calculate();

const storyTrack = $('#storyTrack');
const stories = $$('.story-card', storyTrack);
const storyDots = $('#storyDots');
let storyIndex = 0;
let storyTimer;

const visibleStories = () => window.innerWidth <= 720 ? 1 : window.innerWidth <= 1020 ? 2 : 3;
const maxStoryIndex = () => Math.max(0, stories.length - visibleStories());
const updateStories = () => {
  storyIndex = Math.min(storyIndex, maxStoryIndex());
  const cardWidth = stories[0]?.getBoundingClientRect().width || 0;
  storyTrack.style.transform = `translateX(-${storyIndex * (cardWidth + 16)}px)`;
  $$('button', storyDots).forEach((dot, index) => dot.classList.toggle('active', index === storyIndex));
};
const buildDots = () => {
  storyDots.innerHTML = '';
  for (let i = 0; i <= maxStoryIndex(); i += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to story ${i + 1}`);
    dot.addEventListener('click', () => { storyIndex = i; updateStories(); restartStories(); });
    storyDots.appendChild(dot);
  }
  updateStories();
};
const moveStories = direction => {
  storyIndex += direction;
  if (storyIndex > maxStoryIndex()) storyIndex = 0;
  if (storyIndex < 0) storyIndex = maxStoryIndex();
  updateStories();
};
const restartStories = () => {
  clearInterval(storyTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    storyTimer = setInterval(() => moveStories(1), 6500);
  }
};
$('#storyPrev')?.addEventListener('click', () => { moveStories(-1); restartStories(); });
$('#storyNext')?.addEventListener('click', () => { moveStories(1); restartStories(); });
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildDots, 120);
});
buildDots();
restartStories();

function initialiseFallbackCanvas() {
  const canvas = $('#routeCanvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const context = canvas.getContext('2d');
  const points = [
    [.58, .18], [.66, .27], [.73, .19], [.82, .31], [.62, .42],
    [.76, .50], [.88, .45], [.67, .62], [.80, .70], [.91, .64],
    [.60, .79], [.73, .86], [.87, .82]
  ];
  const links = [[0,1],[1,2],[1,4],[2,3],[3,6],[4,5],[4,7],[5,6],[5,8],[6,9],[7,8],[7,10],[8,9],[8,11],[9,12],[10,11],[11,12]];
  let width = 0;
  let height = 0;
  let frame = 0;
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const draw = time => {
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;
    links.forEach(([from, to], index) => {
      const a = points[from];
      const b = points[to];
      context.strokeStyle = 'rgba(247,249,252,.12)';
      context.beginPath();
      context.moveTo(a[0] * width, a[1] * height);
      context.lineTo(b[0] * width, b[1] * height);
      context.stroke();
      const progress = ((time * .00008) + index / links.length) % 1;
      const x = (a[0] + (b[0] - a[0]) * progress) * width;
      const y = (a[1] + (b[1] - a[1]) * progress) * height;
      context.fillStyle = '#1d5cff';
      context.beginPath();
      context.arc(x, y, 2.3, 0, Math.PI * 2);
      context.fill();
    });
    points.forEach(([x, y], index) => {
      const pulse = 3 + Math.sin(time * .002 + index) * 1.2;
      context.fillStyle = '#f7f9fc';
      context.beginPath();
      context.arc(x * width, y * height, 2.2, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = 'rgba(29,92,255,.28)';
      context.beginPath();
      context.arc(x * width, y * height, pulse * 2.2, 0, Math.PI * 2);
      context.stroke();
    });
    frame = requestAnimationFrame(draw);
  };
  const hero = $('.hero');
  const visibility = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !frame) frame = requestAnimationFrame(draw);
    if (!entries[0].isIntersecting && frame) { cancelAnimationFrame(frame); frame = 0; }
  });
  visibility.observe(hero);
  window.addEventListener('resize', resize);
  resize();
  frame = requestAnimationFrame(draw);
}

function initialiseThreeRoutes(THREE) {
  const canvas = $('#routeCanvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, .1, 100);
  camera.position.set(0, 0, 10);
  const nodes = [
    [-1.5,3.1,0],[-.2,2.2,.2],[1.2,3,.1],[2.6,1.9,-.2],[-1.1,.8,.1],
    [1,.3,.25],[3,.7,0],[-.7,-1.3,.1],[1.4,-1.4,.2],[3.2,-.8,-.1],
    [-1.2,-3,.1],[.9,-3.1,.2],[3,-2.6,0]
  ];
  const links = [[0,1],[1,2],[1,4],[2,3],[3,6],[4,5],[4,7],[5,6],[5,8],[6,9],[7,8],[7,10],[8,9],[8,11],[9,12],[10,11],[11,12]];
  const group = new THREE.Group();
  group.position.x = 2.8;
  scene.add(group);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xf7f9fc, transparent: true, opacity: .14 });
  links.forEach(pair => {
    const geometry = new THREE.BufferGeometry().setFromPoints(pair.map(index => new THREE.Vector3(...nodes[index])));
    group.add(new THREE.Line(geometry, lineMaterial));
  });
  const nodeGeometry = new THREE.SphereGeometry(.055, 12, 12);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf7f9fc });
  nodes.forEach(point => {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(...point);
    group.add(node);
  });
  const vehicleGeometry = new THREE.BoxGeometry(.13, .09, .09);
  const vehicleMaterial = new THREE.MeshBasicMaterial({ color: 0x1d5cff });
  const vehicles = links.slice(0, 12).map((pair, index) => {
    const mesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
    group.add(mesh);
    return { mesh, pair, offset: index / 12, speed: .045 + (index % 3) * .008 };
  });
  const grid = new THREE.GridHelper(11, 18, 0x1d5cff, 0x1d5cff);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(2.8, 0, -1.2);
  grid.material.transparent = true;
  grid.material.opacity = .035;
  scene.add(grid);
  let visible = true;
  const clock = new THREE.Clock();
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const loop = () => {
    requestAnimationFrame(loop);
    if (!visible) return;
    const time = clock.getElapsedTime();
    vehicles.forEach(vehicle => {
      const progress = (time * vehicle.speed + vehicle.offset) % 1;
      const start = nodes[vehicle.pair[0]];
      const end = nodes[vehicle.pair[1]];
      vehicle.mesh.position.set(
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
        start[2] + (end[2] - start[2]) * progress
      );
      vehicle.mesh.rotation.z = Math.atan2(end[1] - start[1], end[0] - start[0]);
    });
    group.rotation.z = Math.sin(time * .08) * .02;
    renderer.render(scene, camera);
  };
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe($('.hero'));
  window.addEventListener('resize', resize);
  resize();
  loop();
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js')
    .then(initialiseThreeRoutes)
    .catch(initialiseFallbackCanvas);
}

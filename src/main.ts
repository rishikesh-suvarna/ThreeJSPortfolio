import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// * LIGHTS
const pointLight = new THREE.PointLight(0xFFFFFF, 1);
pointLight.position.set(10, 10, 10);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(pointLight, ambientLight);


// * HELPERS
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);


// * LOADING BACKGROUND TEXTURES
const spaceTexture = new THREE.TextureLoader().load('assets/space-milky-way.jpg');
const moonMap = new THREE.TextureLoader().load('assets/moon.jpg');
const moonNormalMap = new THREE.TextureLoader().load('assets/normal.jpg');
const earthMap = new THREE.TextureLoader().load('assets/earth-night.jpg');
const earthNormalMap = new THREE.TextureLoader().load('assets/earth-normal.jpg');
const cometMap = new THREE.TextureLoader().load('assets/comet.jpg');
const starsMap = new THREE.TextureLoader().load('assets/stars.jpg');

// * SETTING BACKGROUND TEXTURES
scene.background = spaceTexture;


// * MOON
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonMap,
    normalMap: moonNormalMap,
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.x = -10;


// * EARTH
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(20, 12, 12),
  new THREE.MeshStandardMaterial({
    map: earthMap,
    normalMap: earthNormalMap,
  })
);
scene.add(earth);
earth.position.y = 0;
earth.position.z = 0;
earth.position.x = 0;

// * COMET
const comet = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: cometMap,
    normalMap: moonNormalMap,
  })
);

scene.add(comet);
comet.position.set(-50, 0, -50);


// * STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 12, 12);
  const material = new THREE.MeshStandardMaterial({
    map: starsMap,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill(null).map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill(null).forEach(addStar);


// * SCROLL ANIMATION
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // earth.rotation.x += 0.005;
  // earth.rotation.y += 0.0075;
  // earth.rotation.z += 0.005;

  camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;


// * ANIMATION
function animate() {
  requestAnimationFrame(animate);
  // moon.rotation.x += 0.005;
  earth.rotation.y += 0.0005;

  // Move the comet
  comet.position.x += 0.5;
  comet.position.z += 0.5;

  if (comet.position.x > 50) {
    const randomX = -50 + Math.random() * 100; // Random X between -50 and 50
    const randomY = -25 + Math.random() * 50; // Random Y between -25 and 25
    const randomZ = -50 + Math.random() * 100; // Random Z between -50 and 50
    comet.position.set(randomX, randomY, randomZ);
  }

  renderer.render(scene, camera);
}
animate();
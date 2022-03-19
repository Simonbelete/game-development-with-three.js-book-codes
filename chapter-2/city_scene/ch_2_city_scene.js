import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd7f0f7);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

const boxGeometry = new THREE.BoxGeometry();
const boxMatrix = new THREE.Matrix4().makeTranslation(0, 0.5, 0);
boxGeometry.applyMatrix4(boxMatrix);
const boxMaterial = new THREE.MeshBasicMaterial();
boxMaterial.color = new THREE.Color('#397c8d')
// const cube = new THREE.Mesh(boxGeometry, boxMaterial);

function generateRandomColorHex() {
  // return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
  var value = Math.random() * 0xFF | 0;
  var grayscale = (value << 16) | (value << 8) | value;
  var color = '#' + grayscale.toString(16);
  return color;
}

for (let i = 0; i < 100; i++) {
  const buildingMaterial = boxMaterial.clone();
  buildingMaterial.color = new THREE.Color(generateRandomColorHex());
  const building = new THREE.Mesh(boxGeometry.clone(), buildingMaterial);
  building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
  building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
  building.scale.x = Math.random() * 50 + 10;
  building.scale.y = Math.random() * building.scale.x * 8 + 8;
  building.scale.z = building.scale.x;
  scene.add(building);
}

// Floor
const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({color: 0x9db3b5, overdraw: true});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -90 * Math.PI / 180;
scene.add(floorMesh)

// Render
const renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

camera.position.y = 400;
camera.position.z = 400;
camera.rotation.x = -45 * Math.PI / 180; // Tilt the camera to 45deg

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();


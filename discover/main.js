import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

const geo = new THREE.IcosahedronGeometry(1, 8);
const mat = new THREE.MeshStandardMaterial({ color: 0xffffff,flatShading: true});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);


const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.0004;
  renderer.render(scene, camera);
}
animate();
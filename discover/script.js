import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Initialisation de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // Ajouter un fond à la scène
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableZoom = false;

// Ajouter des lumières à la scène
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière ambiante plus faible
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Charger le fichier .glb
const loader = new GLTFLoader();
loader.load(
    'planets/earth.glb', // Remplacez par le chemin vers votre fichier .glb
    function (gltf) {
        const model = gltf.scene;

        // Centrer le modèle
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Déplacer le modèle à l'origine

        // Mettre à l'échelle le modèle si nécessaire
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 1 / size;
        model.scale.set(scale, scale, scale);

        scene.add(model);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Position de la caméra
camera.position.set(0, 2, 5);
camera.lookAt(0, 1, 0); // Orienter la caméra vers l'origine

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    // Rotation de la scène pour visualiser le modèle sous différents angles
    scene.rotation.y += 0.002;

    renderer.render(scene, camera);
}

animate();
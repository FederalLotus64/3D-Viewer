import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

let scene, camera, controls, renderer, object;

Initialize();
setTimeout(() => { Animate(); }, 500);

function Initialize() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.x = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    document.querySelector("main").appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI/2;
    controls.maxPolarAngle = Math.PI/2;
    controls.update();

    let dirlight = new THREE.DirectionalLight(0xF1DAA4, 1, 100);
    dirlight.castShadow = true;
    scene.add(dirlight);

    let amblight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(amblight);    

    window.addEventListener('resize', onWindowResize);   
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function LoadOBJ(path) {
    let loader = new OBJLoader();
    loader.load(
        path, 
        (obj) => { 
            obj.scale.set(1, 1, 1);
            object = obj; 
            scene.add(obj);
        }, 
        (xhr) => {},
        (err) => { console.error("Could not load " + path); }
    );
}

function LoadOBJMTL(path, url) {
    var mtlLoader = new MTLLoader();
    mtlLoader.load("models/" + url, function( materials ) {
        materials.preload();
        let loader = new OBJLoader();
        loader.setMaterials(materials);
        loader.load(
            "models/" + path, 
            (obj) => { 
                object = obj; 
                scene.add(obj);
            }, 
            (xhr) => {},
            (err) => { console.error("Could not load " + path); }
        );
    });
}

function Animate() {
	requestAnimationFrame(Animate);
	renderer.render(scene, camera);
}

document.querySelector("#OBJ").oninput = () => {
    let file = document.querySelector("#OBJ").files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        LoadOBJ(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

document.querySelector("button").onclick = () => {
    let box = new THREE.Box3();
    box.setFromObject(object);
    camera.position.x = 3*(box.max.y - box.min.y);
}

let inputs = document.querySelectorAll("input");
inputs[2].onchange = () => {
    object.position.x = inputs[2].value;
}
inputs[3].onchange = () => {
    object.position.y = inputs[3].value;
}
inputs[4].onchange = () => {
    object.position.z = inputs[4].value;
}
inputs[5].oninput = () => {
    object.rotation.x = (inputs[5].value)*Math.PI/180;
}
inputs[6].oninput = () => {
    object.rotation.y = (inputs[6].value)*Math.PI/180;
}
inputs[7].oninput = () => {
    object.rotation.z = (inputs[7].value)*Math.PI/180;
}
inputs[8].onchange = () => {
    object.scale.x = inputs[8].value;
}
inputs[9].onchange = () => {
    object.scale.y = inputs[9].value;
}
inputs[10].onchange = () => {
    object.scale.z = inputs[10].value;
}
inputs[11].onchange = () => {
    camera.fov = inputs[11].value;
    camera.updateProjectionMatrix();
}
inputs[12].onchange = () => {
    camera.far = inputs[12].value;
}
inputs[13].onchange = () => {
    camera.position.x = inputs[13].value;
}
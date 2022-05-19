import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
//scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//lights
const pointlight = new THREE.PointLight(0xffffff)
const arealight = new THREE.RectAreaLight(0xffffff)
const sun = new THREE.AmbientLight(0xffffff)
sun.intensity =0.5
//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//postprocessing
//this.composer = new EffectComposer(this._threejs);
//this.composer.addPass(new RenderPass(this._scene, this._camera));
//this.composer.addPass(new UnrealBloomPass({x: 1024, y: 1024}, 2.0, 0,0, 0,75));

//renderer.physicallyCorrectLights = true 	// Correct physical light illumination 
renderer.outputEncoding = THREE.sRGBEncoding	// use sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping  //aces standard 
renderer.toneMappingExposure = 0.3;		// Tone mapping exposure
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render(scene,camera);
//GLTFLoader
const loader = new GLTFLoader()
loader.load('assets/...', function(gltf){
  console.log(gltf)
}, function(xhr){
  console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function (error){
  console.log('An error occurred')
})

//object
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xff6347,});

//test torus
pointlight.position.set(5,5,5)

scene.add(pointlight, sun)
const controls = new OrbitControls(camera, renderer.domElement);
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
	
  controls.update();

  renderer.render(scene, camera);
}
animate()

// Helpers

const lightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)


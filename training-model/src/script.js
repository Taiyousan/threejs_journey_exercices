import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Sizes
 */
const sizes = {
    width : canvas.clientWidth,
    height : canvas.clientHeight
}
console.log(sizes)

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const cubeGeo = new THREE.BoxGeometry()
const cubeMat = new THREE.MeshBasicMaterial({
    color: 'white',
    wireframe: true
})
const cube = new THREE.Mesh(
    cubeGeo,
    cubeMat
)
scene.add(cube)


window.addEventListener('resize', () =>
{
    // Update sizes
    

    sizes.width = window.innerWidth * 0.6
    sizes.height =  window.innerHeight;
    console.log(sizes)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */

// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
// Créer le rendu WebGL
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


  // Update controls
  controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

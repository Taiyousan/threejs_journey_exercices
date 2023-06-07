import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import gsap from 'gsap'

/**
 * Debug
 */

const parameters = {
    color: [255, 0, 0] 
  };
  
 
//   const gui = new dat.GUI();
//   const colorControlL = gui.addColor(parameters, 'color').name('JoyCon L');
  
//   // Écouter les modifications de la couleur
//   colorControlL.onChange((value) => {
//     // Convertir la valeur hexadécimale en RGB
//     const r = (value[0]);
//     const g = (value[1]);
//     const b = (value[2]);
//     console.log('gui ' + r, g, b)

//     changeColorL(r, g, b)
//   });

//   const colorControlR = gui.addColor(parameters, 'color').name('JoyCon R');
  
//   // Écouter les modifications de la couleur
//   colorControlR.onChange((value) => {
//     // Convertir la valeur hexadécimale en RGB
//     const r = (value[0]);
//     const g = (value[1]);
//     const b = (value[2]);
//     console.log('gui ' + r, g, b)

//     changeColorR(r, g, b)
//   });

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
// const cubeGeo = new THREE.BoxGeometry()
// const cubeMat = new THREE.MeshBasicMaterial({
//     color: 'white',
//     wireframe: true
// })
// const cube = new THREE.Mesh(
//     cubeGeo,
//     cubeMat
// )
// scene.add(cube)

const gltfLoader = new GLTFLoader()


let mixer = null
let switchModel = null

gltfLoader.load(
    '/models/switch/switch2.gltf',
    (gltf) => {

        const scale = 0.7

        gltf.scene.scale.set(scale, scale, scale)
        gltf.scene.rotation.z = 0.05

        // Parcourir les matériaux du modèle
        console.log('Modèle :')
        console.log(gltf.scene)

        scene.add(gltf.scene)

        switchModel = gltf.scene
    },
    () => {
        console.log('progress')
    },
    (error) => {
        console.log(error)
    }
)



const changeColorL = (r, g, b) => {
    console.log('changeColorL called with RGB:', r, g, b); // Vérifier les valeurs RGB
        switchModel.traverse((child) => {
            if (child.isMesh) {
                const material = child.material
                    if (material.name === 'Material.004') {
                        // Accéder au matériau spécifique par son nom
                        material.color.setRGB(r, g, b) // Exemple : rouge
                    }
            }
        })
 // GROUPE MANETTE R
const joyconL = switchModel.getObjectByName('joycon_L')
const joyconR = switchModel.getObjectByName('joycon_R')
gsap.to(joyconR.position, {duration: 1, z: 0, x: 0, ease: 'power2.inOut', yoyo: false})
gsap.to(joyconL.position, {duration: 1, z: 1, x: -0.5, ease: 'power2.inOut', yoyo: false})

// position camera
gsap.to(camera.position, {duration: 1, z: 4.5, x: -3.3, y:-0.75, ease: 'power2.inOut', yoyo: false})
        
}



const changeColorR = (r, g, b) => {
    // Changer materiau
        switchModel.traverse((child) => {
            if (child.isMesh) {
                const material = child.material
                    if (material.name === 'Material.003') {
                        // Accéder au matériau spécifique par son nom
                        material.color.setRGB(r, g, b) // Exemple : rouge
                    }
            }
        })

        // GROUPE MANETTE R
const joyconR = switchModel.getObjectByName('joycon_R')
const joyconL = switchModel.getObjectByName('joycon_L')
gsap.to(joyconL.position, {duration: 1, z: 0, x: 0, ease: 'power2.inOut', yoyo: false})
gsap.to(joyconR.position, {duration: 1, z: 1, x: -0.5, ease: 'power2.inOut', yoyo: false})

// position camera
gsap.to(camera.position, {duration: 1, z: 3.5, x: 4.3, y:0.9, ease: 'power2.inOut', yoyo: false})
}

const resetJoycon = () => {
    if(switchModel) {
        const joyconR = switchModel.getObjectByName('joycon_R')
        const joyconL = switchModel.getObjectByName('joycon_L')
        gsap.to(joyconL.position, {duration: 1, z: 0, x: 0, ease: 'power2.inOut', yoyo: false})
        gsap.to(joyconR.position, {duration: 1, z: 0, x: 0, ease: 'power2.inOut', yoyo: false})
    }
}
canvas.addEventListener('mousedown', resetJoycon)
canvas.addEventListener('click', function() {
    console.log(camera.position)})

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const light = new THREE.DirectionalLight(0xffffff, 0.1); // Couleur blanche, intensité 1
light.position.set(2, 1, 2); // Position de la lumière (x, y, z)
scene.add(light);


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
console.log(camera.position)
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

    // if(switchModel){
    //     switchModel.rotation.y = elapsedTime * 0.01
    // }

  // Update controls
  controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/**
 * INTERFACE
 */
const buttons = document.querySelectorAll('.joyconL')
const root = document.querySelector(':root')
for(const button of buttons){
    const codeRgb = button.dataset.color.split(',')
    
    const r = codeRgb[0]
    const g = codeRgb[1]
    const b = codeRgb[2]
    
    const r255 = codeRgb[0] / 255
    const g255 = codeRgb[1] / 255
    const b255 = codeRgb[2] / 255

    button.style.backgroundColor = `rgb(${r} ${g} ${b})`
    

    button.addEventListener('click', () => {
        // canvas.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`
        root.style.setProperty('--main1', `rgb(${r} ${g} ${b})` );
        buttons.forEach(e => e.style.outline = 'none');
        button.style.outline = '1px solid black'
        changeColorL(r255, g255, b255)
    })
}

const buttonsR = document.querySelectorAll('.joyconR')
for(const button of buttonsR){
    const codeRgb = button.dataset.color.split(',')
    
    const r = codeRgb[0]
    const g = codeRgb[1]
    const b = codeRgb[2]
    
    const r255 = codeRgb[0] / 255
    const g255 = codeRgb[1] / 255
    const b255 = codeRgb[2] / 255

    button.style.backgroundColor = `rgb(${r} ${g} ${b})`
    button.addEventListener('click', () => {
        document.querySelector('.label').style.color = `rgba(${r}, ${g}, ${b}, 1)`
        buttonsR.forEach(e => e.style.outline = 'none');
        button.style.outline = '1px solid black'
        changeColorR(r255, g255, b255)
    })
}
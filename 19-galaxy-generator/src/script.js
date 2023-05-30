import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 100000
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null


const generateGalaxy = () => {

    if(points){
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()

    // je définis un tableau sur une ligne, qui va de 3 en 3
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i ++){

        // je définis i3, qui indique l'itération où je me trouve. Comme c'est un tableau qu'on doit lire toutes les 3 cellules, alors je multiplie i par 3.
        // ainsi, on traite tableau[0], puis tableau[3], puis tableau[6], puis tableau[9].
        const i3 = i * 3

        // je définis le placement du point sur le rayon. Radius, c'est le rayon multipliée par une valeur aléatoire. Ainsi, le point sera placée entre 0 (le centre) et le nombre que j'ai défini plus haut.
        const radius = Math.random() * parameters.radius

        // je définis l'angle de la branche où je vais situer mon point. Le modulo (%) permet que toutes les 3 itérations, on revienne à zéro. Donc l'itération [3], ou [6], sera placée selon le même angle que [0].
        // Je divise ce nombre par le nombre de branches (3, ou autre) pour que les angles soient toujours equidistants.
        // Je multiplie ce nombre par PI*2 pour que mes branches soient disposés selon un cercle.
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        // Je définis le spin angle, qui va permettre de créer les spirales. Je multiplie le spin donné par le radius. Ainsi, le spin de mon point sera plus élevé si le point est éloigné du centre.
        const spinAngle = radius * parameters.spin

        // ici je définis une position aléatoire pour donner une impression de diffusion en contrôlant l'aléatoire à l'aide d'une puissance mathématique. Revoir cours.
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

        if (i < 20){
            console.log(i, branchAngle)
        }

        // i3, c'est [0], [3], [6]...
        // i3 + 1, c'est [1], [4], [7]...
        // i3 + 2, c'est [2], [5], [8]...
        // Cela me permet de traiter, pour chaque cellule de mon tableau que l'on doit lire 3 par 3, le x, le y puis le z.
        // Donc par exemple pour x, c'est-à-dire [0] ou [3] etc, je calcule le cosinus de l'angle que j'ai défini.
        // Avant de calculer le cosinus et le sinus de mon angle, je lui ajoute le spin calculé plus haut. Donc, mon point sera placé selon un angle qui sera plus élévé si il est loin du centre. Ainsi, on a une spirale. A zéro, on a des lignes droites.
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2]= Math.sin(branchAngle + spinAngle) * radius+ randomZ

        // colors
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    // Materials
    material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: '#ff5588',
    vertexColors: true
})

// Points
points = new THREE.Points(geometry, material)
scene.add(points)
}


generateGalaxy()


// GUI
gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.1).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#4b6650')
const canvas = document.querySelector('canvas.webgl')
const textureLoader = new THREE.TextureLoader()

// import textures
const troncColorTexture = textureLoader.load('/textures/tronc/color.jpg')
const troncNormalTexture = textureLoader.load('/textures/tronc/normal.jpg')
const troncAoTexture = textureLoader.load('/textures/tronc/ao.jpg')
const troncRoughnessTexture = textureLoader.load('/textures/tronc/roughness.jpg')
const troncDisplacementTexture = textureLoader.load('/textures/tronc/displacement.jpg')
const troncMetalnessTexture = textureLoader.load('/textures/tronc/metalness.jpg')

const feuillesColorTexture = textureLoader.load('/textures/feuilles/color.jpg')
const feuillesNormalTexture = textureLoader.load('/textures/feuilles/normal.jpg')
const feuillesAoTexture = textureLoader.load('/textures/feuilles/ao.jpg')
const feuillesRoughnessTexture = textureLoader.load('/textures/feuilles/roughness.jpg')
const feuillesDisplacementTexture = textureLoader.load('/textures/feuilles/displacement.png')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassAoTexture = textureLoader.load('/textures/grass/ao.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const grassDisplacementTexture = textureLoader.load('/textures/grass/displacement.png')

const particleTexture = textureLoader.load('/textures/particles/4.png')

grassColorTexture.repeat.set(8, 8)
grassAoTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAoTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAoTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * OBJETS ------------------
 */ 

const fog = new THREE.Fog('#4b6650', 1, 55)
scene.fog = fog

// Trees

//--------
const trees = new THREE.Group()
// scene.add(tree)


const troncMaterial = new THREE.MeshStandardMaterial({
    map: troncColorTexture,
    transparent: true,
    aoMap: troncAoTexture,
    displacementMap: troncDisplacementTexture,displacementScale: 0.1,
    normalMap: troncNormalTexture,
    roughness: troncRoughnessTexture,
    metalnessMap: troncMetalnessTexture
})
//

//--------

const feuillesMaterial = new THREE.MeshStandardMaterial({
    map: feuillesColorTexture,
    transparent: true,
    aoMap: feuillesAoTexture,
    displacementMap: feuillesDisplacementTexture,displacementScale: 0.1,
    normalMap: feuillesNormalTexture,
    roughness: feuillesRoughnessTexture
})
//

//--------
const feuillesArray = []
for(let i = 0; i < 50; i++){
    // random
    const randomX = -40 + Math.random() * 80
    const randomZ = -40 + Math.random() * 80
    console.log(randomX)
    const troncHeight = 4 + Math.random() * 8
    const feuillesHeight = troncHeight * 1.2

    // tronc
    const troncGeometry = new THREE.CylinderGeometry(0.5, 0.5, troncHeight, 32)
    const tronc = new THREE.Mesh(troncGeometry, troncMaterial)
    tronc.position.y = troncHeight / 2
    tronc.position.x = randomX
    tronc.position.z = randomZ

    tronc.castShadow = true
    tronc.receiveShadow = true

    // feuilles
    const feuillesGeometry = new THREE.ConeGeometry(2, feuillesHeight, 50)
    const feuilles = new THREE.Mesh(feuillesGeometry, feuillesMaterial)

    feuilles.position.y = troncHeight
    feuilles.position.x = randomX
    feuilles.position.z = randomZ
    
    feuilles.castShadow = true
    feuilles.receiveShadow = true

    feuillesArray.push(feuilles);
    scene.add(tronc, feuilles)
}
//

// Floor
const floorGeometry = new THREE.PlaneGeometry(100, 100)
const floorMaterial = new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    transparent: true,
    aoMap: grassAoTexture,
    displacementMap: grassDisplacementTexture,displacementScale: 0.1,
    normalMap: grassNormalTexture,
    roughness: grassRoughnessTexture
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true

scene.add(floor)


// Lights
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.12)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 1)
moonLight.position.set(-10, 10, 10)
scene.add(moonLight)

// Point Light
const pointLight = new THREE.PointLight('#ebff54', 6, 20)
pointLight.position.set(0, 2.2, 2.7)
pointLight.castShadow = true
scene.add(pointLight)

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 100
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    // color: 'gold'
    alphaMap: particleTexture,
    transparent: true,
    alphaTest: 0.001
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(-8, 10, -20)
scene.add(camera)

// Resize
window.addEventListener('resize', () => {
    
    // update sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update rendered
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Rendered
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animate
 */
const clock = new THREE.Clock()



const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    // Bouger les feuilles
    for (let i = 0; i < feuillesArray.length; i++) {
        const feuille = feuillesArray[i];
        feuille.rotation.x = Math.sin(elapsedTime) / 50
        feuille.rotation.y = Math.sin(elapsedTime) / 50
      }


    // Bouger lumière
    const angle = elapsedTime * 0.2
    pointLight.position.x = Math.cos(angle) * 40
    pointLight.position.z = Math.sin(angle) * 20
    pointLight.position.y = Math.sin(elapsedTime * 3) + 10

    // Bouger lucioles
    particles.rotation.y = elapsedTime * 0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

// gsap
// gsap.to(mesh.position, {
//     x: 2,
//     duration: 1,
//     delay: 1
// })

// Animation ------------
const tick = () => 
{
    // set fps
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    // // updating obj
        
    mesh.rotation.x = elapsedTime
    mesh.rotation.z = elapsedTime
    mesh.rotation.y = elapsedTime


    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)
    

    // render obj
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
}
tick()
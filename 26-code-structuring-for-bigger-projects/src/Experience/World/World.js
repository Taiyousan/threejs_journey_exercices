import * as THREE from 'three'
import Environment from './Environment.js'

export default class World {
    constructor() {
        this.experience = window.experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // TEST
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ wireframe: false })
        )
        this.scene.add(testMesh)

        this.resources.on('ready', () => {
            // Setup 
            this.environment = new Environment()

        })


    }

}
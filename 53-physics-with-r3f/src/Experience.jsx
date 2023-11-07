import { useKeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { RigidBody, Physics } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  const [position, setPosition] = useState([0, 0, 0]);
  const cube = useRef();

  const cubeJump = () => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const testBall = () => {
    cube.current.setAngvel(new THREE.Vector3(0, 0, 0));
  };

  // useEffect(() => {
  //   window.addEventListener("click", (e) => {
  //     console.log("Clicked on the window");
  //   });
  // }, []);

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug>
        {/* BALL */}
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow onClick={testBall}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* CUBE */}
        <RigidBody position={[1.5, 2, 0]} ref={cube}>
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody colliders="trimesh">
          <mesh
            castShadow
            position={[0, 1, -0.25]}
            rotation={[Math.PI * 0.1, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          type="fixed"
          restitution={1}
          position={position}
          friction={0.7}
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}

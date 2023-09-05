import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import CustomObject from "./CustomObject.jsx";

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();
  const { camera, gl } = useThree();
  //   useFrame((state, delta) => {
  //     const angle = state.clock.elapsedTime;
  //     const multiplier = 8;
  //     state.camera.position.x = Math.sin(angle) * multiplier;
  //     state.camera.position.z = Math.cos(angle) * multiplier;
  //     state.camera.lookAt(0, 0, 0);
  //   });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} /> <directionalLight />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
          ref={cubeRef}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/*  */}
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        {/*  */}
        <CustomObject />
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}

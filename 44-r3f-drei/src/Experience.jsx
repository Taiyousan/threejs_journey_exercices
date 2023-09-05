import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const text = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls ref={sphere}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>

      <TransformControls object={cube} mode="rotate">
        <mesh position-x={5} scale={1.5} ref={cube}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </TransformControls>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />

        <MeshReflectorMaterial
          resolution={512}
          // blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />
      </mesh>

      <Float speed={5}>
        <TransformControls object={text}>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            color="salmon"
            position-y={2}
            ref={text}
          >
            I LOVE R3F
          </Text>
        </TransformControls>
        {/* ... */}
      </Float>
      <Html position={[1, 1, 0]} wrapperClass="label" center distanceFactor={8}>
        That's a sphere 👍
      </Html>
    </>
  );
}

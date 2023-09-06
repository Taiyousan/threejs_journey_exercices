import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Clone, useGLTF } from "@react-three/drei";

export default function Model() {
  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.3} position-y={-1} position-x={2} />
      <Clone object={model.scene} scale={0.3} position-y={-1} position-x={5} />
      <Clone object={model.scene} scale={0.3} position-y={-1} position-x={-6} />
      <Clone object={model.scene} scale={0.3} position-y={-1} position-x={8} />
    </>
  );
}

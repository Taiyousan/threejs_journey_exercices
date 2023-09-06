import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
//import gsap
import gsap from "gsap";

export default function Hamburger(props) {
  const { nodes, materials } = useGLTF("./hamburger-draco.glb");
  const topBun = useRef();
  const bottomBun = useRef();
  const meat = useRef();

  function handleClick() {
    gsap.to(topBun.current.position, {
      duration: 0.5,
      y: 2.817,
    });

    gsap.to(bottomBun.current.position, {
      duration: 0.5,
      y: -1.771,
    });

    gsap.to(meat.current.position, {
      duration: 0.5,
      x: 5,
      y: 2,
    });
  }

  //   useEffect(() => {
  //     document.addEventListener("click", handleClick);
  //   }, []);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
        ref={bottomBun}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.817, 0]}
        ref={meat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 1.771, 0]}
        ref={topBun}
      />
    </group>
  );
}

useGLTF.preload("./hamburger-draco.glb");

import { useTexture } from "@react-three/drei";
import React from "react";
import { MeshBasicMaterial, PlaneGeometry, sRGBEncoding } from "three";

const Painting = ({ name = "" }) => {
  const texture = useTexture(`paintings/${name}.png`);
  texture.encoding = sRGBEncoding;
  const geometry = new PlaneGeometry(1, 1.3);
  const material = new MeshBasicMaterial({
    map: texture,
  });

  // the next values are hardcoded just for the demo
  // ideally we should have them as props + useHelper hook for the box
  // todo: refactor
  return (
    <>
      <mesh position={[0, 1.6, -5.7]} args={[geometry, material]} />
      <mesh position={[0.01, 1.61, -5.76]}>
        <boxGeometry args={[1.1, 1.4, 0.1]} />
        <meshStandardMaterial color="PeachPuff" />
      </mesh>
    </>
  );
};
export default Painting;

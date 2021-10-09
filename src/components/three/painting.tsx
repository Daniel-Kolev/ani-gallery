import React from "react";
import {
  TextureLoader,
  MeshBasicMaterial,
  PlaneGeometry,
  sRGBEncoding,
} from "three";
const textureLoader = new TextureLoader();
const texture = textureLoader.load("paintings/samodiva.png");
texture.encoding = sRGBEncoding;
const geometry = new PlaneGeometry(1, 1.3);
const material = new MeshBasicMaterial({
  map: texture,
});

const Painting = (props) => {
  return (
    <>
      <mesh {...props} position={[0, 1.6, -5.7]} args={[geometry, material]} />
      <mesh position={[0.01, 1.61, -5.76]}>
        <boxGeometry args={[1.1, 1.4, 0.1]} />
        <meshStandardMaterial color="PeachPuff" />
      </mesh>
    </>
  );
};
export default Painting;
import React from "react";
import { Euler } from "three";
import Config from "config";
import { useGLTF } from "@react-three/drei";

const rotation = new Euler(0, 1.57, 0, "XYZ");
const filePath = "/vrgallerygltf/galleryedit.gltf";
const Gallery: React.FC = () => {
  const gltf = useGLTF(filePath);

  return (
    <primitive
      object={gltf.scene}
      position={[0, 0, 0]}
      rotation={rotation}
      scale={Config.gallery.scale}
    />
  );
};

useGLTF.preload(filePath);

export default Gallery;

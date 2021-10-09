import React, { useEffect } from "react";
import { Euler, Mesh } from "three";
import Config from "config";
import { useGLTF } from "@react-three/drei";

const rotation = new Euler(0, 1.57, 0, "XYZ");
const filePath = "/vrgallerygltf/galleryedit.gltf";

interface GalleryProps {
  setFloor: (mesh: Mesh) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setFloor }) => {
  const gltf = useGLTF(filePath);

  useEffect(() => {
    setFloor(gltf.nodes.Cube001_floormat_0);
  });

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

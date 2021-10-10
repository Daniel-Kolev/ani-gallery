import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Euler, Mesh } from "three";
import Config from "config";
import { useGLTF } from "@react-three/drei";

const rotation = new Euler(0, 1.57, 0, "XYZ");
const filePath = "/vrgallerygltf/galleryedit.gltf";

interface GalleryProps {
  setFloor: Dispatch<SetStateAction<Mesh | undefined>>;
}

const Gallery: React.FC<GalleryProps> = ({ setFloor }) => {
  const { nodes, scene } = useGLTF(filePath);

  useEffect(() => {
    setFloor(nodes.Cube001_floormat_0);
  });

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      rotation={rotation}
      scale={Config.gallery.scale}
    />
  );
};

useGLTF.preload(filePath);

export default Gallery;

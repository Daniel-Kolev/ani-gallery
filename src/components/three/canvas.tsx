import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage: React.FC = () => {
  const [floor, setFloor] = useState<Mesh>();

  return (
    <>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />
          <Painting name="samodiva" />
          <Gallery setFloor={setFloor} />
          <Preload all />
        </Suspense>
      </Canvas>
      <CanvasLoader />
    </>
  );
};

export default IndexPage;

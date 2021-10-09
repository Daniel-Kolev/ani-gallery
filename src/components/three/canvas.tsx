import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import floor from "utils/floors";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";

const IndexPage: React.FC = () => {
  return (
    <Canvas>
      <Controls floor={floor} />
      <ambientLight />
      <Suspense fallback={null}>
        <Painting name="samodiva" />
      </Suspense>
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
    </Canvas>
  );
};

export default IndexPage;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import floor from "utils/floors";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import { Loader as CanvasLoader } from "@react-three/drei";
// import Loader from "components/three/loader";
import Painting from "./painting";

const IndexPage: React.FC = () => {
  return (
    <>
      <Canvas>
        <Controls floor={floor} />
        <ambientLight />
        <Suspense fallback={null}>
          <Painting />
        </Suspense>
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
      </Canvas>
      <CanvasLoader />
    </>
  );
};

export default IndexPage;

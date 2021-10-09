import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Painting from "components/three/painting";
import { Loader as CanvasLoader } from "@react-three/drei";

const IndexPage: React.FC = () => {
  const [floor, setFloor] = useState();

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Controls floor={floor} />
        </Suspense>
        <ambientLight />
        <Suspense fallback={null}>
          <Painting name="samodiva" />
        </Suspense>
        <Suspense fallback={null}>
          <Gallery setFloor={setFloor} />
        </Suspense>
      </Canvas>
      <CanvasLoader />
    </>
  );
};

export default IndexPage;

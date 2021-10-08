import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Floors from "utils/floor";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";

const IndexPage: React.FC = () => {
  return (
    <Canvas>
      <Controls floors={Floors} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
    </Canvas>
  );
};

export default IndexPage;

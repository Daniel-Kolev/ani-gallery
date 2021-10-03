import React from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";

const IndexPage: React.FC = () => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[3, 0, 0]} />
  </Canvas>
);

export default IndexPage;

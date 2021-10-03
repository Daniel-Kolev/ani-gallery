import React from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./box";
import Floors from "../../utils/floors";
import Controls from "./controls";

const IndexPage: React.FC = () => (
  <Canvas>
    <Controls floors={Floors} />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[3, 0, 0]} />
  </Canvas>
);

export default IndexPage;

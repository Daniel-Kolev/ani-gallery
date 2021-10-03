import React, { useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import "./indexPage.scss";

const Box: React.FC<MeshProps> = (props) => {
  const mesh = useRef<MeshProps>(null!);

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[5, 5, 3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Box;

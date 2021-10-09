import React, { useEffect } from "react";
import { Mesh, Object3D, PerspectiveCamera, Vector3 } from "three";
import {
  PointerLockControls,
  DeviceOrientationControls,
} from "@react-three/drei";
import Config from "config";
import useMovement from "components/three/hooks/useMovement";
import { useThree } from "@react-three/fiber";

interface ControlsProps {
  floor: Mesh;
}

const Controls: React.FC<ControlsProps> = ({ floor }) => {
  const defaultCamera = useThree(({ camera }) => camera);

  useEffect(() => {
    defaultCamera.position.setY(Config.player.personHeight);
  }, []);

  useMovement({
    object: defaultCamera as Object3D,
  });

  const hasCursor = matchMedia("(pointer:fine)").matches;
  return hasCursor ? <PointerLockControls /> : <DeviceOrientationControls />;
};

export default Controls;

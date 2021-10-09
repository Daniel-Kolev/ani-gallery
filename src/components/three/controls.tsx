import React, { useEffect, useRef } from "react";
import { Mesh, Object3D } from "three";
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
  const deviceOrientationControls = useRef();

  useEffect(() => {
    defaultCamera.position.setY(Config.player.personHeight);

    const hasCursor = matchMedia("(pointer:fine)").matches;
    if (hasCursor) return;

    const connectListeners = () => {
      console.log(deviceOrientationControls.current);
      deviceOrientationControls.current.connect();
    };
    document.addEventListener("touchend", connectListeners, false);
    return () => {
      document.removeEventListener("touchend", connectListeners, false);
    };
  }, []);

  useMovement({
    object: defaultCamera as Object3D,
  });

  const hasCursor = matchMedia("(pointer:fine)").matches;
  return hasCursor ? (
    <PointerLockControls />
  ) : (
    <DeviceOrientationControls
      screenOrientation={90}
      ref={deviceOrientationControls}
    />
  );
};

export default Controls;

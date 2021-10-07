import React, { useState, useRef, useEffect } from "react";
import { Mesh, Object3D, Vector3 } from "three";
import {
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import Config from "config";
import useMovement from "components/three/hooks/useMovement";
import useCollision from "components/three/hooks/useCollision";

const defaultPosition = new Vector3(0, Config.player.personHeight, 0);

interface ControlsProps {
  floor: Mesh;
}

const Controls: React.FC<ControlsProps> = ({ floor }) => {
  const [camera, setCamera] = useState<Object3D>();
  const controls = useRef() as React.MutableRefObject<PointerLockControlsProps>;

  useEffect(() => {
    if (!controls.current?.camera) throw Error("camera is not defined");

    setCamera(controls.current.camera);
  }, []);

  const updatePosition = useCollision({
    object: camera as Object3D,
    defaultPosition,
    floor,
  });
  useMovement(() => !updatePosition());

  return <PointerLockControls ref={controls} />;
};

export default Controls;

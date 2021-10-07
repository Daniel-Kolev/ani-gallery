import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Object3D, Vector3 } from "three";
import {
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import Config from "../../config";
import usePosition from "./hooks/usePosition";
import useMovement from "./hooks/useMovement";

const defaultPosition = new Vector3(0, Config.player.personHeight, 0);

type ControlsProps = {
  floor: Mesh;
};

const Controls: React.FC<ControlsProps> = ({ floor }) => {
  const controls = useRef() as React.MutableRefObject<PointerLockControlsProps>;
  const {
    current: { camera },
  } = controls;
  const { updatePositions } = usePosition({
    object: camera as Object3D,
    defaultPosition,
    floor,
  });
  const { movement, move, getMovementSpeed } = useMovement();

  useFrame((state, delta) => {
    const {
      current: { camera },
    } = controls;
    if (!camera) return;

    const { forward, backwards, right, left } = movement;
    const directions = [forward, right, backwards, left];
    const movingDirections = directions.filter((direction) => direction);
    if (!movingDirections.length) return;

    const canContinueMoving = updatePositions();
    if (!canContinueMoving) return;

    const movementSpeed = getMovementSpeed(movingDirections, delta);
    const { moveForward, moveRight } = controls.current;

    move({
      movementSpeed,
      action: moveForward,
      positiveDirection: forward,
      negativeDirection: backwards,
    });
    move({
      movementSpeed,
      action: moveRight,
      positiveDirection: right,
      negativeDirection: left,
    });
  });

  return <PointerLockControls ref={controls} />;
};

export default Controls;

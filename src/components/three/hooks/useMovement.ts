import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Config from "config";
import { Object3D, Vector3 } from "three";

const movementVector = new Vector3();
interface MovementProps {
  object: Object3D;
  canContinueMoving?: () => boolean;
}
const useMovement = ({ object, canContinueMoving }: MovementProps): void => {
  const directions = useRef({
    forward: false,
    backwards: false,
    right: false,
    left: false,
  });

  useEffect(() => {
    const onKeyAction = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          directions.current.forward = event.type === "keydown";
          break;

        case "ArrowDown":
        case "KeyS":
          directions.current.backwards = event.type === "keydown";
          break;

        case "ArrowRight":
        case "KeyD":
          directions.current.right = event.type === "keydown";
          break;

        case "ArrowLeft":
        case "KeyA":
          directions.current.left = event.type === "keydown";
          break;
      }
    };

    document.addEventListener("keydown", onKeyAction);
    document.addEventListener("keyup", onKeyAction);
    return () => {
      document.removeEventListener("keydown", onKeyAction);
      document.removeEventListener("keydown", onKeyAction);
    };
  }, []);

  useFrame((state, delta) => {
    const { forward, right, backwards, left } = directions.current;
    const activeDirections = [forward, right, backwards, left].filter(
      (direction) => direction
    );
    if (!activeDirections.length) return;

    if (typeof canContinueMoving === "function" && !canContinueMoving()) return;

    const movementSpeed = getMovementSpeed(activeDirections, delta);

    move({
      value: movementSpeed,
      action: moveForward,
      positiveDirection: forward,
      negativeDirection: backwards,
    });
    move({
      value: movementSpeed,
      action: moveRight,
      positiveDirection: right,
      negativeDirection: left,
    });
  });

  const getMovementSpeed = (
    movingDirections: Array<boolean>,
    delta: number
  ) => {
    const multipleDirections = movingDirections.length > 1;
    // 0.7 is derived from the equivalent unit vector from (1,0) + (0,1)
    // https://forum.unity.com/threads/diagonal-movement-speed-to-fast.271703/#post-1794487
    const baseSpeed = multipleDirections ? 0.7 : 1;
    return Config.player.speedMultiplier * baseSpeed * delta;
  };

  const move = ({
    value,
    action,
    positiveDirection,
    negativeDirection,
  }: {
    value: number;
    action: ((distance: number) => void) | undefined;
    positiveDirection: boolean;
    negativeDirection: boolean;
  }) => {
    if (positiveDirection && negativeDirection) return;
    positiveDirection && action && action(value);
    negativeDirection && action && action(-value);
  };

  // moveForward and moveRight are adapted from PointerLockControls
  // so they can be reused with any other Controls
  // might be a good idea create my own controls wrapper which has this logic inside
  // todo: refactor these methods + move()
  const moveForward = (distance: number) => {
    movementVector.setFromMatrixColumn(object.matrix, 0);
    movementVector.crossVectors(object.up, movementVector);

    object.position.addScaledVector(movementVector, distance);
  };

  const moveRight = (distance: number) => {
    movementVector.setFromMatrixColumn(object.matrix, 0);

    object.position.addScaledVector(movementVector, distance);
  };
};

export default useMovement;

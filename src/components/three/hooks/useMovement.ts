import { useEffect, useRef } from "react";
import Config from "../../../config";

type MoveProps = {
  movementSpeed: number;
  action: ((distance: number) => void) | undefined;
  positiveDirection: boolean;
  negativeDirection: boolean;
};
export default (): {
  movement: {
    forward: boolean;
    backwards: boolean;
    right: boolean;
    left: boolean;
  };
  move: ({
    movementSpeed,
    action,
    positiveDirection,
    negativeDirection,
  }: MoveProps) => void;
  getMovementSpeed: (movingDirections: Array<boolean>, delta: number) => number;
} => {
  const movement = useRef({
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
          movement.current.forward = event.type === "keydown";
          break;

        case "ArrowDown":
        case "KeyS":
          movement.current.backwards = event.type === "keydown";
          break;

        case "ArrowRight":
        case "KeyD":
          movement.current.right = event.type === "keydown";
          break;

        case "ArrowLeft":
        case "KeyA":
          movement.current.left = event.type === "keydown";
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
    movementSpeed,
    action,
    positiveDirection,
    negativeDirection,
  }: MoveProps) => {
    positiveDirection && action && action(movementSpeed);
    negativeDirection && action && action(-movementSpeed);
  };

  return { movement: movement.current, move, getMovementSpeed };
};

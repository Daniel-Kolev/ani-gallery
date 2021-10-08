import { useEffect, useRef } from "react";

const useDirections = () => {
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

  const getActiveDirections = () => {
    const { forward, right, backwards, left } = directions.current;
    const activeDirections = [forward, right, backwards, left].filter(
      (direction) => direction
    );
    return activeDirections;
  };

  return {
    directions: directions.current,
    getActiveDirections,
  };
};
export default useDirections;

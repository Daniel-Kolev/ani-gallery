import { useEffect, useRef } from "react";

const useDirections = () => {
  const directions = useRef({
    forward: false,
    backwards: false,
    right: false,
    left: false,
  });

  useEffect(() => {
    const connectDesktopEvents = () => {
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
    };

    const connectMobileEvents = () => {
      const onTouch = (event: TouchEvent) => {
        directions.current.forward = event.type === "touchstart";
      };

      document.addEventListener("touchstart", onTouch, false);
      document.addEventListener("touchend", onTouch, false);
      return () => {
        document.removeEventListener("touchstart", onTouch, false);
        document.removeEventListener("touchend", onTouch, false);
      };
    };

    // I am using this query here as a way to differentiate between desktop and mobile but might not be the best thing to do
    // to do: refactor
    const hasCursor = window.matchMedia("(pointer:fine)").matches;
    hasCursor ? connectDesktopEvents() : connectMobileEvents();
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

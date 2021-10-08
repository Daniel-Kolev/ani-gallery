import { useEffect } from "react";
import { Object3D, Vector3 } from "three";

const lastPosition = new Vector3(0, 0, 0);

export interface LastPositionProps {
  object: Object3D;
  defaultPosition?: Vector3;
}

const useLastPosition = ({ object, defaultPosition }: LastPositionProps) => {
  useEffect(() => {
    if (!object || !defaultPosition) return;

    object.position.set(
      defaultPosition.x,
      defaultPosition.y,
      defaultPosition.z
    );
  }, []);

  const returnToLastPosition = (isAirborne = false) => {
    if (!object) return false;

    if (isAirborne) {
      object.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
    } else {
      lastPosition.set(object.position.x, object.position.y, object.position.z);
    }
  };

  return returnToLastPosition;
};

export default useLastPosition;

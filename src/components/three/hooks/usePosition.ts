import { useEffect } from "react";
import { Raycaster, Vector3, Object3D, Mesh } from "three";

const down = new Vector3(0, -3, 0);
const raycaster = new Raycaster();
const lastPosition = new Vector3(0, 0, 0);

type PositionProps = {
  object: Object3D;
  defaultPosition?: Vector3;
  floor?: Mesh;
};

export default ({
  object,
  defaultPosition,
  floor,
}: PositionProps): {
  updatePositions: () => boolean;
} => {
  useEffect(() => {
    if (object && defaultPosition)
      object.position.set(
        defaultPosition.x,
        defaultPosition.y,
        defaultPosition.z
      );
  }, []);

  const isObjectAirborne = () => {
    if (!floor) return true;
    raycaster.set(object.position, down);
    console.log(floor);

    const intersectedObjects = raycaster.intersectObject(floor);
    console.log(intersectedObjects);

    return !intersectedObjects.length;
  };

  const updatePositions = () => {
    const canContinueMoving = isObjectAirborne();
    if (!canContinueMoving) {
      object.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
      return canContinueMoving;
    }
    lastPosition.set(object.position.x, object.position.y, object.position.z);
    return canContinueMoving;
  };

  return { updatePositions };
};

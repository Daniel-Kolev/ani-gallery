import { useEffect } from "react";
import { Raycaster, Vector3, Object3D, Mesh } from "three";

const down = new Vector3(0, -3, 0);
const raycaster = new Raycaster();
const lastPosition = new Vector3(0, 0, 0);

interface CollisionProps {
  object: Object3D;
  defaultPosition?: Vector3;
  floor?: Mesh;
}

// This hook has two purposes - detect collisions and update a position
// Ideally we should have both concerns seperated
// todo: refactor (maybe move position setting to useMovement)

const useCollision = ({
  object,
  defaultPosition,
  floor,
}: CollisionProps): (() => boolean) => {
  useEffect(() => {
    if (!object || !defaultPosition) return;

    object.position.set(
      defaultPosition.x,
      defaultPosition.y,
      defaultPosition.z
    );
  }, []);

  const isObjectAirborne = () => {
    if (!floor || !object) return true;

    raycaster.set(object.position, down);
    const intersectedObjects = raycaster.intersectObject(floor);
    return !intersectedObjects.length;
  };

  const updatePosition = () => {
    if (!object) return false;

    const isAirborne = isObjectAirborne();
    if (isAirborne) {
      object.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
    } else {
      lastPosition.set(object.position.x, object.position.y, object.position.z);
    }
    return isAirborne;
  };

  return updatePosition;
};

export default useCollision;

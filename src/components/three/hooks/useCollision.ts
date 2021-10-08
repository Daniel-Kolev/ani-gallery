import { Raycaster, Vector3, Object3D, Mesh } from "three";

const down = new Vector3(0, -3, 0);
const raycaster = new Raycaster();

export interface CollisionProps {
  object: Object3D;
  floor?: Mesh;
}

const useCollision = ({ object, floor }: CollisionProps): (() => boolean) => {
  const isObjectAirborne = () => {
    if (!floor || !object) return false;

    raycaster.set(object.position, down);
    const intersectedObjects = raycaster.intersectObject(floor);
    return !intersectedObjects.length;
  };

  return isObjectAirborne;
};

export default useCollision;

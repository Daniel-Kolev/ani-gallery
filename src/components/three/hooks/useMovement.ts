import { useFrame } from "@react-three/fiber";
import Config from "config";
import { Object3D, Vector3 } from "three";
import useLastPosition, {
  LastPositionProps,
} from "components/three/hooks/useLastPosition";
import useCollision, {
  CollisionProps,
} from "components/three/hooks/useCollision";
import useDirections from "components/three/hooks/useDirections";

const movementVector = new Vector3();
interface MovementProps extends CollisionProps, LastPositionProps {
  object: Object3D;
}

const useMovement = ({ object, floor }: MovementProps): void => {
  const { directions, getActiveDirections } = useDirections();
  const isObjectAirborne = useCollision({
    object,
    floor,
  });
  const returnToLastPosition = useLastPosition({
    object,
  });

  useFrame((state, delta) => {
    const numberOfActiveDirections = getActiveDirections().length;
    if (!numberOfActiveDirections) return;

    const isAirborne = isObjectAirborne();
    returnToLastPosition(isAirborne);
    if (isAirborne) return;

    const movementSpeed = getMovementSpeed(numberOfActiveDirections > 1, delta);

    const { forward, right, backwards, left } = directions;
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

  const getMovementSpeed = (multipleDirections: boolean, delta: number) => {
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

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Event, Raycaster, Mesh, Vector3, Camera } from 'three';
import { PointerLockControls, PointerLockControlsProps } from '@react-three/drei'
import Config from '../../config';

const down = new Vector3(0, -1, 0)
const lastPosition = new Vector3(0, Config.player.personHeight, 0)
const raycaster = new Raycaster();

type ControlsProps = {
    floors: Mesh[]
}

const Controls: React.FC<ControlsProps> = ({ floors = [] }) => {
    const controls = useRef(null!) as React.MutableRefObject<PointerLockControlsProps>
    const movement = useRef({ forward: false, backwards: false, right: false, left: false })

    useEffect(() => {
        const { current: { camera } } = controls
        if (camera) camera.position.set(lastPosition.x, lastPosition.y, lastPosition.z)

        const onKeyAction = (event: Event) => {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    movement.current.forward = (event.type === 'keydown'); break;

                case 'ArrowDown':
                case 'KeyS':
                    movement.current.backwards = (event.type === 'keydown'); break;

                case 'ArrowRight':
                case 'KeyD':
                    movement.current.right = (event.type === 'keydown'); break;

                case 'ArrowLeft':
                case 'KeyA':
                    movement.current.left = (event.type === 'keydown'); break;
            }
        };

        document.addEventListener('keydown', onKeyAction);
        document.addEventListener('keyup', onKeyAction);
        return () => {
            document.removeEventListener('keydown', onKeyAction);
            document.removeEventListener('keydown', onKeyAction);
        }
    }, [])

    useFrame((state, delta) => {
        const { current: { camera } } = controls
        if (!camera) return

        const { forward, backwards, right, left } = movement.current
        const directions = [forward, right, backwards, left]
        const movingDirections = directions.filter((direction) => direction)
        if (!movingDirections.length) return

        const canContinueMoving = isPlayerOnWalkableSurface(camera)
        updatePositions(canContinueMoving, camera)
        if (!canContinueMoving) return

        const movementSpeed = getMovementSpeed(movingDirections, delta)
        const { moveForward, moveRight } = controls.current

        move({ movementSpeed, action: moveForward, positiveDirection: forward, negativeDirection: backwards })
        move({ movementSpeed, action: moveRight, positiveDirection: right, negativeDirection: left })
    })

    const isPlayerOnWalkableSurface = (camera: Camera) => {
        raycaster.set(camera.position, down);
        const intersectedObjects = raycaster.intersectObjects(floors)
        return !!intersectedObjects.length
    }

    const updatePositions = (canContinueMoving: boolean, camera: Camera) => {
        if (!canContinueMoving) {
            camera.position.set(lastPosition.x, lastPosition.y, lastPosition.z)
            return
        }
        lastPosition.set(camera.position.x, camera.position.y, camera.position.z)
    }

    const getMovementSpeed = (movingDirections: Array<boolean>, delta: number) => {
        const multipleDirections = movingDirections.length > 1
        // 0.7 is derived from the equivalent unit vector from (1,0) + (0,1)
        // https://forum.unity.com/threads/diagonal-movement-speed-to-fast.271703/#post-1794487
        const baseSpeed = multipleDirections ? 0.7 : 1
        return Config.player.speedMultiplier * baseSpeed * delta
    }

    const move = ({ 
        movementSpeed, 
        action, 
        positiveDirection, 
        negativeDirection 
    }: {
        movementSpeed: number,
        action: Function | undefined,
        positiveDirection: boolean,
        negativeDirection: boolean,
    }) => {
        positiveDirection && action && action(movementSpeed)
        negativeDirection && action && action(-movementSpeed)
    }

    return <PointerLockControls ref={controls} />
}

export default Controls

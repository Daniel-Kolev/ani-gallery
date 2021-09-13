import React, { useRef, useEffect, useState } from 'react';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei'
import Layout from '../layout';
import './indexPage.scss';
import { Event } from 'three';


const Box: React.FC<MeshProps> = props => {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <boxGeometry args={[5, 5, 3]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  )
}

const IndexPage: React.FC = () => {
  const [direction, setDirection] = useState([0, 0])
  const controls = useRef(null!)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (direction && controls.current) {
      const directionFunctionName = directionFunction[direction]

      if (typeof controls.current[directionFunctionName] === 'function') {
        const value = 0.1 * (direction === 'left' || direction === 'backwards' ? - 1 : 1)
        interval = setInterval(() => {
          controls.current[directionFunctionName](value)
        }, 10);

      }
    }

    return () => interval && clearInterval(interval);
  }, [direction, controls.current])

  useEffect(() => {
    const onKeyDown = (event: Event) => {
      console.log('DOWN', event.code);

      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setDirection('forward')
          break;

        case 'ArrowLeft':
        case 'KeyA':
          setDirection('left')
          break;

        case 'ArrowDown':
        case 'KeyS':
          setDirection('backwards')
          break;

        case 'ArrowRight':
        case 'KeyD':
          setDirection('right')
          break;

      }
    };
    const clearDirection = () => setDirection('')
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', clearDirection);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keydown', clearDirection);
    }
  }, [])

  return (
    <div id='scene-container' style={{ height: '100vh', width: '100%' }}>
      <Canvas>
        <PointerLockControls ref={controls} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[3, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default IndexPage;

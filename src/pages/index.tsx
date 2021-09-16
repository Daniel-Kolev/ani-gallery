import React, { useRef } from 'react';
import { Canvas, MeshProps } from '@react-three/fiber';
import './indexPage.scss';

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

const IndexPage: React.FC = () => <div id='scene-container' style={{ height: '100vh', width: '100%' }}>
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[3, 0, 0]} />
  </Canvas>
</div>

export default IndexPage;

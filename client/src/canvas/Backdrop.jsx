import { useRef } from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
  const shadows = useRef()

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.4}
        ambient={0.4}
        position={[2, 5, -5]}
      />
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.4}
        ambient={0.4}
        position={[-2, 5, -5]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop

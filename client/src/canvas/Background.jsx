import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Plane } from '@react-three/drei'

const Background = ({ url }) => {
  const texture = useLoader(TextureLoader, url)
  return (
    <Plane args={[20, 9]} position={[0, 0, -10]}>
      <meshBasicMaterial map={texture} />
    </Plane>
  )
}

export default Background

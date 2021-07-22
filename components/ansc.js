import React, { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { softShadows } from "@react-three/drei"
import { PerspectiveCamera, OrbitControls, Plane, Box} from '@react-three/drei'

// Inject soft shadow shader

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
function Sphere({ position = [0, 0, 0], ...props }) {
  const ref = useRef()
  const factor = useMemo(() => 0.5 + Math.random(), [])
  useFrame((state) => {
    const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
    ref.current.position.y = position[1] + t * 4
    ref.current.scale.y = 1 + t * 3
  })
  return (
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="lightblue" roughness={0} metalness={0.1} />
    </mesh>
  )
}

function Spheres({ number = 20 }) {
  const ref = useRef()
  const positions = useMemo(() => [...new Array(number)].map(() => [3 - Math.random() * 6, Math.random() * 4, 3 - Math.random() * 6]), [])
  useFrame((state) => (ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI))
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
    </group>
  )
}

const Ansc = () => {
    const myCamera = useRef()

    const myCube = useRef()
    const myLight = useRef()

    const Rad = (number) => {
        return number / 180 * Math.PI
    }

    const Rad3 = (arr) => {
        return [Rad(arr[0]), Rad(arr[1]), Rad[2]]
    }

    
    return (
        <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
            <PerspectiveCamera ref={myCamera} position={[-73.726, 50.864, 144.608]} rotation={ Rad3([-16.24, -40.54, -10.73]) } makeDefault />
            <OrbitControls camera={myCamera.current} />
            
            <ambientLight intensity={0.4} />
            <directionalLight
            
            castShadow
            position={[122, 58, 35]}
            intensity={1.5}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}

            shadow-camera-far={500}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
            />
            <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <group position={[0, -3.5, 0]}>
            <mesh receiveShadow castShadow>
                <boxBufferGeometry attach="geometry" args={[4, 1, 1]} />
                <meshStandardMaterial attach="material" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
                <shadowMaterial attach="material" transparent opacity={0.4} />
            </mesh>
            <Spheres />
            </group>

            <mesh receiveShadow castShadow position={[0, 17, 0]}>
                <boxBufferGeometry attach="geometry" args={[20, 20, 20]} />
                <meshStandardMaterial attach="material" />
            </mesh>

            
            <Plane castShadow receiveShadow  position={[0, 7, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[1000, 1000]}>
                <meshStandardMaterial attach="material" color="white" />
            </Plane>
        </Canvas>
    )
}

export default Ansc
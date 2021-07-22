import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane } from "@react-three/drei"

export default function Altsc() {

    const boxRef = useRef();
    const dirLight = useRef()

    useEffect(() => {
      console.log(dirLight)
    })
    

    return (
      <Canvas
        colorManagement
        shadows
        camera={{ position: [-3, 2, 5], fov: 90 }}
      >
        <fog attach="fog" args={["white", 0, 40]} />
        <ambientLight  intensity={0.1} />
        <directionalLight
          ref={dirLight}
          intensity={0.5}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        
        <group>
            <Box castShadow receiveShadow ref={boxRef} position={[0, 0.5, 0]}>
                <meshStandardMaterial attach="material" color="white" />
            </Box>
            <Plane
            castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1, 0]}
                args={[300, 300]}
            >
                <meshStandardMaterial attach="material" color="white" />
            </Plane>
            </group>

      </Canvas>
    );
  }
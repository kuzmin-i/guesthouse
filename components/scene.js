import React, { useRef, useState, Suspense, useResource } from 'react'
import { Canvas, useFrame } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls} from '@react-three/drei'

import Box from './box'
import ModelGLTF from './gltf'



const Scene = () => {
    
    const myCamera = useRef()

    return(
        <Canvas style={{width: '100%', height: '100%'}}>
            <PerspectiveCamera ref={myCamera} position={[0, 5, 5]} />
            <OrbitControls camera={myCamera.current} />

            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            

            <Suspense fallback={null}>
                <ModelGLTF/>
            </Suspense>
      </Canvas>
    )
}

export default Scene
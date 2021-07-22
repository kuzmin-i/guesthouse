import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls, Box, Html} from '@react-three/drei'

import ModelGLTF from './gltf'

import {
    EffectComposer,
    DepthOfField,
    Bloom,
    Noise,
    Vignette
  } from "@react-three/postprocessing";


const Scene = ({data}) => {

    
    const myCamera = useRef()

    const dirLight = useRef()
    const myCube = useRef()

    const [dirHelpLight, setDirHelpLight] = useState()
    useEffect(() => void setDirHelpLight(dirLight.current), [])

    const Rad = (number) => {
        return number / 180 * Math.PI
    }

    const Rad3 = (arr) => {
        return [Rad(arr[0]), Rad(arr[1]), Rad[2]]
    }

    useEffect(() => {
        if(dirLight.current) { dirLight.current.target = myCube.current }
    })

    return(
        <>
        <Canvas shadows colorManagement style={{width: '100%', height: '100%'}}>
            <fog attach="fog" args={["white", 0, 500]} />
            <PerspectiveCamera ref={myCamera} position={[-73.726, 50.864, 144.608]} rotation={ Rad3([-16.24, -40.54, -10.73]) } makeDefault />
            <OrbitControls camera={myCamera.current} />

            <ambientLight  intensity={0.1} />
            <directionalLight
                intensity={data.dIntensity}
                ref={dirLight}
                castShadow
                position={[data.positionX, data.positionY, data.positionZ]}
                shadow-mapSize-height={data.mapSizeHeight}
                shadow-mapSize-width={data.mapSizeWidth}

                
                shadow-camera-far={500}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />
            {dirHelpLight && <directionalLightHelper args={[dirHelpLight, 5]} />}
            
            
            <Box castShadow ref={myCube} receiveShadow  position={[data.cubeX, data.cubeY, data.cubeZ]} scale={[20, 20, 20]}>
                <meshStandardMaterial attach="material" color="white" />
            </Box>

            <Html
                as="div"
                position={[data.cubeX + 20, data.cubeY + 20, data.cubeZ]}
                occlude
                center
            >
                <div className="gl-pin">+</div>
            </Html>

            
            
            <Suspense fallback={null}>
                <ModelGLTF model="/1/Ground_1.glb" receiveShadow/>
                <ModelGLTF model="/1/Platform.glb"/>
                <ModelGLTF model="/1/Walls.glb"/>
                <ModelGLTF model="/1/Partitions.glb"/>
                <ModelGLTF model="/1/Roof.glb"/>
            </Suspense>

            

        
      </Canvas>
      </>
    )
}

export default Scene

/*
<Suspense fallback={null}>
                <ModelGLTF model="/1/Ground_1.glb" receiveShadow/>
                <ModelGLTF model="/1/Platform.glb"/>
                <ModelGLTF model="/1/Walls.glb"/>
                <ModelGLTF model="/1/Roof.glb"/>
            </Suspense>
*/

/*
<EffectComposer multisampling={0} disableNormalPass={true}>
            <DepthOfField
                focusDistance={data.focusDistance}
                focalLength={data.focalLength}
                bokehScale={data.bokehScale}
                height={data.height}
            />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    */
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls, FlyControls, Box, Line} from '@react-three/drei'

import * as THREE from 'three';

/* Three JS extra components */
import Pin from './ThreeBlocks/Pin'
import ModelGLTF from './ThreeBlocks/ModelGLTF'
import Lights from './ThreeBlocks/Lights'
import ExplosionGroup from './ThreeBlocks/ExplosionGroup'
import Cameras from './ThreeBlocks/Cameras'

/* Extra Functions */
import Rad3 from './Functions/Rad3'
import ToRefsObject from './Functions/ToRefsObject'
import BWalls from './ThreeBlocks/BWalls_1';


const Scene = ({data, cameraLoc, refs, response}) => {

    const [OrbitParam, setOrbitParam] = useState(false)

    return(
        <>
        <div onClick={ () => setOrbitParam(!OrbitParam) }>Enable Trackball</div>
        <Canvas className="map" shadows colorManagement>
            <fog attach="fog" color="#FFF7F2" args={["#FFEDE1", 0, 500]} />
            <Cameras OrbitParam={OrbitParam} cameraLoc={cameraLoc} response={response}/>

            <Lights data={data}/>
            
            
            <Pin position={ [149, 18, -40] } name="Узел углового окна" />
            <Pin position={ [33, 37, -84] } name="Узел спального окна" />

            <Pin position={ [0, 0, 0] } name={ () => LocPosition() } />
            
            <Suspense fallback={null}>
                <ModelGLTF model="/1/Ground_1.glb" receiveShadow/>
                <ModelGLTF model="/1/Platform.glb"/>
                <BWalls/>
                
                <ModelGLTF model="/1/WindowsFrames.glb"/>

                <ExplosionGroup/>

                
            </Suspense>

            

        
      </Canvas>
      </>
    )
}

export default Scene

/*
Camera Pos1 = [-11.153876556792174, 15.227648229652257, 64.68251686733406]
Camera Rot1 = [0.018932006244514115, -0.47663570975845293, 0.00868668108726853]


Camera Pos2 = [256.2366685896037, 112.19251084415639, 75.41435492681605]
Camera Rot2 = [-0.3462307333686365, 0.8841013859965784, 0.2720759213944849]

*/
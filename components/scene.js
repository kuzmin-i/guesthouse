import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls, FlyControls, Box, Line} from '@react-three/drei'

import * as THREE from 'three';

/* Three JS extra components */
import Pin from './ThreeBlocks/pin'
import ModelGLTF from './gltf'

/* Extra Functions */
import Rad3 from './Functions/Rad3'
import ToRefsObject from './Functions/ToRefsObject'
import StageAnimation from './Functions/StageAnimation'


const Scene = ({data, cameraLoc, refs}) => {

    const GLTFPreRefs = ['partitions', 'roof', 'stairs', 'furniture', 'underfloor']
    const GLTFRefs = ToRefsObject(GLTFPreRefs)

    const GroupPreRefs = ['group1', 'group2']
    const GroupRefs = ToRefsObject(GroupPreRefs)

    const LinePreRefs = ['line1', 'line2', 'line3', 'line4']
    const LineRefs = ToRefsObject(LinePreRefs)

    const HtmlPreRef = ['pin1', 'pin2', 'pin3']
    const HtmlRefs = ToRefsObject(HtmlPreRef)

    const [StAnimReverse, SetStAnimReverse] = useState(false)

    

    const ExplosionGroup = useRef()
    
    const myCamera = useRef()

    const dirLight = useRef()
    const myCube = useRef()

    const [dirHelpLight, setDirHelpLight] = useState()
    useEffect(() => void setDirHelpLight(dirLight.current), [])

    const lineA = useRef()

    const LocPosition = () => {
        if(myCamera.current) {
            return 'Pos: [' + myCamera.current.position.x + ', ' + myCamera.current.position.y + ', ' + myCamera.current.position.z + '], Rot: [' + myCamera.current.rotation.x + ', ' + myCamera.current.rotation.y + ', ' + myCamera.current.rotation.z + ']'
        }
    }

    useEffect(() => {
        if(dirLight.current) { dirLight.current.target = myCube.current }
    })

    const [CameraPos1, setCameraPos1] = useState('NO DATA')
    const [OrbitParam, setOrbitParam] = useState(false)

    return(
        <>
        <div>{CameraPos1}</div>
        <div onClick={ () => setCameraPos1(LocPosition()) }>CLICK</div>
        <div onClick={ () => setOrbitParam(!OrbitParam) }>Enable Trackball</div>
        <Canvas className="map" shadows colorManagement>
            <fog attach="fog" args={["white", 0, 500]} />
            <PerspectiveCamera ref={myCamera} position={[cameraLoc.position[0], cameraLoc.position[1], cameraLoc.position[2]]} rotation={ [cameraLoc.rotation[0], cameraLoc.rotation[1], cameraLoc.rotation[2]] } makeDefault />
            {OrbitParam && <OrbitControls camera={myCamera.current}/>}

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
            
            
            <Box castShadow ref={myCube} receiveShadow  position={[data.cubeX, data.cubeY, data.cubeZ]} scale={[3, 3, 3]}>
                <meshStandardMaterial attach="material" color="white"  />
            </Box>

            
            <Pin position={ [149, 18, -40] } name="Узел углового окна" />
            <Pin position={ [33, 37, -84] } name="Узел спального окна" />

            <Pin position={ [0, 0, 0] } name={ () => LocPosition() } />
            
            <Suspense fallback={null}>
                <ModelGLTF model="/1/Ground_1.glb" receiveShadow/>
                <ModelGLTF model="/1/Platform.glb"/>
                <ModelGLTF model="/1/Walls.glb"/>
                <ModelGLTF model="/1/WindowsFrames.glb"/>

                <group ref={ExplosionGroup} onClick={ 
                    () => {
                        
                        StageAnimation({
                            'type': 'click',
                            'reverse': StAnimReverse,
                            'objects': [
                                {'ref': GroupRefs.group1, 'startPosition': [0, 0, 0], 'endPosition': [0, 75, 0]},
                                {'ref': GroupRefs.group2, 'startPosition': [0, 0, 0], 'endPosition': [0, 105, 0]},
                                {'ref': LineRefs.line1, 'line': true, 'startPosition': [38, 43, -52], 'endPosition': [38, 153, -52]},
                                {'ref': LineRefs.line2, 'line': true, 'startPosition': [38, 43, -105], 'endPosition': [38, 153, -105]},
                                {'ref': LineRefs.line3, 'line': true, 'startPosition': [169, 31, -52], 'endPosition': [169, 141, -52]},
                                {'ref': LineRefs.line4, 'line': true, 'startPosition': [169, 31, -105], 'endPosition': [169, 141, -105]},
                            ]
                            }) 
                        SetStAnimReverse(!StAnimReverse)
                        }
                }>
                    
                    

                    <group ref={GroupRefs.group1}>
                        <ModelGLTF model="/1/Partitions.glb" ref={GLTFRefs.partitions}/>
                        <ModelGLTF model="/1/Furniture.glb" ref={GLTFRefs.furniture}/>
                        <ModelGLTF model="/1/Underfloor.glb" ref={GLTFRefs.underfloor}/>
                        <ModelGLTF model="/1/Stairs.glb" ref={GLTFRefs.stairs}/>

                        <Pin position={ [136, 14, -69] } name="Столовая" ref={HtmlRefs.pin2}/>
                        <Pin position={ [46, 37, -79] } name="Спальная комната" ref={HtmlRefs.pin3} />
                        <Pin position={ [74, 33, -54] } name="Спальная комната" />
                    </group>
                    
                    <group ref={GroupRefs.group2}>
                        <ModelGLTF model="/1/Roof.glb" ref={GLTFRefs.roof}/>
                        <Pin position={ [123, 39, -25] } name="Узел кровли" ref={HtmlRefs.pin1} />
                    </group>

                    <Line
                        points={[[38, 43, -52], [38, 43, -52]]} 
                        ref={lineA}
                        color="grey"
                        name="lineA"
                        lineWidth={.15} 
                        dashed={false} 
                        ref={LineRefs.line1} 
                    />

                    <Line
                        points={[[38, 43, -105], [38, 43, -105]]} 
                        color="grey"
                        name="lineB"
                        lineWidth={.15} 
                        dashed={false}
                        ref={LineRefs.line2} 
                    />

                    <Line
                        points={[[169, 31, -52], [169, 31, -52]]} 
                        color="grey"
                        name="lineC"
                        lineWidth={.15} 
                        dashed={false} 
                        ref={LineRefs.line3} 
                    />

                    <Line
                        points={[[169, 31, -105], [169, 31, -105]]} 
                        color="grey"
                        name="lineD"
                        lineWidth={.15} 
                        dashed={false} 
                        ref={LineRefs.line4} 
                    />
                </group>

                
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
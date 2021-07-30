import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls, FlyControls, Environment, Loader} from '@react-three/drei'

import * as THREE from 'three';
import {
    CubeTextureLoader,
    CubeCamera,
    WebGLCubeRenderTarget,
    RGBFormat,
    LinearMipmapLinearFilter
  } from "three";

/* Three JS extra components */
//import Pin from './ThreeBlocks/Pin'
import ModelGLTF from './ThreeBlocks/ModelGLTF'
import Lights from './ThreeBlocks/Lights'
import ExplosionGroup from './ThreeBlocks/ExplosionGroup'
import Cameras from './ThreeBlocks/Cameras'

import BWalls from './ThreeBlocks/BWalls_1'
import BDoorFrame from './ThreeBlocks/BDoorFrame'
import BDoorBlock from './ThreeBlocks/BDoorBlock'
import BWindowsBlock1 from './ThreeBlocks/BWindowsBlock1'
import BPlatform from './ThreeBlocks/BPlatform'
import BGround from './ThreeBlocks/BGround'
import BMan from './ThreeBlocks/BMan'

import Effects from './ThreeBlocks/Effects'

/* Extra Functions */
import Rad3 from './Functions/Rad3'
import ToRefsObject from './Functions/ToRefsObject'
import BCube1 from './ThreeBlocks/BCube1';

function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
      "/env/1.jpg",
      "/env/2.jpg",
      "/env/3.jpg",
      "/env/4.jpg",
      "/env/5.jpg",
      "/env/6.jpg"
    ]);
  
    // Set the scene background property to the resulting texture.
    texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;
    return null;
}

// Geometry
function Sphere() {
    const { scene, gl } = useThree();
    // The cubeRenderTarget is used to generate a texture for the reflective sphere.
    // It must be updated on each frame in order to track camera movement and other changes.
    const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
      format: RGBFormat,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter
    });
    const cubeCamera = new CubeCamera(40, 1000, cubeRenderTarget);
    cubeCamera.position.set(110, 30, -70);
    scene.add(cubeCamera);
  
    // Update the cubeCamera with current renderer and scene.
    useFrame(() => cubeCamera.update(gl, scene));
  
    return (
      <mesh visible position={[110, 30, -70]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[50, 32, 42]} />
        <meshBasicMaterial
          attach="material"
          envMap={cubeCamera.renderTarget.texture}
          color="white"
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    );
  }


const Scene = ({data, cameraLoc, refs, response}) => {

    const [OrbitParam, setOrbitParam] = useState(true)

    const envProps = {background: false}

    const AltCamera = useRef()    


    return(
        <>
        <Canvas className="map" shadows colorManagement>
            <fog attach="fog" color="#FFF7F2" args={["#FFEDE1", 0, 500]} />
            <Cameras OrbitParam={OrbitParam} cameraLoc={cameraLoc} response={response} ref={AltCamera}/>

            <Lights data={data}/>
            
            
            
            
            
            

            <Suspense fallback={null}>

                <Environment background={false} files="/1/textures/adams_place_bridge_1k.hdr" />
                
                <SkyBox />
                
                <BPlatform/>
                <BGround/>
                <BWalls/>
                <BMan ref={AltCamera}/>
                
                <ModelGLTF model="/1/WindowsFrames.glb"/>
                <BDoorFrame/>
                <BDoorBlock/>
                <BWindowsBlock1/>

                <BCube1/>

                <ExplosionGroup/>
                

                
            </Suspense>

            <Effects />

        
      </Canvas>
      <Loader
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
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

/*
            
        */

//<Environment background={false} files="/1/textures/adams_place_bridge_1k.hdr" />

/*
<Pin position={ [149, 18, -40] } name="Узел углового окна" />
            <Pin position={ [33, 37, -84] } name="Узел спального окна" />

            <Pin position={ [0, 0, 0] } name={ () => LocPosition() } />
            */
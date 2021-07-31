import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber' 

import { PerspectiveCamera, OrbitControls, FlyControls, Environment, Loader, Html} from '@react-three/drei'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
import SkyBox from './ThreeBlocks/SkyBox'

import Effects from './ThreeBlocks/Effects'

/* Extra Functions */
import Rad3 from './Functions/Rad3'
import ToRefsObject from './Functions/ToRefsObject'
import BCube1 from './ThreeBlocks/BCube1';




const Scene = ({data, cameraLoc, progressScreen}) => {

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {props.name}
      </Tooltip>
    );

    const [OrbitParam, setOrbitParam] = useState(true)

    const envProps = {background: false}

    const AltCamera = useRef()  
    

    return(
        <>
        <Canvas className="map" shadows colorManagement>
            
        
        
            
       
      
            

            <Suspense fallback={null}>
                <fog attach="fog" color="#FFF7F2" args={["#FFEDE1", 0, 500]} />

                <Html
                  as="div"
                  position={ [149, 18, -40] }
                  occlude
                  center
                >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip({'name': 'Узел углового окна'})}
                    >
                      <div className="gl-pin"></div>
                    </OverlayTrigger>
                 </Html>

                 <Html
                  as="div"
                  position={ [33, 37, -84] }
                  occlude
                  center
                >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip({'name': 'Визуализация вида из окна спальной'})}
                    >
                      <div className="gl-pin"></div>
                    </OverlayTrigger>
                 </Html>

                <Cameras OrbitParam={OrbitParam} cameraLoc={cameraLoc} ref={AltCamera} progressScreen={progressScreen}/>
                <SkyBox/>
                <Lights data={data}/>

                <Environment background={false} files="/1/textures/adams_place_bridge_1k.hdr" />
                
                
                
                <BPlatform/>
                <BGround/>
                <BWalls/>
                <BMan ref={AltCamera}/>
                
                <ModelGLTF model="/1/WindowsFrames.glb"/>
                <BDoorFrame/>
                <BDoorBlock/>
                <BWindowsBlock1/>

                <ExplosionGroup progressScreen={progressScreen}/>
                
                
                
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

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber' 
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'

import * as THREE from 'three';

/* Extra Functions */
import CountPosDifference from '../Functions/CountPosDifference'

const Cameras = ({OrbitParam, response}) => {
    const myCamera = useRef()

    const CameraAnimCoord = [
        {'position': [-9.43, 9.67, 50.5], 'rotation': [0.185, -0.47, 0.08]},
        {'position': [256.2366685896037, 112.19251084415639, 75.41435492681605], 'rotation': [-0.3462307333686365, 0.8841013859965784, 0.2720759213944849]}
      ]
    
    const [CameraLoc, setCameraLoc] = useState(CameraAnimCoord[0])

        let progress = 0
        let step = .02

        useFrame(() => {
          console.log('Position: [' + myCamera.current.position.x + ', ' + myCamera.current.position.y + ', ' + myCamera.current.position.z + ']')
          console.log('Rotation: [' + myCamera.current.rotation.x + ', ' + myCamera.current.rotation.y + ', ' + myCamera.current.rotation.z + ']')
        })

        /*useFrame(() => {
        if(response) {
        if(response.index == 0 && response.direction == 'down') {
          if(progress < 1) {

            progress += step
            const crvProgress = 1 - Math.cos((progress * Math.PI) / 2) 

            const Vector3Loc = {
              'position': CountPosDifference(CameraAnimCoord[response.index].position, CameraAnimCoord[response.index+1].position),
              'rotation': CountPosDifference(CameraAnimCoord[response.index].rotation, CameraAnimCoord[response.index+1].rotation)
            }

            const CountMovement = (PosOrRot, i) => {
              return CameraAnimCoord[response.index][PosOrRot][i] + Vector3Loc[PosOrRot][i] * crvProgress
            }

            const V3Pos = [CountMovement('position', 0), CountMovement('position', 1), CountMovement('position', 2)]
            const V3Rot = [CountMovement('rotation', 0), CountMovement('rotation', 1), CountMovement('rotation', 2)]

            const CameraLocUpd = {'position': V3Pos, 'rotation': V3Rot}

            setCameraLoc(CameraLocUpd)
          }
        }
    }
        })
        */

    return(
        <>
        <PerspectiveCamera ref={myCamera} position={CameraLoc.position} rotation={ CameraLoc.rotation } makeDefault />
        {OrbitParam && <OrbitControls camera={myCamera.current} target={new THREE.Vector3(15, 18, 3)} maxDistance={85} />}
        </>
    )
}

export default Cameras
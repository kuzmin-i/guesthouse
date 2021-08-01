
import React from 'react'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber' 
import { PerspectiveCamera, OrbitControls, TrackballControls } from '@react-three/drei'

import * as THREE from 'three';

/* Extra Functions */
import CountPosDifference from '../Functions/CountPosDifference'


const Cameras = React.forwardRef(({OrbitParam, progressScreen}, ref) => {

    const myCamera = useRef()

    // Initial Camera and OrbitTarget Positions
    let CameraAnimCoord = [
        {'position': [-19.43, 9.67, 50.5]},
        {'position': [110.43, 14.67, 80.5]},
        {'position': [197.98, 132.32, 62.49]},
        {'position': [54.56, 39.43, -63.90]},
        {'position': [119.66, 18.16, -98.15]},
        {'position': [163.00, 18.46, -30.00]}
      ]

    let TargetAnimCoord = [[15, 18, 3], [110, 23, 3], [146.9, 104.88, -19.8], [47.64, 40.18, -75.61], [139.51, 14.73, -82.99], [125.98, 18.46, -21.34]]

    

    const CameraLocStatus = (progressScreen.section != 'a' && ref.current) ? [ref.current.position.x, ref.current.position.y, ref.current.position.z] : CameraAnimCoord[0]
    let CameraLoc = CameraLocStatus

    const OrbitLocStatus = (progressScreen.section != 'a' && myCamera.current) ? [myCamera.current.target.x, myCamera.current.target.y, myCamera.current.target.z] : TargetAnimCoord[0]
    let OrbitLoc = OrbitLocStatus
    //end

    

    

        let progress = 0
        let step = .02

        

    let UpdCameraPosition = null
    let UpdDif3Pos = null

    let UpdTargetPos = null
    let UpdDif3TargetPos = null



    useEffect(() => {

      if(window.innerWidth <= 480) {
        CameraAnimCoord = [
          {'position': [-19.43, 9.67, 50.5]},
          {'position': [110.83, 6.77, 153.97]},
          {'position': [314.36, 114.37, 174.49]},
          {'position': [54.23, 37.03, -59.39]},
          {'position': [119.66, 18.16, -98.15]},
          {'position': [180.66, 17.2, 4]}
        ]

        TargetAnimCoord = [[15, 18, 3], [110, 23, 3], [149.26, 77.53, -14.20], [49.98, 38.1, -76.45], [139.51, 14.73, -82.99], [125.9, 18.46, -21.3]]

      }


    const AnimEndLoc = {
      'b': {camera: CameraAnimCoord[1].position, target: TargetAnimCoord[1]},
      'c': {camera: CameraAnimCoord[2].position, target: TargetAnimCoord[2]},
      'd': {camera: CameraAnimCoord[1].position, target: TargetAnimCoord[1]},
      'e': {camera: CameraAnimCoord[3].position, target: TargetAnimCoord[3]},
      'f': {camera: CameraAnimCoord[4].position, target: TargetAnimCoord[4]},
      'g': {camera: CameraAnimCoord[1].position, target: TargetAnimCoord[1]},
      'h': {camera: CameraAnimCoord[5].position, target: TargetAnimCoord[5]},
    }

      if(ref.current && progressScreen.section && progressScreen.section != 'a') {
        UpdCameraPosition = [ref.current.position.x, ref.current.position.y, ref.current.position.z]
        UpdDif3Pos = CountPosDifference(UpdCameraPosition, AnimEndLoc[progressScreen.section].camera)

        UpdTargetPos = [myCamera.current.target.x, myCamera.current.target.y, myCamera.current.target.z]
        UpdDif3TargetPos = CountPosDifference(UpdTargetPos, AnimEndLoc[progressScreen.section].target)
      }
    })
    
    
   useFrame(() => {
    /*console.log('camera')
    console.log([ref.current.position.x, ref.current.position.y, ref.current.position.z])
    console.log('target')
    console.log([myCamera.current.target.x, myCamera.current.target.y, myCamera.current.target.z])
    */
    
    
    const checkProgressScreen = (progressScreen.section != 'a') ? true : false
    
    //ref.current.position.x += .1
     if(!progressScreen.status) {
       if(progressScreen.section == 'a') {
        ref.current.position.y += .007
        ref.current.position.x += .1
       }
     } else if(progress <= 1 && UpdDif3Pos && UpdDif3TargetPos && checkProgressScreen) {

        if(UpdCameraPosition && ref.current) {
        let easeOutProgress = (progress < 0.5) ? 16 * progress * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 5) / 2;

        let UpdCameraStateLoc = UpdDif3Pos.map((key , i) => {
          return UpdCameraPosition[i] + key * easeOutProgress
        })

        let UpdTargetPosition = UpdDif3TargetPos.map((key, i) => {
          return UpdTargetPos[i] + key * easeOutProgress
        })

        

         
        ref.current.position.x = UpdCameraStateLoc[0]
        ref.current.position.y = UpdCameraStateLoc[1]
        ref.current.position.z = UpdCameraStateLoc[2]

        myCamera.current.target.x = UpdTargetPosition[0]
        myCamera.current.target.y = UpdTargetPosition[1]
        myCamera.current.target.z = UpdTargetPosition[2]
        
        progress += .012
          

        }
     }
   })

    return(
        <>
        <PerspectiveCamera ref={ref} position={CameraLoc.position} makeDefault />
        {OrbitParam && <OrbitControls  ref={myCamera} camera={ref.current} target={new THREE.Vector3(OrbitLoc[0], OrbitLoc[1], OrbitLoc[2])} />}

        
        </>
    )
})

export default Cameras
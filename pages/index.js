import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'

import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui'

import { useFrame } from '@react-three/fiber'

import Scene from '../components/scene'

import scrollama from "scrollama"

import 'bootstrap/dist/css/bootstrap.min.css';


//Extra Functions
import CountPosDifference from '../components/Functions/CountPosDifference'


export default function Home() {


  const CameraAnimCoord = [
    {'position': [-11.153876556792174, 15.227648229652257, 64.68251686733406], 'rotation': [0.018932006244514115, -0.47663570975845293, 0.00868668108726853]},
    {'position': [256.2366685896037, 112.19251084415639, 75.41435492681605], 'rotation': [-0.3462307333686365, 0.8841013859965784, 0.2720759213944849]}
  ]

  const [CameraLoc, setCameraLoc] = useState(CameraAnimCoord[0])
  const [CamInterval, setCamInterval] = useState(false)
  const [GoStart, setGoStart] = useState(false)

  

  const [data, setData] = useState({
    positionX: -19,
    positionY: 58.327,
    positionZ: 281,
    cubeX: 100,
    cubeY: 15,
    cubeZ: 3,
    focusDistance: 0,
    focalLength: .02,
    bokehScale: 2,
    height: 480,
    pinX: 0,
    pinY: 0,
    pinZ: 0,
    lineAX: 0,
    lineAY: 0,
    lineAZ: 0,
    lineBX: 0,
    lineBY: 0,
    lineBZ: 0,
    cameraPX: -73.726,
    cameraPY: 50.864,
    cameraPZ: 144.60,
    cameraRX: -16.24,
    cameraRY: -40.54,
    cameraRZ: -10.73
    
  })

  const explosionBtnRef = useRef()

  useEffect(() => {
    const scroller = scrollama();

    scroller
      .setup({
        step: ".screens__block",
      })
      .onStepEnter((response) => {
        // { element, index, direction }
      })
      .onStepProgress((response) => {
        // { element, index, direction }
      })
      .onStepExit((response) => {
        // { element, index, direction }

        console.log(response)
        if(response.index == 0 && !CamInterval && response.direction == 'down') {
          console.log(response)
          setCamInterval(true)

          let progress = 0
          let step = .02

          useFrame(() => {
            if(GoStart) {
              const crvProgress = 1 - Math.cos((progress * Math.PI) / 2) 
              
              if(progress < 1 && response.direction == 'down') {
                progress += step
              } else {
                setGoStart(true)
                setCamInterval(false)
              }

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
          })
        }
       
      })

    // setup resize event
    window.addEventListener("resize", scroller.resize)
  })


  return (
    <div className={styles.container}>
    <DatGui data={data} onUpdate={setData}>
        <DatNumber path='positionX' label='positionX' min={-4000} max={4000} step={1} />
        <DatNumber path='positionY' label='positionY' min={-4000} max={4000} step={1} />
        <DatNumber path='positionZ' label='positionZ' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraPX' label='cameraPX' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraPY' label='cameraPY' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraPZ' label='cameraPZ' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraRX' label='cameraRX' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraRY' label='cameraRY' min={-4000} max={4000} step={1} />
        <DatNumber path='cameraRZ' label='cameraRZ' min={-4000} max={4000} step={1} />

        
      </DatGui>
    <div style={{width: '100vw', height: '100vh'}}>
    
      <Scene data={data} cameraLoc={CameraLoc} refs={{'explosion': explosionBtnRef}}/>

      <div className="screens">
        <div className="screens__block" data-step="a">
          <div className="screens__title">
            Дом с главного ракурса
          </div>
          <div className="screens__content">
            Opprinnelig ble planten dyrket i varmere strøk, spesielt i Asia, 
            Nord-Afrika og Mellom-Amerika, og der dyrkes det fortsatt mye. 
            Hasjen som beslaglegges i Norge kommer stort sett fra Marokko 
            og smugles hit via Spania og Nederland, men en stadig større del 
            av den cannabisen som brukes i Europa er også dyrket her. Også i 
            Norge er det avdekket flere cannabisplantasjer.
          </div>
          <div className="screens__btn" ref={ explosionBtnRef }>
            Show Explosion
          </div>
        </div>
        <div className="screens__block" data-step="b">
          <div className="screens__title">
            Взрыв-схема
          </div>
          <div className="screens__content">
            Mange tror kanskje at alle har prøvd cannabis, og i noen miljøer 
            er det nok mer vanlig enn i andre. Undersøkelser blant ungdom 
            viser at 91 % ikke har prøvd cannabis. Ungdata-undersøkelsen 
            (2020) viser at på ungdomstrinnet har 5 % av guttene og 3 % av 
            jentene prøvd cannabis siste året. På videregående er det flere 
            som sier at de har prøvd; 19 % av guttene og 11 % av jentene 
            svarer at de har prøvd siste året. For Oslo (2018) er tallene 
            høyere enn ellers i landet og på VG3 i Oslo har 38 % av guttene 
            og 23 % av jentene prøvd cannabis. Ifølge en europeisk 
            skoleundersøkelse er norske ungdommers bruk av cannabis blant 
            det laveste i Europa.
          </div>
        </div>
        <div className="screens__block" data-step="c">
          <div className="screens__title">
            Дополнительный ракурс
          </div>
          <div className="screens__content">
            Cannabis kan være skadelig for hjernen, særlig for en ung 
            hjerne i utvikling. Normalt er ikke hjernen ferdig utviklet 
            før du nærmer deg 25 år. Forskere er enige om at en hjerne 
            i utvikling ikke bør utsettes for cannabis. Bruk av cannabis 
            kan øke risikoen for depresjon og angst, særlig for sårbare 
            personer og dersom man begynner å bruke i ung alder.
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

/*
<DatNumber path='cubeX' label='Cube X' min={-100} max={100} step={1} />
        <DatNumber path='cubeY' label='Cube Y' min={-100} max={100} step={1} />
        <DatNumber path='cubeZ' label='Cube Z' min={-100} max={100} step={1} />

        <DatNumber path='focusDistance' label='focusDistance' min={-20} max={20} step={1} />
        <DatNumber path='focalLength' label='focalLength' min={-1} max={1} step={.01} />
        <DatNumber path='bokehScale' label='bokehScale' min={-20} max={20} step={1} />
        <DatNumber path='height' label='height' min={-1000} max={1000} step={1} />

        <DatNumber path='pinX' label='Pin X' min={-200} max={200} step={1} />
        <DatNumber path='pinY' label='Pin Y' min={-200} max={200} step={1} />
        <DatNumber path='pinZ' label='Pin Z' min={-200} max={200} step={1} />

        <DatNumber path='lineAX' label='lineAX' min={-200} max={200} step={1} />
        <DatNumber path='lineAY' label='lineAY' min={-200} max={200} step={1} />
        <DatNumber path='lineAZ' label='lineAZ' min={-200} max={200} step={1} />

        <DatNumber path='lineBX' label='lineBX' min={-200} max={200} step={1} />
        <DatNumber path='lineBY' label='lineBY' min={-200} max={200} step={1} />
        <DatNumber path='lineBZ' label='lineBZ' min={-200} max={200} step={1} />
*/


/*
Camera Pos1 = [-11.153876556792174, 15.227648229652257, 64.68251686733406]
Camera Rot1 = [0.018932006244514115, -0.47663570975845293, 0.00868668108726853]


Camera Pos2 = [256.2366685896037, 112.19251084415639, 75.41435492681605]
Camera Rot2 = [-0.3462307333686365, 0.8841013859965784, 0.2720759213944849]

Camera Pos3 = [90.65371400088107, 29.753998877156977, 88.38841410054383]
Camera Rot3 = [-0.053576354177663994, -0.10372788090675293, -0.0055526581666544]

*/

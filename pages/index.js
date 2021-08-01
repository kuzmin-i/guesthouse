import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'

import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui'

import { useFrame } from '@react-three/fiber'

import Scene from '../components/scene'

import scrollama from "scrollama"

import 'bootstrap/dist/css/bootstrap.min.css';


//Extra Functions
import CountPosDifference from '../components/Functions/CountPosDifference'
import { Reflector } from '@react-three/drei'


export default function Home() {

  

  const [data, setData] = useState({
    positionX: 56,
    positionY: 131,
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
    cameraRZ: -10.73,
    shadowMapSizeHeight: 512,
    shadowMapSizeWidth: 512,
    shadowCameraFar: 500,
    shadowCameraLeft: -100,
    shadowCameraRight: 100,
    shadowCameraTop: 100,
    shadowCameraBottom: -100,
    
  })

  const explosionBtnRef = useRef()


  //Block Scroll Progress 
  const ScreenA = useRef()

  const [displayScreen, setDisplayScreen] = useState(null)
  const [progressScreen, setProgressScreen] = useState({status: false, section: 'a'})

  const RemoveScreen = () => {
    setDisplayScreen({display: 'none'})
    setProgressScreen({status: true, section: 'b'})
  }

  const openBPanel = (i, check) => {
    if(!check) {setProgressScreen({status: false, section: 'b'})}
    setBPanelOpen(i)
  }

  const openExplosion = () => {
    setProgressScreen({status: true, section: 'c'})
  }

  const closeExplosion = () => {
    setProgressScreen({status: true, section: 'd'})
  }

  const openMainFacade = () => {
    console.log('He')
    setProgressScreen({status: true, section: 'g'})
  }

  const openBedroom = () => {
    setProgressScreen({status: true, section: 'e'})
  }

  const openKitchen = () => {
    setProgressScreen({status: true, section: 'f'})
  }

  const openEntranceGroup = () => {
    setProgressScreen({status: true, section: 'h'})
  }

  

  // Block B Panel

  const [BPanelOpen, setBPanelOpen] = useState(1)


  let checkBPanelEvent1, checkBPanelEvent2

  if(BPanelOpen != 1) { checkBPanelEvent1 = {onClick: () => openBPanel(1)} } else { checkBPanelEvent1 = false }
  if(BPanelOpen != 2) { checkBPanelEvent2 = {onClick: () => {
    console.log('section is ' + progressScreen.section)
    if(progressScreen.section == 'c') { 
      closeExplosion() 
      openBPanel(2, true)
    } else {
      openBPanel(2)
    }
  }} } else { checkBPanelEvent2 = false }

  let [WindowHeight, setWindowHeight] = useState('100vh !important')
  let _mobile = false

  const _el1 = useRef()
  const _el2 = useRef()

  useEffect(() => {
    console.log(window.innerHeight)
    

    if(window.innerHeight) {
      _el1.current.style.height = window.innerHeight + 'px'
      _el1.current.style.minHeight = window.innerHeight + 'px'

      _el2.current.style.height = window.innerHeight + 'px'
      _el2.current.style.minHeight = window.innerHeight + 'px'

      setWindowHeight(window.innerHeight + 'px !important')
    }

    _mobile = (window.innerWidth) ? true : false
  })

  console.log('Hey' + WindowHeight)

  return (
    <div ref={_el1} style={{height: WindowHeight, minHeight: WindowHeight}} className={styles.container}>
    <DatGui data={data} onUpdate={setData}>
        

        
      </DatGui>
    <div ref={_el2} style={{backgroundColor: '#C2D1BE', height: WindowHeight, minHeight: WindowHeight}} className={(!displayScreen) ? "layout a" : "layout b"}>
    
      <div className="map"><Scene data={data} progressScreen={ progressScreen }/></div>

      <div className="bar">
        <div className="bar__link">En</div>
        <div className="bar__link selected">Ru</div>
        <div className="bar__vl"/>
        <div className="bar__link">О проекте</div>
      </div>

      <div className={ (!displayScreen) ? "blocka" : "blocka hidden"}>
        <div className="blocka__cover">
          <div className="blocka__title">
            Гостевой дом&nbsp;на Юге
          </div>
          <div className="blocka__description">
            В&nbsp;первую минуту после пробуждения глаз ловит 
            панораму черноморского побережья с&nbsp;видом на&nbsp;море
            и&nbsp;луга, стелющиеся по&nbsp;горному склону до&nbsp;самого 
            берега.
            <br/><br/>
            Гость еще лежит в&nbsp;постели, но&nbsp;уже предчувствует 
            прогулку, наполненную ароматными запахами, бризом 
            и&nbsp;стрёкотом кузнечиков. На&nbsp;кухне внизу шипит пар 
            из&nbsp;кофемашины. Гость возвращается с&nbsp;чашкой, садится 
            на&nbsp;кровать и&nbsp;провожает остаток утра, потягивая кофе 
            и&nbsp;глядя из&nbsp;окна вниз, на&nbsp;склон, где уже резвятся дети.
          </div>
          <div className="blocka__btn" ref={ explosionBtnRef } onClick={ () => RemoveScreen() }>
            Покрутить модель
          </div>
        </div>
      </div>

      <div className={ (displayScreen) ? "blockb" : "blockb hidden"}>
        <div className="blockb__frame">
        <div className="blockb__btn" {...checkBPanelEvent1}>
          <div className="blockb__btnicon view"/>
          <div className={(BPanelOpen != 1) ? "blockb__btnlist" : "blockb__btnlist hidden"}>
            <div className={(BPanelOpen != 1) ? "blockb__btnframe-1 c1" : "blockb__btnframe-1 hidden"}>
              <div className="blockb__link">Формат обзора</div>
            </div>
          </div>
          <div className={(BPanelOpen == 1) ? "blockb__btnlist" : "blockb__btnlist hidden"}>
            <div className={(BPanelOpen == 1) ? "blockb__btnframe c1" : "blockb__btnframe hidden"}>
              <div className={(progressScreen.section == 'd' || progressScreen.section == 'b') ? "blockb__link selected" : "blockb__link"} onClick = { () => closeExplosion() }>Общий</div>
              <div className={(progressScreen.section == 'c') ? "blockb__link selected" : "blockb__link"} onClick={ () => openExplosion() }>Взрыв&nbsp;схема</div>
            </div>
          </div>
        </div>
        <div className="blockb__btn" {...checkBPanelEvent2}>
          <div className="blockb__btnicon panorama"/>
          <div className={(BPanelOpen != 2) ? "blockb__btnlist" : "blockb__btnlist hidden"}>
            <div className={(BPanelOpen != 2) ? "blockb__btnframe-1 c2" : "blockb__btnframe-1 hidden"}>
              <div className="blockb__link">Видовые&nbsp;точки</div>
            </div>
          </div>
          <div className={(BPanelOpen == 2) ? "blockb__btnlist" : "blockb__btnlist hidden"}>
            <div className={(BPanelOpen == 2) ? "blockb__btnframe c2" : "blockb__btnframe hidden"}>
              <div className={(progressScreen.section == 'g' || progressScreen.section == 'd' || progressScreen.section == 'b') ? "blockb__link selected" : "blockb__link"} onClick={ () => openMainFacade() }>Главный&nbsp;фасад</div>
              <div className={(progressScreen.section == 'e') ? "blockb__link selected" : "blockb__link"} onClick={ () => openBedroom() }>Спальная</div>
              <div className={(progressScreen.section == 'f') ? "blockb__link selected" : "blockb__link"} onClick={ () => openKitchen() }>Столовая</div>
              <div className={(progressScreen.section == 'h') ? "blockb__link selected" : "blockb__link"} onClick={ () => openEntranceGroup() }>Входная&nbsp;группа</div>
            </div>
          </div>
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

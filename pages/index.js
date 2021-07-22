import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui'

import Scene from '../components/scene'
import Ansc from '../components/ansc'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState({
    positionX: -19,
    positionY: 58.327,
    positionZ: 281,
    mapSizeHeight: 512,
    mapSizeWidth: 512,
    dIntensity: 1.5,
    cubeX: 100,
    cubeY: 15,
    cubeZ: 3,
    focusDistance: 0,
    focalLength: .02,
    bokehScale: 2,
    height: 480
  })


  return (
    <div className={styles.container}>
    <DatGui data={data} onUpdate={setData}>
        <DatNumber path='positionX' label='positionX' min={-4000} max={4000} step={1} />
        <DatNumber path='positionY' label='positionY' min={-4000} max={4000} step={1} />
        <DatNumber path='positionZ' label='positionZ' min={-4000} max={4000} step={1} />
        <DatNumber path='mapSizeWidth' label='shadow-mapSize-width' min={-4000} max={4000} step={1} />
        <DatNumber path='mapSizeHeight' label='shadow-mapSize-height' min={-4000} max={4000} step={1} />
        <DatNumber path='mapSizeWidth' label='shadow-mapSize-width' min={-4000} max={4000} step={1} />
        <DatNumber path='dIntensity' label='Intensity' min={0} max={4} step={.1} />
        

        <DatNumber path='cubeX' label='Cube X' min={-100} max={100} step={1} />
        <DatNumber path='cubeY' label='Cube Y' min={-100} max={100} step={1} />
        <DatNumber path='cubeZ' label='Cube Z' min={-100} max={100} step={1} />

        <DatNumber path='focusDistance' label='focusDistance' min={-20} max={20} step={1} />
        <DatNumber path='focalLength' label='focalLength' min={-1} max={1} step={.01} />
        <DatNumber path='bokehScale' label='bokehScale' min={-20} max={20} step={1} />
        <DatNumber path='height' label='height' min={-1000} max={1000} step={1} />
      </DatGui>
    <div style={{width: '100vw', height: '100vh'}}>
      <Scene data={data}/>
    </div>
    </div>
  )
}

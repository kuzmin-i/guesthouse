import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Scene from '../components/scene'

export default function Home() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <Scene/>
    </div>
  )
}

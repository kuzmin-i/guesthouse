/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const BUnderfloor = React.forwardRef((props, ref) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/1/BUnderfloor.gltf')

  let _geometry = nodes.Underplane_2.geometry

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh receiveShadow castShadow geometry={nodes.Underplane_1.geometry} material={materials['Material.001']} />
        <mesh receiveShadow castShadow geometry={nodes.Underplane_2.geometry} material={materials['Material.012']} />
        <mesh receiveShadow castShadow geometry={nodes.Underplane_2.geometry}>
          <shadowMaterial attach="material" transparent opacity={.4} />
        </mesh>
        <mesh receiveShadow castShadow geometry={nodes.Underplane_3.geometry} material={materials['Material.013']} />
      </group>
    </group>
  )
}
)

BUnderfloor.displayName = "BUnderfloor"

useGLTF.preload('/1/BUnderfloor.gltf')

export default BUnderfloor

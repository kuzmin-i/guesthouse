import { useRef, useEffect } from "react";
import { CubeTextureLoader } from "three";
import {
  useLoader,
  useFrame,
  useThree
} from "@react-three/fiber";

import * as THREE from 'three';

const SkyBox1 = () => {
  const skyboxTextures = [
    "/env/1.jpg",
    "/env/2.jpg",
    "/env/3.jpg",
    "/env/4.jpg",
    "/env/5.jpg",
    "/env/6.jpg"
  ]

  const controlsRef = useRef();
  // CubeTextureLoader.load accepts a string[] instead of string
  // @ts-ignore
  const [cubeMapTexture] = useLoader(CubeTextureLoader, [skyboxTextures]);
  const {
    scene,
    camera,
    invalidate,
    gl: { domElement }
  } = useThree();

  useEffect(() => {
    const previous = scene.background;
    cubeMapTexture.encoding = THREE.sRGBEncoding;
    scene.background = cubeMapTexture;
    return () => {
      scene.background = previous;
    };
  }, [cubeMapTexture, scene]);
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.addEventListener("change", invalidate);
    }
  }, [invalidate, camera]);

  useFrame(() => {
    if (controlsRef.current) {
      return controlsRef.current.update();
    }
    return false;
  });

  return null
};

export default SkyBox1

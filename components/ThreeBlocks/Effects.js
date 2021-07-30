import React from 'react'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, HueSaturation, SSAO, BrightnessContrast, GammaCorrection } from '@react-three/postprocessing'

function Effects() {
  return (
      <EffectComposer>
        <HueSaturation saturation={.2} />
        <BrightnessContrast  contrast={0.18}/>
      </EffectComposer>
   
  )
}

export default Effects
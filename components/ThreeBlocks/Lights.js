import { Box } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

const Lights = ({data}) => {

    const dirLight = useRef()
    const myCube = useRef()

    const [dirHelpLight, setDirHelpLight] = useState()

    //Here HelpControls starts following <directionalLight>
    useEffect(() => {
        
        if(dirLight.current) { 
            setDirHelpLight(dirLight.current)
            dirLight.current.target = myCube.current 
        }
    })

    useEffect(() => {
        
    })

    return(
        <>
            <ambientLight  intensity={0.1} />
            <directionalLight
                color="#FFEDE1"
                intensity={2.5}
                ref={dirLight}
                castShadow
                position={[data.positionX, data.positionY, data.positionZ]}
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                shadow-camera-far={500}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />
            {dirHelpLight && <directionalLightHelper args={[dirHelpLight, 5]} />}
            
            
            <Box castShadow ref={myCube} receiveShadow  position={[data.cubeX, data.cubeY, data.cubeZ]} scale={[1, 1, 1]}>
                <meshStandardMaterial attach="material" color="white"  />
            </Box>

        </>
    )
}

export default Lights
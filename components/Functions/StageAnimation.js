import CountPosDifference from './CountPosDifference'

import { useFrame } from '@react-three/fiber'

const StageAnimation = ({type, reverse, objects}) => {

    if(type == 'click') {
        let progress = (!reverse) ? 0 : 1
        const step = .02

        const moveProgress = setInterval(() => {
            const crvProgress = 1 - Math.cos((progress * Math.PI) / 2) 

            //Here we move all selected objects during the animation

            /* objects = [
                {ref: ref, startPosition: [pX, pY, pZ], endPosition: [pX, pY, pZ]}
            ]*/
            
            objects.map((keyObject) => {

                // Here we find the vector
                const Vector3Diff = CountPosDifference(keyObject.startPosition, keyObject.endPosition)

                // Here we move the object
                const CountMovement = (i) => {
                    return keyObject.startPosition[i] + Vector3Diff[i] * crvProgress
                }

                if(keyObject.line && keyObject.ref) {
                    keyObject.ref.current.geometry.setPositions([keyObject.startPosition, [CountMovement(0), CountMovement(1), CountMovement(2)]].flat())
                } else if(!keyObject.line) {
                    keyObject.ref.current.position.x = CountMovement(0)
                    keyObject.ref.current.position.y = CountMovement(1)
                    keyObject.ref.current.position.z = CountMovement(2)
                }
            })

            if(!reverse && progress >= 1) {
                clearInterval(moveProgress)
                return false
            } if(reverse && progress <= 0) {
                clearInterval(moveProgress)
                return false
            } else {
                progress = (!reverse) ? progress + step : progress - step
            }
        }, 20
        )
    }
}

export default StageAnimation
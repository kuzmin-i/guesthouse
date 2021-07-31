
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber' 
import { Line, Html } from '@react-three/drei'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/* Three JS extra components */
//import Pin from '../ThreeBlocks/Pin'
import ModelGLTF from '../ThreeBlocks/ModelGLTF'
import BRoof from '../ThreeBlocks/BRoof'
import BUnderfloor from '../ThreeBlocks/BUnderfloor'

/* Extra Functions */
import ToRefsObject from '../Functions/ToRefsObject'
import CountPosDifference from '../Functions/CountPosDifference'

const ExplosionGroup = ({progressScreen}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {props.name}
        </Tooltip>
      );


    const GLTFPreRefs = ['partitions', 'roof', 'stairs', 'furniture', 'underfloor']
    const GLTFRefs = ToRefsObject(GLTFPreRefs)

    const GroupPreRefs = ['group1', 'group2']
    const GroupRefs = ToRefsObject(GroupPreRefs)

    const LinePreRefs = ['line1', 'line2', 'line3', 'line4']
    const LineRefs = ToRefsObject(LinePreRefs)

    const HtmlPreRef = ['pin1', 'pin2', 'pin3']
    const HtmlRefs = ToRefsObject(HtmlPreRef)

    const _ExplosionGroup = useRef()

    let StAnimReverse = (progressScreen.section == 'd') ? true: false

    let StageAnimation

    if(progressScreen.status && progressScreen.section) {
        StageAnimation = {
            'type': 'click',
            'reverse': StAnimReverse,
            'objects': [
                {'ref': GroupRefs.group1, 'startPosition': [0, 0, 0], 'endPosition': [0, 75, 0]},
                {'ref': GroupRefs.group2, 'startPosition': [0, 0, 0], 'endPosition': [0, 105, 0]},
                {'ref': LineRefs.line1, 'line': true, 'startPosition': [38, 43, -52], 'endPosition': [38, 153, -52]},
                {'ref': LineRefs.line2, 'line': true, 'startPosition': [38, 43, -105], 'endPosition': [38, 153, -105]},
                {'ref': LineRefs.line3, 'line': true, 'startPosition': [169, 31, -52], 'endPosition': [169, 141, -52]},
                {'ref': LineRefs.line4, 'line': true, 'startPosition': [169, 31, -105], 'endPosition': [169, 141, -105]},
            ]
            }
    }

    //Animation Starts
            let progress = (StAnimReverse) ? 1 : 0
            const step = .02

            const checkScreenSection = (progressScreen.section == 'c' || progressScreen.section == 'd') ? true : false
    
            useFrame(() => {
                
                if(progressScreen.status && checkScreenSection && StageAnimation) {
                    
                    const _progressExpression1 = (!StAnimReverse && progress < 1) ? true : false
                    const _progressExpression2 = (StAnimReverse && progress > 0) ? true : false

                    if(_progressExpression1 || _progressExpression2) {
                    const crvProgress = 1 - Math.cos((progress * Math.PI) / 2) 
        
                    //Here we move all selected objects during the animation
        
                    /* objects = [
                        {ref: ref, startPosition: [pX, pY, pZ], endPosition: [pX, pY, pZ]}
                    ]*/
                    
                    StageAnimation.objects.map((keyObject) => {
        
                        // Here we find the vector
                        const Vector3Diff = CountPosDifference(keyObject.startPosition, keyObject.endPosition)
        
                        // Here we move the object
                        const CountMovement = (i) => {
                            return keyObject.startPosition[i] + Vector3Diff[i] * crvProgress
                        }
        
                        if(keyObject.line && keyObject.ref) {
                            const LineUpdGeometry = [keyObject.startPosition, [CountMovement(0), CountMovement(1), CountMovement(2)]].flat()
                            keyObject.ref.current.geometry.setPositions(LineUpdGeometry)
                            
                        } else if(!keyObject.line) {
                            keyObject.ref.current.position.x = CountMovement(0)
                            keyObject.ref.current.position.y = CountMovement(1)
                            keyObject.ref.current.position.z = CountMovement(2)
                        }
                    })
                    progress = (!StAnimReverse) ? progress + step : progress - step

                    } else {
                        StageAnimation = null
                    }
                }
            })
    //Animation End


    return(
        <group ref={_ExplosionGroup} >
            
            

            <group ref={GroupRefs.group1}>
                <ModelGLTF model="/1/Partitions.glb" ref={GLTFRefs.partitions}/>
                <ModelGLTF model="/1/Furniture.glb" ref={GLTFRefs.furniture}/>
                <BUnderfloor ref={GLTFRefs.underfloor}/>
                <ModelGLTF model="/1/Stairs.glb" ref={GLTFRefs.stairs}/>

                {/*<Pin position={ [136, 14, -69] } name="Столовая" ref={HtmlRefs.pin2}/>
                <Pin position={ [46, 37, -79] } name="Спальная комната" ref={HtmlRefs.pin3} />
                <Pin position={ [74, 33, -54] } name="Спальная комната" />
                */}
                <Html
                  as="div"
                  position={ [136, 14, -69] }
                  occlude
                  center
                >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip({'name': 'Столовая'})}
                    >
                      <div className="gl-pin"></div>
                    </OverlayTrigger>
                 </Html>

                 <Html
                  as="div"
                  position={ [46, 37, -79] }
                  occlude
                  center
                >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip({'name': 'Спальная комната'})}
                    >
                      <div className="gl-pin"></div>
                    </OverlayTrigger>
                 </Html>

                 <Html
                  as="div"
                  position={ [74, 33, -54] }
                  occlude
                  center
                >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 50, hide: 100 }}
                      overlay={renderTooltip({'name': 'Лестница'})}
                    >
                      <div className="gl-pin"></div>
                    </OverlayTrigger>
                 </Html>

                
            </group>
            
            <group ref={GroupRefs.group2}>
                
                <BRoof ref={GLTFRefs.roof}/>
               { /*<Pin position={ [123, 39, -25] } name="Узел кровли" ref={HtmlRefs.pin1} />*/}
            </group>

            <Line
                points={[[38, 43, -52], [38, 43, -52]]}
                color="grey"
                name="lineA"
                lineWidth={.15} 
                dashed={false} 
                ref={LineRefs.line1} 
            />

            <Line
                points={[[38, 43, -105], [38, 43, -105]]} 
                color="grey"
                name="lineB"
                lineWidth={.15} 
                dashed={false}
                ref={LineRefs.line2} 
            />

            <Line
                points={[[169, 31, -52], [169, 31, -52]]} 
                color="grey"
                name="lineC"
                lineWidth={.15} 
                dashed={false} 
                ref={LineRefs.line3} 
            />

            <Line
                points={[[169, 31, -105], [169, 31, -105]]} 
                color="grey"
                name="lineD"
                lineWidth={.15} 
                dashed={false} 
                ref={LineRefs.line4} 
            />
        </group>
    )
}

export default ExplosionGroup

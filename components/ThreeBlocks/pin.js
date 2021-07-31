import { Html} from '@react-three/drei'

//import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
//import Tooltip from 'react-bootstrap/Tooltip';

import React, {useRef} from 'react'

/*const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.name}
    </Tooltip>
  );
  */

const Pin = React.forwardRef(({position, name}, ref) => {

    return(
        <group ref={ref}>
            <Html
                as="div"
                position={ position }
                occlude
                center
            >
                    <div className="gl-pin"></div>
            </Html>
        </group>
    )
})

export default Pin

/*
<div style={{position: 'absolute', left: '70px', padding: '5px 20px', background: 'white', fontSize: '12px'}}>Узел кровли</div>
*/

/*
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 50, hide: 100 }}
                    overlay={renderTooltip({'name': name})}
                >
                    <div className="gl-pin"></div>
                </OverlayTrigger>
                */
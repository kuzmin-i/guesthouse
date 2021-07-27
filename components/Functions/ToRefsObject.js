import {useRef} from 'react'

const ToRefsObject = (refsArr) => {
    const ArrKeys = refsArr.map((key) => [key, useRef()])
    return Object.fromEntries(ArrKeys)
}

export default ToRefsObject
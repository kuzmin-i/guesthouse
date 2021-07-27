const CountPosDifference = (startPos, endPos) => {
    const vector = startPos.map((am, i) => {
        return endPos[i] - startPos[i]
    })

    return vector
}

export default CountPosDifference
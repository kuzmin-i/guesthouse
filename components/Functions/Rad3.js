const Rad3 = (arr) => {
    const Rad = (number) => {
        return number / 180 * Math.PI
    }

    return [Rad(arr[0]), Rad(arr[1]), Rad[2]]
}

export default Rad3
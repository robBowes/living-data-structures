// const rand = () => Math.floor(Math.random() * 255)
export function randomGrey() {
    return Math.floor(Math.random() * 255)
}
export function randomColour() {
    return [randomGrey(), randomGrey(), randomGrey()]
}

export function trace (arg) {
    console.log(arg)
    return arg
}
export function randomColour() {
    const rand = () => Math.floor(Math.random() * 255)
    return [rand(), rand(), rand()]
}
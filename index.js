/* global ellipse, var2 */
const HEIGHT = window.innerWidth * 0.9
const WIDTH = window.innerHeight * 0.9
const stack = new Stack(HEIGHT, WIDTH)
const add = () => stack.add({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
})

document.addEventListener("click", add)
document.addEventListener("keydown", stack.remove)

function setup() {
    createCanvas(HEIGHT, WIDTH);
    background(255);
    frameRate(25)
}

function draw() {
    background(255);
    stack.draw()
}
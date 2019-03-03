/* global ellipse, var2 */
const HEIGHT = window.innerWidth * 0.9
const WIDTH = window.innerHeight * 0.9

const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies

let engine = Engine.create()

const myWorld = new MyWorld(Matter, engine)


const stack = new Stack(HEIGHT, WIDTH, myWorld)

const add = () => stack.add({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
})

document.addEventListener("click", add)
document.addEventListener("keydown", stack.remove)

function setup() {
    createCanvas(HEIGHT, WIDTH)
    background(0)
    frameRate(25)
    Engine.run(engine)
}

function draw() {
    background(0);
    myWorld.draw()
}
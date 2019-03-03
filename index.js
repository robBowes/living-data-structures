import MyWorld from "./my-world.js"
import Stack from "./stack.js"
import Listeners from "./listeners.js"

const listeners = new Listeners()

const canvas = document.querySelector("#sketch")
const canvasAttrs = canvas.getBoundingClientRect()

function sketch(p5) {
    const HEIGHT = canvasAttrs.height
    const WIDTH = canvasAttrs.width
    const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies
    
    const engine = Engine.create()
    const myWorld = new MyWorld(Matter, engine, p5)
    const stack = new Stack(WIDTH, HEIGHT, myWorld, listeners)

    p5.setup = function() {
        p5.createCanvas(WIDTH, HEIGHT)
        p5.background(0)
        p5.frameRate(25)
        Engine.run(engine)
    }
    
    p5.draw = function() {
        p5.background(0);
        myWorld.draw()
    }
}

new p5(sketch, canvas)
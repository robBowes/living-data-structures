import MyWorld from "./src/my-world.js"
import Stack from "./src/stack.js"
import Queue from "./src/queue.js"
import Listeners from "./src/listeners.js"

const canvas = document.querySelector("#sketch")
const canvasAttrs = canvas.getBoundingClientRect()

const listeners = new Listeners(canvas)

function sketch(p5) {
    const HEIGHT = canvasAttrs.height
    const WIDTH = canvasAttrs.width
    const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies
    
    const engine = Engine.create()
    let myWorld 

    listeners.selectStack = () => {
        myWorld = new MyWorld(Matter, engine, p5, listeners, WIDTH, HEIGHT)
        new Stack(myWorld, listeners)
    }
    listeners.selectQueue = () => {
        myWorld = new MyWorld(Matter, engine, p5, listeners,WIDTH, HEIGHT)
        new Queue(myWorld, listeners)
    }

    p5.setup = function() {
        p5.createCanvas(WIDTH, HEIGHT)
        p5.background(0)
        p5.frameRate(25)
        Engine.run(engine)
    }
    
    p5.draw = function() {
        p5.background(0);
        if (myWorld) {
            myWorld.draw()
        }
    }
}

new p5(sketch, canvas)
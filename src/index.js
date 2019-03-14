import MyWorld from "./my-world.js"
import Stack from "./stack.js"
import Queue from "./queue.js"
import PriorityQueue from "./priority-queue.js"
import Listeners from "./listeners.js"
import {draw} from "./draw.js"
import {randomColour} from "./utils.js"

const canvas = document.querySelector("#sketch")
const canvasAttrs = canvas.getBoundingClientRect()
const HEIGHT = canvasAttrs.height
const WIDTH = canvasAttrs.width

const listeners = new Listeners(canvas)

function sketch(p5) {
    
    const engine = Matter.Engine.create()
    const render = draw(p5)
    let myWorld
    
    listeners.selectStack = () => {
        myWorld = new MyWorld({Matter, engine, listeners,p5, WIDTH, HEIGHT, dataType: new Stack()})
    }
    listeners.selectQueue = () => {
        myWorld = new MyWorld({Matter, engine, listeners,p5,WIDTH, HEIGHT, dataType: new Queue()})
    }
    listeners.selectPriorityQueue = () => {
        myWorld = new MyWorld({
            Matter,
            engine,
            listeners,
            p5,
            WIDTH,
            HEIGHT,
            dataType: new PriorityQueue((a, b) => a.value > b.value )
        })
    }
    

    p5.setup = function() {
        p5.createCanvas(WIDTH, HEIGHT)
        p5.background(0)
        p5.frameRate(25)
        Matter.Engine.run(engine)
        
    }
    
    p5.draw = function() {
        p5.background(0);
        if (myWorld) {
            render(myWorld)
        }
        
    }
}

const p5Canvas = new p5(sketch, canvas)

window.p5Canvas = p5Canvas
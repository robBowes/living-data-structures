import MyWorld from "./my-world.js"
import Stack from "./stack.js"

function sketch(p5) {
    const HEIGHT = window.innerWidth * 0.9
    const WIDTH = window.innerHeight * 0.9
    const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies
    
    const engine = Engine.create()
    const myWorld = new MyWorld(Matter, engine, p5)
    const stack = new Stack(HEIGHT, WIDTH, myWorld, p5)

    document.addEventListener("click", () => stack.add())
    document.addEventListener("keydown", stack.remove)

    p5.setup = function() {
        p5.createCanvas(HEIGHT, WIDTH)
        p5.background(0)
        p5.frameRate(25)
        Engine.run(engine)
    }
    
    p5.draw = function() {
        p5.background(0);
        myWorld.draw()
    }
}

new p5(sketch)
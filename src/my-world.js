import Burst from "./burst.js"
import Particle from './particle.js'
import {randomColour} from "./utils.js"
import Stack from './stack.js'


const render = p5 => ({
    "Circle Body"(body) {
        p5.stroke(...body.node.value)
        p5.fill(body.node.value)
        p5.ellipse(body.position.x, body.position.y, 10, 10)
    },
    "Constraint"(constraint) {
        const {
            bodyA,
            bodyB
        } = constraint
        p5.stroke(255)
        p5.line(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
    },
    burst(burst) {
        p5.stroke(burst.color)
    },
    particle(particle) {
        p5.point(particle.position.x, particle.position.y)
    }
})

export default class MyWorld {
    constructor(Matter, engine, p5, listeners, width, height) {
        this.Matter = Matter
        this.engine = engine
        this.p5 = p5
        this.render = render(p5)
        this.bursts = []
        listeners.clear = this.clear.bind(this)
        this.bodies = []
        this.constraints = []
        this.width = width
        this.height = height
        this.addAnchor.bind(this)
        this.listeners = listeners
    }
    draw() {
        this.engine.world.constraints.forEach(constraint => this.render[constraint.label](constraint))
        this.bodies.forEach(body => this.render[body.label](body))
        const drawParticle = particle => {
            Particle.update(particle)
            this.render.particle(particle)
        }
        this.bursts.forEach(burst => {
            this.render.burst(burst)
            burst.particles.forEach(drawParticle)
            if (this.p5.frameCount % 5 === 0) {
                burst.particles = burst.particles.filter(particle => particle.energy > 0)
            }
        })
        if (this.p5.frameCount % 50 === 0) {
            this.bursts = this.bursts.filter(burst => burst.particles.length > 0)
        }
    }
    addNode(node) {
        const body = this.Matter.Bodies.circle(this.p5.mouseX, this.p5.mouseY, 10)
        this.Matter.World.add(this.engine.world, body)
        body.node = node
        this.bodies = [...this.bodies, body]
        return body
    }
    addBurst(position, color) {
        const burst = new Burst(position, color)
        this.bursts = [...this.bursts, burst]
    }
    addAnchor() {
        const body = this.Matter.Bodies.circle(this.width / 2, 0, 10, {
            isStatic: true
        })
        this.Matter.World.add(this.engine.world, body)
        this.anchor = body
    }
    linkToAnchor(body) {
        console.log(this.anchor);
        console.log(body);
        this.filterConstraints(c => c.bodyA !== this.anchor && c.bodyB !== this.anchor)
        // this.addAnchor()
        const constraint = this.Matter.Constraint.create({
            bodyA: body,
            bodyB: this.anchor,
            damping: 0.1,
            length: 20,
            stiffness: 0.3,
        })
        this.Matter.World.add(this.engine.world, constraint)
    }
    linkNodes(first, second) {
        const constraint = this.Matter.Constraint.create({
            bodyA: first,
            bodyB: second,
            damping: 0.1,
            length: 20,
            stiffness: 0.3,
        })
        this.Matter.World.add(this.engine.world, constraint)
    }
    removeNode(node) {
        this.filterConstraints(c => c.bodyA.id !== node.id && c.bodyB.id !== node.id)
        const deleteNode = body => () => {
            if (this.bodies.length) {
                this.addBurst(body.position, body.node.value)
                this.bodies = this.bodies.filter(n => n !== node)
                this.Matter.Composite.remove(this.engine.world, body)
            }
        }
        setTimeout(deleteNode(node), 500)
    }
    clear() {
        this.engine.world.bodies = []
        this.engine.world.constraints = []
    }
    filterConstraints(pred) {
        this.engine.world.constraints = this.engine.world.constraints.filter(pred)
    }
    linkListeners(obj) {
        if (obj instanceof Stack) {
            const add = () => {
                if (obj.length === 0) {
                    this.addAnchor(obj.rootX, obj.rootY)
                    const node = obj.add(randomColour())
                    this.linkToAnchor(this.addNode(node))
                } else {
                    const node = obj.add(randomColour())
                    const body = this.addNode(node)
                    this.linkNodes(this.findBody(node.previous.id), body)
                }
            }
            const remove = () => {
                if(obj.length > 0) {
                    const node = obj.remove()
                    this.removeNode(this.findBody(node.id))
                }
            }
            this.listeners.KeyA = add
            this.listeners.KeyR = remove
            this.listeners.clickTop = add
            this.listeners.clickBottom = remove
        }
    }
    findBody(id) {
        return this.bodies.find(body => body.node.id === id)
    }
}
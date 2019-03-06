import Burst from "./burst.js"
import Particle from './particle.js'


const render = p5 => ({
    "Circle Body"(node) {
        p5.stroke(...node.value)
        p5.fill(node.value)
        p5.ellipse(node.body.position.x, node.body.position.y, 10, 10)
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
        this.nodes = []
        this.constraints = []
        this.width = width
        this.height = height
        this.addAnchor.bind(this)
    }
    draw() {
        this.engine.world.constraints.forEach(constraint => this.render[constraint.label](constraint))
        this.nodes.forEach(node => this.render[node.body.label](node))
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
    addNode(node, anchor) {
        const body = this.Matter.Bodies.circle(this.p5.mouseX, this.p5.mouseY, 10)
        this.Matter.World.add(this.engine.world, body)
        node.body = body
        this.nodes = [...this.nodes, node]
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
        this.filterConstraints(c => c.bodyA !== this.anchor && c.bodyB !== this.anchor)
        // this.addAnchor()
        const constraint = this.Matter.Constraint.create({
            bodyA: body.body,
            bodyB: this.anchor,
            damping: 0.1,
            length: 20,
            stiffness: 0.3,
        })
        this.Matter.World.add(this.engine.world, constraint)
    }
    linkNodes(first, second) {
        const constraint = this.Matter.Constraint.create({
            bodyA: first.body,
            bodyB: second.body,
            damping: 0.1,
            length: 20,
            stiffness: 0.3,
        })
        this.Matter.World.add(this.engine.world, constraint)
    }
    removeNode(node) {
        this.filterConstraints(c => c.bodyA.id !== node.body.id && c.bodyB.id !== node.body.id)
        const deleteNode = node => () => {
            if (this.nodes.length) {
                this.addBurst(node.body.position, node.value)
                this.nodes = this.nodes.filter(n => n !== node)
                this.Matter.Composite.remove(this.engine.world, node.body)
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
}
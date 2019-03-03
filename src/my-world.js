import Burst from "./burst.js"


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
    particle(particle) {
        p5.stroke(particle.color)
        p5.point(particle.position.x, particle.position.y)
    }
})

export default class MyWorld {
    constructor(Matter, engine, p5, listeners) {
        this.Matter = Matter
        this.engine = engine
        this.p5 = p5
        this.render = render(p5)
        this.particles = []
        listeners.clear = this.clear.bind(this)
        this.nodes = []
        this.constraints = []
    }
    draw() {
        this.engine.world.constraints.forEach(constraint => this.render[constraint.label](constraint))
        this.nodes.forEach(node => this.render[node.body.label](node))
        this.particles.forEach(particle => particle.update())
        this.particles.forEach(particle => this.render.particle(particle))
        this.particles = this.particles.filter(particle => particle.energy > 0)
    }
    addNode(node, position, options) {
        const body = this.Matter.Bodies.circle(position.x, position.y, 10, options)
        this.Matter.World.add(this.engine.world, body)
        node.body = body
        this.nodes = [...this.nodes, node]
    }
    addBurst(position, color) {
        const burst = new Burst(position, color)
        this.particles = [...this.particles, ...burst.createParticles()]
    }
    addAnchor(x, y) {
        const body = this.Matter.Bodies.circle(x, y, 10, {isStatic: true})
        this.Matter.World.add(this.engine.world, body)
        return {body}
    }
    linkNodes(first, second) {
        const constraint = this.Matter.Constraint.create({
            bodyA: first.body,
            bodyB: second.body,
            damping: 0.05,
            length: 20,
            stiffness: 0.2,
        })
        this.Matter.World.add(this.engine.world, constraint)
    }
    removeNode(node) {
        this.engine.world.constraints = this.engine.world.constraints.filter(c => c.bodyA.id !== node.body.id && c.bodyB.id !== node.body.id)
        const deleteNode = node => () => {
            this.addBurst(node.body.position, node.value)
            this.nodes = this.nodes.filter(n => n !== node)
            this.Matter.Composite.remove(this.engine.world, node.body)
        }
        setTimeout(deleteNode(node), 500)
    }
    clear() {
        this.engine.world.bodies = []
        this.engine.world.constraints = []
    }
}
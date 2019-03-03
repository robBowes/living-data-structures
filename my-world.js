
const render = p5 => ({
    "Circle Body"(circle) {
        p5.stroke(255)
        p5.fill(255)
        p5.ellipse(circle.position.x, circle.position.y, 10, 10)
    },
    "Constraint"(constraint) {
        const {
            bodyA,
            bodyB
        } = constraint
        p5.stroke(255)
        p5.line(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
    }
})

export default class MyWorld {
    constructor(Matter, engine, p5) {
        this.Matter = Matter
        this.engine = engine
        this.p5 = p5
        this.render = render(p5)
    }
    draw() {
        this.engine.world.constraints.forEach(constraint => this.render[constraint.label](constraint))
        this.engine.world.bodies.forEach(body => this.render[body.label](body))
    }
    addNode(node, options) {
        const body = this.Matter.Bodies.circle(node.pos.x, node.pos.y, 10, options)
        this.Matter.World.add(this.engine.world, body)
        node.body = body
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
        const deleteNode = node => () => this.engine.world.bodies = this.engine.world.bodies.filter(b => b.id !== node.body.id)
        setTimeout(deleteNode(node), 1000)
    }
}
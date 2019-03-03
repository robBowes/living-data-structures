function random1() {
    return Math.random() - 0.5
}

const render = {
    "Circle Body"(circle) {
        stroke(255)
        fill(255)
        ellipse(circle.position.x, circle.position.y, 10, 10)
    },
    "Constraint"(constraint) {
        const {
            bodyA,
            bodyB
        } = constraint
        stroke(255)
        line(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
    }
}

class Node {
    constructor(value, next, previous, x, y, direction) {
        this.value = value
        this.pos = createVector(x, y)
        this.next = next
        this.previous = previous
        this.direction = direction
    }
}

class Stack {
    constructor(height, width, world) {
        this.root = null
        this.screenHeight = height
        this.screenWidth = width
        this.world = world
        this.rootX = this.screenHeight / 2
        this.rootY = 0
        this.remove = this.remove.bind(this)
    }
    add(value) {
        if (!this.root) {
            this.root = new Node(value, null, null, this.rootX, this.rootY, createVector(0, 1))
            this.world.addNode(this.root, {
                isStatic: true
            })
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail, tail.body.position.x + 20 * tail.direction.x, tail.body.position.y + 20 * tail.direction.y, createVector(random1(), random1()))
            tail.next = node
            this.world.addNode(node)
            this.world.linkNodes(tail, node)
        }
    }
    remove() {
        if (!this.root) return
        const tail = this.findTail(this.root)
        this.world.removeNode(tail)
        tail.previous.next = null
        return tail
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
}

class MyWorld {
    constructor(Matter, engine) {
        this.Matter = Matter
        this.engine = engine
    }
    draw() {
        this.engine.world.constraints.forEach(constraint => {
            render[constraint.label](constraint)
        })
        this.engine.world.bodies.forEach(body => {
            render[body.label](body)
        })
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
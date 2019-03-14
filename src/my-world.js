import Burst from "./burst.js"
import Particle from './particle.js'
import {randomColour, randomGrey, trace} from "./utils.js"


export default class MyWorld {
    constructor(args) {
        this.Matter = args.Matter
        this.engine = args.engine
        this.bursts = []
        args.listeners.clear = this.clear.bind(this)
        this.bodies = []
        this.constraints = []
        this.width = args.WIDTH
        this.height = args.HEIGHT
        this.addAnchor.bind(this)
        this.listeners = args.listeners
        this.linkListeners(args.dataType)
        this.p5 = args.p5
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
        this.filterConstraints(c => c.bodyA !== this.anchor && c.bodyB !== this.anchor)
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
        if (first && second) {
            const constraint = this.Matter.Constraint.create({
                bodyA: first,
                bodyB: second,
                damping: 0.1,
                length: 20,
                stiffness: 0.3,
            })
            this.Matter.World.add(this.engine.world, constraint)
        }
    }
    removeNode(body) {
        this.filterConstraints(c => c.bodyA.id !== body.id && c.bodyB.id !== body.id)
        const deleteNode = body => () => {
            if (this.bodies.length) {
                this.addBurst(body.position, body.node.value)
                this.bodies = this.bodies.filter(b => b !== body)
                this.Matter.Composite.remove(this.engine.world, body)
            }
        }
        setTimeout(deleteNode(body), 500)
    }
    clear() {
        this.engine.world.bodies = []
        this.engine.world.constraints = []
    }
    filterConstraints(pred) {
        this.engine.world.constraints = this.engine.world.constraints.filter(pred)
    }
    linkListeners(obj) {
        if (obj.constructor.name === "Stack") {
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
                    if (node) {
                        this.removeNode(this.findBody(node.id))
                    }
                }
            }
            this.listeners.KeyA = add
            this.listeners.KeyR = remove
            this.listeners.clickTop = add
            this.listeners.clickBottom = remove
            return
        }
        if (obj.constructor.name === "Queue") {
            const add = () => {
                if (obj.length === 0) {
                    this.addAnchor(obj.rootX, obj.rootY)
                    const node = obj.push(randomColour())
                    this.linkToAnchor(this.addNode(node))
                } else {
                    const node = obj.push(randomColour())
                    const body = this.addNode(node)
                    this.linkNodes(this.findBody(node.previous.id), body)
                }
            }
            const remove = () => {
                if(obj.length > 0) {
                    const node = obj.pop()
                    if (node && node.next) {
                        this.removeNode(this.findBody(node.id))
                        this.linkNodes(this.findBody(obj.root.id), this.anchor)
                    }
                }
            }
            this.listeners.KeyA = add
            this.listeners.KeyR = remove
            this.listeners.clickTop = add
            this.listeners.clickBottom = remove
            return
        }
        if (obj.constructor.name === "PriorityQueue") {
            // const add = () => {
            //     if (obj.length === 0) {
            //         this.addAnchor(obj.rootX, obj.rootY)
            //         const node = obj.push([randomGrey()])
            //         this.linkToAnchor(this.addNode(node))
            //     } else {
            //         const node = obj.push([randomGrey()])
            //         const body = this.addNode(node)
            //         this.filterConstraints(c => c.bodyA === )
            //         this.linkNodes(this.findBody(node.previous.id), body)
            //     }
            // }
            // const remove = () => {
            //     if(obj.length > 0) {
            //         const node = obj.pop()
            //         if (node && node.next) {
            //             this.removeNode(this.findBody(node.id))
            //             this.linkNodes(this.findBody(obj.root.id), this.anchor)
            //         }
            //     }
            // }
            // this.listeners.KeyA = add
            // this.listeners.KeyR = remove
            // this.listeners.clickTop = add
            // this.listeners.clickBottom = remove
            // return
        }
    }
    findBody(id) {
        return this.bodies.find(body => body.node.id === id)
    }
}
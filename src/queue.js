import Stack from "./stack.js"
export default class Queue extends Stack {
    constructor(world, listeners) {
        super(world, listeners)
        this.root = null
        this.world = world
        listeners.KeyR = this.pop.bind(this)
        listeners.KeyA = this.keyA.bind(this)
        this.anchor = this.world.addAnchor(this.rootX, this.rootY)
    }
    keyA() {
        const color = () => Math.round(Math.random()*255)
        this.add([
            color(),
            color(),
            color(),
        ])
    }
    push(value) {
        this.add(value)
    }
    pop() {
        if (!this.root) return
        const temp = this.root
        this.world.linkToAnchor(temp.next)
        this.world.removeNode(temp)
        this.root = temp.next
        return temp.value
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
}
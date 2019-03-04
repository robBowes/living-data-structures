class Node {
    constructor(value, next, previous) {
        this.value = value
        this.next = next
        this.previous = previous
    }
}

export default class Stack {
    constructor(world, listeners) {
        this.world = world
        listeners.KeyR = this.remove.bind(this)
        listeners.KeyA = this.KeyA.bind(this)
        listeners.click = this.KeyA.bind(this)
        this.root = null
        this.anchor = this.world.addAnchor(this.rootX, this.rootY)
        this.Node = Node
    }
    KeyA() {
        const color = () => Math.round(Math.random()*255)
        this.add([
            color(),
            color(),
            color(),
        ])
    }
    add(value) {
        if (!this.root) {
            this.root = new Node(value, null, null)
            this.world.addNode(this.root);
            this.world.linkToAnchor(this.root)
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail)
            tail.next = node
            this.world.addNode(node)
            this.world.linkNodes(tail, node)
        }
    }
    remove() {
        if (!this.root || !this.root.next) return
        const tail = this.findTail(this.root)
        this.world.removeNode(tail)
        if (tail.previous)
            tail.previous.next = null
        return tail
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
}
class Node {
    constructor(value, next, previous) {
        this.value = value
        this.next = next
        this.previous = previous
        this.id = Date.now()
    }
}

export default class Stack {
    constructor() {
        this.root = null
        this.Node = Node
        this.length = 0
    }
    add(value) {
        this.length ++
        if (!this.root) {
            this.root = new Node(value, null, null)
            return this.root
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail)
            tail.next = node
            return node
        }
    }
    remove() {
        if (!this.root || !this.root.next) return
        this.length--
        const tail = this.findTail(this.root)
        if (tail.previous)
            tail.previous.next = null
        return tail
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
}
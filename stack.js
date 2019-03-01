function random1() {
    return Math.random() - 0.5
}

class Node {
    constructor(value, next, x, y, direction) {
        this.value = value
        this.pos = createVector(x, y)
        this.next = next
        this.direction = direction
    }
    draw() {
        stroke(this.value.r, this.value.g, this.value.b)
        fill(this.value.r, this.value.g, this.value.b)
        ellipse(this.pos.x, this.pos.y, 10, 10)
    }
}

class Stack {
    constructor(height, width) {
        this.root = null
        this.screenHeight = height
        this.screenWidth = width
        this.nodes = []
        this.rootX = Math.random() * this.screenHeight
        this.rootY = Math.random() * this.screenWidth
        this.remove = this.remove.bind(this)
    }
    add(value) {
        if (!this.root) {
            this.root = new Node(value, null, this.rootX, this.rootY, createVector(random1(), random1()))
            this.nodes.push(this.root)
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail.pos.x + 20 * tail.direction.x, tail.pos.y + 20 * tail.direction.y, createVector(random1(), random1()))
            tail.next = node
            this.nodes.push(node)
        }
    }
    remove() {
        if (!this.root) return
        const ret = this.root
        this.root = ret.next
        this.nodes.shift()
        return ret
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
    draw() {
        this.nodes.forEach(node => node.draw())
    }
}
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
        ellipse(this.pos.x , this.pos.y, 10, 10)
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
    }
    add(value) {
        if (!this.root) {
            this.root = new Node(value, null, this.rootX, this.rootY, Math.random())
            this.nodes.push(this.root)
        }
        else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail.pos.x + 20, tail.pos.y + 20, 0)
            tail.next = node
            this.nodes.push(node)
        }
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
    draw() {
        this.nodes.forEach(node => node.draw())
    }
}
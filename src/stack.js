function random1() {
    return Math.random() - 0.5
}

class Node {
    constructor(value, next, previous, props) {
        this.value = value
        this.next = next
        this.previous = previous
        this.pos = props.position
        this.direction = props.direction
    }
}

export default class Stack {
    constructor(height, width, world, listeners) {
        this.screenHeight = height
        this.screenWidth = width
        this.world = world
        this.rootX = this.screenHeight / 2
        this.rootY = 0
        listeners.KeyR = this.remove.bind(this)
        listeners.KeyA = this.KeyA.bind(this)
        this.root = null
        this.anchor = this.world.addAnchor(this.rootX, this.rootY)
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
            this.root = new Node(value, null, null, {
                direction: {
                    x: 0,
                    y: 1
                }
            })
            this.world.addNode(this.root, {
                x: this.rootX,
                y: this.rootY
            });
            this.world.linkNodes(this.anchor, this.root)
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail, {
                direction: {
                    x: random1(),
                    y: random1()
                }
            })
            tail.next = node
            this.world.addNode(node,{
                x: tail.body.position.x + 20 * tail.direction.x,
                y: tail.body.position.y + 20 * tail.direction.y
            })
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
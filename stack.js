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
            this.root = new Node(value, null, null, {
                position: {
                    x: this.rootX,
                    y: this.rootY
                },
                direction: {
                    x: 0,
                    y: 1
                }
            })
            this.world.addNode(this.root, {
                isStatic: true
            })
        } else {
            const tail = this.findTail(this.root)
            const node = new Node(value, null, tail, {
                position: {
                    x: tail.body.position.x + 20 * tail.direction.x,
                    y: tail.body.position.y + 20 * tail.direction.y
                },
                direction: {
                    x: random1(),
                    y: random1()
                }
            })
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
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

export default class Queue {
    constructor(height, width, world, listeners) {
        this.root = null
        this.screenHeight = height
        this.screenWidth = width
        this.world = world
        this.rootX = this.screenHeight / 2
        this.rootY = 0
        listeners.KeyR = this.pop.bind(this)
        listeners.KeyA = this.push.bind(this)
    }
    push(value) {
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
            const temp = this.root
            this.root = new Node(value, temp, null, {
                    position: {
                        x: this.rootX,
                        y: this.rootY
                    },
                    direction: {
                        x: random1(),
                        y: random1()
                    }
                })
            temp.previous = this.root
            this.world.addNode(this.root, {
                isStatic: true,
            })
            this.world.linkNodes(this.root, temp)
            this.world.Matter.Body.setStatic(temp.body, false)
        }
    }
    pop() {
        if (!this.root) return
        const temp = this.root
        const newRoot = this.root.next
        this.root = newRoot
        this.root.previous = null
        this.world.Matter.Body.setPosition(temp.body, {
            x: this.rootX + 10,
            y: this.rootY
        })
        this.root.body.position = {
            x: this.rootX,
            y: this.rootY
        }
        this.world.Matter.Body.setStatic(this.root.body, true)
        this.world.Matter.Body.setStatic(temp.body, false)
        this.world.removeNode(temp)
        return temp
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
}
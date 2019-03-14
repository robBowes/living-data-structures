import Queue from './queue.js'
import Node from './node.js'


export default class PriorityQueue extends Queue {
    constructor(isLargerThan) {
        super()
        this.isLargerThan = isLargerThan
    }
    push(value) {
        if (!this.root) {
            return super.push(value)
        }
        this.length++
        const before = this.findPlace(value, this.root)
        const after = before.next
        const node = new Node(value, after, before)
        before.next = node
        if (after) {
            after.previous = node
        }
        return node
    }
    findPlace(value, iterator) {
        if (this.isLargerThan(value, iterator.value)) {
            return this.findPlace(value, iterator.next)
        }
        else return value
    }
}
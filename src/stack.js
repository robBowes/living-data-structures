import List from './list.js'
import Node from './node.js'

export default class Stack extends List {
    constructor() {
        super()    
        this.type = "Stack"
    }
    add(value) {
        this.length ++
        if (!this.root) {
            const node = new Node(value, null, null)
            this.root = node
            this.tail = node
            return node
        } else {
            const node = new Node(value, null, this.tail)
            this.tail.next = node
            this.tail = node
            return node
        }
    }
    remove() {
        if (!this.root || !this.root.next) return
        this.length--
        const tail = this.tail
        if (tail.previous)
            tail.previous.next = null
        this.tail = tail.previous
        return tail
    }
    findTail(node) {
        if (!node.next) return node
        return this.findTail(node.next)
    }
    getTail() {
        return this.findTail(this.root)
    }
}
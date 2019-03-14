import Stack from "./stack.js"

export default class Queue extends Stack {
    constructor() {
        super()
        this.root = null
    }
    push(value) {
        return super.add(value)
    }
    pop() {
        if (!this.root) return
        const temp = this.root
        this.root = temp.next
        this.root.previous = null
        return temp
    }
}
export default class Node {
    constructor(value, next, previous) {
        this.value = value
        this.next = next
        this.previous = previous
        this.id = Math.floor(Math.random() * 1000000000)
    }
}

export default class Particle {
    constructor(props) {
        this.position = props.position
        this.direction = props.direction
        this.momentum = props.momentum
        this.energy = Math.random() * 100
    }
    update() {
        this.position.x = this.position.x + this.direction.x
        this.position.y = this.position.y + this.direction.y
        this.direction.x = this.direction.x * this.momentum.x
        this.direction.y = this.direction.y * this.momentum.y
        this.energy--
    }
}
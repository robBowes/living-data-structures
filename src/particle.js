export default class Particle {
    constructor(props) {
        this.position = props.position
        this.direction = props.direction
        this.momentum = props.momentum
        this.energy = Math.random() * 100
        this.color = props.color
    }
    static update(particle) {
        particle.position.x = particle.position.x + particle.direction.x
        particle.position.y = particle.position.y + particle.direction.y
        particle.direction.x = particle.direction.x * particle.momentum.x
        particle.direction.y = particle.direction.y * particle.momentum.y
        particle.energy--
    }
}
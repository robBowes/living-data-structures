import Particle from "./particle.js"

const {PI, random, sin, cos} = Math

export default class Burst {
    constructor(position, color) {
        this.x = position.x
        this.y = position.y
        this.color = color
        this.particles = this.createParticles();
    }
    createParticles() {
        const n = 100;
        return Array(n).fill().map((p, i) => new Particle({
            position: {
                x: this.x,
                y: this.y
            },
            direction: {
                x: random() * 5 * sin(2 * PI / (i - (n / 2))),
                y: random() * 5 * cos(2 * PI / (i - (n / 2)))
            },
            momentum: {
                x: 0.98,
                y: 0.98
            },
            color: this.color
        }))
    }
}
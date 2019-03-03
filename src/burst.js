import Particle from "./particle.js"

const PI = Math.PI

export default class Burst {
    constructor(position, color) {
        this.x = position.x
        this.y = position.y
        this.color = color
    }
    createParticles() {
        const n = 100;
        return Array(n).fill().map((p, i) => new Particle({
            position: {
                x: this.x,
                y: this.y
            },
            direction: {
                x: Math.random() * 5 * Math.sin(2 * PI / (i - (n / 2))),
                y: Math.random() * 5 * Math.cos(2 * PI / (i - (n / 2)))
            },
            momentum: {
                x: 0.98,
                y: 0.98
            },
            color: this.color
        }))
    }
}
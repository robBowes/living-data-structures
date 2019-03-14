// export class Anytthing {
//     constructor() {
//         this.a = 5
//     }
// }
import Particle from './particle.js'


export function draw(p5) {
    const render = {
        "Circle Body"(body) {
            p5.stroke(...body.node.value)
            p5.fill(body.node.value)
            p5.ellipse(body.position.x, body.position.y, 10, 10)
        },
        "Constraint"(constraint) {
            const {
                bodyA,
                bodyB
            } = constraint
            p5.stroke(255)
            p5.line(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
        },
        burst(burst) {
            p5.stroke(burst.color)
        },
        particle(particle) {
            p5.point(particle.position.x, particle.position.y)
        }
         
    }
    return world => {
        world.engine.world.constraints.forEach(constraint => render[constraint.label](constraint))
        world.bodies.forEach(body => render[body.label](body))
        const drawParticle = particle => {
            Particle.update(particle)
            render.particle(particle)
        }
        world.bursts.forEach(burst => {
            render.burst(burst)
            burst.particles.forEach(drawParticle)
            if (p5.frameCount % 5 === 0) {
                burst.particles = burst.particles.filter(particle => particle.energy > 0)
            }
        })
        if (p5.frameCount % 50 === 0) {
            world.bursts = world.bursts.filter(burst => burst.particles.length > 0)
        }
    }
} 

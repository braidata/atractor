class Mover {
    constructor(x, y, mass) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(random(1, 3));
        this.acceleration = createVector(0, 0);
        this.mass = mass;
        this.isAttracted = false; // Nueva propiedad para indicar si está siendo atraído
        this.F = createVector(0, 0);
    }

    absorbMass(otherMover) {
        if (this !== otherMover && otherMover.mass > 0) {
            let d = p5.Vector.dist(this.position, otherMover.position);
            if (d < this.mass + otherMover.mass) {  // Condición de proximidad basada en la masa
                this.mass += otherMover.mass;
                console.log("Mover absorbed by mover!",this.mass);
                otherMover.mass = 0; // Establecer la masa del otro Mover a 0 para eliminarlo
            }
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.F = f;
        this.acceleration.add(f);
        this.isAttracted = true; // Establecer a true cuando se aplica una fuerza de atracción
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        //this.isAttracted = false; // Restablecer a false en cada actualización
    }

    display() {
        noStroke();
        fill(this.isAttracted ? color(0, 255, 0,90) : color(0, 255, 255,90)); // Rojo si está atraído, verde de lo contrario
        ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
        // display mass and force
        text(this.mass.toFixed(2), this.position.x + 50, this.position.y);
        let barLength = map(strength, 0, 1, 0, 500); // Ajusta los valores según sea necesario
        rect(this.position.x + 50, this.position.y + 20, barLength, 10);
        
    }
}


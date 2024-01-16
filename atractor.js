
class Atractor {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.mass = 10; // Masa inicial
        this.isDragging = false;
        this.G = 1; // Constante gravitacional
        this.F = createVector(0, 0);
    }

    calculateAttraction(mover) {
        let force = p5.Vector.sub(this.position, mover.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25); // Evitar fuerza excesivamente grande
        force.normalize();

        let strength = (this.G * this.mass * mover.mass) / (distance * distance);
        force.mult(strength);
        this.F = force;
        return force;
    }

    getAttractionStrength(mover) {
        this.F = this.calculateAttraction(mover);
        return this.F.mag();
    }

    absorbMass(mover) {
        this.mass += mover.mass; // Absorber la masa completa del Mover
        mover.mass = 0; // Establecer la masa del Mover a 0 para eliminarlo después
        console.log("Mover absorbed!",this.mass);
    }

    display() {
        noStroke();
        fill(this.isAttracted ? color(255, 100, 0,90) : color(255, 0, 0,90));
        ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
        text(this.mass.toFixed(2), this.position.x + this.mass * 2, this.position.y);
        // text(this.F, this.position.x + 50, this.position.y + 20);
        let barLength = map(strength, 0, 1, 0, 500); // Ajusta los valores según sea necesario
        rect(this.position.x  + this.mass * 2, this.position.y + this.mass * 2, barLength, 10);
        if (this.isDragging) {
            this.position.x = mouseX;
            this.position.y = mouseY;
        }
    }

    mousePressed() {
        let d = dist(mouseX, mouseY, this.position.x, this.position.y);
        if (d < this.mass) {
            this.isDragging = true;
        }
    }

    mouseReleased() {
        this.isDragging = false;
    }



}

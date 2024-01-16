
class Ambiente {
    display() {
        // Simple fondo de gradiente para demostración
        for (let i = 0; i <= height; i++) {
            let inter = map(i, 0, height, 0, 1);
            let c = lerpColor(color(255, 204, 30), color(30, 102, 153), inter);
            stroke(c);
            line(0, i, width, i);
        }
    }
}

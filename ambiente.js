
class Ambiente {
    display() {
        colorMode(RGB);
        // Simple fondo de gradiente para demostración
        for (let i = 0; i <= height; i++) {
            let inter = map(i, 0, height, 0, 1);
            
            let c = lerpColor(color(30, 60, 90), color(255, 155, 0), inter);
            stroke(c);
            line(0, i, width, i);
        }
    }
}

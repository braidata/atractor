
class Visualizador {
    display(movers) {
        // Dibuja líneas entre movers y el centro para la demostración
        movers.forEach(mover => {
            stroke(255);
            line(width / 2, height / 2, mover.position.x, mover.position.y);
        });
    }
}

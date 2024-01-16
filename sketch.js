
let atractors = []; // Ahora es un arreglo para soportar múltiples atractores
let input;
let visualizador;
let ambiente;
let strength;
let movers = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    
    atractor = new Atractor();
    visualizador = new Visualizador();
    ambiente = new Ambiente();
    
    for (let i = 0; i < 10; i++) {
        movers.push(new Mover(random(width), random(height), random(0.1, 2)));
    }
}

function draw() {
    background(255);
    let modes = [ DODGE, BURN, BLEND];

    //blendMode(random(modes))
    ambiente.display();
    
    atractor.display();

    // Primero, manejar la interacción entre los Movers
    for (let i = 0; i < movers.length; i++) {
        for (let j = i + 1; j < movers.length; j++) {
            movers[i].absorbMass(movers[j]);
            movers[j].absorbMass(movers[i]);
        }
    }

    // Luego, actualizar cada Mover y aplicar fuerzas del Atractor
    for (let mover of movers) {
        let d = dist(mover.position.x, mover.position.y, atractor.position.x, atractor.position.y);

        if (d < 50) { // Umbral de distancia para ser absorbido
            atractor.absorbMass(mover);
            
        } else if (d < 250) {
            let force = atractor.calculateAttraction(mover);
            strength = atractor.getAttractionStrength(mover); 
            mover.applyForce(force);
            
        } else {
            mover.isAttracted = false; // Establecer isAttracted a false si no está en el rango de atracción
        }

        mover.update();
        mover.display();

    }

    // Limpiar los objetos Mover que han sido absorbidos o están fuera del canvas
    movers = movers.filter(mover => mover.position.y < height + 100 && mover.mass > 0);

    // Generar nuevos Movers periódicamente
    if (frameCount % 30 === 0) {
        createMover();
    }
}

function createMover() {
    let x = random(width);
    let y = random(-50, -100); // Generar por encima del canvas
    let mass = random(1, 2.5);
    let mover = new Mover(x, y, mass);
    movers.push(mover);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    // Si hay un atractor y se hace clic en él, empieza a arrastrarlo
    if (atractor) {
        atractor.mousePressed();
    } else {
        // Si no hay atractor, crea un input para ingresar la masa
        input = createInput('');
        input.position(mouseX, mouseY);
        input.size(50);
        input.elt.focus(); // Asegúrate de que el input esté enfocado
    }
}

function mouseReleased() {
    // Si se estaba arrastrando un atractor, suelta el arrastre
    if (atractor) {
        atractor.mouseReleased();
    }
}

function createAtractorWithMass() {
    let massValue = parseFloat(input.value());
    if (!isNaN(massValue) && massValue > 0) {
        atractor = new Atractor(input.x, input.y, massValue);
    }
    input.remove();
    input = null;
}

function keyPressed() {
    if (key === "p") {
        noLoop();
    }
    if (key === "l"){
        loop()
    }
    if (keyCode === ENTER && input) {
        createAtractorWithMass();
    }
}

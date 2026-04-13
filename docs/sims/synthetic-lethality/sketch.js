// Synthetic Lethality
// CANVAS_HEIGHT: 450
let drawHeight = 400;
let controlHeight = 50;
let canvasWidth, canvasHeight;

function updateCanvasSize() {
    const container = document.querySelector('main');
    canvasWidth = container ? container.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(16);
}

function draw() {
    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Placeholder text
    fill('gray');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Synthetic Lethality', canvasWidth / 2, drawHeight / 2 - 20);
    textSize(14);
    text('MicroSim under development', canvasWidth / 2, drawHeight / 2 + 20);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

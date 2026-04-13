// Complementation Test Simulator
// CANVAS_HEIGHT: 530
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Mutations and complementation groups
// Group A (gene 1): m1, m3
// Group B (gene 2): m2, m5
// Group C (gene 3): m4
let mutations = ['m1', 'm2', 'm3', 'm4', 'm5'];
let mutationGene = { m1: 'A', m2: 'B', m3: 'A', m4: 'C', m5: 'B' };
let mutationPos = { m1: 0.15, m2: 0.45, m3: 0.25, m4: 0.82, m5: 0.55 };
let geneRegions = [
    { name: 'Gene A', start: 0.0, end: 0.33, color: null },
    { name: 'Gene B', start: 0.33, end: 0.66, color: null },
    { name: 'Gene C', start: 0.66, end: 1.0, color: null }
];

let selectA, selectB, crossBtn, resetBtn;
let matrixResults = {};
let currentCross = null;
let animProgress = 0;
let animating = false;
let totalPairs = 10;
let testedCount = 0;
let allTested = false;
let containerWidth;

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    geneRegions[0].color = color(100, 180, 255);
    geneRegions[1].color = color(255, 180, 100);
    geneRegions[2].color = color(150, 220, 150);

    let controlY = drawHeight + 14;

    selectA = createSelect();
    selectA.parent(document.querySelector('main'));
    selectA.position(20, controlY);
    selectA.option('Mutation 1', '');
    for (let m of mutations) {
        selectA.option(m);
    }
    selectA.style('font-size', '16px');
    selectA.style('padding', '4px 8px');

    selectB = createSelect();
    selectB.parent(document.querySelector('main'));
    selectB.position(170, controlY);
    selectB.option('Mutation 2', '');
    for (let m of mutations) {
        selectB.option(m);
    }
    selectB.style('font-size', '16px');
    selectB.style('padding', '4px 8px');

    crossBtn = createButton('Cross');
    crossBtn.parent(document.querySelector('main'));
    crossBtn.position(320, controlY);
    crossBtn.mousePressed(performCross);
    crossBtn.style('font-size', '16px');
    crossBtn.style('padding', '6px 18px');
    crossBtn.style('background-color', '#4CAF50');
    crossBtn.style('color', 'white');
    crossBtn.style('border', 'none');
    crossBtn.style('border-radius', '4px');
    crossBtn.style('cursor', 'pointer');

    resetBtn = createButton('Reset All');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.position(420, controlY);
    resetBtn.mousePressed(resetSim);
    resetBtn.style('font-size', '16px');
    resetBtn.style('padding', '6px 18px');
    resetBtn.style('background-color', '#888');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');

    textFont('Arial');
}

function draw() {
    // Draw region
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, width, drawHeight);

    // Control region
    fill('white');
    noStroke();
    rect(0, drawHeight, width, controlHeight);

    // Title
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Complementation Test Simulator', width / 2, 10);

    // Left panel: gene diagrams and cross result
    let leftW = width * 0.50;
    drawGeneDiagrams(15, 48, leftW - 25);

    // Right panel: matrix
    let matrixX = width * 0.52;
    drawMatrix(matrixX, 48, width - matrixX - 10);

    // Animate cross
    if (animating) {
        animProgress += 0.03;
        if (animProgress >= 1) {
            animProgress = 1;
            animating = false;
        }
    }
}

function drawGeneBar(bx, by, label, mutName, barW) {
    let labelW = 85;
    let actualBarW = barW - labelW;
    let barH = 22;

    textSize(16);
    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    text(label, bx, by + barH / 2);

    let barStartX = bx + labelW;

    // Gene region blocks
    for (let r of geneRegions) {
        let rx = barStartX + r.start * actualBarW;
        let rw = (r.end - r.start) * actualBarW;
        fill(r.color);
        stroke(100);
        strokeWeight(1);
        rect(rx, by, rw, barH, 2);
    }

    // Region labels inside bars
    textSize(11);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    for (let r of geneRegions) {
        let rx = barStartX + (r.start + r.end) / 2 * actualBarW;
        text(r.name, rx, by + barH / 2);
    }

    // Mutation marker
    if (mutName) {
        let mPos = mutationPos[mutName];
        let mx = barStartX + mPos * actualBarW;
        stroke(200, 20, 20);
        strokeWeight(3);
        line(mx - 6, by - 5, mx + 6, by + barH + 5);
        line(mx + 6, by - 5, mx - 6, by + barH + 5);
        noStroke();
        fill(180, 20, 20);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(mutName, mx, by - 7);
    }

    textAlign(LEFT, TOP);
}

function drawGeneDiagrams(x, y, w) {
    push();
    textAlign(LEFT, TOP);
    textSize(18);
    fill(50);
    noStroke();
    text('Cross Diagram', x, y);

    let barY = y + 30;

    if (currentCross) {
        drawGeneBar(x, barY, 'Parent 1:', currentCross.mutA, w);
        barY += 50;

        // Cross symbol
        textSize(22);
        fill(80);
        noStroke();
        textAlign(CENTER, TOP);
        text('\u00D7', x + w / 2, barY - 16);
        textAlign(LEFT, TOP);

        drawGeneBar(x, barY, 'Parent 2:', currentCross.mutB, w);
        barY += 50;

        // F1 result
        if (animProgress > 0.3) {
            let a = map(constrain(animProgress, 0.3, 0.7), 0.3, 0.7, 0, 255);

            textSize(18);
            fill(50, 50, 50, a);
            noStroke();
            text('F1 Phenotype:', x, barY);
            barY += 28;

            let boxW = w;
            let boxH = 48;
            if (currentCross.complements) {
                fill(60, 180, 60, a);
                stroke(40, 140, 40, a);
            } else {
                fill(220, 80, 80, a);
                stroke(180, 40, 40, a);
            }
            strokeWeight(2);
            rect(x, barY, boxW, boxH, 8);

            fill(255, 255, 255, a);
            noStroke();
            textSize(18);
            textAlign(CENTER, CENTER);
            if (currentCross.complements) {
                text('Wild-type (Complement)', x + boxW / 2, barY + boxH / 2);
            } else {
                text('Mutant (Fail to Complement)', x + boxW / 2, barY + boxH / 2);
            }
            textAlign(LEFT, TOP);

            barY += boxH + 12;
        }

        // Explanation text
        if (animProgress > 0.7) {
            let a = map(constrain(animProgress, 0.7, 1.0), 0.7, 1.0, 0, 255);
            textSize(16);
            fill(60, 60, 60, a);
            noStroke();
            let gA = mutationGene[currentCross.mutA];
            let gB = mutationGene[currentCross.mutB];
            if (currentCross.complements) {
                text(currentCross.mutA + ' (Gene ' + gA + ') + '
                    + currentCross.mutB + ' (Gene ' + gB + ')', x, barY);
                barY += 22;
                text('Different genes \u2192 complement each other', x, barY);
            } else {
                text(currentCross.mutA + ' + ' + currentCross.mutB
                    + ' both in Gene ' + gA, x, barY);
                barY += 22;
                text('Same gene \u2192 fail to complement', x, barY);
            }
        }
    } else {
        // Instructions when no cross has been performed
        textSize(16);
        fill(100);
        noStroke();
        let iy = barY + 5;
        text('Select two mutations and click "Cross"', x, iy);
        iy += 26;
        text('to perform a complementation test.', x, iy);
        iy += 40;
        textSize(16);
        fill(70);
        text('Gene Map:', x, iy);
        iy += 26;
        drawGeneBar(x, iy, '', null, w);
        iy += 40;
        textSize(16);
        fill(100);
        text('5 mutations across 3 genes:', x, iy);
        iy += 24;
        text('  m1, m3 \u2192 Gene A', x, iy);
        iy += 22;
        text('  m2, m5 \u2192 Gene B', x, iy);
        iy += 22;
        text('  m4 \u2192 Gene C', x, iy);
    }

    pop();
}

function drawMatrix(x, y, w) {
    push();
    textSize(18);
    fill(50);
    noStroke();
    textAlign(LEFT, TOP);
    text('Complementation Matrix', x, y);

    let n = mutations.length;
    let maxCell = 38;
    let cellSize = min(maxCell, (w - 50) / (n + 1));
    let startX = x;
    let startY = y + 30;

    // Column headers
    textSize(14);
    textAlign(CENTER, CENTER);
    fill(60);
    noStroke();
    for (let j = 0; j < n; j++) {
        text(mutations[j], startX + (j + 1.5) * cellSize, startY + cellSize * 0.5);
    }

    // Rows
    for (let i = 0; i < n; i++) {
        // Row label
        textAlign(CENTER, CENTER);
        fill(60);
        noStroke();
        textSize(14);
        text(mutations[i], startX + cellSize * 0.5, startY + (i + 1.5) * cellSize);

        for (let j = 0; j < n; j++) {
            let cx = startX + (j + 1) * cellSize;
            let cy = startY + (i + 1) * cellSize;

            if (i === j) {
                fill(200);
                stroke(170);
                strokeWeight(1);
                rect(cx, cy, cellSize, cellSize);
                fill(100);
                noStroke();
                textSize(16);
                text('\u2014', cx + cellSize / 2, cy + cellSize / 2);
            } else {
                let key = getKey(mutations[i], mutations[j]);
                if (matrixResults.hasOwnProperty(key)) {
                    let comp = matrixResults[key];
                    if (comp) {
                        fill(120, 220, 120);
                        stroke(80, 180, 80);
                    } else {
                        fill(240, 120, 120);
                        stroke(200, 80, 80);
                    }
                    strokeWeight(1);
                    rect(cx, cy, cellSize, cellSize);
                    fill(255);
                    noStroke();
                    textSize(16);
                    text(comp ? '+' : '\u2013', cx + cellSize / 2, cy + cellSize / 2);
                } else {
                    fill(245);
                    stroke(210);
                    strokeWeight(1);
                    rect(cx, cy, cellSize, cellSize);
                    fill(180);
                    noStroke();
                    textSize(16);
                    text('?', cx + cellSize / 2, cy + cellSize / 2);
                }
            }
        }
    }

    // Legend
    let legendY = startY + (n + 1.5) * cellSize + 12;
    textSize(14);
    textAlign(LEFT, CENTER);

    fill(120, 220, 120);
    stroke(80, 180, 80);
    strokeWeight(1);
    rect(startX, legendY, 18, 18);
    fill(60);
    noStroke();
    text(' +  Complement (wild-type)', startX + 22, legendY + 9);

    legendY += 26;
    fill(240, 120, 120);
    stroke(200, 80, 80);
    strokeWeight(1);
    rect(startX, legendY, 18, 18);
    fill(60);
    noStroke();
    text(' \u2013  Fail to complement (mutant)', startX + 22, legendY + 9);

    // Progress counter
    legendY += 35;
    textSize(16);
    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    text('Tested: ' + testedCount + ' / ' + totalPairs, startX, legendY);

    // Show complementation groups when all pairs tested
    if (allTested) {
        legendY += 30;
        textSize(17);
        fill(30, 90, 170);
        noStroke();
        text('Complementation Groups:', startX, legendY);
        legendY += 26;
        textSize(16);
        fill(60);
        text('Group 1: m1, m3  (Gene A)', startX, legendY);
        legendY += 22;
        text('Group 2: m2, m5  (Gene B)', startX, legendY);
        legendY += 22;
        text('Group 3: m4  (Gene C)', startX, legendY);
    }

    pop();
}

function getKey(a, b) {
    return a < b ? a + '-' + b : b + '-' + a;
}

function performCross() {
    let a = selectA.value();
    let b = selectB.value();

    if (!a || !b || a === b) return;

    let key = getKey(a, b);
    let complements = mutationGene[a] !== mutationGene[b];

    currentCross = { mutA: a, mutB: b, complements: complements };
    animProgress = 0;
    animating = true;

    if (!matrixResults.hasOwnProperty(key)) {
        matrixResults[key] = complements;
        testedCount++;
        if (testedCount >= totalPairs) {
            allTested = true;
        }
    }
}

function resetSim() {
    matrixResults = {};
    currentCross = null;
    animProgress = 0;
    animating = false;
    testedCount = 0;
    allTested = false;
    selectA.value('');
    selectB.value('');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
    const main = document.querySelector('main');
    containerWidth = main ? main.offsetWidth : windowWidth;
}

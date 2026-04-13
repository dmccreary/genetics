// Chromatin Looping and TAD Organization MicroSim
// CANVAS_HEIGHT: 560

let drawHeight = 510;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;

// State
let ctcfPresent = true;
let showContactMap = false;

// Controls
let ctcfButton;
let viewCheckbox;

// Genome layout
let genomeY;
let genomeLeft;
let genomeRight;
let genomeLen;

// TAD elements - positions as fractions of genome length
let elements = [];
// Loops within TADs
let loops = [];
// Hijack loop (appears when CTCF deleted)
let hijackLoop = null;

// Colors
let enhancerColor, promoterColor, geneColor, ctcfColor, cohesinColor;
let tad1Color, tad2Color, hijackColor;

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    enhancerColor = color(34, 139, 34);
    promoterColor = color(255, 140, 0);
    geneColor = color(70, 130, 180);
    ctcfColor = color(220, 20, 60);
    cohesinColor = color(148, 103, 189);
    tad1Color = color(100, 149, 237, 60);
    tad2Color = color(144, 238, 144, 60);
    hijackColor = color(220, 20, 60);

    buildGenomeElements();

    // Controls
    ctcfButton = createButton('Delete CTCF Boundary');
    ctcfButton.parent(document.querySelector('main'));
    ctcfButton.mousePressed(toggleCTCF);
    ctcfButton.style('font-size', '16px');
    ctcfButton.style('padding', '6px 14px');
    ctcfButton.style('margin-right', '20px');
    ctcfButton.style('cursor', 'pointer');

    viewCheckbox = createCheckbox(' Contact Map View', false);
    viewCheckbox.parent(document.querySelector('main'));
    viewCheckbox.changed(function () {
        showContactMap = this.checked();
    });
    viewCheckbox.style('font-size', '16px');
    viewCheckbox.style('display', 'inline-block');
    viewCheckbox.style('vertical-align', 'middle');
}

function buildGenomeElements() {
    // Fractional positions along the genome line (0 to 1)
    // TAD1 region: 0.05 - 0.47
    // Boundary: 0.47 - 0.53
    // TAD2 region: 0.53 - 0.95

    elements = [
        { type: 'enhancer', label: 'E1', frac: 0.10, tad: 1 },
        { type: 'promoter', label: 'P1', frac: 0.20, tad: 1 },
        { type: 'gene',     label: 'Gene A', frac: 0.26, tad: 1, w: 0.08 },
        { type: 'cohesin',  label: 'Cohesin', frac: 0.35, tad: 1 },
        { type: 'enhancer', label: 'E2', frac: 0.42, tad: 1 },
        { type: 'ctcf',     label: 'CTCF', frac: 0.50, tad: 0 },
        { type: 'promoter', label: 'P2', frac: 0.58, tad: 2 },
        { type: 'gene',     label: 'Gene B', frac: 0.64, tad: 2, w: 0.08 },
        { type: 'cohesin',  label: 'Cohesin', frac: 0.74, tad: 2 },
        { type: 'enhancer', label: 'E3', frac: 0.82, tad: 2 },
        { type: 'promoter', label: 'P3', frac: 0.90, tad: 2 },
    ];

    // Normal loops: enhancer-to-promoter within each TAD
    loops = [
        { from: 0.10, to: 0.20, tad: 1, label: 'E1-P1 loop' },
        { from: 0.42, to: 0.20, tad: 1, label: 'E2-P1 loop' },
        { from: 0.82, to: 0.58, tad: 2, label: 'E3-P2 loop' },
        { from: 0.82, to: 0.90, tad: 2, label: 'E3-P3 loop' },
    ];

    // Hijack loop: E2 from left TAD reaches P2 in right TAD
    hijackLoop = { from: 0.42, to: 0.58, label: 'Enhancer Hijacking!' };
}

function toggleCTCF() {
    ctcfPresent = !ctcfPresent;
    ctcfButton.html(ctcfPresent ? 'Delete CTCF Boundary' : 'Restore CTCF Boundary');
}

function draw() {
    genomeLeft = 40;
    genomeRight = width - 40;
    genomeLen = genomeRight - genomeLeft;
    genomeY = drawHeight * 0.65;

    // Draw region
    fill('aliceblue');
    stroke('silver');
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
    text('Chromatin Looping & TAD Organization', width / 2, 12);

    if (showContactMap) {
        drawContactMap();
    } else {
        drawLinearView();
    }
}

function drawLinearView() {
    let arcRegionTop = 80;

    // Draw TAD background shading
    let tad1Left = fracToX(0.03);
    let tad1Right = fracToX(0.48);
    let tad2Left = fracToX(0.52);
    let tad2Right = fracToX(0.97);

    if (ctcfPresent) {
        noStroke();
        fill(tad1Color);
        rect(tad1Left, arcRegionTop, tad1Right - tad1Left, genomeY - arcRegionTop + 40, 8);
        fill(tad2Color);
        rect(tad2Left, arcRegionTop, tad2Right - tad2Left, genomeY - arcRegionTop + 40, 8);

        fill(80);
        textSize(18);
        textAlign(CENTER, TOP);
        text('TAD 1', (tad1Left + tad1Right) / 2, arcRegionTop + 4);
        text('TAD 2', (tad2Left + tad2Right) / 2, arcRegionTop + 4);
    } else {
        noStroke();
        fill(255, 220, 220, 80);
        rect(tad1Left, arcRegionTop, tad2Right - tad1Left, genomeY - arcRegionTop + 40, 8);
        fill(180, 60, 60);
        textSize(18);
        textAlign(CENTER, TOP);
        text('Merged TAD (Boundary Lost)', (tad1Left + tad2Right) / 2, arcRegionTop + 4);
    }

    // Draw genome line
    stroke(60);
    strokeWeight(3);
    line(genomeLeft, genomeY, genomeRight, genomeY);
    strokeWeight(1);

    // Draw elements on the genome
    for (let el of elements) {
        let x = fracToX(el.frac);

        if (el.type === 'ctcf') {
            if (ctcfPresent) {
                drawCTCFMarker(x, genomeY);
            } else {
                stroke(200, 80, 80);
                strokeWeight(1);
                drawingContext.setLineDash([4, 4]);
                line(x, genomeY - 18, x, genomeY + 18);
                drawingContext.setLineDash([]);
                fill(200, 80, 80);
                noStroke();
                textSize(16);
                textAlign(CENTER, TOP);
                text('(deleted)', x, genomeY + 22);
            }
        } else if (el.type === 'enhancer') {
            drawEnhancer(x, genomeY);
        } else if (el.type === 'promoter') {
            drawPromoter(x, genomeY);
        } else if (el.type === 'gene') {
            drawGene(x, genomeY, el.w * genomeLen, el.label);
        } else if (el.type === 'cohesin') {
            drawCohesin(x, genomeY);
        }

        // Labels below genome (except gene which is drawn inside)
        if (el.type !== 'gene') {
            fill(50);
            noStroke();
            textSize(16);
            textAlign(CENTER, TOP);
            let labelY = genomeY + 24;
            if (el.type === 'ctcf' && ctcfPresent) labelY = genomeY + 30;
            if (el.type === 'ctcf' && !ctcfPresent) labelY = genomeY + 38;
            if (el.type === 'cohesin') labelY = genomeY + 30;
            text(el.label, x, labelY);
        }
    }

    // Draw chromatin loop arcs
    for (let lp of loops) {
        let x1 = fracToX(lp.from);
        let x2 = fracToX(lp.to);
        let loopColor = lp.tad === 1 ? color(70, 130, 200, 180) : color(60, 160, 80, 180);
        drawArc(x1, x2, genomeY, loopColor, false);
    }

    // Hijack loop when CTCF is deleted
    if (!ctcfPresent) {
        let x1 = fracToX(hijackLoop.from);
        let x2 = fracToX(hijackLoop.to);
        drawArc(x1, x2, genomeY, hijackColor, true);

        let midX = (x1 + x2) / 2;
        let arcH = abs(x2 - x1) * 0.4;
        fill(220, 20, 60);
        noStroke();
        textSize(16);
        textAlign(CENTER, BOTTOM);
        textStyle(BOLD);
        text(hijackLoop.label, midX, genomeY - arcH - 6);
        textStyle(NORMAL);
    }

    drawLegend();
}

function drawArc(x1, x2, baseY, col, isDashed) {
    let midX = (x1 + x2) / 2;
    let halfW = abs(x2 - x1) / 2;
    let arcH = abs(x2 - x1) * 0.4;

    noFill();
    stroke(col);
    strokeWeight(isDashed ? 3 : 2.5);
    if (isDashed) {
        drawingContext.setLineDash([8, 5]);
    }

    beginShape();
    for (let t = 0; t <= PI; t += 0.05) {
        let ax = midX - halfW * cos(t);
        let ay = baseY - arcH * sin(t);
        vertex(ax, ay);
    }
    endShape();

    if (isDashed) {
        drawingContext.setLineDash([]);
    }
    strokeWeight(1);
}

function drawCTCFMarker(x, y) {
    fill(ctcfColor);
    stroke(150, 10, 40);
    strokeWeight(2);
    beginShape();
    vertex(x, y - 22);
    vertex(x + 12, y);
    vertex(x, y + 22);
    vertex(x - 12, y);
    endShape(CLOSE);
    strokeWeight(1);

    // Small arrows pointing inward (convergent CTCF orientation)
    stroke(255);
    strokeWeight(2);
    line(x - 4, y - 5, x, y - 1);
    line(x + 4, y - 5, x, y - 1);
    strokeWeight(1);
}

function drawEnhancer(x, y) {
    fill(enhancerColor);
    stroke(20, 100, 20);
    strokeWeight(1.5);
    ellipse(x, y, 18, 18);
    strokeWeight(1);
}

function drawPromoter(x, y) {
    fill(promoterColor);
    stroke(180, 100, 0);
    strokeWeight(1.5);
    beginShape();
    vertex(x - 10, y - 8);
    vertex(x + 4, y - 8);
    vertex(x + 4, y - 14);
    vertex(x + 14, y);
    vertex(x + 4, y + 14);
    vertex(x + 4, y + 8);
    vertex(x - 10, y + 8);
    endShape(CLOSE);
    strokeWeight(1);
}

function drawGene(x, y, w, label) {
    fill(geneColor);
    stroke(40, 80, 130);
    strokeWeight(1.5);
    rect(x - w / 2, y - 10, w, 20, 4);
    fill(255);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(label, x, y - 1);
    strokeWeight(1);
}

function drawCohesin(x, y) {
    noFill();
    stroke(cohesinColor);
    strokeWeight(3);
    ellipse(x, y, 20, 22);
    strokeWeight(1);
}

function drawLegend() {
    let lx = 20;
    let ly = drawHeight - 65;
    let spacing = 28;
    let items = [
        { col: enhancerColor, label: 'Enhancer', shape: 'circle' },
        { col: promoterColor, label: 'Promoter', shape: 'arrow' },
        { col: geneColor,     label: 'Gene', shape: 'rect' },
        { col: ctcfColor,     label: 'CTCF', shape: 'diamond' },
        { col: cohesinColor,  label: 'Cohesin', shape: 'ring' },
    ];

    textSize(16);
    textAlign(LEFT, CENTER);

    for (let i = 0; i < items.length; i++) {
        let ix = lx;
        let iy = ly + i * spacing;

        if (items[i].shape === 'circle') {
            fill(items[i].col);
            noStroke();
            ellipse(ix + 8, iy, 14, 14);
        } else if (items[i].shape === 'arrow') {
            fill(items[i].col);
            noStroke();
            triangle(ix, iy - 6, ix + 16, iy, ix, iy + 6);
        } else if (items[i].shape === 'rect') {
            fill(items[i].col);
            noStroke();
            rect(ix, iy - 6, 16, 12, 2);
        } else if (items[i].shape === 'diamond') {
            fill(items[i].col);
            noStroke();
            beginShape();
            vertex(ix + 8, iy - 8);
            vertex(ix + 16, iy);
            vertex(ix + 8, iy + 8);
            vertex(ix, iy);
            endShape(CLOSE);
        } else if (items[i].shape === 'ring') {
            noFill();
            stroke(items[i].col);
            strokeWeight(2.5);
            ellipse(ix + 8, iy, 14, 14);
            strokeWeight(1);
        }

        fill(50);
        noStroke();
        text(items[i].label, ix + 22, iy);
    }
}

// Contact Map View
function drawContactMap() {
    let mapSize = min(width - 100, drawHeight - 120);
    let mapX = (width - mapSize) / 2;
    let mapY = 55;

    fill(60);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text('Hi-C Contact Frequency Map', width / 2, 42);

    fill(250);
    stroke(180);
    strokeWeight(1);
    rect(mapX, mapY, mapSize, mapSize);

    let bins = 20;
    let binSize = mapSize / bins;
    let boundaryBin = 10;

    // Draw contact frequencies as heatmap
    for (let i = 0; i < bins; i++) {
        for (let j = i; j < bins; j++) {
            let intensity = getContactIntensity(i, j, bins, boundaryBin);
            let r, g, b;
            if (intensity < 0.25) {
                let t = intensity / 0.25;
                r = 255;
                g = 255;
                b = lerp(255, 200, t);
            } else if (intensity < 0.5) {
                let t = (intensity - 0.25) / 0.25;
                r = 255;
                g = lerp(255, 200, t);
                b = lerp(200, 50, t);
            } else if (intensity < 0.75) {
                let t = (intensity - 0.5) / 0.25;
                r = lerp(255, 200, t);
                g = lerp(200, 50, t);
                b = lerp(50, 20, t);
            } else {
                let t = (intensity - 0.75) / 0.25;
                r = lerp(200, 120, t);
                g = lerp(50, 10, t);
                b = lerp(20, 10, t);
            }

            fill(r, g, b);
            noStroke();
            rect(mapX + i * binSize, mapY + j * binSize, binSize + 1, binSize + 1);
            rect(mapX + j * binSize, mapY + i * binSize, binSize + 1, binSize + 1);
        }
    }

    // Draw TAD triangle outlines
    stroke(0, 0, 200);
    strokeWeight(2);
    noFill();

    if (ctcfPresent) {
        // TAD 1 triangle along diagonal
        let bx = mapX + boundaryBin * binSize;
        let by = mapY + boundaryBin * binSize;
        line(mapX, mapY, bx, by);

        // TAD 2 triangle along diagonal
        line(bx, by, mapX + mapSize, mapY + mapSize);

        // Boundary dashed lines
        stroke(220, 20, 60);
        strokeWeight(2);
        drawingContext.setLineDash([5, 3]);
        line(bx, mapY, bx, mapY + mapSize);
        line(mapX, by, mapX + mapSize, by);
        drawingContext.setLineDash([]);

        fill(220, 20, 60);
        noStroke();
        textSize(16);
        textAlign(CENTER, TOP);
        text('CTCF Boundary', bx, mapY + mapSize + 8);
    } else {
        // Single diagonal for merged TAD
        line(mapX, mapY, mapX + mapSize, mapY + mapSize);

        fill(180, 40, 40);
        noStroke();
        textSize(16);
        textAlign(CENTER, TOP);
        text('No Boundary - TADs Merged', width / 2, mapY + mapSize + 8);
    }

    // Axis labels
    fill(80);
    noStroke();
    textSize(16);
    textAlign(CENTER, BOTTOM);
    text('Genomic Position', width / 2, mapY + mapSize + 36);

    push();
    translate(mapX - 16, mapY + mapSize / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Genomic Position', 0, 0);
    pop();

    // TAD labels on top axis
    textSize(16);
    fill(70, 130, 200);
    textAlign(CENTER, BOTTOM);
    text('TAD 1', mapX + boundaryBin * binSize / 2, mapY - 4);
    fill(60, 160, 80);
    text('TAD 2', mapX + boundaryBin * binSize + (bins - boundaryBin) * binSize / 2, mapY - 4);

    strokeWeight(1);
}

function getContactIntensity(i, j, bins, boundaryBin) {
    let dist = abs(i - j);
    let base = exp(-dist * 0.3);

    let sameTAD = (i < boundaryBin && j < boundaryBin) ||
                  (i >= boundaryBin && j >= boundaryBin);

    if (ctcfPresent) {
        if (sameTAD) {
            return constrain(base * 1.4, 0, 1);
        } else {
            return constrain(base * 0.3, 0, 1);
        }
    } else {
        if (sameTAD) {
            return constrain(base * 1.3, 0, 1);
        } else {
            return constrain(base * 0.9, 0, 1);
        }
    }
}

function fracToX(frac) {
    return genomeLeft + frac * genomeLen;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
    const main = document.querySelector('main');
    containerWidth = main ? main.offsetWidth : windowWidth;
}

// Chromosomal Instability Mechanisms
// CANVAS_HEIGHT: 500
let drawHeight = 450;
let controlHeight = 50;
let canvasWidth, canvasHeight;

let currentMode = 'normal'; // 'normal', 'checkpoint', 'centrosome'
let animProgress = 0;
let animSpeed = 0.005;
let btnNormal, btnCheckpoint, btnCentrosome;

// Chromosome colors
const chromColors = ['#E63946', '#457B9D', '#2A9D8F', '#E9C46A', '#F4A261', '#264653'];

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

    btnNormal = createButton('Normal Mitosis');
    btnNormal.parent(document.querySelector('main'));
    btnNormal.mousePressed(() => { currentMode = 'normal'; animProgress = 0; });

    btnCheckpoint = createButton('Checkpoint Failure');
    btnCheckpoint.parent(document.querySelector('main'));
    btnCheckpoint.mousePressed(() => { currentMode = 'checkpoint'; animProgress = 0; });

    btnCentrosome = createButton('Centrosome Amplification');
    btnCentrosome.parent(document.querySelector('main'));
    btnCentrosome.mousePressed(() => { currentMode = 'centrosome'; animProgress = 0; });
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

    // Position buttons
    let bw = 160;
    let bSpacing = 20;
    let totalW = bw * 3 + bSpacing * 2;
    let bx = (canvasWidth - totalW) / 2;
    let by = drawHeight + 10;
    btnNormal.position(bx, by + canvas.elt.offsetTop);
    btnNormal.size(bw, 30);
    btnCheckpoint.position(bx + bw + bSpacing, by + canvas.elt.offsetTop);
    btnCheckpoint.size(bw, 30);
    btnCentrosome.position(bx + 2 * (bw + bSpacing), by + canvas.elt.offsetTop);
    btnCentrosome.size(bw, 30);

    styleButton(btnNormal, currentMode === 'normal');
    styleButton(btnCheckpoint, currentMode === 'checkpoint');
    styleButton(btnCentrosome, currentMode === 'centrosome');

    // Title
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Chromosomal Instability Mechanisms', canvasWidth / 2, 10);

    // Subtitle
    textSize(16);
    fill(80);
    let subtitle = '';
    if (currentMode === 'normal') subtitle = 'Normal Mitosis: Equal Chromosome Segregation';
    else if (currentMode === 'checkpoint') subtitle = 'Mitotic Checkpoint Failure: Missegregation';
    else subtitle = 'Centrosome Amplification: Multipolar Spindle';
    text(subtitle, canvasWidth / 2, 42);

    // Advance animation
    animProgress += animSpeed;
    if (animProgress > 1) animProgress = 1;

    // Draw the selected mechanism
    let panelY = 70;
    let panelH = 280;

    if (currentMode === 'normal') {
        drawNormalMitosis(panelY, panelH);
    } else if (currentMode === 'checkpoint') {
        drawCheckpointFailure(panelY, panelH);
    } else {
        drawCentrosomeAmplification(panelY, panelH);
    }

    // Karyotype bar
    drawKaryotypeBar();
}

function styleButton(btn, active) {
    btn.style('font-size', '14px');
    btn.style('border', 'none');
    btn.style('border-radius', '4px');
    btn.style('cursor', 'pointer');
    btn.style('font-family', 'Arial, sans-serif');
    if (active) {
        btn.style('background-color', '#457B9D');
        btn.style('color', 'white');
    } else {
        btn.style('background-color', '#DDD');
        btn.style('color', '#333');
    }
}

// --- Draw a cell as a circle with chromosomes inside ---
function drawCell(cx, cy, r, chromosomes, label) {
    // Cell membrane
    fill(255, 255, 255, 180);
    stroke(100);
    strokeWeight(2);
    ellipse(cx, cy, r * 2, r * 2);

    // Draw chromosomes as X shapes
    let n = chromosomes.length;
    let cols = Math.min(n, 3);
    let rows = Math.ceil(n / cols);
    let spacing = r * 0.55;

    for (let i = 0; i < n; i++) {
        let row = Math.floor(i / cols);
        let col = i % cols;
        let ox = cx + (col - (cols - 1) / 2) * spacing;
        let oy = cy + (row - (rows - 1) / 2) * spacing;
        drawChromosome(ox, oy, 10, chromosomes[i]);
    }

    // Label below cell
    if (label) {
        fill(50);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text(label, cx, cy + r + 5);
    }
}

function drawChromosome(x, y, size, col) {
    stroke(col);
    strokeWeight(3);
    line(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
    line(x + size / 2, y - size / 2, x - size / 2, y + size / 2);
    // Centromere dot
    fill(col);
    noStroke();
    ellipse(x, y, 5, 5);
}

// --- Draw spindle fibers from poles to chromosomes ---
function drawSpindleFibers(poleX, poleY, targets, col) {
    stroke(col);
    strokeWeight(1);
    for (let t of targets) {
        line(poleX, poleY, t.x, t.y);
    }
}

// --- Normal Mitosis ---
function drawNormalMitosis(panelY, panelH) {
    let cx = canvasWidth / 2;
    let midY = panelY + panelH / 2;
    let t = animProgress;

    // 6 chromosomes (3 pairs)
    let chroms = [chromColors[0], chromColors[0], chromColors[1], chromColors[1], chromColors[2], chromColors[2]];

    if (t < 0.4) {
        // Before: single mother cell with all 6 chromosomes
        let phase = t / 0.4;
        drawPhaseLabel(cx, panelY + 5, 'Metaphase');

        // Poles
        let poleTopY = midY - 80;
        let poleBotY = midY + 80;
        fill('#457B9D');
        noStroke();
        ellipse(cx, poleTopY, 12, 12);
        ellipse(cx, poleBotY, 12, 12);

        // Mother cell
        let r = 70;
        drawCell(cx, midY, r, chroms, 'Mother Cell (2n=6)');

        // Spindle fibers to center
        let targets = [];
        let cols = 3;
        let rows = 2;
        let spacing = r * 0.55;
        for (let i = 0; i < 6; i++) {
            let row = Math.floor(i / cols);
            let col = i % cols;
            targets.push({
                x: cx + (col - (cols - 1) / 2) * spacing,
                y: midY + (row - (rows - 1) / 2) * spacing
            });
        }
        drawSpindleFibers(cx, poleTopY, targets.slice(0, 3), color(100, 100, 200, 100));
        drawSpindleFibers(cx, poleBotY, targets.slice(3, 6), color(100, 100, 200, 100));

    } else {
        // After: two daughter cells each with 3 pairs
        let phase = (t - 0.4) / 0.6;
        let sep = lerp(0, 100, min(phase * 2, 1));
        drawPhaseLabel(cx, panelY + 5, 'Anaphase / Telophase');

        let topY = midY - sep;
        let botY = midY + sep;

        // Cleavage furrow
        if (phase > 0.5) {
            stroke(150);
            strokeWeight(1);
            let furrW = lerp(0, 50, (phase - 0.5) * 2);
            line(cx - furrW, midY, cx + furrW, midY);
        }

        // Daughter cells
        let r = 50;
        let topChroms = [chroms[0], chroms[2], chroms[4]];
        let botChroms = [chroms[1], chroms[3], chroms[5]];
        drawCell(cx, topY, r, topChroms, '');
        drawCell(cx, botY, r, botChroms, '');

        // Labels
        fill(50);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text('Daughter 1 (n=3)', cx, topY + r + 5);
        text('Daughter 2 (n=3)', cx, botY + r + 5);
    }

    // Arrow showing progression
    drawProgressArrow(canvasWidth - 80, panelY + 20, panelH - 40, t);
}

// --- Checkpoint Failure ---
function drawCheckpointFailure(panelY, panelH) {
    let cx = canvasWidth / 2;
    let midY = panelY + panelH / 2;
    let t = animProgress;

    let chroms = [chromColors[0], chromColors[0], chromColors[1], chromColors[1], chromColors[2], chromColors[2]];

    if (t < 0.4) {
        drawPhaseLabel(cx, panelY + 5, 'Metaphase — Checkpoint Fails!');

        let poleTopY = midY - 80;
        let poleBotY = midY + 80;
        fill('#E63946');
        noStroke();
        ellipse(cx, poleTopY, 12, 12);
        ellipse(cx, poleBotY, 12, 12);

        let r = 70;
        drawCell(cx, midY, r, chroms, 'Mother Cell (2n=6)');

        // Warning icon
        fill('#E63946');
        noStroke();
        textSize(18);
        textAlign(CENTER, CENTER);
        text('⚠ Unattached kinetochore!', cx, midY + r + 30);

        // Spindle fibers - one chromosome not attached
        let cols = 3;
        let spacing = r * 0.55;
        let targets = [];
        for (let i = 0; i < 6; i++) {
            let row = Math.floor(i / cols);
            let col = i % cols;
            targets.push({
                x: cx + (col - (cols - 1) / 2) * spacing,
                y: midY + (row - (rows - 1) / 2) * spacing
            });
        }
        var rows = 2;
        // Re-calculate targets with rows defined
        targets = [];
        for (let i = 0; i < 6; i++) {
            let row = Math.floor(i / cols);
            let col = i % cols;
            targets.push({
                x: cx + (col - (cols - 1) / 2) * spacing,
                y: midY + (row - (rows - 1) / 2) * spacing
            });
        }
        drawSpindleFibers(cx, poleTopY, targets.slice(0, 3), color(200, 100, 100, 100));
        // Only 2 of 3 bottom chromosomes attached
        drawSpindleFibers(cx, poleBotY, targets.slice(3, 5), color(200, 100, 100, 100));

        // Dashed line for unattached
        stroke(255, 0, 0, 150);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(cx, poleBotY, targets[5].x, targets[5].y);
        drawingContext.setLineDash([]);

    } else {
        let phase = (t - 0.4) / 0.6;
        let sep = lerp(0, 100, min(phase * 2, 1));
        drawPhaseLabel(cx, panelY + 5, 'Missegregation — Unequal Division');

        let topY = midY - sep;
        let botY = midY + sep;

        if (phase > 0.5) {
            stroke(200, 100, 100);
            strokeWeight(1);
            let furrW = lerp(0, 50, (phase - 0.5) * 2);
            line(cx - furrW, midY, cx + furrW, midY);
        }

        let r = 50;
        // Unequal: top gets 4 chromosomes, bottom gets 2
        let topChroms = [chroms[0], chroms[2], chroms[4], chroms[5]];
        let botChroms = [chroms[1], chroms[3]];
        drawCell(cx, topY, r, topChroms, '');
        drawCell(cx, botY, r, botChroms, '');

        fill('#E63946');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text('Trisomy (n+1 = 4)', cx, topY + r + 5);
        text('Monosomy (n-1 = 2)', cx, botY + r + 5);
    }

    drawProgressArrow(canvasWidth - 80, panelY + 20, panelH - 40, t);
}

// --- Centrosome Amplification ---
function drawCentrosomeAmplification(panelY, panelH) {
    let cx = canvasWidth / 2;
    let midY = panelY + panelH / 2;
    let t = animProgress;

    let chroms = [chromColors[0], chromColors[0], chromColors[1], chromColors[1], chromColors[2], chromColors[2]];

    if (t < 0.4) {
        drawPhaseLabel(cx, panelY + 5, 'Prometaphase — 3 Centrosomes!');

        // Three poles (triangle)
        let poleR = 90;
        let poles = [];
        for (let i = 0; i < 3; i++) {
            let angle = -PI / 2 + (TWO_PI / 3) * i;
            poles.push({ x: cx + cos(angle) * poleR, y: midY + sin(angle) * poleR });
        }

        // Draw poles
        fill('#2A9D8F');
        noStroke();
        for (let p of poles) {
            ellipse(p.x, p.y, 14, 14);
        }
        // Label poles
        textSize(16);
        fill('#2A9D8F');
        textAlign(CENTER, CENTER);
        for (let i = 0; i < 3; i++) {
            let lx = cx + cos(-PI / 2 + (TWO_PI / 3) * i) * (poleR + 20);
            let ly = midY + sin(-PI / 2 + (TWO_PI / 3) * i) * (poleR + 20);
            text('Pole ' + (i + 1), lx, ly);
        }

        let r = 55;
        drawCell(cx, midY, r, chroms, '');

        // Spindle fibers from each pole to 2 chromosomes
        let cols = 3;
        let rows = 2;
        let spacing = r * 0.55;
        let targets = [];
        for (let i = 0; i < 6; i++) {
            let row = Math.floor(i / cols);
            let col = i % cols;
            targets.push({
                x: cx + (col - (cols - 1) / 2) * spacing,
                y: midY + (row - (rows - 1) / 2) * spacing
            });
        }
        drawSpindleFibers(poles[0].x, poles[0].y, [targets[0], targets[1]], color(42, 157, 143, 100));
        drawSpindleFibers(poles[1].x, poles[1].y, [targets[2], targets[3]], color(42, 157, 143, 100));
        drawSpindleFibers(poles[2].x, poles[2].y, [targets[4], targets[5]], color(42, 157, 143, 100));

        fill(50);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text('Mother Cell (2n=6)', cx, midY + r + 5);

    } else {
        let phase = (t - 0.4) / 0.6;
        drawPhaseLabel(cx, panelY + 5, 'Multipolar Division — 3 Daughter Cells');

        // Three daughter cells moving outward
        let sep = lerp(0, 90, min(phase * 2, 1));
        let r = 40;

        let positions = [];
        for (let i = 0; i < 3; i++) {
            let angle = -PI / 2 + (TWO_PI / 3) * i;
            positions.push({ x: cx + cos(angle) * sep, y: midY + sin(angle) * sep });
        }

        // Unequal distribution: 3, 2, 1
        let cellChroms = [
            [chroms[0], chroms[1], chroms[2]],
            [chroms[3], chroms[4]],
            [chroms[5]]
        ];
        let labels = ['Cell 1 (3)', 'Cell 2 (2)', 'Cell 3 (1)'];

        for (let i = 0; i < 3; i++) {
            drawCell(positions[i].x, positions[i].y, r, cellChroms[i], labels[i]);
        }
    }

    drawProgressArrow(canvasWidth - 80, panelY + 20, panelH - 40, t);
}

// --- Karyotype Bar ---
function drawKaryotypeBar() {
    let barY = 370;
    let barH = 65;

    // Background
    fill(245);
    stroke('silver');
    strokeWeight(1);
    rect(20, barY, canvasWidth - 40, barH, 6);

    fill(50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text('Karyotype Summary:', 30, barY + 5);

    textSize(16);
    let t = animProgress;

    if (currentMode === 'normal') {
        if (t < 0.4) {
            drawKaryoCell(canvasWidth / 2, barY + 38, 'Mother: 2n = 6', 6, '#457B9D');
        } else {
            drawKaryoCell(canvasWidth / 2 - 100, barY + 38, 'Daughter 1: n = 3', 3, '#457B9D');
            drawKaryoCell(canvasWidth / 2 + 100, barY + 38, 'Daughter 2: n = 3', 3, '#457B9D');
            // Checkmark
            fill(40, 167, 69);
            textAlign(CENTER, CENTER);
            textSize(18);
            text('✓ Equal', canvasWidth / 2, barY + 38);
        }
    } else if (currentMode === 'checkpoint') {
        if (t < 0.4) {
            drawKaryoCell(canvasWidth / 2, barY + 38, 'Mother: 2n = 6', 6, '#E63946');
        } else {
            drawKaryoCell(canvasWidth / 2 - 120, barY + 38, 'Daughter 1: 4', 4, '#E63946');
            drawKaryoCell(canvasWidth / 2 + 120, barY + 38, 'Daughter 2: 2', 2, '#E63946');
            fill('#E63946');
            textAlign(CENTER, CENTER);
            textSize(18);
            text('✗ Unequal (Aneuploid)', canvasWidth / 2, barY + 38);
        }
    } else {
        if (t < 0.4) {
            drawKaryoCell(canvasWidth / 2, barY + 38, 'Mother: 2n = 6', 6, '#2A9D8F');
        } else {
            drawKaryoCell(canvasWidth / 2 - 160, barY + 38, 'Cell 1: 3', 3, '#2A9D8F');
            drawKaryoCell(canvasWidth / 2, barY + 38, 'Cell 2: 2', 2, '#2A9D8F');
            drawKaryoCell(canvasWidth / 2 + 160, barY + 38, 'Cell 3: 1', 1, '#E63946');
        }
    }
}

function drawKaryoCell(x, y, label, count, col) {
    // Small colored rectangles representing chromosomes
    let bw = 8;
    let totalW = count * bw + (count - 1) * 3;
    let startX = x - totalW / 2;

    fill(col);
    noStroke();
    for (let i = 0; i < count; i++) {
        rect(startX + i * (bw + 3), y - 8, bw, 16, 2);
    }

    fill(50);
    textAlign(CENTER, TOP);
    textSize(16);
    text(label, x, y + 12);
}

function drawPhaseLabel(x, y, label) {
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text(label, x, y);
}

function drawProgressArrow(x, y, h, progress) {
    // Vertical arrow showing animation progress
    stroke(200);
    strokeWeight(2);
    line(x, y, x, y + h);

    // Arrow head
    line(x, y + h, x - 5, y + h - 8);
    line(x, y + h, x + 5, y + h - 8);

    // Progress marker
    let markerY = y + h * progress;
    fill('#457B9D');
    noStroke();
    ellipse(x, markerY, 10, 10);

    // Labels
    fill(150);
    textAlign(CENTER, TOP);
    textSize(16);
    text('Before', x, y - 18);
    textSize(16);
    text('After', x, y + h + 5);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

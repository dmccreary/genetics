// Genetic Background Effects Visualization
// CANVAS_HEIGHT: 530
let drawHeight = 400;
let controlHeight = 130;
let canvasWidth, canvasHeight;

// Controls
let mutationSelect;
let enhancerSlider, neutralSlider, suppressorSlider;
let randomizeBtn;

// Mutation data: name -> base severity (0-1)
let mutations = {
    'BRCA1 Variant': 0.65,
    'TP53 Missense': 0.70,
    'CFTR ΔF508': 0.60,
    'APOE ε4': 0.50,
    'HFE C282Y': 0.45
};

// Animation
let displayedSeverity = 0;
let targetSeverity = 0;
let particles = [];

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

    // Create controls
    let controlY = drawHeight + 12;

    // Mutation selector
    mutationSelect = createSelect();
    for (let m in mutations) {
        mutationSelect.option(m);
    }
    mutationSelect.parent(document.querySelector('main'));
    mutationSelect.style('font-size', '16px');
    mutationSelect.style('padding', '4px');

    // Enhancer slider
    enhancerSlider = createSlider(0, 100, 50, 1);
    enhancerSlider.parent(document.querySelector('main'));
    enhancerSlider.style('width', '120px');

    // Neutral modifier slider
    neutralSlider = createSlider(0, 100, 50, 1);
    neutralSlider.parent(document.querySelector('main'));
    neutralSlider.style('width', '120px');

    // Suppressor slider
    suppressorSlider = createSlider(0, 100, 50, 1);
    suppressorSlider.parent(document.querySelector('main'));
    suppressorSlider.style('width', '120px');

    // Randomize button
    randomizeBtn = createButton('Randomize Backgrounds');
    randomizeBtn.parent(document.querySelector('main'));
    randomizeBtn.style('font-size', '16px');
    randomizeBtn.style('padding', '6px 12px');
    randomizeBtn.mousePressed(randomizeAll);

    positionControls();
}

function positionControls() {
    let row1Y = drawHeight + 10;
    let row2Y = drawHeight + 50;
    let row3Y = drawHeight + 90;
    let leftMargin = 10;
    let spacing = max(160, (canvasWidth - 20) / 4);

    // Row 1: mutation select and randomize button
    mutationSelect.position(leftMargin, row1Y);
    randomizeBtn.position(leftMargin + 260, row1Y);

    // Row 2: slider labels + sliders
    let sliderStart = leftMargin;
    let sliderSpacing = max(180, (canvasWidth - 40) / 3);

    enhancerSlider.position(sliderStart + 100, row2Y);
    neutralSlider.position(sliderStart + 100 + sliderSpacing, row2Y);
    suppressorSlider.position(sliderStart + 100 + sliderSpacing * 2, row2Y);
}

function randomizeAll() {
    enhancerSlider.value(floor(random(0, 101)));
    neutralSlider.value(floor(random(0, 101)));
    suppressorSlider.value(floor(random(0, 101)));

    // Spawn particles for visual feedback
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: random(40, canvasWidth - 40),
            y: random(80, drawHeight - 80),
            vx: random(-2, 2),
            vy: random(-2, 2),
            life: 60,
            col: color(random(100, 255), random(50, 200), random(50, 200), 200)
        });
    }
}

function computeSeverity() {
    let mutName = mutationSelect.value();
    let baseSev = mutations[mutName] || 0.5;

    let enh = enhancerSlider.value() / 100;  // 0-1
    let neu = neutralSlider.value() / 100;   // 0-1
    let sup = suppressorSlider.value() / 100; // 0-1

    // Enhancer increases severity, suppressor decreases, neutral adds noise
    let modifier = (enh * 0.4) - (sup * 0.4) + ((neu - 0.5) * 0.1);
    let severity = constrain(baseSev + modifier, 0, 1);
    return severity;
}

function getSeverityLabel(sev) {
    if (sev < 0.2) return 'Minimal';
    if (sev < 0.4) return 'Mild';
    if (sev < 0.6) return 'Moderate';
    if (sev < 0.8) return 'Severe';
    return 'Very Severe';
}

function getSeverityColor(sev) {
    // Green (mild) -> Yellow (moderate) -> Red (severe)
    let r, g, b;
    if (sev < 0.5) {
        let t = sev / 0.5;
        r = lerp(50, 240, t);
        g = lerp(180, 200, t);
        b = lerp(50, 30, t);
    } else {
        let t = (sev - 0.5) / 0.5;
        r = lerp(240, 220, t);
        g = lerp(200, 40, t);
        b = lerp(30, 30, t);
    }
    return color(r, g, b);
}

function drawSeverityMeter(x, y, w, h, severity) {
    // Background track
    push();
    fill(230);
    stroke('silver');
    strokeWeight(1);
    rect(x, y, w, h, 6);

    // Gradient fill
    noStroke();
    let segments = 60;
    let segW = w / segments;
    for (let i = 0; i < segments; i++) {
        let t = i / segments;
        if (t <= severity) {
            fill(getSeverityColor(t));
            rect(x + i * segW, y, segW + 1, h, i === 0 ? 6 : 0, 0, 0, i === 0 ? 6 : 0);
        }
    }

    // Indicator line at current severity
    stroke(40);
    strokeWeight(2);
    let indX = x + severity * w;
    line(indX, y - 4, indX, y + h + 4);

    // Label
    noStroke();
    fill(40);
    textAlign(CENTER, TOP);
    textSize(16);
    text(getSeverityLabel(severity) + ' (' + nf(severity * 100, 1, 0) + '%)', x + w / 2, y + h + 8);
    pop();
}

function drawModifierGene(x, y, w, h, label, value, geneColor) {
    push();
    // Gene box
    let intensity = map(value, 0, 100, 60, 255);
    fill(red(geneColor), green(geneColor), blue(geneColor), intensity);
    stroke(80);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Label
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(label, x + w / 2, y - 14);

    // Value display inside
    fill(value > 60 ? 255 : 40);
    textSize(18);
    text(value + '%', x + w / 2, y + h / 2);

    // Arrow indicator
    let arrowX = x + w / 2;
    let arrowY = y + h + 12;
    fill(80);
    textSize(16);
    if (label === 'Enhancer') {
        fill(200, 60, 60);
        text('↑ Increases severity', arrowX, arrowY + 6);
    } else if (label === 'Suppressor') {
        fill(60, 140, 60);
        text('↓ Decreases severity', arrowX, arrowY + 6);
    } else {
        fill(100, 100, 180);
        text('~ Background noise', arrowX, arrowY + 6);
    }
    pop();
}

function drawMutationCard(x, y, w, h, mutName, baseSev) {
    push();
    // Card shadow
    noStroke();
    fill(0, 0, 0, 20);
    rect(x + 3, y + 3, w, h, 10);

    // Card
    fill(255, 250, 240);
    stroke(180, 140, 80);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    // DNA icon
    fill(180, 140, 80);
    noStroke();
    textSize(28);
    textAlign(CENTER, TOP);
    text('🧬', x + w / 2, y + 8);

    // Mutation name
    fill(60);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(mutName, x + w / 2, y + 54);

    // Base severity
    textSize(16);
    fill(120);
    text('Base severity: ' + nf(baseSev * 100, 1, 0) + '%', x + w / 2, y + 80);
    pop();
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            push();
            noStroke();
            let a = map(p.life, 0, 60, 0, 200);
            fill(red(p.col), green(p.col), blue(p.col), a);
            ellipse(p.x, p.y, 8, 8);
            pop();
        }
    }
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

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Genetic Background Effects', canvasWidth / 2, 10);

    textSize(16);
    fill(100);
    text('Same mutation, different outcomes depending on modifier genes', canvasWidth / 2, 40);

    // Compute severity
    targetSeverity = computeSeverity();
    displayedSeverity = lerp(displayedSeverity, targetSeverity, 0.1);

    let mutName = mutationSelect.value();
    let baseSev = mutations[mutName] || 0.5;

    // Layout
    let cardW = min(200, canvasWidth * 0.25);
    let cardH = 100;
    let cardX = canvasWidth / 2 - cardW / 2;
    let cardY = 68;

    // Draw mutation card
    drawMutationCard(cardX, cardY, cardW, cardH, mutName, baseSev);

    // Draw connecting arrows from mutation to modifiers
    let modY = 210;
    let modW = min(120, (canvasWidth - 80) / 3 - 20);
    let modH = 55;
    let totalModW = modW * 3 + 40;
    let modStartX = canvasWidth / 2 - totalModW / 2;

    stroke(160);
    strokeWeight(1.5);
    // Arrow from card to each modifier
    let cardCenterX = cardX + cardW / 2;
    let cardBottom = cardY + cardH;

    for (let i = 0; i < 3; i++) {
        let mx = modStartX + i * (modW + 20) + modW / 2;
        line(cardCenterX, cardBottom, mx, modY);
        // Arrowhead
        let angle = atan2(modY - cardBottom, mx - cardCenterX);
        push();
        translate(mx, modY);
        rotate(angle);
        fill(160);
        noStroke();
        triangle(-10, -4, -10, 4, 0, 0);
        pop();
    }

    // Draw modifier genes
    let enhVal = enhancerSlider.value();
    let neuVal = neutralSlider.value();
    let supVal = suppressorSlider.value();

    drawModifierGene(modStartX, modY, modW, modH, 'Enhancer', enhVal, color(220, 80, 80));
    drawModifierGene(modStartX + modW + 20, modY, modW, modH, 'Neutral Modifier', neuVal, color(100, 100, 200));
    drawModifierGene(modStartX + (modW + 20) * 2, modY, modW, modH, 'Suppressor', supVal, color(80, 180, 80));

    // Arrow from modifiers down to severity meter
    let meterY = 330;
    let meterW = min(400, canvasWidth - 80);
    let meterX = canvasWidth / 2 - meterW / 2;
    let meterH = 30;

    stroke(160);
    strokeWeight(1.5);
    let combineY = modY + modH + 38;
    // Converging arrows
    for (let i = 0; i < 3; i++) {
        let mx = modStartX + i * (modW + 20) + modW / 2;
        line(mx, modY + modH + 28, canvasWidth / 2, combineY + 10);
    }
    // Down to meter
    line(canvasWidth / 2, combineY + 10, canvasWidth / 2, meterY - 8);
    push();
    fill(160);
    noStroke();
    triangle(canvasWidth / 2 - 4, meterY - 8, canvasWidth / 2 + 4, meterY - 8, canvasWidth / 2, meterY);
    pop();

    // Phenotypic outcome label
    fill(60);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(18);
    text('Phenotypic Severity', canvasWidth / 2, meterY - 4);

    // Draw severity meter
    drawSeverityMeter(meterX, meterY, meterW, meterH, displayedSeverity);

    // Draw particles
    updateParticles();

    // Control labels
    fill(60);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(16);
    let row2Y = drawHeight + 56;
    let sliderStart = 10;
    let sliderSpacing = max(180, (canvasWidth - 40) / 3);
    text('Enhancer:', sliderStart + 95, row2Y);
    text('Neutral:', sliderStart + 95 + sliderSpacing, row2Y);
    text('Suppressor:', sliderStart + 95 + sliderSpacing * 2, row2Y);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}

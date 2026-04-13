// Crossover Types and Scale MicroSim
// CANVAS_HEIGHT: 510
let drawHeight = 450;
let controlHeight = 60;
let canvasWidth, canvasHeight;

// Tab state: 0=Intergenic, 1=Intragenic, 2=Gene Conversion
let activeTab = 0;
let tabButtons = [];

// Animation
let animProgress = 0;
let animating = false;
let animSpeed = 0.012;
let resetBtn;

// Colors
const PARENT_A = '#4488CC'; // blue
const PARENT_B = '#CC4444'; // red
const RECOMB_A = '#44AA66'; // green tint
const RECOMB_B = '#DD8844'; // orange tint
const CROSSOVER_MARK = '#FFD700'; // gold

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

    // Create tab buttons
    let tabLabels = ['Intergenic', 'Intragenic', 'Gene Conversion'];
    for (let i = 0; i < 3; i++) {
        let btn = createButton(tabLabels[i]);
        btn.parent(document.querySelector('main'));
        btn.mousePressed(makeTabHandler(i));
        btn.style('font-size', '16px');
        btn.style('padding', '6px 14px');
        btn.style('margin', '4px');
        btn.style('cursor', 'pointer');
        btn.style('border-radius', '4px');
        btn.style('border', '2px solid #4488CC');
        tabButtons.push(btn);
    }

    resetBtn = createButton('Animate');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.mousePressed(startAnimation);
    resetBtn.style('font-size', '16px');
    resetBtn.style('padding', '6px 14px');
    resetBtn.style('margin', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('border', '2px solid #888');

    updateTabStyles();
    positionControls();
}

function makeTabHandler(idx) {
    return function () {
        activeTab = idx;
        animProgress = 0;
        animating = false;
        resetBtn.html('Animate');
        updateTabStyles();
    };
}

function startAnimation() {
    animProgress = 0;
    animating = true;
    resetBtn.html('Animating...');
}

function updateTabStyles() {
    for (let i = 0; i < tabButtons.length; i++) {
        if (i === activeTab) {
            tabButtons[i].style('background-color', '#4488CC');
            tabButtons[i].style('color', 'white');
        } else {
            tabButtons[i].style('background-color', 'white');
            tabButtons[i].style('color', '#4488CC');
        }
    }
}

function positionControls() {
    let startX = 10;
    let y = drawHeight + 8;
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].position(startX, y);
        startX += tabButtons[i].elt.offsetWidth + 8;
    }
    resetBtn.position(startX + 20, y);
}

function draw() {
    // Draw region
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control region
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('#333');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    let titles = [
        'Intergenic Recombination',
        'Intragenic Recombination',
        'Gene Conversion'
    ];
    text(titles[activeTab], canvasWidth / 2, 12);

    // Subtitle
    textSize(16);
    fill('#666');
    let subtitles = [
        'Crossover between genes on a chromosome',
        'Crossover within a gene between mutation sites',
        'Nonreciprocal transfer of genetic information'
    ];
    text(subtitles[activeTab], canvasWidth / 2, 44);

    // Advance animation
    if (animating) {
        animProgress += animSpeed;
        if (animProgress >= 1) {
            animProgress = 1;
            animating = false;
            resetBtn.html('Replay');
        }
    }

    // Draw the active view
    if (activeTab === 0) drawIntergenic();
    else if (activeTab === 1) drawIntragenic();
    else drawGeneConversion();

    positionControls();
}

// ===== INTERGENIC RECOMBINATION =====
function drawIntergenic() {
    let margin = 60;
    let barW = canvasWidth - margin * 2;
    let barH = 24;
    let yTop = 90;
    let geneW = barW / 5;

    // Labels for genes
    let geneLabels = ['Gene A', 'Gene B', 'Gene C', 'Gene D', 'Gene E'];

    // Parental chromosomes label
    textAlign(LEFT, CENTER);
    textSize(18);
    fill('#333');
    noStroke();
    text('Parental Chromosomes', margin, yTop);

    // Draw parental chromosome 1 (blue shades)
    let y1 = yTop + 30;
    drawChromosome(margin, y1, barW, barH, PARENT_A, geneLabels, geneW, '#3366AA');

    // Draw parental chromosome 2 (red shades)
    let y2 = y1 + barH + 10;
    drawChromosome(margin, y2, barW, barH, PARENT_B, geneLabels, geneW, '#AA3333');

    // Crossover point between Gene B and Gene C
    let crossX = margin + geneW * 2 + geneW * 0.5;
    let crossY = y2 + barH / 2;

    // Draw crossover X
    if (animProgress > 0.1) {
        let xAlpha = min(1, (animProgress - 0.1) / 0.2);
        drawCrossoverX(crossX, (y1 + y2 + barH) / 2, barH + 10, xAlpha);
    }

    // Crossover label
    if (animProgress > 0.2) {
        textAlign(CENTER, TOP);
        textSize(16);
        fill('#B8860B');
        noStroke();
        text('Crossover', crossX, y2 + barH + 8);
        text('Point', crossX, y2 + barH + 26);
    }

    // Recombinant chromosomes
    let yRecomb = y2 + barH + 60;
    if (animProgress > 0.4) {
        let rAlpha = min(1, (animProgress - 0.4) / 0.3);

        textAlign(LEFT, CENTER);
        textSize(18);
        fill(33, 33, 33, rAlpha * 255);
        noStroke();
        text('Recombinant Chromosomes', margin, yRecomb);

        let yr1 = yRecomb + 30;
        let yr2 = yr1 + barH + 10;

        push();
        drawingContext.globalAlpha = rAlpha;

        // Recombinant 1: A,B from parent A + C,D,E from parent B
        drawRecombChrom(margin, yr1, barW, barH, geneLabels, geneW,
            [PARENT_A, PARENT_A, PARENT_B, PARENT_B, PARENT_B],
            ['#3366AA', '#3366AA', '#AA3333', '#AA3333', '#AA3333']);

        // Recombinant 2: A,B from parent B + C,D,E from parent A
        drawRecombChrom(margin, yr2, barW, barH, geneLabels, geneW,
            [PARENT_B, PARENT_B, PARENT_A, PARENT_A, PARENT_A],
            ['#AA3333', '#AA3333', '#3366AA', '#3366AA', '#3366AA']);

        drawingContext.globalAlpha = 1.0;
        pop();

        // Labels for recombinants
        if (animProgress > 0.7) {
            let lAlpha = min(1, (animProgress - 0.7) / 0.2);
            textAlign(CENTER, TOP);
            textSize(16);
            fill(68, 136, 68, lAlpha * 255);
            noStroke();
            text('Reciprocal Exchange', canvasWidth / 2, yr2 + barH + 12);
            textSize(16);
            text('Genes are shuffled between chromosomes', canvasWidth / 2, yr2 + barH + 32);
        }
    }
}

// ===== INTRAGENIC RECOMBINATION =====
function drawIntragenic() {
    let margin = 60;
    let barW = canvasWidth - margin * 2;
    let barH = 24;
    let yTop = 90;

    // Show a single gene with mutation sites
    textAlign(LEFT, CENTER);
    textSize(18);
    fill('#333');
    noStroke();
    text('Single Gene - Two Alleles with Mutations', margin, yTop);

    let y1 = yTop + 30;
    let y2 = y1 + barH + 14;

    // Gene 1 with mutation at site 1
    drawGeneBar(margin, y1, barW, barH, PARENT_A, 'Allele 1');
    let mut1X = margin + barW * 0.3;
    drawMutationSite(mut1X, y1, barH, '#FF6600', 'm1');

    // Gene 2 with mutation at site 2
    drawGeneBar(margin, y2, barW, barH, PARENT_B, 'Allele 2');
    let mut2X = margin + barW * 0.7;
    drawMutationSite(mut2X, y2, barH, '#FF6600', 'm2');

    // Crossover between mutation sites
    let crossX = margin + barW * 0.5;
    if (animProgress > 0.1) {
        let xAlpha = min(1, (animProgress - 0.1) / 0.2);
        drawCrossoverX(crossX, (y1 + y2 + barH) / 2, barH + 14, xAlpha);
    }

    if (animProgress > 0.2) {
        textAlign(CENTER, TOP);
        textSize(16);
        fill('#B8860B');
        noStroke();
        text('Crossover between', crossX, y2 + barH + 8);
        text('mutation sites', crossX, y2 + barH + 26);
    }

    // Recombinant products
    let yRecomb = y2 + barH + 60;
    if (animProgress > 0.4) {
        let rAlpha = min(1, (animProgress - 0.4) / 0.3);

        textAlign(LEFT, CENTER);
        textSize(18);
        fill(33, 33, 33, rAlpha * 255);
        noStroke();
        text('Recombinant Products', margin, yRecomb);

        let yr1 = yRecomb + 30;
        let yr2 = yr1 + barH + 14;

        push();
        drawingContext.globalAlpha = rAlpha;

        // Recombinant 1: left from allele1, right from allele2 = wild-type (no mutations)
        drawSplitGeneBar(margin, yr1, barW, barH, PARENT_A, PARENT_B, 0.5, 'Recombinant 1');
        // No mutation markers = wild-type!

        // Recombinant 2: left from allele2, right from allele1 = double mutant
        drawSplitGeneBar(margin, yr2, barW, barH, PARENT_B, PARENT_A, 0.5, 'Recombinant 2');
        drawMutationSite(mut1X, yr2, barH, '#FF6600', 'm1');
        drawMutationSite(mut2X, yr2, barH, '#FF6600', 'm2');

        drawingContext.globalAlpha = 1.0;
        pop();

        if (animProgress > 0.7) {
            let lAlpha = min(1, (animProgress - 0.7) / 0.2);
            textAlign(CENTER, TOP);
            textSize(16);
            noStroke();

            fill(34, 139, 34, lAlpha * 255);
            text('Wild-type (no mutations)', canvasWidth / 2, yr1 + barH + 4);

            fill(204, 0, 0, lAlpha * 255);
            text('Double mutant (m1 + m2)', canvasWidth / 2, yr2 + barH + 4);

            fill(68, 68, 68, lAlpha * 255);
            textSize(16);
            text('Intragenic recombination separates or combines mutations within a gene',
                canvasWidth / 2, yr2 + barH + 30);
        }
    }
}

// ===== GENE CONVERSION =====
function drawGeneConversion() {
    let margin = 60;
    let barW = canvasWidth - margin * 2;
    let barH = 24;
    let yTop = 90;

    textAlign(LEFT, CENTER);
    textSize(18);
    fill('#333');
    noStroke();
    text('Heteroduplex DNA During Recombination', margin, yTop);

    let y1 = yTop + 30;
    let y2 = y1 + barH + 14;

    // Parent chromosomes
    drawGeneBar(margin, y1, barW, barH, PARENT_A, 'Chromosome A');
    drawGeneBar(margin, y2, barW, barH, PARENT_B, 'Chromosome B');

    // Highlight a small region
    let convStart = margin + barW * 0.35;
    let convEnd = margin + barW * 0.55;
    let convW = convEnd - convStart;

    // Mark the region of interest
    if (animProgress > 0.05) {
        let bAlpha = min(1, (animProgress - 0.05) / 0.15);
        push();
        drawingContext.globalAlpha = bAlpha;
        noFill();
        stroke('#FFD700');
        strokeWeight(3);
        rect(convStart - 2, y1 - 2, convW + 4, (y2 + barH) - y1 + 4, 4);
        pop();

        textAlign(CENTER, TOP);
        textSize(16);
        fill(184, 134, 11, bAlpha * 255);
        noStroke();
        text('Heteroduplex Region', (convStart + convEnd) / 2, y2 + barH + 8);
    }

    // Mismatch repair phase
    let yMid = y2 + barH + 50;
    if (animProgress > 0.3) {
        let mAlpha = min(1, (animProgress - 0.3) / 0.2);
        textAlign(LEFT, CENTER);
        textSize(18);
        fill(33, 33, 33, mAlpha * 255);
        noStroke();
        text('Mismatch Repair (nonreciprocal)', margin, yMid);

        let ym1 = yMid + 30;
        let ym2 = ym1 + barH + 14;

        push();
        drawingContext.globalAlpha = mAlpha;

        // Chromosome A unchanged
        drawGeneBar(margin, ym1, barW, barH, PARENT_A, 'Chromosome A');

        // Chromosome B with converted region
        drawGeneBar(margin, ym2, barW, barH, PARENT_B, 'Chromosome B');

        // Converted segment on B now looks like A
        fill(PARENT_A);
        stroke('#3366AA');
        strokeWeight(1);
        rect(convStart, ym2, convW, barH);

        // Stripes to show conversion
        stroke('#3366AA');
        strokeWeight(1.5);
        for (let sx = convStart + 6; sx < convEnd - 2; sx += 8) {
            line(sx, ym2 + 3, sx, ym2 + barH - 3);
        }

        pop();

        // Arrow showing direction of conversion
        if (animProgress > 0.5) {
            let aAlpha = min(1, (animProgress - 0.5) / 0.15);
            push();
            drawingContext.globalAlpha = aAlpha;
            let arrowX = (convStart + convEnd) / 2;
            stroke('#B8860B');
            strokeWeight(3);
            line(arrowX, ym1 + barH + 2, arrowX, ym2 - 2);
            // Arrowhead
            fill('#B8860B');
            noStroke();
            triangle(arrowX - 6, ym2 - 4, arrowX + 6, ym2 - 4, arrowX, ym2 + 2);
            pop();
        }
    }

    // Result
    let yResult = yMid + 100;
    if (animProgress > 0.6) {
        let rAlpha = min(1, (animProgress - 0.6) / 0.2);
        textAlign(LEFT, CENTER);
        textSize(18);
        fill(33, 33, 33, rAlpha * 255);
        noStroke();
        text('Result: Non-Mendelian Ratios', margin, yResult);

        push();
        drawingContext.globalAlpha = rAlpha;

        let yr1 = yResult + 30;
        let yr2 = yr1 + barH + 14;

        // Both chromosomes now carry A's allele in converted region
        drawGeneBar(margin, yr1, barW, barH, PARENT_A, 'A allele');
        drawGeneBar(margin, yr2, barW, barH, PARENT_B, 'B allele (converted)');

        // Converted region on B
        fill(PARENT_A);
        stroke('#3366AA');
        strokeWeight(1);
        rect(convStart, yr2, convW, barH);
        for (let sx = convStart + 6; sx < convEnd - 2; sx += 8) {
            stroke('#3366AA');
            strokeWeight(1.5);
            line(sx, yr2 + 3, sx, yr2 + barH - 3);
        }

        pop();

        if (animProgress > 0.8) {
            let lAlpha = min(1, (animProgress - 0.8) / 0.15);
            textAlign(CENTER, TOP);
            textSize(16);
            fill(180, 0, 0, lAlpha * 255);
            noStroke();
            text('3A : 1B ratio instead of expected 2A : 2B', canvasWidth / 2, yr2 + barH + 8);
            fill(68, 68, 68, lAlpha * 255);
            text('Gene conversion: one allele "converts" the other (nonreciprocal)',
                canvasWidth / 2, yr2 + barH + 30);
        }
    }
}

// ===== HELPER DRAWING FUNCTIONS =====

function drawChromosome(x, y, w, h, baseColor, labels, segW, darkColor) {
    for (let i = 0; i < labels.length; i++) {
        let sx = x + i * segW;
        let isEven = i % 2 === 0;
        fill(isEven ? baseColor : darkColor);
        stroke('#555');
        strokeWeight(1);
        if (i === 0) {
            rect(sx, y, segW, h, 8, 0, 0, 8);
        } else if (i === labels.length - 1) {
            rect(sx, y, segW, h, 0, 8, 8, 0);
        } else {
            rect(sx, y, segW, h);
        }
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text(labels[i], sx + segW / 2, y + h / 2);
    }
}

function drawRecombChrom(x, y, w, h, labels, segW, colors, darkColors) {
    for (let i = 0; i < labels.length; i++) {
        let sx = x + i * segW;
        let isEven = i % 2 === 0;
        fill(isEven ? colors[i] : darkColors[i]);
        stroke('#555');
        strokeWeight(1);
        if (i === 0) {
            rect(sx, y, segW, h, 8, 0, 0, 8);
        } else if (i === labels.length - 1) {
            rect(sx, y, segW, h, 0, 8, 8, 0);
        } else {
            rect(sx, y, segW, h);
        }
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text(labels[i], sx + segW / 2, y + h / 2);
    }
}

function drawGeneBar(x, y, w, h, clr, label) {
    fill(clr);
    stroke('#555');
    strokeWeight(1);
    rect(x, y, w, h, 8);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(label, x + w / 2, y + h / 2);
}

function drawSplitGeneBar(x, y, w, h, clrLeft, clrRight, splitFrac, label) {
    let splitX = x + w * splitFrac;
    // Left portion
    fill(clrLeft);
    stroke('#555');
    strokeWeight(1);
    rect(x, y, w * splitFrac, h, 8, 0, 0, 8);
    // Right portion
    fill(clrRight);
    rect(splitX, y, w * (1 - splitFrac), h, 0, 8, 8, 0);
    // Divider line
    stroke('#FFD700');
    strokeWeight(2);
    line(splitX, y - 2, splitX, y + h + 2);
    // Label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(label, x + w / 2, y + h / 2);
}

function drawMutationSite(mx, y, h, clr, label) {
    fill(clr);
    stroke('#CC3300');
    strokeWeight(2);
    let r = 10;
    ellipse(mx, y + h / 2, r * 2, r * 2);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, mx, y + h / 2);
}

function drawCrossoverX(cx, cy, span, alpha) {
    push();
    drawingContext.globalAlpha = alpha;
    stroke(CROSSOVER_MARK);
    strokeWeight(4);
    let half = span / 2;
    line(cx - 12, cy - half, cx + 12, cy + half);
    line(cx + 12, cy - half, cx - 12, cy + half);
    // Glow
    strokeWeight(8);
    stroke(255, 215, 0, 80);
    line(cx - 12, cy - half, cx + 12, cy + half);
    line(cx + 12, cy - half, cx - 12, cy + half);
    pop();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}

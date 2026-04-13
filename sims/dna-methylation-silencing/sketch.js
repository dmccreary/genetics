// DNA Methylation and Gene Silencing MicroSim
// CANVAS_HEIGHT: 530
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let canvasWidth;

// CpG site data
let numCpGs = 6;
let cpgMethylated = [false, false, false, false, false, false];
let cpgCheckboxes = [];

// Animation
let mRNAParticles = [];
let tfBindPhase = 0;
let chromatinCompact = 0; // 0 = open, 1 = fully compacted

// Protein visibility
let mbdAlpha = 0;
let hdacAlpha = 0;

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

    // Create checkboxes for each CpG site
    for (let i = 0; i < numCpGs; i++) {
        let cb = createCheckbox('CpG ' + (i + 1), false);
        cb.parent(document.querySelector('main'));
        cb.style('font-size', '16px');
        cb.style('display', 'inline-block');
        cb.style('margin', '4px 8px');
        let idx = i;
        cb.changed(function () {
            cpgMethylated[idx] = this.checked();
        });
        cpgCheckboxes.push(cb);
    }

    // Reset button
    let resetBtn = createButton('Reset All');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.style('font-size', '16px');
    resetBtn.style('margin', '4px 8px');
    resetBtn.mousePressed(function () {
        for (let i = 0; i < numCpGs; i++) {
            cpgMethylated[i] = false;
            cpgCheckboxes[i].checked(false);
        }
    });

    // Methylate All button
    let methylateBtn = createButton('Methylate All');
    methylateBtn.parent(document.querySelector('main'));
    methylateBtn.style('font-size', '16px');
    methylateBtn.style('margin', '4px 8px');
    methylateBtn.mousePressed(function () {
        for (let i = 0; i < numCpGs; i++) {
            cpgMethylated[i] = true;
            cpgCheckboxes[i].checked(true);
        }
    });
}

function draw() {
    let methylCount = cpgMethylated.filter(m => m).length;
    let methylFraction = methylCount / numCpGs;

    // Smooth animation targets
    let targetCompact = methylFraction;
    chromatinCompact = lerp(chromatinCompact, targetCompact, 0.05);

    let targetMBD = methylFraction > 0.3 ? map(methylFraction, 0.3, 1, 0, 255) : 0;
    mbdAlpha = lerp(mbdAlpha, targetMBD, 0.05);

    let targetHDAC = methylFraction > 0.5 ? map(methylFraction, 0.5, 1, 0, 255) : 0;
    hdacAlpha = lerp(hdacAlpha, targetHDAC, 0.05);

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
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('DNA Methylation & Gene Silencing', canvasWidth / 2, 12);

    // Layout
    let margin = 60;
    let dnaLeft = margin;
    let dnaRight = canvasWidth - 160;
    let dnaY = 180;
    let strandSpacing = 24;
    let expressionBarX = canvasWidth - 100;

    // Draw promoter region box
    let promoterLeft = dnaLeft - 20;
    let promoterRight = dnaRight + 20;
    let promoterTop = dnaY - 60;
    let promoterBottom = dnaY + strandSpacing + 60;

    // Promoter background - green when open, gray when compacted
    let promoterR = lerp(200, 180, chromatinCompact);
    let promoterG = lerp(240, 180, chromatinCompact);
    let promoterB = lerp(200, 180, chromatinCompact);
    fill(promoterR, promoterG, promoterB, 80);
    stroke(150);
    strokeWeight(1);
    rectMode(CORNERS);
    rect(promoterLeft, promoterTop, promoterRight, promoterBottom, 10);
    rectMode(CORNER);

    // Promoter label
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('Promoter Region', (promoterLeft + promoterRight) / 2, promoterTop + 4);

    // Draw DNA double strand with chromatin compaction
    drawDNAStrands(dnaLeft, dnaRight, dnaY, strandSpacing);

    // Draw CpG sites
    let cpgSpacing = (dnaRight - dnaLeft) / (numCpGs + 1);
    for (let i = 0; i < numCpGs; i++) {
        let x = dnaLeft + cpgSpacing * (i + 1);
        drawCpGSite(x, dnaY, cpgMethylated[i], i);
    }

    // Draw nucleosomes / chromatin
    drawChromatin(dnaLeft, dnaRight, dnaY + strandSpacing + 40);

    // Draw transcription factors (visible when unmethylated)
    if (chromatinCompact < 0.5) {
        drawTranscriptionFactors(dnaLeft, dnaRight, dnaY, cpgSpacing);
    }

    // Draw MBD proteins when methylation present
    if (mbdAlpha > 5) {
        drawMBDProteins(dnaLeft, dnaRight, dnaY, cpgSpacing);
    }

    // Draw HDAC when heavily methylated
    if (hdacAlpha > 5) {
        drawHDAC(dnaLeft, dnaRight, dnaY + strandSpacing + 40);
    }

    // Draw DNMT label near methylated sites
    if (methylCount > 0) {
        drawDNMTLabel(dnaLeft, dnaY);
    }

    // Draw mRNA production
    drawMRNAProduction(dnaRight + 30, dnaY, methylFraction);

    // Draw expression level bar
    drawExpressionBar(expressionBarX, 60, methylFraction);

    // Legend
    drawLegend(20, drawHeight - 80);

    // Spawn mRNA particles when gene is active
    if (methylFraction < 0.7 && frameCount % 30 === 0) {
        let startX = dnaRight + 30;
        let startY = dnaY + 5;
        mRNAParticles.push({
            x: startX,
            y: startY,
            vx: random(0.5, 1.5),
            vy: random(-1, 1),
            life: 255,
            size: random(6, 10)
        });
    }

    // Update and draw mRNA particles
    for (let i = mRNAParticles.length - 1; i >= 0; i--) {
        let p = mRNAParticles[i];
        p.x += p.vx;
        p.y += p.vy * 0.5;
        p.life -= (1.5 + methylFraction * 3);
        if (p.life <= 0) {
            mRNAParticles.splice(i, 1);
        } else {
            fill(50, 180, 50, p.life * (1 - methylFraction));
            noStroke();
            ellipse(p.x, p.y, p.size, p.size * 0.6);
            fill(30, 140, 30, p.life * (1 - methylFraction));
            textSize(10);
            textAlign(CENTER, CENTER);
            text('~', p.x, p.y);
        }
    }

    // Frame counter for animations
    tfBindPhase += 0.02;
}

function drawDNAStrands(left, right, y, spacing) {
    // Top strand (sense)
    strokeWeight(3);

    // Compaction effect: strands get wavy when compacted
    let segments = 80;
    let segLen = (right - left) / segments;

    // Top strand
    stroke(50, 100, 200);
    noFill();
    beginShape();
    for (let i = 0; i <= segments; i++) {
        let x = left + i * segLen;
        let waveAmp = chromatinCompact * 4;
        let yOff = sin(i * 0.5 + frameCount * 0.02) * waveAmp;
        vertex(x, y + yOff);
    }
    endShape();

    // Bottom strand (antisense)
    stroke(200, 80, 50);
    noFill();
    beginShape();
    for (let i = 0; i <= segments; i++) {
        let x = left + i * segLen;
        let waveAmp = chromatinCompact * 4;
        let yOff = sin(i * 0.5 + frameCount * 0.02 + PI) * waveAmp;
        vertex(x, y + spacing + yOff);
    }
    endShape();

    // Strand labels
    fill(50, 100, 200);
    noStroke();
    textSize(16);
    textAlign(RIGHT, CENTER);
    text("5'", left - 10, y);
    textAlign(LEFT, CENTER);
    text("3'", right + 5, y);

    fill(200, 80, 50);
    textAlign(RIGHT, CENTER);
    text("3'", left - 10, y + spacing);
    textAlign(LEFT, CENTER);
    text("5'", right + 5, y + spacing);

    strokeWeight(1);
}

function drawCpGSite(x, y, methylated, index) {
    let spacing = 24;

    // CpG circle on top strand
    if (methylated) {
        // Methylated - red marker
        fill(220, 50, 50);
        stroke(180, 30, 30);
        strokeWeight(2);
        ellipse(x, y, 22, 22);

        // Methyl group indicator
        fill(255);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text('Me', x, y);

        // Methylated CpG on bottom strand
        fill(220, 50, 50);
        stroke(180, 30, 30);
        strokeWeight(2);
        ellipse(x, y + spacing, 22, 22);
        fill(255);
        noStroke();
        textSize(12);
        text('Me', x, y + spacing);
    } else {
        // Unmethylated - open green
        fill(100, 200, 100);
        stroke(60, 160, 60);
        strokeWeight(2);
        ellipse(x, y, 22, 22);

        fill(255);
        noStroke();
        textSize(11);
        textAlign(CENTER, CENTER);
        text('CG', x, y);

        // Bottom strand
        fill(100, 200, 100);
        stroke(60, 160, 60);
        strokeWeight(2);
        ellipse(x, y + spacing, 22, 22);
        fill(255);
        noStroke();
        textSize(11);
        text('GC', x, y + spacing);
    }

    strokeWeight(1);
}

function drawChromatin(left, right, y) {
    // Nucleosomes - circles along DNA that compact
    let numNucleosomes = 5;
    let spacing = (right - left) / (numNucleosomes + 1);

    for (let i = 0; i < numNucleosomes; i++) {
        let baseX = left + spacing * (i + 1);
        // Compaction pulls nucleosomes toward center
        let centerX = (left + right) / 2;
        let x = lerp(baseX, centerX + (i - 2) * 30, chromatinCompact * 0.6);
        let size = lerp(28, 36, chromatinCompact);

        // Histone color changes with acetylation state
        let r = lerp(180, 120, chromatinCompact);
        let g = lerp(200, 100, chromatinCompact);
        let b = lerp(230, 160, chromatinCompact);
        fill(r, g, b, 180);
        stroke(100, 130, 180, 180);
        strokeWeight(1.5);
        ellipse(x, y, size, size);

        // Histone label
        fill(60, 60, 100, 200);
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        if (chromatinCompact > 0.5) {
            text('H3', x, y);
        } else {
            text('Ac', x, y);
        }
    }

    // Chromatin state label
    fill(80);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    if (chromatinCompact < 0.3) {
        text('Open Chromatin (Euchromatin)', (left + right) / 2, y + 24);
    } else if (chromatinCompact < 0.7) {
        text('Condensing Chromatin...', (left + right) / 2, y + 24);
    } else {
        text('Closed Chromatin (Heterochromatin)', (left + right) / 2, y + 24);
    }
}

function drawTranscriptionFactors(left, right, y, cpgSpacing) {
    let alpha = map(chromatinCompact, 0, 0.5, 255, 0);
    alpha = constrain(alpha, 0, 255);

    // Draw TF binding to promoter
    let tfNames = ['TF-A', 'TF-B', 'Pol II'];
    let tfPositions = [left + cpgSpacing * 1.5, left + cpgSpacing * 3.5, left + cpgSpacing * 5.5];
    let tfColors = [
        [80, 160, 80],
        [80, 120, 200],
        [200, 140, 40]
    ];

    for (let i = 0; i < tfNames.length; i++) {
        let bobY = sin(tfBindPhase + i * 1.5) * 3;
        let tfY = y - 48 + bobY;
        let x = tfPositions[i];

        // TF body
        fill(tfColors[i][0], tfColors[i][1], tfColors[i][2], alpha);
        stroke(tfColors[i][0] - 30, tfColors[i][1] - 30, tfColors[i][2] - 30, alpha);
        strokeWeight(1.5);
        rectMode(CENTER);
        rect(x, tfY, 50, 24, 8);
        rectMode(CORNER);

        // TF label
        fill(255, 255, 255, alpha);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(tfNames[i], x, tfY);

        // Binding arrow
        stroke(tfColors[i][0], tfColors[i][1], tfColors[i][2], alpha * 0.6);
        strokeWeight(1);
        line(x, tfY + 12, x, y - 12);
    }
    strokeWeight(1);
}

function drawMBDProteins(left, right, y, cpgSpacing) {
    // MBD proteins bind to methylated CpGs
    for (let i = 0; i < numCpGs; i++) {
        if (cpgMethylated[i]) {
            let x = left + cpgSpacing * (i + 1);
            let bobY = sin(tfBindPhase + i) * 2;

            // MBD protein body
            fill(180, 60, 180, mbdAlpha);
            stroke(140, 30, 140, mbdAlpha);
            strokeWeight(1.5);
            rectMode(CENTER);
            rect(x, y - 42 + bobY, 40, 20, 6);
            rectMode(CORNER);

            // MBD label
            fill(255, 255, 255, mbdAlpha);
            noStroke();
            textSize(11);
            textAlign(CENTER, CENTER);
            text('MBD', x, y - 42 + bobY);
        }
    }
    strokeWeight(1);
}

function drawHDAC(left, right, y) {
    let centerX = (left + right) / 2;
    let bobY = sin(tfBindPhase * 0.8) * 3;

    // HDAC complex
    fill(200, 80, 60, hdacAlpha);
    stroke(160, 50, 40, hdacAlpha);
    strokeWeight(2);
    rectMode(CENTER);
    rect(centerX, y - 30 + bobY, 70, 28, 10);
    rectMode(CORNER);

    // HDAC label
    fill(255, 255, 255, hdacAlpha);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('HDAC', centerX, y - 30 + bobY);

    // Arrow from HDAC to nucleosomes
    stroke(200, 80, 60, hdacAlpha * 0.5);
    strokeWeight(1);
    let arrowY1 = y - 16 + bobY;
    let arrowY2 = y - 4;
    line(centerX - 15, arrowY1, centerX - 15, arrowY2);
    line(centerX + 15, arrowY1, centerX + 15, arrowY2);

    strokeWeight(1);
}

function drawDNMTLabel(left, y) {
    let x = left - 35;
    let labelY = y + 12;

    fill(220, 120, 40, 220);
    stroke(180, 90, 20, 220);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(x, labelY, 52, 22, 6);
    rectMode(CORNER);

    fill(255, 255, 255, 240);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text('DNMT', x, labelY);

    // Arrow pointing to DNA
    stroke(220, 120, 40, 180);
    strokeWeight(1.5);
    line(x + 28, labelY, left - 5, labelY);
    // Arrowhead
    line(left - 5, labelY, left - 12, labelY - 4);
    line(left - 5, labelY, left - 12, labelY + 4);
    strokeWeight(1);
}

function drawMRNAProduction(x, y, methylFraction) {
    let alpha = map(methylFraction, 0, 0.8, 255, 0);
    alpha = constrain(alpha, 0, 255);

    if (alpha > 10) {
        // mRNA arrow
        fill(50, 180, 50, alpha);
        noStroke();
        textSize(16);
        textAlign(LEFT, CENTER);
        text('mRNA', x + 10, y - 20);

        // Wavy mRNA strand
        stroke(50, 180, 50, alpha);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let i = 0; i < 40; i++) {
            let px = x + 10 + i * 1.5;
            let py = y + sin(i * 0.4 + frameCount * 0.05) * 5;
            vertex(px, py);
        }
        endShape();
        strokeWeight(1);

        // Arrow indicator
        fill(50, 180, 50, alpha);
        noStroke();
        triangle(x + 8, y - 5, x + 8, y + 5, x + 2, y);
    }

    if (methylFraction > 0.6) {
        fill(200, 50, 50, map(methylFraction, 0.6, 1, 0, 255));
        noStroke();
        textSize(16);
        textAlign(LEFT, CENTER);
        text('SILENCED', x + 5, y + 20);
    }
}

function drawExpressionBar(x, topY, methylFraction) {
    let barWidth = 40;
    let barHeight = 200;
    let expressionLevel = 1 - methylFraction;

    // Bar background
    fill(220);
    stroke(150);
    strokeWeight(1);
    rect(x - barWidth / 2, topY, barWidth, barHeight, 4);

    // Expression fill
    let fillHeight = expressionLevel * barHeight;
    let r = lerp(220, 50, expressionLevel);
    let g = lerp(50, 180, expressionLevel);
    let b = 50;
    fill(r, g, b);
    noStroke();
    rect(x - barWidth / 2 + 2, topY + barHeight - fillHeight + 2, barWidth - 4, fillHeight - 4, 3);

    // Label
    fill(60);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Gene', x, topY - 40);
    text('Expression', x, topY - 22);

    // Percentage
    textSize(18);
    textAlign(CENTER, TOP);
    let pct = Math.round(expressionLevel * 100);
    fill(pct > 50 ? color(30, 140, 30) : color(200, 50, 50));
    text(pct + '%', x, topY + barHeight + 8);

    // Scale markers
    fill(120);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('High', x + barWidth / 2 + 4, topY + 10);
    text('Low', x + barWidth / 2 + 4, topY + barHeight - 10);
}

function drawLegend(x, y) {
    fill(60);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text('Legend:', x, y);

    let itemY = y + 22;
    let spacing = 22;

    // Unmethylated CpG
    fill(100, 200, 100);
    stroke(60, 160, 60);
    strokeWeight(1.5);
    ellipse(x + 8, itemY + 6, 14, 14);
    fill(60);
    noStroke();
    textSize(16);
    text('Unmethylated CpG', x + 22, itemY - 2);

    // Methylated CpG
    itemY += spacing;
    fill(220, 50, 50);
    stroke(180, 30, 30);
    strokeWeight(1.5);
    ellipse(x + 8, itemY + 6, 14, 14);
    fill(60);
    noStroke();
    textSize(16);
    text('Methylated CpG (5mC)', x + 22, itemY - 2);

    // Proteins on right side
    let rightX = x + 280;
    itemY = y + 22;

    fill(80, 160, 80, 200);
    noStroke();
    rectMode(CENTER);
    rect(rightX + 8, itemY + 6, 14, 12, 3);
    rectMode(CORNER);
    fill(60);
    textSize(16);
    text('Transcription Factor', rightX + 22, itemY - 2);

    itemY += spacing;
    fill(180, 60, 180, 200);
    noStroke();
    rectMode(CENTER);
    rect(rightX + 8, itemY + 6, 14, 12, 3);
    rectMode(CORNER);
    fill(60);
    textSize(16);
    text('MBD Protein', rightX + 22, itemY - 2);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

// Enhancer-Promoter Looping MicroSim
// CANVAS_HEIGHT: 510
let drawHeight = 450;
let controlHeight = 60;
let canvasWidth, canvasHeight;

// Animation state
let loopProgress = 0;       // 0 = linear, 1 = fully looped
let targetProgress = 0;
let animSpeed = 0.02;

// Controls
let activateBtn;
let insulatorCheck;

// DNA element positions (as fractions of canvas width)
let promoterFrac = 0.2;
let geneFrac = 0.35;
let insulatorFrac = 0.5;
let enhancerFrac = 0.75;

// TF proteins
let tfs = [];
let tfAlpha = 0;           // fade in when looped
let mediatorAlpha = 0;

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

    // Controls
    activateBtn = createButton('Activate Loop');
    activateBtn.parent(document.querySelector('main'));
    activateBtn.mousePressed(toggleLoop);
    activateBtn.style('font-size', '16px');
    activateBtn.style('padding', '6px 16px');
    activateBtn.style('margin-right', '20px');
    activateBtn.style('cursor', 'pointer');

    insulatorCheck = createCheckbox('Insulator Active', true);
    insulatorCheck.parent(document.querySelector('main'));
    insulatorCheck.style('font-size', '16px');

    // Define TF proteins
    tfs = [
        { name: 'TF-A', color: [46, 139, 87],   target: 'enhancer', offsetX: -18, offsetY: -30 },
        { name: 'TF-B', color: [184, 134, 11],   target: 'enhancer', offsetX: 18,  offsetY: -30 },
        { name: 'TBP',  color: [70, 130, 180],   target: 'promoter', offsetX: -15, offsetY: -30 },
        { name: 'RNAP', color: [100, 149, 237],  target: 'promoter', offsetX: 20,  offsetY: -30 },
    ];
}

function toggleLoop() {
    if (targetProgress === 0) {
        targetProgress = 1;
        activateBtn.html('Reset');
    } else {
        targetProgress = 0;
        activateBtn.html('Activate Loop');
    }
}

function draw() {
    // Animate progress
    if (loopProgress < targetProgress) {
        loopProgress = min(loopProgress + animSpeed, targetProgress);
    } else if (loopProgress > targetProgress) {
        loopProgress = max(loopProgress - animSpeed * 1.5, targetProgress);
    }

    // TF and mediator visibility
    let insulatorOn = insulatorCheck.checked();
    let showTFs = loopProgress > 0.8 && !(insulatorOn && loopProgress > 0.8);
    let showMediator = loopProgress > 0.9 && !insulatorOn;

    if (showTFs) {
        tfAlpha = min(tfAlpha + 5, 255);
    } else {
        tfAlpha = max(tfAlpha - 8, 0);
    }
    if (showMediator) {
        mediatorAlpha = min(mediatorAlpha + 4, 220);
    } else {
        mediatorAlpha = max(mediatorAlpha - 8, 0);
    }

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
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Enhancer-Promoter Chromatin Looping', canvasWidth / 2, 12);

    // DNA coordinates
    let dnaY = drawHeight * 0.55;
    let dnaLeft = canvasWidth * 0.08;
    let dnaRight = canvasWidth * 0.92;
    let dnaLen = dnaRight - dnaLeft;

    let promX = dnaLeft + dnaLen * promoterFrac;
    let geneStartX = dnaLeft + dnaLen * 0.28;
    let geneEndX = dnaLeft + dnaLen * 0.42;
    let insX = dnaLeft + dnaLen * insulatorFrac;
    let enhX = dnaLeft + dnaLen * enhancerFrac;

    // Compute looped DNA path
    // When looped, the enhancer bends up and curves to meet the promoter
    drawDNA(dnaLeft, dnaRight, dnaY, promX, geneStartX, geneEndX, insX, enhX, loopProgress, insulatorOn);

    // Distance label
    if (loopProgress < 0.3) {
        fill(120);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text('~50 kb', (promX + enhX) / 2, dnaY + 25);
        // Arrow line
        stroke(150);
        strokeWeight(1);
        line(promX + 30, dnaY + 32, enhX - 30, dnaY + 32);
        drawArrowHead(promX + 30, dnaY + 32, -1);
        drawArrowHead(enhX - 30, dnaY + 32, 1);
    }

    // Status text
    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    let statusY = drawHeight - 55;
    if (loopProgress > 0.9 && insulatorOn) {
        fill(180, 0, 0);
        text('Insulator blocks enhancer-promoter contact!', canvasWidth / 2, statusY);
    } else if (loopProgress > 0.9 && !insulatorOn) {
        fill(0, 120, 60);
        text('Enhancer activates gene transcription via Mediator', canvasWidth / 2, statusY);
    } else if (loopProgress > 0.1) {
        fill(100);
        text('Chromatin looping in progress...', canvasWidth / 2, statusY);
    } else {
        fill(100);
        text('Linear DNA - enhancer is 50kb from promoter', canvasWidth / 2, statusY);
    }

    // Legend
    drawLegend();
}

function drawDNA(dnaLeft, dnaRight, dnaY, promX, geneStartX, geneEndX, insX, enhX, progress, insulatorOn) {
    // The DNA is drawn as a series of points that bend when progress > 0
    // Enhancer region curves upward to meet promoter region

    let numPoints = 120;
    let points = [];

    for (let i = 0; i <= numPoints; i++) {
        let t = i / numPoints;
        let x = lerp(dnaLeft, dnaRight, t);
        let y = dnaY;

        // Calculate bend: DNA between insulator and enhancer curves upward
        // to bring enhancer close to promoter
        let enhFrac = (enhX - dnaLeft) / (dnaRight - dnaLeft);
        let promFracAbs = (promX - dnaLeft) / (dnaRight - dnaLeft);
        let insFracAbs = (insX - dnaLeft) / (dnaRight - dnaLeft);

        if (t > insFracAbs && t < enhFrac + 0.05) {
            // This section loops upward
            let loopT = (t - insFracAbs) / (enhFrac + 0.05 - insFracAbs);
            let bendAmount = sin(loopT * PI) * progress * (drawHeight * 0.32);
            y -= bendAmount;

            // Also pull x coordinate toward promoter region
            let xPull = progress * (promX - x) * sin(loopT * PI) * 0.7;
            x += xPull;
        }

        // Slight bend in the region just before insulator too
        if (t > promFracAbs + 0.1 && t <= insFracAbs) {
            let preT = (t - promFracAbs - 0.1) / (insFracAbs - promFracAbs - 0.1);
            let bendAmount = sin(preT * PI) * progress * (drawHeight * 0.08);
            y -= bendAmount;
        }

        points.push({ x: x, y: y, t: t });
    }

    // Draw DNA backbone
    noFill();
    stroke(80);
    strokeWeight(3);
    beginShape();
    for (let p of points) {
        vertex(p.x, p.y);
    }
    endShape();

    // Draw second strand (offset)
    stroke(120);
    strokeWeight(2);
    beginShape();
    for (let p of points) {
        vertex(p.x, p.y + 4);
    }
    endShape();

    // Find actual positions of elements on the curved DNA
    let promPt = getPointAtFrac(points, (promX - dnaLeft) / (dnaRight - dnaLeft));
    let geneStartPt = getPointAtFrac(points, (geneStartX - dnaLeft) / (dnaRight - dnaLeft));
    let geneEndPt = getPointAtFrac(points, (geneEndX - dnaLeft) / (dnaRight - dnaLeft));
    let insPt = getPointAtFrac(points, (insX - dnaLeft) / (dnaRight - dnaLeft));
    let enhPt = getPointAtFrac(points, (enhX - dnaLeft) / (dnaRight - dnaLeft));

    // Draw gene body (green region on DNA)
    drawDNARegion(points, (geneStartX - dnaLeft) / (dnaRight - dnaLeft),
                          (geneEndX - dnaLeft) / (dnaRight - dnaLeft),
                          [34, 139, 34], 8);

    // Draw promoter (blue box)
    drawElement(promPt.x, promPt.y, 'Promoter', [30, 100, 200], 50, 18);

    // Draw gene label
    let geneMidPt = getPointAtFrac(points, ((geneStartX + geneEndX) / 2 - dnaLeft) / (dnaRight - dnaLeft));
    fill(0, 100, 0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('Gene', geneMidPt.x, geneMidPt.y + 14);

    // Draw enhancer (orange box)
    drawElement(enhPt.x, enhPt.y, 'Enhancer', [230, 140, 20], 55, 18);

    // Draw insulator (red)
    if (insulatorOn) {
        drawInsulator(insPt.x, insPt.y);
    } else {
        // Show disabled insulator (gray, dashed)
        drawInsulatorDisabled(insPt.x, insPt.y);
    }

    // Draw TF proteins when looped
    if (tfAlpha > 0) {
        for (let tf of tfs) {
            let anchorPt = tf.target === 'enhancer' ? enhPt : promPt;
            let ax = anchorPt.x + tf.offsetX;
            let ay = anchorPt.y + tf.offsetY;

            fill(tf.color[0], tf.color[1], tf.color[2], tfAlpha);
            stroke(0, tfAlpha * 0.5);
            strokeWeight(1);
            ellipse(ax, ay, 28, 28);

            fill(255, tfAlpha);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(11);
            text(tf.name, ax, ay);
        }
    }

    // Draw Mediator complex (purple blob bridging enhancer to promoter)
    if (mediatorAlpha > 0 && progress > 0.9) {
        let midX = (enhPt.x + promPt.x) / 2;
        let midY = (enhPt.y + promPt.y) / 2 - 25;

        // Blob shape
        fill(128, 0, 180, mediatorAlpha);
        stroke(80, 0, 130, mediatorAlpha * 0.6);
        strokeWeight(1.5);

        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.2) {
            let r = 22 + 6 * sin(a * 3 + frameCount * 0.02);
            let bx = midX + r * cos(a);
            let by = midY + r * sin(a) * 0.7;
            curveVertex(bx, by);
        }
        endShape(CLOSE);

        // Label
        fill(255, mediatorAlpha);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Mediator', midX, midY);

        // Dashed connecting lines from mediator to enhancer TFs and promoter TFs
        stroke(128, 0, 180, mediatorAlpha * 0.5);
        strokeWeight(1);
        drawDashedLine(midX, midY, enhPt.x, enhPt.y - 20, 5);
        drawDashedLine(midX, midY, promPt.x, promPt.y - 20, 5);
    }

    // If insulator is active and loop is formed, draw blocking X
    if (insulatorOn && progress > 0.8) {
        let blockX = (insPt.x + enhPt.x) / 2;
        let blockY = (insPt.y + enhPt.y) / 2 - 10;
        stroke(200, 0, 0, 200);
        strokeWeight(3);
        let sz = 15;
        line(blockX - sz, blockY - sz, blockX + sz, blockY + sz);
        line(blockX - sz, blockY + sz, blockX + sz, blockY - sz);
    }
}

function getPointAtFrac(points, frac) {
    frac = constrain(frac, 0, 1);
    let idx = frac * (points.length - 1);
    let i = floor(idx);
    let remainder = idx - i;
    if (i >= points.length - 1) return points[points.length - 1];
    return {
        x: lerp(points[i].x, points[i + 1].x, remainder),
        y: lerp(points[i].y, points[i + 1].y, remainder)
    };
}

function drawDNARegion(points, fracStart, fracEnd, col, thickness) {
    let iStart = floor(fracStart * (points.length - 1));
    let iEnd = ceil(fracEnd * (points.length - 1));
    stroke(col[0], col[1], col[2]);
    strokeWeight(thickness);
    noFill();
    beginShape();
    for (let i = iStart; i <= iEnd && i < points.length; i++) {
        vertex(points[i].x, points[i].y);
    }
    endShape();
}

function drawElement(x, y, label, col, w, h) {
    fill(col[0], col[1], col[2], 200);
    stroke(col[0] * 0.6, col[1] * 0.6, col[2] * 0.6);
    strokeWeight(2);
    rectMode(CENTER);
    rect(x, y - 14, w, h, 4);
    rectMode(CORNER);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(label, x, y - 14);
}

function drawInsulator(x, y) {
    // Red octagon-ish shape
    fill(200, 30, 30, 220);
    stroke(140, 0, 0);
    strokeWeight(2);
    let r = 14;
    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI / 8) {
        vertex(x + r * cos(a - PI / 8), y - 14 + r * sin(a - PI / 8));
    }
    endShape(CLOSE);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('INS', x, y - 14);

    // Label below
    fill(180, 0, 0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Insulator', x, y + 8);
}

function drawInsulatorDisabled(x, y) {
    fill(180, 180, 180, 150);
    stroke(140, 140, 140);
    strokeWeight(1);
    let r = 14;
    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI / 8) {
        vertex(x + r * cos(a - PI / 8), y - 14 + r * sin(a - PI / 8));
    }
    endShape(CLOSE);

    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('INS', x, y - 14);

    fill(150);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Insulator (off)', x, y + 8);
}

function drawArrowHead(x, y, dir) {
    noStroke();
    fill(150);
    triangle(x, y - 4, x, y + 4, x + dir * 8, y);
}

function drawDashedLine(x1, y1, x2, y2, dashLen) {
    let d = dist(x1, y1, x2, y2);
    let steps = floor(d / (dashLen * 2));
    for (let i = 0; i < steps; i++) {
        let t1 = (i * 2 * dashLen) / d;
        let t2 = ((i * 2 + 1) * dashLen) / d;
        t2 = min(t2, 1);
        line(lerp(x1, x2, t1), lerp(y1, y2, t1),
             lerp(x1, x2, t2), lerp(y1, y2, t2));
    }
}

function drawLegend() {
    let lx = 18;
    let ly = 50;
    let spacing = 24;

    textAlign(LEFT, CENTER);
    textSize(14);
    noStroke();

    // Promoter
    fill(30, 100, 200);
    rect(lx, ly, 16, 14, 3);
    fill(40);
    text('Promoter', lx + 22, ly + 7);

    // Gene body
    ly += spacing;
    fill(34, 139, 34);
    rect(lx, ly, 16, 14, 3);
    fill(40);
    text('Gene Body', lx + 22, ly + 7);

    // Enhancer
    ly += spacing;
    fill(230, 140, 20);
    rect(lx, ly, 16, 14, 3);
    fill(40);
    text('Enhancer', lx + 22, ly + 7);

    // Insulator
    ly += spacing;
    fill(200, 30, 30);
    rect(lx, ly, 16, 14, 3);
    fill(40);
    text('Insulator', lx + 22, ly + 7);

    // TFs
    ly += spacing;
    fill(46, 139, 87);
    ellipse(lx + 8, ly + 7, 16, 16);
    fill(40);
    text('Transcription Factors', lx + 22, ly + 7);

    // Mediator
    ly += spacing;
    fill(128, 0, 180);
    ellipse(lx + 8, ly + 7, 16, 16);
    fill(40);
    text('Mediator Complex', lx + 22, ly + 7);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

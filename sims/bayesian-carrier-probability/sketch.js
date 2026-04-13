// Bayesian Updating of Carrier Probability
// CANVAS_HEIGHT: 490
let drawHeight = 450;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let childrenSlider;
let containerWidth;

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');

    // Control: slider for number of unaffected sons
    childrenSlider = createSlider(0, 10, 0, 1);
    childrenSlider.parent(document.querySelector('main'));
    childrenSlider.style('width', '200px');
    childrenSlider.position(160, drawHeight + 8);
}

function draw() {
    let n = childrenSlider.value();

    // Draw region background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, width, drawHeight);

    // Control region background
    fill('white');
    noStroke();
    rect(0, drawHeight, width, controlHeight);

    // Title
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Bayesian Updating of Carrier Probability', width / 2, 12);

    // Subtitle
    textSize(16);
    fill(80);
    text('X-linked recessive trait: woman with affected brother', width / 2, 44);

    // Slider label in control region
    textAlign(LEFT, CENTER);
    textSize(16);
    fill(0);
    text('Unaffected sons:', 10, drawHeight + 20);

    textAlign(LEFT, CENTER);
    textSize(18);
    fill(20, 20, 120);
    text(n, 370, drawHeight + 20);

    // Calculate Bayesian probabilities at each step
    // Prior: P(carrier) = 2/3 (woman whose mother is obligate carrier)
    // P(unaffected son | carrier) = 1/2
    // P(unaffected son | non-carrier) = 1
    let priors = [];
    let posteriors = [];

    let p_carrier = 2 / 3;
    priors.push(p_carrier);

    for (let i = 0; i < n; i++) {
        let prior = p_carrier;
        let lc = 0.5;   // P(unaffected | carrier)
        let lnc = 1.0;  // P(unaffected | non-carrier)
        let evidence = lc * prior + lnc * (1 - prior);
        let posterior = (lc * prior) / evidence;

        posteriors.push(posterior);
        p_carrier = posterior;
        if (i < n - 1) {
            priors.push(p_carrier);
        }
    }

    let finalProb = (n === 0) ? 2 / 3 : posteriors[posteriors.length - 1];

    // --- Probability bar ---
    let barX = 60;
    let barY = 78;
    let barW = width - 120;
    let barH = 40;

    // Bar background
    stroke('silver');
    fill(230);
    rect(barX, barY, barW, barH, 6);

    // Filled portion with red-to-green gradient
    let filledW = barW * finalProb;
    let r = map(finalProb, 0, 1, 60, 220);
    let g = map(finalProb, 0, 1, 180, 60);
    let b = 60;
    noStroke();
    fill(r, g, b);
    if (filledW > 0) {
        rect(barX, barY, filledW, barH, 6, 0, 0, 6);
    }

    // Probability percentage on or beside bar
    textAlign(CENTER, CENTER);
    textSize(18);
    if (filledW > 90) {
        fill(255);
        text((finalProb * 100).toFixed(1) + '%', barX + filledW / 2, barY + barH / 2);
    } else {
        fill(0);
        text((finalProb * 100).toFixed(1) + '%', barX + filledW + 45, barY + barH / 2);
    }

    // Result summary line
    fill(0);
    textAlign(CENTER, TOP);
    textSize(18);
    let nLabel = n + ' unaffected son' + (n !== 1 ? 's' : '');
    text('P(carrier | ' + nLabel + ') = ' + finalProb.toFixed(4), width / 2, barY + barH + 10);

    // Bayesian formula
    textSize(16);
    fill(60);
    textAlign(CENTER, TOP);
    let formulaY = barY + barH + 38;
    text('Bayes\u2019 Theorem:  P(C|U) = P(U|C)\u00b7P(C) / [P(U|C)\u00b7P(C) + P(U|\u00acC)\u00b7P(\u00acC)]',
         width / 2, formulaY);

    // --- Step-by-step table ---
    let tableY = formulaY + 28;
    let rowH = 26;
    let tableW = min(width - 40, 680);
    let tableX = (width - tableW) / 2;

    let cols = ['Step', 'Prior P(C)', 'P(U|C)', 'P(U|\u00acC)', 'Posterior P(C)'];
    let cw = tableW / cols.length;
    let colX = [];
    for (let c = 0; c < cols.length; c++) {
        colX.push(tableX + cw * c + cw / 2);
    }

    // Header row
    fill(70, 70, 130);
    noStroke();
    rect(tableX, tableY, tableW, rowH, 4, 4, 0, 0);

    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    for (let c = 0; c < cols.length; c++) {
        text(cols[c], colX[c], tableY + rowH / 2);
    }

    // How many rows fit in the draw area
    let availableH = drawHeight - tableY - rowH - 10;
    let maxVisible = max(1, floor(availableH / rowH));
    let displayCount = min(n, maxVisible);
    let displayStart = n - displayCount;

    // Data rows
    for (let i = 0; i < displayCount; i++) {
        let idx = displayStart + i;
        let ry = tableY + rowH * (i + 1);

        // Alternating row colors
        fill(i % 2 === 0 ? color(235, 240, 255) : color(248, 248, 255));
        noStroke();
        rect(tableX, ry, tableW, rowH);

        // Highlight the latest row
        if (idx === n - 1) {
            fill(255, 255, 180, 100);
            rect(tableX, ry, tableW, rowH);
        }

        fill(30);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(idx + 1, colX[0], ry + rowH / 2);
        text(priors[idx].toFixed(4), colX[1], ry + rowH / 2);
        text('0.5', colX[2], ry + rowH / 2);
        text('1.0', colX[3], ry + rowH / 2);
        text(posteriors[idx].toFixed(4), colX[4], ry + rowH / 2);
    }

    // Table border
    noFill();
    stroke('silver');
    let totalTableH = rowH * (displayCount + 1);
    rect(tableX, tableY, tableW, totalTableH, 4);

    // If n=0, show initial state
    if (n === 0) {
        fill(80);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text('Initial prior: P(carrier) = 2/3 \u2248 0.6667', width / 2, tableY + 40);
        text('(Mother is an obligate carrier of X-linked recessive trait)', width / 2, tableY + 65);
        text('Move the slider to update with each unaffected son.', width / 2, tableY + 95);
    }

    // Note if showing truncated rows
    if (n > maxVisible) {
        fill(120);
        noStroke();
        textSize(16);
        textAlign(CENTER, TOP);
        text('Showing steps ' + (displayStart + 1) + '\u2013' + n + ' of ' + n,
             width / 2, tableY + totalTableH + 4);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    childrenSlider.position(160, drawHeight + 8);
}

function updateCanvasSize() {
    let main = document.querySelector('main');
    containerWidth = main ? main.offsetWidth : windowWidth;
}

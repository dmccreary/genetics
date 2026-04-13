// Chi-Square Distribution Interactive
// CANVAS_HEIGHT: 560

let drawHeight = 420;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;

// Controls
let dfSlider;
let obsInputs = [];
let expInputs = [];
let numCategories = 4;

// Precomputed
let chiSquareVal = 0;
let pValue = 1;

// Layout
let margin = { top: 60, right: 40, bottom: 60, left: 70 };

let containerWidth;

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    // Degrees of freedom slider
    dfSlider = createSlider(1, 10, 3, 1);
    dfSlider.parent(document.querySelector('main'));
    dfSlider.style('width', '180px');
    dfSlider.position(10, drawHeight + 30);

    // Create input fields for observed and expected values
    let inputStartX = 280;

    for (let i = 0; i < numCategories; i++) {
        let xOff = inputStartX + i * 90;

        let obsIn = createInput('25', 'number');
        obsIn.parent(document.querySelector('main'));
        obsIn.style('width', '70px');
        obsIn.style('font-size', '14px');
        obsIn.position(xOff, drawHeight + 45);

        let expIn = createInput('25', 'number');
        expIn.parent(document.querySelector('main'));
        expIn.style('width', '70px');
        expIn.style('font-size', '14px');
        expIn.position(xOff, drawHeight + 80);

        obsInputs.push(obsIn);
        expInputs.push(expIn);
    }

    calculateChiSquare();
}

function draw() {
    background(255);

    // Draw region
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, width, drawHeight);

    // Control region
    fill('white');
    stroke('silver');
    rect(0, drawHeight, width, controlHeight);

    // Title
    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textSize(24);
    text('Chi-Square Distribution', width / 2, 12);

    let df = dfSlider.value();

    // Recalculate
    calculateChiSquare();

    // Plot area
    let plotLeft = margin.left;
    let plotRight = width - margin.right;
    let plotTop = margin.top;
    let plotBottom = drawHeight - margin.bottom;
    let plotW = plotRight - plotLeft;
    let plotH = plotBottom - plotTop;

    // Determine x-axis range based on df
    let xMax = max(df * 3, chiSquareVal * 1.3, 15);
    xMax = max(xMax, 20);

    // Draw axes
    stroke(0);
    strokeWeight(1);
    line(plotLeft, plotBottom, plotRight, plotBottom); // x-axis
    line(plotLeft, plotBottom, plotLeft, plotTop);     // y-axis

    // Axis labels
    noStroke();
    fill(0);
    textSize(16);
    textAlign(CENTER, TOP);
    text('Chi-Square Value', (plotLeft + plotRight) / 2, plotBottom + 25);

    push();
    textAlign(CENTER, BOTTOM);
    translate(18, (plotTop + plotBottom) / 2);
    rotate(-HALF_PI);
    textSize(16);
    text('Probability Density', 0, 0);
    pop();

    // X-axis ticks
    noStroke();
    fill(80);
    textSize(14);
    textAlign(CENTER, TOP);
    let tickStep = xMax <= 20 ? 2 : 5;
    for (let xv = 0; xv <= xMax; xv += tickStep) {
        let sx = map(xv, 0, xMax, plotLeft, plotRight);
        stroke(200);
        line(sx, plotBottom, sx, plotBottom + 5);
        noStroke();
        fill(80);
        text(xv, sx, plotBottom + 6);
    }

    // Compute y-max for scaling
    let yMax = 0;
    let nSteps = 500;
    for (let i = 0; i <= nSteps; i++) {
        let xv = (i / nSteps) * xMax;
        if (xv <= 0.01) xv = 0.01;
        let yv = chiSquarePDF(xv, df);
        if (isFinite(yv) && yv > yMax) yMax = yv;
    }
    yMax *= 1.15;
    if (yMax < 0.05) yMax = 0.5;

    // Critical values
    let crit05 = chiSquareCritical(df, 0.05);
    let crit01 = chiSquareCritical(df, 0.01);

    // Shade area to the right of test statistic (p-value region)
    if (chiSquareVal > 0 && chiSquareVal < xMax) {
        fill(255, 100, 100, 80);
        noStroke();
        beginShape();
        let startX = chiSquareVal;
        let sx = map(startX, 0, xMax, plotLeft, plotRight);
        vertex(sx, plotBottom);
        for (let i = 0; i <= 200; i++) {
            let xv = startX + (i / 200) * (xMax - startX);
            if (xv <= 0.01) xv = 0.01;
            let yv = chiSquarePDF(xv, df);
            if (!isFinite(yv)) yv = 0;
            let screenX = map(xv, 0, xMax, plotLeft, plotRight);
            let screenY = map(yv, 0, yMax, plotBottom, plotTop);
            screenY = constrain(screenY, plotTop, plotBottom);
            vertex(screenX, screenY);
        }
        vertex(plotRight, plotBottom);
        endShape(CLOSE);
    }

    // Draw the PDF curve
    stroke(0, 100, 200);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let i = 0; i <= nSteps; i++) {
        let xv = (i / nSteps) * xMax;
        if (xv <= 0.01) xv = 0.01;
        let yv = chiSquarePDF(xv, df);
        if (!isFinite(yv)) yv = 0;
        let sx = map(xv, 0, xMax, plotLeft, plotRight);
        let sy = map(yv, 0, yMax, plotBottom, plotTop);
        sy = constrain(sy, plotTop, plotBottom);
        vertex(sx, sy);
    }
    endShape();

    // Draw critical value lines (dashed)
    drawDashedLine(map(crit05, 0, xMax, plotLeft, plotRight), plotTop,
                   map(crit05, 0, xMax, plotLeft, plotRight), plotBottom,
                   color(200, 150, 0), 2);
    drawDashedLine(map(crit01, 0, xMax, plotLeft, plotRight), plotTop,
                   map(crit01, 0, xMax, plotLeft, plotRight), plotBottom,
                   color(200, 0, 0), 2);

    // Critical value labels
    noStroke();
    textSize(14);

    let crit05x = map(crit05, 0, xMax, plotLeft, plotRight);
    let crit01x = map(crit01, 0, xMax, plotLeft, plotRight);

    fill(170, 120, 0);
    textAlign(LEFT, TOP);
    text('p=0.05', crit05x + 4, plotTop + 4);
    text(nf(crit05, 1, 2), crit05x + 4, plotTop + 20);

    fill(180, 0, 0);
    textAlign(LEFT, TOP);
    text('p=0.01', crit01x + 4, plotTop + 38);
    text(nf(crit01, 1, 2), crit01x + 4, plotTop + 54);

    // Draw test statistic line
    if (chiSquareVal > 0) {
        let statX = map(chiSquareVal, 0, xMax, plotLeft, plotRight);
        stroke(0, 180, 0);
        strokeWeight(3);
        line(statX, plotTop, statX, plotBottom);

        noStroke();
        fill(0, 140, 0);
        textSize(16);
        textAlign(LEFT, BOTTOM);
        text('chi2=' + nf(chiSquareVal, 1, 3), statX + 5, plotBottom - 5);
    }

    // Df and p-value info in top-right of plot
    noStroke();
    fill(0);
    textSize(16);
    textAlign(RIGHT, TOP);
    text('df = ' + df, plotRight - 10, plotTop + 8);
    text('chi2 = ' + nf(chiSquareVal, 1, 3), plotRight - 10, plotTop + 28);

    let pText = pValue < 0.0001 ? '< 0.0001' : nf(pValue, 1, 4);
    fill(pValue < 0.05 ? color(200, 0, 0) : color(0, 120, 0));
    textSize(16);
    text('p-value = ' + pText, plotRight - 10, plotTop + 48);

    let sigText = pValue < 0.01 ? 'Highly Significant' :
                  pValue < 0.05 ? 'Significant' : 'Not Significant';
    text(sigText, plotRight - 10, plotTop + 68);

    // Control region labels
    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text('Degrees of Freedom: ' + df, 10, drawHeight + 8);

    let inputStartX = 280;

    // Category number headers
    textSize(14);
    for (let i = 0; i < numCategories; i++) {
        let xOff = inputStartX + i * 90;
        textAlign(CENTER, TOP);
        text('C' + (i + 1), xOff + 35, drawHeight + 10);
    }

    textSize(14);
    textAlign(RIGHT, TOP);
    text('Observed:', inputStartX - 8, drawHeight + 48);
    text('Expected:', inputStartX - 8, drawHeight + 83);

    // Legend for shaded area
    textSize(14);
    textAlign(LEFT, TOP);
    fill(255, 100, 100, 150);
    noStroke();
    rect(10, drawHeight + 108, 16, 16);
    fill(80);
    text('Shaded area = p-value region', 32, drawHeight + 109);
}

function calculateChiSquare() {
    chiSquareVal = 0;
    let valid = true;

    for (let i = 0; i < numCategories; i++) {
        let obs = parseFloat(obsInputs[i].value());
        let exp = parseFloat(expInputs[i].value());
        if (isNaN(obs) || isNaN(exp) || exp <= 0) {
            valid = false;
            break;
        }
        chiSquareVal += pow(obs - exp, 2) / exp;
    }

    if (!valid) {
        chiSquareVal = 0;
        pValue = 1;
        return;
    }

    let df = dfSlider.value();
    pValue = 1 - chiSquareCDF(chiSquareVal, df);
    if (pValue < 0) pValue = 0;
    if (pValue > 1) pValue = 1;
}

// Chi-square PDF: f(x) = x^(k/2-1) * e^(-x/2) / (2^(k/2) * Gamma(k/2))
function chiSquarePDF(x, k) {
    if (x <= 0) return 0;
    let halfK = k / 2;
    let logPdf = (halfK - 1) * log(x) - x / 2 - halfK * log(2) - lnGamma(halfK);
    return exp(logPdf);
}

// Chi-square CDF via regularized incomplete gamma function
function chiSquareCDF(x, k) {
    if (x <= 0) return 0;
    return regularizedGammaP(k / 2, x / 2);
}

// Regularized lower incomplete gamma function P(a, x)
function regularizedGammaP(a, x) {
    if (x < 0) return 0;
    if (x === 0) return 0;

    if (x < a + 1) {
        // Series expansion
        let sum = 1 / a;
        let term = 1 / a;
        for (let n = 1; n < 200; n++) {
            term *= x / (a + n);
            sum += term;
            if (abs(term) < 1e-12 * abs(sum)) break;
        }
        return sum * exp(-x + a * log(x) - lnGamma(a));
    } else {
        // Continued fraction (Lentz's method)
        return 1 - regularizedGammaQ_cf(a, x);
    }
}

// Upper incomplete gamma Q(a,x) via continued fraction
function regularizedGammaQ_cf(a, x) {
    let f = 1e-30;
    let C = 1e-30;
    let D = 1 / (x + 1 - a);
    f = D;
    for (let i = 1; i < 200; i++) {
        let aCoef = i * (a - i);
        let bCoef = x + 2 * i + 1 - a;
        D = bCoef + aCoef * D;
        if (abs(D) < 1e-30) D = 1e-30;
        D = 1 / D;
        C = bCoef + aCoef / C;
        if (abs(C) < 1e-30) C = 1e-30;
        let delta = C * D;
        f *= delta;
        if (abs(delta - 1) < 1e-12) break;
    }
    return exp(-x + a * log(x) - lnGamma(a)) * f;
}

// Log-gamma function (Lanczos approximation)
function lnGamma(z) {
    if (z < 0.5) {
        return log(PI / sin(PI * z)) - lnGamma(1 - z);
    }
    z -= 1;
    let g = 7;
    let coef = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    let x = coef[0];
    for (let i = 1; i < g + 2; i++) {
        x += coef[i] / (z + i);
    }
    let t = z + g + 0.5;
    return 0.5 * log(2 * PI) + (z + 0.5) * log(t) - t + log(x);
}

// Chi-square critical values (precomputed table for df 1-10)
function chiSquareCritical(df, alpha) {
    let table05 = [0, 3.841, 5.991, 7.815, 9.488, 11.070, 12.592, 14.067, 15.507, 16.919, 18.307];
    let table01 = [0, 6.635, 9.210, 11.345, 13.277, 15.086, 16.812, 18.475, 20.090, 21.666, 23.209];

    if (df < 1) df = 1;
    if (df > 10) df = 10;

    if (alpha === 0.05) return table05[df];
    if (alpha === 0.01) return table01[df];
    return 0;
}

function drawDashedLine(x1, y1, x2, y2, c, w) {
    stroke(c);
    strokeWeight(w);
    let d = dist(x1, y1, x2, y2);
    let dashLen = 8;
    let gapLen = 6;
    let steps = floor(d / (dashLen + gapLen));
    for (let i = 0; i < steps; i++) {
        let t1 = i * (dashLen + gapLen) / d;
        let t2 = (i * (dashLen + gapLen) + dashLen) / d;
        if (t2 > 1) t2 = 1;
        line(lerp(x1, x2, t1), lerp(y1, y2, t1),
             lerp(x1, x2, t2), lerp(y1, y2, t2));
    }
}

function updateCanvasSize() {
    let mainEl = document.querySelector('main');
    containerWidth = mainEl ? mainEl.offsetWidth : windowWidth;
    if (containerWidth < 400) containerWidth = 400;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);

    // Reposition controls
    dfSlider.position(10, drawHeight + 30);

    let inputStartX = 280;
    for (let i = 0; i < numCategories; i++) {
        let xOff = inputStartX + i * 90;
        obsInputs[i].position(xOff, drawHeight + 45);
        expInputs[i].position(xOff, drawHeight + 80);
    }
}

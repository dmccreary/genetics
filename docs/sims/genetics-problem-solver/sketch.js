// Genetics Problem Solver - Chi-Square Model Fitting
// CANVAS_HEIGHT: 560
let drawHeight = 440;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let canvasWidth;

// Models: name, expected ratios, number of classes
let models = [
  { name: '3:1 (Monohybrid)', ratios: [3, 1], classes: 2 },
  { name: '1:1 (Testcross)', ratios: [1, 1], classes: 2 },
  { name: '9:3:3:1 (Dihybrid)', ratios: [9, 3, 3, 1], classes: 4 },
  { name: '15:1 (Duplicate dominant)', ratios: [15, 1], classes: 2 },
  { name: '9:7 (Complementary)', ratios: [9, 7], classes: 2 },
  { name: '12:3:1 (Dominant epistasis)', ratios: [12, 3, 1], classes: 3 },
  { name: '9:3:4 (Recessive epistasis)', ratios: [9, 3, 4], classes: 3 },
  { name: '13:3 (Inhibitory)', ratios: [13, 3], classes: 2 }
];

// Input elements
let inputs = [];
let labels = ['Class A:', 'Class B:', 'Class C:', 'Class D:'];
let analyzeBtn;
let clearBtn;
let numClassesSelect;
let activeClasses = 2;

// Results
let results = [];
let analyzed = false;
let scrollOffset = 0;

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

  // Create number of classes selector
  numClassesSelect = createSelect();
  numClassesSelect.option('2 classes', '2');
  numClassesSelect.option('3 classes', '3');
  numClassesSelect.option('4 classes', '4');
  numClassesSelect.selected('2 classes');
  numClassesSelect.changed(() => {
    activeClasses = int(numClassesSelect.value());
    analyzed = false;
    results = [];
    positionControls();
  });

  // Create 4 input fields
  for (let i = 0; i < 4; i++) {
    let inp = createInput('', 'number');
    inp.attribute('placeholder', '0');
    inp.style('font-size', '16px');
    inp.style('text-align', 'center');
    inputs.push(inp);
  }

  // Create buttons
  analyzeBtn = createButton('Analyze');
  analyzeBtn.style('font-size', '16px');
  analyzeBtn.style('padding', '6px 18px');
  analyzeBtn.style('background-color', '#4CAF50');
  analyzeBtn.style('color', 'white');
  analyzeBtn.style('border', 'none');
  analyzeBtn.style('border-radius', '4px');
  analyzeBtn.style('cursor', 'pointer');
  analyzeBtn.mousePressed(runAnalysis);

  clearBtn = createButton('Clear');
  clearBtn.style('font-size', '16px');
  clearBtn.style('padding', '6px 18px');
  clearBtn.style('background-color', '#f44336');
  clearBtn.style('color', 'white');
  clearBtn.style('border', 'none');
  clearBtn.style('border-radius', '4px');
  clearBtn.style('cursor', 'pointer');
  clearBtn.mousePressed(clearAll);

  positionControls();
}

function positionControls() {
  let mainEl = document.querySelector('main');
  let rect = mainEl ? mainEl.getBoundingClientRect() : { left: 0, top: 0 };
  let canvasEl = document.querySelector('canvas');
  let canvasRect = canvasEl ? canvasEl.getBoundingClientRect() : rect;

  let yBase = drawHeight + 10;
  let xStart = 10;
  let spacing = 140;

  // Number of classes selector - top row
  numClassesSelect.position(canvasRect.left + xStart, canvasRect.top + yBase);
  numClassesSelect.style('font-size', '16px');
  numClassesSelect.size(120, 30);

  // Input fields - top row after selector
  let inputStart = xStart + 140;
  for (let i = 0; i < 4; i++) {
    if (i < activeClasses) {
      inputs[i].position(canvasRect.left + inputStart + i * spacing, canvasRect.top + yBase);
      inputs[i].size(100, 26);
      inputs[i].show();
    } else {
      inputs[i].hide();
      inputs[i].value('');
    }
  }

  // Buttons - second row
  let btnY = yBase + 42;
  analyzeBtn.position(canvasRect.left + xStart, canvasRect.top + btnY);
  clearBtn.position(canvasRect.left + xStart + 110, canvasRect.top + btnY);
}

function clearAll() {
  for (let i = 0; i < 4; i++) {
    inputs[i].value('');
  }
  analyzed = false;
  results = [];
  scrollOffset = 0;
}

function runAnalysis() {
  let observed = [];
  let total = 0;
  for (let i = 0; i < activeClasses; i++) {
    let val = int(inputs[i].value());
    if (isNaN(val) || val < 0) val = 0;
    observed.push(val);
    total += val;
  }

  if (total === 0) return;

  results = [];

  for (let m = 0; m < models.length; m++) {
    let model = models[m];
    if (model.classes !== activeClasses) continue;

    let ratioSum = model.ratios.reduce((a, b) => a + b, 0);
    let expected = model.ratios.map(r => (r / ratioSum) * total);
    let chiSq = 0;

    for (let i = 0; i < activeClasses; i++) {
      let diff = observed[i] - expected[i];
      chiSq += (diff * diff) / expected[i];
    }

    let df = activeClasses - 1;
    let pValue = chiSquarePValue(chiSq, df);

    results.push({
      name: model.name,
      ratios: model.ratios.join(':'),
      expected: expected,
      chiSquare: chiSq,
      df: df,
      pValue: pValue
    });
  }

  // Sort by p-value descending (best fit first)
  results.sort((a, b) => b.pValue - a.pValue);
  analyzed = true;
  scrollOffset = 0;
}

// Chi-square p-value using incomplete gamma function
function chiSquarePValue(x, df) {
  if (x <= 0) return 1.0;
  return 1.0 - regularizedGammaP(df / 2.0, x / 2.0);
}

function regularizedGammaP(a, x) {
  if (x < a + 1) {
    return gammaPSeries(a, x);
  } else {
    return 1.0 - gammaPContinuedFraction(a, x);
  }
}

function gammaPSeries(a, x) {
  let sum = 1.0 / a;
  let term = 1.0 / a;
  for (let n = 1; n < 200; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) < Math.abs(sum) * 1e-10) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
}

function gammaPContinuedFraction(a, x) {
  let f = x + 1 - a;
  let c = 1e30;
  let d = 1.0 / f;
  let h = d;
  for (let n = 1; n < 200; n++) {
    let an = -n * (n - a);
    let bn = x + 2 * n + 1 - a;
    d = bn + an * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = bn + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1.0 / d;
    let delta = c * d;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-10) break;
  }
  return Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
}

function lnGamma(x) {
  let coef = [76.18009172947146, -86.50532032941677,
    24.01409824083091, -1.231739572450155,
    0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x - 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) {
    y += 1;
    ser += coef[j] / y;
  }
  return -tmp + Math.log(2.5066282746310005 * ser / x);
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
  textStyle(BOLD);
  text('Genetics Cross Analyzer', canvasWidth / 2, 10);

  textStyle(NORMAL);
  textSize(16);
  fill('#555');
  text('Enter observed phenotype counts, then click Analyze', canvasWidth / 2, 42);

  // Draw input labels in draw area above control region
  textAlign(LEFT, CENTER);
  textSize(16);
  fill('#333');
  let inputStart = 150;
  let spacing = 140;
  let labelY = drawHeight - 18;
  for (let i = 0; i < activeClasses; i++) {
    text(labels[i], inputStart + i * spacing, labelY);
  }

  if (!analyzed || results.length === 0) {
    // Instructions
    drawInstructions();
    return;
  }

  // Draw results table
  drawResultsTable();
}

function drawInstructions() {
  textAlign(LEFT, TOP);
  textSize(16);
  fill('#444');
  let x = 20;
  let y = 75;
  let lineH = 26;

  textStyle(BOLD);
  text('How to use:', x, y);
  textStyle(NORMAL);
  y += lineH + 4;

  let instructions = [
    '1. Select the number of phenotype classes (2, 3, or 4)',
    '2. Enter observed counts for each phenotype class',
    '3. Click "Analyze" to test all matching genetic models',
    '4. Results are ranked by p-value (best fit first)',
    '5. Green = best fit; p > 0.05 means data fits the model'
  ];

  for (let ins of instructions) {
    text(ins, x + 10, y);
    y += lineH;
  }

  y += 16;
  textStyle(BOLD);
  text('Available models:', x, y);
  textStyle(NORMAL);
  y += lineH + 4;

  textSize(16);
  let col1 = x + 10;
  let col2 = canvasWidth / 2 + 10;

  for (let i = 0; i < models.length; i++) {
    let mx = i < 4 ? col1 : col2;
    let my = y + (i % 4) * lineH;
    let ratioStr = models[i].ratios.join(':');
    text(ratioStr + '  ' + models[i].name.split('(')[1]?.replace(')', '') || '', mx, my);
  }
}

function drawResultsTable() {
  let x = 10;
  let y = 70;
  let rowH = 32;
  let colWidths;
  let headerLabels;

  // Adaptive columns based on canvas width
  let narrow = canvasWidth < 620;

  if (narrow) {
    colWidths = [canvasWidth * 0.35, canvasWidth * 0.2, canvasWidth * 0.15, canvasWidth * 0.15, canvasWidth * 0.15];
    headerLabels = ['Model', 'Ratio', 'Chi-sq', 'df', 'p-value'];
  } else {
    colWidths = [canvasWidth * 0.28, canvasWidth * 0.1, canvasWidth * 0.32, canvasWidth * 0.1, canvasWidth * 0.08, canvasWidth * 0.12];
    headerLabels = ['Model', 'Ratio', 'Expected Values', 'Chi-sq', 'df', 'p-value'];
  }

  // Header background
  fill('#2c3e50');
  noStroke();
  rect(x, y, canvasWidth - 20, rowH, 4, 4, 0, 0);

  // Header text
  fill('white');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  let cx = x + 8;
  for (let i = 0; i < headerLabels.length; i++) {
    text(headerLabels[i], cx, y + rowH / 2);
    cx += colWidths[i];
  }

  // Data rows
  textStyle(NORMAL);
  let maxRows = Math.min(results.length, Math.floor((drawHeight - y - rowH - 50) / rowH));

  for (let r = 0; r < maxRows; r++) {
    let res = results[r];
    let ry = y + rowH + r * rowH;

    // Row background
    if (r === 0) {
      // Best fit - green highlight
      fill(200, 240, 200);
    } else if (r % 2 === 0) {
      fill(245, 248, 255);
    } else {
      fill(255);
    }
    noStroke();
    rect(x, ry, canvasWidth - 20, rowH);

    // Row border
    stroke(220);
    strokeWeight(0.5);
    line(x, ry + rowH, canvasWidth - 10, ry + rowH);

    // Row text
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);

    // Determine text color based on p-value
    if (res.pValue >= 0.05) {
      fill('#2e7d32'); // Green - good fit
    } else if (res.pValue >= 0.01) {
      fill('#e65100'); // Orange - marginal
    } else {
      fill('#c62828'); // Red - poor fit
    }

    // Best fit row gets bold
    if (r === 0) textStyle(BOLD);
    else textStyle(NORMAL);

    cx = x + 8;

    // Model name
    text(truncateText(res.name, colWidths[0] - 12), cx, ry + rowH / 2);
    cx += colWidths[0];

    // Ratio
    text(res.ratios, cx, ry + rowH / 2);
    cx += colWidths[1];

    if (!narrow) {
      // Expected values
      let expStr = res.expected.map(e => e.toFixed(1)).join(', ');
      text(truncateText(expStr, colWidths[2] - 12), cx, ry + rowH / 2);
      cx += colWidths[2];
    }

    // Chi-square
    text(res.chiSquare.toFixed(3), cx, ry + rowH / 2);
    cx += colWidths[narrow ? 2 : 3];

    // df
    text(res.df, cx, ry + rowH / 2);
    cx += colWidths[narrow ? 3 : 4];

    // p-value
    let pStr;
    if (res.pValue < 0.001) {
      pStr = '<0.001';
    } else {
      pStr = res.pValue.toFixed(3);
    }
    text(pStr, cx, ry + rowH / 2);
  }

  // Summary text at bottom of draw area
  textStyle(NORMAL);
  textSize(16);
  textAlign(LEFT, TOP);
  fill('#333');
  let summaryY = y + rowH + maxRows * rowH + 12;

  if (results.length > 0) {
    let best = results[0];
    if (best.pValue >= 0.05) {
      fill('#2e7d32');
      textStyle(BOLD);
      text('Best fit: ' + best.name + '  (p = ' + best.pValue.toFixed(3) + ')',
        x + 8, summaryY);
      textStyle(NORMAL);
      fill('#555');
      text('This model cannot be rejected at the 0.05 significance level.',
        x + 8, summaryY + 24);
    } else {
      fill('#c62828');
      textStyle(BOLD);
      text('No good fit found. Best model: ' + best.name +
        '  (p = ' + (best.pValue < 0.001 ? '<0.001' : best.pValue.toFixed(3)) + ')',
        x + 8, summaryY);
      textStyle(NORMAL);
      fill('#555');
      text('All models rejected at 0.05 level. Check data or consider other models.',
        x + 8, summaryY + 24);
    }
  }

  // Legend
  let legY = summaryY + 56;
  textSize(16);
  textStyle(NORMAL);
  fill('#2e7d32');
  text('Green text: p >= 0.05 (good fit)', x + 8, legY);
  fill('#e65100');
  text('Orange text: 0.01 <= p < 0.05 (marginal)', x + 8 + 260, legY);
  fill('#c62828');
  text('Red text: p < 0.01 (poor fit)', x + 8 + 580 < canvasWidth ? x + 560 : x + 8, legY + (x + 580 < canvasWidth ? 0 : 22));
}

function truncateText(str, maxW) {
  while (textWidth(str) > maxW && str.length > 3) {
    str = str.substring(0, str.length - 2) + '..';
  }
  return str;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

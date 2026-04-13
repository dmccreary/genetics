// Epistasis Ratio Calculator
// CANVAS_HEIGHT: 560
let drawHeight = 450;
let controlHeight = 110;
let canvasWidth, canvasHeight;

// Controls
let epistasisSelect;
let observedInputs = [];
let chiSquareButton;
let resetButton;
let chiSquareResult = '';
let chiSquarePValue = '';

// Classify a genotype string into its phenotypic category
function hasA(g) { return g.includes('A'); }
function hasB(g) { return g.includes('B'); }
function isA_B_(g) { return hasA(g) && hasB(g); }
function isA_bb(g) { return hasA(g) && !hasB(g); }
function isaaB_(g) { return !hasA(g) && hasB(g); }
function isaabb(g) { return !hasA(g) && !hasB(g); }

// Epistasis models: name -> { ratio, classify(genotype) -> class index }
const EPISTASIS_MODELS = {
  'Complementary (9:7)': {
    ratio: [9, 7],
    classes: [
      { name: 'A_B_ (colored)', color: '#4CAF50' },
      { name: 'Others (white)',  color: '#E0E0E0' }
    ],
    classify: function(g) {
      return isA_B_(g) ? 0 : 1;
    }
  },
  'Duplicate (15:1)': {
    ratio: [15, 1],
    classes: [
      { name: 'A_ or B_ (wild)', color: '#42A5F5' },
      { name: 'aabb (mutant)',    color: '#E0E0E0' }
    ],
    classify: function(g) {
      return isaabb(g) ? 1 : 0;
    }
  },
  'Dominant epistasis (12:3:1)': {
    ratio: [12, 3, 1],
    classes: [
      { name: 'A_ (epistatic)',   color: '#FF9800' },
      { name: 'aaB_ (expressed)', color: '#8BC34A' },
      { name: 'aabb (recessive)', color: '#E0E0E0' }
    ],
    classify: function(g) {
      if (hasA(g)) return 0;        // A_B_ and A_bb both epistatic
      if (isaaB_(g)) return 1;      // aaB_
      return 2;                      // aabb
    }
  },
  'Recessive epistasis (9:3:4)': {
    ratio: [9, 3, 4],
    classes: [
      { name: 'A_B_ (both)',      color: '#AB47BC' },
      { name: 'A_bb (A only)',    color: '#26C6DA' },
      { name: 'aa__ (epistatic)', color: '#E0E0E0' }
    ],
    classify: function(g) {
      if (isA_B_(g)) return 0;
      if (isA_bb(g)) return 1;
      return 2;  // aaB_ and aabb both masked
    }
  },
  'Suppression (13:3)': {
    ratio: [13, 3],
    classes: [
      { name: 'Suppressed/wt',    color: '#FFCA28' },
      { name: 'aaB_ (expressed)', color: '#EF5350' }
    ],
    classify: function(g) {
      // A_B_, A_bb, aabb all suppressed; only aaB_ expressed
      return isaaB_(g) ? 1 : 0;
    }
  }
};

// 4x4 Punnett square genotypes for AaBb x AaBb
// Rows: gametes from parent 1 (AB, Ab, aB, ab)
// Cols: gametes from parent 2 (AB, Ab, aB, ab)
const GENOTYPES = [
  ['AABB', 'AABb', 'AaBB', 'AaBb'],
  ['AABb', 'AAbb', 'AaBb', 'Aabb'],
  ['AaBB', 'AaBb', 'aaBB', 'aaBb'],
  ['AaBb', 'Aabb', 'aaBb', 'aabb']
];

const GAMETES = ['AB', 'Ab', 'aB', 'ab'];

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

  // Build controls
  createControlsUI();
}

function createControlsUI() {
  // Epistasis type selector
  epistasisSelect = createSelect();
  epistasisSelect.parent(document.querySelector('main'));
  for (let key of Object.keys(EPISTASIS_MODELS)) {
    epistasisSelect.option(key);
  }
  epistasisSelect.style('font-size', '16px');
  epistasisSelect.style('padding', '4px 8px');
  epistasisSelect.style('margin', '6px 4px');
  epistasisSelect.changed(onModelChange);

  // Observed count inputs
  let model = getCurrentModel();
  buildObservedInputs(model);

  // Chi-square button
  chiSquareButton = createButton('Chi-Square Test');
  chiSquareButton.parent(document.querySelector('main'));
  chiSquareButton.style('font-size', '16px');
  chiSquareButton.style('padding', '4px 12px');
  chiSquareButton.style('margin', '6px 4px');
  chiSquareButton.mousePressed(runChiSquare);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.style('font-size', '16px');
  resetButton.style('padding', '4px 12px');
  resetButton.style('margin', '6px 4px');
  resetButton.mousePressed(resetObserved);
}

function buildObservedInputs(model) {
  // Remove old inputs
  for (let inp of observedInputs) {
    inp.label.remove();
    inp.input.remove();
  }
  observedInputs = [];

  for (let i = 0; i < model.ratio.length; i++) {
    let lbl = createSpan(' Class ' + (i + 1) + ':');
    lbl.parent(document.querySelector('main'));
    lbl.style('font-size', '16px');
    lbl.style('margin-left', '8px');
    let inp = createInput('', 'number');
    inp.parent(document.querySelector('main'));
    inp.style('width', '60px');
    inp.style('font-size', '16px');
    inp.style('padding', '2px 4px');
    inp.style('margin', '6px 2px');
    observedInputs.push({ label: lbl, input: inp });
  }
}

function onModelChange() {
  let model = getCurrentModel();
  buildObservedInputs(model);
  chiSquareResult = '';
  chiSquarePValue = '';
}

function getCurrentModel() {
  let key = epistasisSelect ? epistasisSelect.value() : Object.keys(EPISTASIS_MODELS)[0];
  return EPISTASIS_MODELS[key];
}

function resetObserved() {
  for (let inp of observedInputs) {
    inp.input.value('');
  }
  chiSquareResult = '';
  chiSquarePValue = '';
}

function runChiSquare() {
  let model = getCurrentModel();
  let observed = [];
  let totalObs = 0;
  for (let inp of observedInputs) {
    let v = parseFloat(inp.input.value());
    if (isNaN(v) || v < 0) {
      chiSquareResult = 'Enter valid counts for all classes.';
      chiSquarePValue = '';
      return;
    }
    observed.push(v);
    totalObs += v;
  }
  if (totalObs === 0) {
    chiSquareResult = 'Total observed cannot be zero.';
    chiSquarePValue = '';
    return;
  }

  let ratioSum = model.ratio.reduce((a, b) => a + b, 0);
  let chiSq = 0;
  let details = [];
  for (let i = 0; i < model.ratio.length; i++) {
    let expected = (model.ratio[i] / ratioSum) * totalObs;
    let contrib = Math.pow(observed[i] - expected, 2) / expected;
    chiSq += contrib;
    details.push('E' + (i + 1) + '=' + expected.toFixed(1));
  }

  let df = model.ratio.length - 1;
  let p = chiSquarePValue_calc(chiSq, df);

  chiSquareResult = 'X\u00B2 = ' + chiSq.toFixed(3) + ', df = ' + df + ' (' + details.join(', ') + ')';
  chiSquarePValue = 'p \u2248 ' + p.toFixed(4) + (p < 0.05 ? '  \u2192 Reject null (p < 0.05)' : '  \u2192 Fail to reject (p \u2265 0.05)');
}

// Approximate chi-square p-value using regularized incomplete gamma function
function chiSquarePValue_calc(x, df) {
  if (x <= 0) return 1.0;
  return 1.0 - gammainc(df / 2.0, x / 2.0);
}

// Regularized lower incomplete gamma function P(a, x) via series expansion
function gammainc(a, x) {
  if (x < 0) return 0;
  if (x === 0) return 0;
  let sum = 0;
  let term = 1.0 / a;
  sum = term;
  for (let n = 1; n < 200; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) < 1e-12) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
}

function lnGamma(z) {
  // Lanczos approximation
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
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  }
  z -= 1;
  let x = coef[0];
  for (let i = 1; i < g + 2; i++) {
    x += coef[i] / (z + i);
  }
  let t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

// Get color for a specific cell (row, col) given the current model
function getCellColor(model, row, col) {
  let genotype = GENOTYPES[row][col];
  let classIdx = model.classify(genotype);
  return model.classes[classIdx].color;
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

  let model = getCurrentModel();
  let modelName = epistasisSelect ? epistasisSelect.value() : Object.keys(EPISTASIS_MODELS)[0];

  // Title
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Epistasis Ratio Calculator', canvasWidth / 2, 28);

  // Subtitle with selected type
  textSize(17);
  fill('#333');
  text('Cross: AaBb \u00D7 AaBb   |   Model: ' + modelName, canvasWidth / 2, 56);

  // Draw Punnett square
  let gridLeft = 40;
  let gridTop = 80;
  let cellSize = min((canvasWidth - 100) / 5.5, 68);
  let headerSize = cellSize;

  // Column headers
  textSize(max(14, cellSize * 0.26));
  textAlign(CENTER, CENTER);
  fill('#555');
  noStroke();
  for (let c = 0; c < 4; c++) {
    text(GAMETES[c], gridLeft + headerSize + c * cellSize + cellSize / 2, gridTop + headerSize / 2);
  }

  // Row headers
  for (let r = 0; r < 4; r++) {
    text(GAMETES[r], gridLeft + headerSize / 2, gridTop + headerSize + r * cellSize + cellSize / 2);
  }

  // Grid cells
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let x = gridLeft + headerSize + c * cellSize;
      let y = gridTop + headerSize + r * cellSize;
      let col = getCellColor(model, r, c);

      fill(col);
      stroke('#888');
      strokeWeight(1);
      rect(x, y, cellSize, cellSize, 3);

      // Genotype text
      fill('#222');
      noStroke();
      textSize(max(12, cellSize * 0.22));
      textAlign(CENTER, CENTER);
      text(GENOTYPES[r][c], x + cellSize / 2, y + cellSize / 2);
    }
  }

  // Legend and ratio display
  let legendX = gridLeft + headerSize + 4 * cellSize + 24;
  let legendY = gridTop + headerSize;
  let legendW = canvasWidth - legendX - 20;

  textAlign(LEFT, TOP);
  textSize(18);
  fill(0);
  noStroke();
  text('Phenotype Classes', legendX, legendY);

  let ratioStr = model.ratio.join(' : ');
  let ratioSum = model.ratio.reduce((a, b) => a + b, 0);

  for (let i = 0; i < model.classes.length; i++) {
    let y = legendY + 30 + i * 40;

    // Color swatch
    fill(model.classes[i].color);
    stroke('#888');
    strokeWeight(1);
    rect(legendX, y, 22, 22, 3);

    // Label with ratio
    fill('#222');
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text(model.classes[i].name, legendX + 30, y + 11);

    // Fraction
    textSize(16);
    fill('#666');
    text(model.ratio[i] + '/' + ratioSum, legendX + 30, y + 28);
  }

  // Ratio prominently displayed
  textSize(22);
  fill('#1565C0');
  noStroke();
  textAlign(LEFT, TOP);
  let ratioY = legendY + 30 + model.classes.length * 40 + 10;
  text('Ratio: ' + ratioStr, legendX, ratioY);

  // Chi-square results
  if (chiSquareResult !== '') {
    textSize(16);
    textAlign(LEFT, TOP);
    fill('#333');
    noStroke();
    let resY = ratioY + 36;
    text(chiSquareResult, legendX, resY);
    if (chiSquarePValue !== '') {
      let pColor = chiSquarePValue.indexOf('Reject') > -1 ? '#D32F2F' : '#2E7D32';
      fill(pColor);
      textSize(16);
      text(chiSquarePValue, legendX, resY + 22);
    }
  }

  // Instructions
  textSize(16);
  fill('#777');
  textAlign(CENTER, TOP);
  noStroke();
  text('Enter observed counts below and click Chi-Square Test', canvasWidth / 2, drawHeight - 26);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

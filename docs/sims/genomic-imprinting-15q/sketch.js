// Genomic Imprinting at the 15q11-q13 Locus
// CANVAS_HEIGHT: 530
let drawHeight = 450;
let controlHeight = 80;
let canvasWidth, canvasHeight;

let scenario = 0; // 0=Normal, 1=Pat deletion, 2=Mat deletion, 3=Mat UPD
let buttons = [];

// Gene data: name, start fraction, width fraction, expressedOn ('paternal' or 'maternal')
let genes = [
  { name: 'MKRN3',  start: 0.08, w: 0.12, expressedOn: 'paternal' },
  { name: 'NDN',    start: 0.25, w: 0.12, expressedOn: 'paternal' },
  { name: 'SNRPN',  start: 0.42, w: 0.15, expressedOn: 'paternal' },
  { name: 'UBE3A',  start: 0.65, w: 0.15, expressedOn: 'maternal' }
];

let scenarioInfo = [
  {
    title: 'Normal',
    desc: 'Both chromosomes present.\nPaternal genes (MKRN3, NDN,\nSNRPN) expressed from father.\nUBE3A expressed from mother.\nNo disease phenotype.',
    patPresent: true,
    matPresent: true,
    patSource: 'paternal',
    matSource: 'maternal'
  },
  {
    title: 'Paternal Deletion',
    desc: 'Deletion of paternal 15q11-q13.\nPaternally expressed genes lost.\nUBE3A still active on maternal.\nResult: Prader-Willi Syndrome\n(hypotonia, obesity, intellectual\ndisability).',
    patPresent: false,
    matPresent: true,
    patSource: 'paternal',
    matSource: 'maternal'
  },
  {
    title: 'Maternal Deletion',
    desc: 'Deletion of maternal 15q11-q13.\nUBE3A lost (only maternal copy\nis active in brain).\nPaternal genes still expressed.\nResult: Angelman Syndrome\n(seizures, ataxia, happy\ndemeanor).',
    patPresent: true,
    matPresent: false,
    patSource: 'paternal',
    matSource: 'maternal'
  },
  {
    title: 'Maternal UPD',
    desc: 'Two maternal copies, no paternal.\nBoth chromosomes are maternal.\nPaternal genes silenced on both.\nUBE3A active on both copies.\nResult: Prader-Willi Syndrome\n(same as paternal deletion\nphenotype).',
    patPresent: true,
    matPresent: true,
    patSource: 'maternal',  // paternal slot is actually maternal copy
    matSource: 'maternal'
  }
];

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

  // Create scenario buttons
  let labels = ['Normal', 'Pat. Deletion\n(Prader-Willi)', 'Mat. Deletion\n(Angelman)', 'Maternal UPD\n(Prader-Willi)'];
  for (let i = 0; i < 4; i++) {
    let b = createButton(labels[i].replace('\n', ' '));
    b.parent(document.querySelector('main'));
    b.mousePressed(makeScenarioSetter(i));
    b.style('font-size', '14px');
    b.style('padding', '8px 12px');
    b.style('margin', '4px');
    b.style('cursor', 'pointer');
    b.style('border-radius', '6px');
    b.style('border', '2px solid #888');
    b.style('background', '#f0f0f0');
    buttons.push(b);
  }
  updateButtonStyles();
}

function makeScenarioSetter(i) {
  return function () {
    scenario = i;
    updateButtonStyles();
  };
}

function updateButtonStyles() {
  let colors = ['#4488cc', '#cc6644', '#cc44aa', '#cc6644'];
  for (let i = 0; i < buttons.length; i++) {
    if (i === scenario) {
      buttons[i].style('background', colors[i]);
      buttons[i].style('color', 'white');
      buttons[i].style('border-color', colors[i]);
    } else {
      buttons[i].style('background', '#f0f0f0');
      buttons[i].style('color', '#333');
      buttons[i].style('border-color', '#888');
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

  let info = scenarioInfo[scenario];

  // Title
  fill(40);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  textStyle(BOLD);
  text('Genomic Imprinting: 15q11-q13 Region', canvasWidth * 0.45, 16);
  textStyle(NORMAL);

  // Layout
  let chromLeft = 40;
  let chromRight = canvasWidth * 0.62;
  let chromW = chromRight - chromLeft;
  let barH = 40;
  let patY = 110;
  let matY = 280;
  let labelX = chromLeft;

  // Scenario subtitle
  textSize(18);
  textAlign(CENTER, TOP);
  fill(80);
  let subtitleColors = ['#336699', '#cc4422', '#aa22aa', '#cc4422'];
  fill(subtitleColors[scenario]);
  textStyle(BOLD);
  text('Scenario: ' + info.title, canvasWidth * 0.45, 50);
  textStyle(NORMAL);

  // Draw paternal chromosome
  drawChromosome(chromLeft, patY, chromW, barH, 'Paternal', info.patPresent, info.patSource, color(100, 150, 220));

  // Draw maternal chromosome
  drawChromosome(chromLeft, matY, chromW, barH, 'Maternal', info.matPresent, info.matSource, color(220, 130, 160));

  // Region label
  textSize(16);
  fill(100);
  textAlign(CENTER, TOP);
  noStroke();
  text('15q11 ─────────── 15q13', chromLeft + chromW / 2, patY - 40);

  // Phenotype description panel
  let panelX = canvasWidth * 0.66;
  let panelW = canvasWidth * 0.32;
  let panelY = 80;
  let panelH = 340;

  fill(255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Phenotype', panelX + panelW / 2, panelY + 12);
  textStyle(NORMAL);

  // Description text
  textSize(16);
  textAlign(LEFT, TOP);
  fill(50);
  let descLines = info.desc.split('\n');
  for (let i = 0; i < descLines.length; i++) {
    text(descLines[i], panelX + 14, panelY + 44 + i * 22);
  }

  // Legend
  drawLegend(panelX, panelY + panelH + 10);
}

function drawChromosome(x, y, w, h, label, isPresent, sourceType, barColor) {
  // Label
  textSize(18);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  noStroke();

  if (scenario === 3 && label === 'Paternal') {
    // Maternal UPD: paternal slot shows as maternal copy
    fill(220, 130, 160);
    text('Copy 1 (Maternal origin)', x, y - 18);
  } else if (scenario === 3 && label === 'Maternal') {
    fill(220, 130, 160);
    text('Copy 2 (Maternal origin)', x, y - 18);
  } else {
    if (label === 'Paternal') fill(70, 110, 180);
    else fill(180, 70, 110);
    text(label + ' Chromosome', x, y - 18);
  }
  textStyle(NORMAL);

  if (!isPresent) {
    // Deletion - draw dashed outline
    drawingContext.setLineDash([8, 6]);
    stroke(180);
    strokeWeight(2);
    noFill();
    rect(x, y, w, h, 8);
    drawingContext.setLineDash([]);

    // Big X
    stroke(200, 80, 80);
    strokeWeight(3);
    line(x + 10, y + 5, x + w - 10, y + h - 5);
    line(x + 10, y + h - 5, x + w - 10, y + 5);

    fill(200, 80, 80);
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('DELETED', x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  // Draw chromosome bar
  let isMatOrigin = (sourceType === 'maternal');
  if (isMatOrigin) {
    fill(240, 190, 210);
    stroke(200, 130, 160);
  } else {
    fill(190, 210, 240);
    stroke(130, 160, 200);
  }
  strokeWeight(2);
  rect(x, y, w, h, 8);

  // Draw genes on this chromosome
  for (let g of genes) {
    let gx = x + g.start * w;
    let gw = g.w * w;

    // Determine if gene is active on this chromosome
    let isActive = false;
    if (g.expressedOn === 'paternal' && sourceType === 'paternal') {
      isActive = true;
    } else if (g.expressedOn === 'maternal' && sourceType === 'maternal') {
      isActive = true;
    }

    drawGene(gx, y, gw, h, g.name, isActive, g.expressedOn);
  }
}

function drawGene(x, y, w, h, name, isActive, expressedOn) {
  let pad = 3;

  if (isActive) {
    // Active gene - bright color
    if (expressedOn === 'paternal') {
      fill(60, 120, 220);
      stroke(40, 80, 180);
    } else {
      fill(220, 60, 120);
      stroke(180, 40, 80);
    }
    strokeWeight(2);
    rect(x + pad, y + pad, w - 2 * pad, h - 2 * pad, 5);

    // Gene name
    fill(255);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(name, x + w / 2, y + h / 2);
    textStyle(NORMAL);

    // Arrow indicating expression
    let arrowY = y - 8;
    let arrowX = x + w / 2;
    stroke(0, 160, 0);
    strokeWeight(2);
    fill(0, 160, 0);
    triangle(arrowX - 6, arrowY + 6, arrowX + 6, arrowY + 6, arrowX, arrowY - 2);
    // Arrow stem
    noFill();
    line(arrowX, arrowY + 6, arrowX, arrowY + 14);

    // "Active" label below
    noStroke();
    fill(0, 140, 0);
    textSize(12);
    textAlign(CENTER, TOP);
    text('Active', x + w / 2, y + h + 4);

  } else {
    // Silenced gene - dimmed
    fill(200, 200, 200, 180);
    stroke(170, 170, 170);
    strokeWeight(1);
    rect(x + pad, y + pad, w - 2 * pad, h - 2 * pad, 5);

    // Gene name dimmed
    fill(140);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(name, x + w / 2, y + h / 2);

    // Lock icon
    drawLock(x + w / 2, y - 4);

    // Methylation marks (small filled circles)
    fill(160, 80, 160);
    noStroke();
    let mY = y + h + 8;
    for (let i = 0; i < 3; i++) {
      let mx = x + w * 0.3 + i * (w * 0.2);
      ellipse(mx, mY, 6, 6);
    }

    // "Silenced" label
    fill(160, 80, 80);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Silenced', x + w / 2, y + h + 16);
  }
}

function drawLock(cx, cy) {
  // Simple lock icon
  let lw = 12;
  let lh = 10;
  let bx = cx - lw / 2;
  let by = cy - lh / 2 + 2;

  // Lock body
  fill(140, 100, 40);
  noStroke();
  rect(bx, by, lw, lh, 2);

  // Lock shackle
  noFill();
  stroke(140, 100, 40);
  strokeWeight(2);
  arc(cx, by, 8, 10, PI, TWO_PI);
}

function drawLegend(x, y) {
  textSize(14);
  textAlign(LEFT, CENTER);
  noStroke();

  let lx = x + 10;
  let ly = y + 2;

  // Active
  fill(0, 160, 0);
  triangle(lx, ly + 6, lx + 8, ly + 6, lx + 4, ly);
  fill(60);
  text('= Active (expressed)', lx + 14, ly + 4);

  // Silenced
  ly += 22;
  drawLock(lx + 4, ly + 2);
  fill(60);
  noStroke();
  text('= Silenced (imprinted)', lx + 14, ly + 4);

  // Methylation
  ly += 22;
  fill(160, 80, 160);
  noStroke();
  ellipse(lx + 4, ly + 4, 6, 6);
  fill(60);
  text('= Methylation marks', lx + 14, ly + 4);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

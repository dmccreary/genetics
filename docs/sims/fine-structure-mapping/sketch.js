// Fine Structure Mapping - Benzer's rII Region
// CANVAS_HEIGHT: 510
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let canvasWidth;

// Mutation sites along the rII gene (relative positions 0-1)
let mutations = [
  { name: 'r101', pos: 0.05, freq: 2 },
  { name: 'r104', pos: 0.12, freq: 5 },
  { name: 'r106', pos: 0.18, freq: 8 },
  { name: 'r131', pos: 0.28, freq: 3 },
  { name: 'r155', pos: 0.36, freq: 12 },
  { name: 'r187', pos: 0.44, freq: 7 },
  { name: 'r201', pos: 0.52, freq: 15 },
  { name: 'r240', pos: 0.60, freq: 4 },
  { name: 'r272', pos: 0.70, freq: 10 },
  { name: 'r305', pos: 0.78, freq: 6 },
  { name: 'r321', pos: 0.86, freq: 14 },
  { name: 'r350', pos: 0.95, freq: 9 }
];

// Deletion intervals (start, end as fractions of gene)
let deletions = [
  { name: 'Del-A', start: 0.03, end: 0.20, color: '#E74C3C' },
  { name: 'Del-B', start: 0.15, end: 0.38, color: '#3498DB' },
  { name: 'Del-C', start: 0.40, end: 0.62, color: '#2ECC71' },
  { name: 'Del-D', start: 0.55, end: 0.80, color: '#F39C12' },
  { name: 'Del-E', start: 0.75, end: 0.97, color: '#9B59B6' }
];

let selectedMutations = [];
let geneLeft, geneRight, geneY, geneWidth;
let resetBtn;
let hoverMutation = -1;

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

  resetBtn = createButton('Reset Selection');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSelection);
  resetBtn.style('font-size', '16px');
  resetBtn.style('padding', '6px 16px');
  resetBtn.style('cursor', 'pointer');
}

function resetSelection() {
  selectedMutations = [];
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

  // Layout constants
  let margin = 60;
  geneLeft = margin;
  geneRight = canvasWidth - margin;
  geneWidth = geneRight - geneLeft;
  geneY = 100;

  // Title
  fill('#2C3E50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text("Benzer's rII Fine-Structure Map", canvasWidth / 2, 12);
  textSize(16);
  fill('#555');
  text('Click two mutation sites to measure recombination distance', canvasWidth / 2, 42);

  // Draw the gene bar
  drawGeneBar();

  // Draw mutation sites
  hoverMutation = -1;
  drawMutationSites();

  // Draw deletion intervals
  drawDeletions();

  // Draw heatmap
  drawHeatmap();

  // Draw selection info
  drawSelectionInfo();

  // Position button
  resetBtn.position(
    canvasWidth / 2 - resetBtn.elt.offsetWidth / 2,
    drawHeight + (controlHeight - resetBtn.elt.offsetHeight) / 2 +
      (document.querySelector('main') ? document.querySelector('main').offsetTop : 0) +
      (document.querySelector('canvas') ? document.querySelector('canvas').offsetTop : 0)
  );
}

function drawGeneBar() {
  // Gene body
  strokeWeight(1);
  stroke('#2C3E50');
  fill('#D5E8D4');
  let barHeight = 28;
  rect(geneLeft, geneY - barHeight / 2, geneWidth, barHeight, 6);

  // Region labels
  noStroke();
  fill('#2C3E50');
  textAlign(CENTER, CENTER);
  textSize(16);
  let midA = geneLeft + geneWidth * 0.25;
  let midB = geneLeft + geneWidth * 0.75;
  text('rIIA cistron', midA, geneY);
  text('rIIB cistron', midB, geneY);

  // Divider between cistrons
  stroke('#2C3E50');
  strokeWeight(2);
  let divX = geneLeft + geneWidth * 0.5;
  line(divX, geneY - barHeight / 2, divX, geneY + barHeight / 2);

  // Left and right end labels
  noStroke();
  fill('#777');
  textSize(16);
  textAlign(RIGHT, CENTER);
  text("5'", geneLeft - 10, geneY);
  textAlign(LEFT, CENTER);
  text("3'", geneRight + 10, geneY);
}

function drawMutationSites() {
  let barHalf = 14;
  let tickTop = geneY - barHalf - 18;
  let tickBot = geneY + barHalf + 4;

  for (let i = 0; i < mutations.length; i++) {
    let m = mutations[i];
    let x = geneLeft + m.pos * geneWidth;

    // Check hover
    let d = dist(mouseX, mouseY, x, geneY);
    if (d < 12) {
      hoverMutation = i;
    }

    // Determine color
    let isSelected = selectedMutations.indexOf(i) !== -1;
    let isHovered = (hoverMutation === i);

    if (isSelected) {
      stroke('#E74C3C');
      strokeWeight(3);
    } else if (isHovered) {
      stroke('#3498DB');
      strokeWeight(3);
    } else {
      stroke('#C0392B');
      strokeWeight(2);
    }

    // Vertical tick
    line(x, tickTop, x, tickBot);

    // Label above
    noStroke();
    push();
    translate(x, tickTop - 4);
    rotate(-PI / 4);
    textAlign(LEFT, BOTTOM);
    textSize(12);
    fill(isSelected ? '#E74C3C' : (isHovered ? '#3498DB' : '#555'));
    text(m.name, 0, 0);
    pop();

    // Hit circle (invisible)
    if (isHovered) {
      noFill();
      stroke('#3498DB');
      strokeWeight(1);
      ellipse(x, geneY, 20, 20);
    }
  }
}

function drawDeletions() {
  let baseY = geneY + 40;
  let spacing = 26;

  noStroke();
  fill('#2C3E50');
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Deletion mapping:', geneLeft - 5, baseY - 6);

  for (let i = 0; i < deletions.length; i++) {
    let del = deletions[i];
    let y = baseY + 16 + i * spacing;
    let x1 = geneLeft + del.start * geneWidth;
    let x2 = geneLeft + del.end * geneWidth;

    // Bracket line
    stroke(del.color);
    strokeWeight(3);
    line(x1, y, x2, y);

    // Bracket ends
    strokeWeight(2);
    line(x1, y - 5, x1, y + 5);
    line(x2, y - 5, x2, y + 5);

    // Label
    noStroke();
    fill(del.color);
    textAlign(LEFT, CENTER);
    textSize(14);
    text(del.name, x2 + 8, y);

    // Show which mutations fall within this deletion
    for (let j = 0; j < mutations.length; j++) {
      let m = mutations[j];
      if (m.pos >= del.start && m.pos <= del.end) {
        let mx = geneLeft + m.pos * geneWidth;
        fill(del.color);
        noStroke();
        ellipse(mx, y, 6, 6);
      }
    }
  }
}

function drawHeatmap() {
  let heatY = geneY + 210;
  let heatHeight = 24;

  // Label
  noStroke();
  fill('#2C3E50');
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Mutation hotspot density:', geneLeft - 5, heatY - 12);

  // Find max frequency for scaling
  let maxFreq = 0;
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].freq > maxFreq) maxFreq = mutations[i].freq;
  }

  // Draw heatmap segments
  let numSegments = 60;
  let segWidth = geneWidth / numSegments;

  for (let s = 0; s < numSegments; s++) {
    let segCenter = (s + 0.5) / numSegments;
    let density = 0;

    // Gaussian-weighted sum of nearby mutations
    for (let i = 0; i < mutations.length; i++) {
      let dist = abs(segCenter - mutations[i].pos);
      let sigma = 0.04;
      density += mutations[i].freq * exp(-(dist * dist) / (2 * sigma * sigma));
    }

    // Map density to color (blue -> yellow -> red)
    let normDensity = constrain(density / maxFreq, 0, 1);
    let c;
    if (normDensity < 0.5) {
      c = lerpColor(color('#3498DB'), color('#F1C40F'), normDensity * 2);
    } else {
      c = lerpColor(color('#F1C40F'), color('#E74C3C'), (normDensity - 0.5) * 2);
    }

    noStroke();
    fill(c);
    rect(geneLeft + s * segWidth, heatY, segWidth + 1, heatHeight);
  }

  // Border
  noFill();
  stroke('#999');
  strokeWeight(1);
  rect(geneLeft, heatY, geneWidth, heatHeight);

  // Legend
  let legX = geneLeft;
  let legY = heatY + heatHeight + 8;
  noStroke();
  textSize(14);
  fill('#777');
  textAlign(LEFT, TOP);
  text('Low', legX, legY);
  textAlign(CENTER, TOP);
  text('Mutation frequency', geneLeft + geneWidth / 2, legY);
  textAlign(RIGHT, TOP);
  text('High (hotspot)', geneRight, legY);
}

function drawSelectionInfo() {
  let infoY = geneY + 280;

  if (selectedMutations.length === 1) {
    let m = mutations[selectedMutations[0]];
    noStroke();
    fill('#2C3E50');
    textAlign(CENTER, TOP);
    textSize(18);
    text('Selected: ' + m.name + '  (click another to measure distance)', canvasWidth / 2, infoY);

    // Highlight on gene
    let x = geneLeft + m.pos * geneWidth;
    stroke('#E74C3C');
    strokeWeight(2);
    noFill();
    ellipse(x, geneY, 24, 24);
  } else if (selectedMutations.length === 2) {
    let m1 = mutations[selectedMutations[0]];
    let m2 = mutations[selectedMutations[1]];
    let distance = abs(m1.pos - m2.pos);
    let recombFreq = (distance * 1.8).toFixed(3);
    let mapUnits = (distance * 180).toFixed(1);

    // Connection arc between selected mutations
    let x1 = geneLeft + m1.pos * geneWidth;
    let x2 = geneLeft + m2.pos * geneWidth;
    let midX = (x1 + x2) / 2;
    let arcH = 30;

    stroke('#E74C3C');
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(x1, geneY - 20);
    bezierVertex(x1, geneY - 20 - arcH, x2, geneY - 20 - arcH, x2, geneY - 20);
    endShape();

    // Highlight circles
    noFill();
    stroke('#E74C3C');
    strokeWeight(2);
    ellipse(x1, geneY, 24, 24);
    ellipse(x2, geneY, 24, 24);

    // Distance line
    stroke('#E74C3C');
    strokeWeight(1);
    let lineY = infoY - 10;
    line(x1, lineY, x2, lineY);
    // Arrow ends
    line(x1, lineY - 5, x1, lineY + 5);
    line(x2, lineY - 5, x2, lineY + 5);

    // Info text
    noStroke();
    fill('#2C3E50');
    textAlign(CENTER, TOP);
    textSize(18);
    text(m1.name + '  \u2194  ' + m2.name, canvasWidth / 2, infoY + 4);
    textSize(16);
    fill('#C0392B');
    text('Recombination frequency: ' + recombFreq + '%', canvasWidth / 2, infoY + 30);
    fill('#2980B9');
    text('Map distance: ' + mapUnits + ' \u00D7 10\u207B\u2074 map units', canvasWidth / 2, infoY + 54);

    // Check which deletions span both
    let coveredBy = [];
    for (let i = 0; i < deletions.length; i++) {
      let d = deletions[i];
      let minP = min(m1.pos, m2.pos);
      let maxP = max(m1.pos, m2.pos);
      if (d.start <= minP && d.end >= maxP) {
        coveredBy.push(d.name);
      }
    }
    if (coveredBy.length > 0) {
      fill('#27AE60');
      textSize(16);
      text('Both within: ' + coveredBy.join(', '), canvasWidth / 2, infoY + 80);
    }
  } else {
    noStroke();
    fill('#888');
    textAlign(CENTER, TOP);
    textSize(18);
    text('Click a mutation site on the gene to begin', canvasWidth / 2, infoY);
  }
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  // Check if a mutation was clicked
  for (let i = 0; i < mutations.length; i++) {
    let m = mutations[i];
    let x = geneLeft + m.pos * geneWidth;
    let d = dist(mouseX, mouseY, x, geneY);
    if (d < 14) {
      if (selectedMutations.length >= 2) {
        selectedMutations = [i];
      } else if (selectedMutations.indexOf(i) === -1) {
        selectedMutations.push(i);
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

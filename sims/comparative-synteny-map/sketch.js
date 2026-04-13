// Comparative Synteny Map MicroSim
// CANVAS_HEIGHT: 500
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;

// Synteny data: human chromosomes mapped to mouse chromosomes
// Each block: { humanStart, humanEnd, mouseChrom, mouseStart, mouseEnd, inverted, color, genes }
let syntenyData = {
  "Chr 1": [
    { humanStart: 0.0, humanEnd: 0.12, mouseChrom: "4", mouseStart: 0.0, mouseEnd: 0.15, inverted: false, color: [70, 130, 180], genes: ["SLC35A3", "DIRAS3", "ENO1"] },
    { humanStart: 0.12, humanEnd: 0.25, mouseChrom: "4", mouseStart: 0.15, mouseEnd: 0.30, inverted: true, color: [220, 90, 90], genes: ["NRAS", "ACADM", "MUTYH"] },
    { humanStart: 0.25, humanEnd: 0.40, mouseChrom: "1", mouseStart: 0.0, mouseEnd: 0.18, inverted: false, color: [60, 179, 113], genes: ["COL11A1", "CELSR2", "PCSK9"] },
    { humanStart: 0.40, humanEnd: 0.55, mouseChrom: "1", mouseStart: 0.18, mouseEnd: 0.35, inverted: false, color: [255, 165, 0], genes: ["REN", "SLC9A1", "TGFB2"] },
    { humanStart: 0.55, humanEnd: 0.70, mouseChrom: "3", mouseStart: 0.0, mouseEnd: 0.20, inverted: true, color: [147, 112, 219], genes: ["LMNA", "CRP", "IL6R"] },
    { humanStart: 0.70, humanEnd: 0.85, mouseChrom: "3", mouseStart: 0.20, mouseEnd: 0.40, inverted: false, color: [0, 191, 255], genes: ["FMO3", "CR1", "DAF"] },
    { humanStart: 0.85, humanEnd: 1.0, mouseChrom: "1", mouseStart: 0.35, mouseEnd: 0.50, inverted: false, color: [255, 215, 0], genes: ["RGS7", "OBSCN", "GBA"] }
  ],
  "Chr 2": [
    { humanStart: 0.0, humanEnd: 0.15, mouseChrom: "6", mouseStart: 0.0, mouseEnd: 0.18, inverted: false, color: [70, 130, 180], genes: ["MYCN", "ALK", "MSH6"] },
    { humanStart: 0.15, humanEnd: 0.30, mouseChrom: "6", mouseStart: 0.18, mouseEnd: 0.35, inverted: true, color: [220, 90, 90], genes: ["EPAS1", "REL", "BCL11A"] },
    { humanStart: 0.30, humanEnd: 0.45, mouseChrom: "1", mouseStart: 0.50, mouseEnd: 0.65, inverted: false, color: [60, 179, 113], genes: ["LCT", "GAD1", "ERBB4"] },
    { humanStart: 0.45, humanEnd: 0.60, mouseChrom: "12", mouseStart: 0.0, mouseEnd: 0.20, inverted: false, color: [255, 165, 0], genes: ["HOXD", "DLX1", "ITG4"] },
    { humanStart: 0.60, humanEnd: 0.78, mouseChrom: "12", mouseStart: 0.20, mouseEnd: 0.42, inverted: true, color: [147, 112, 219], genes: ["STAT1", "GRB14", "BIN1"] },
    { humanStart: 0.78, humanEnd: 1.0, mouseChrom: "1", mouseStart: 0.65, mouseEnd: 0.85, inverted: false, color: [0, 191, 255], genes: ["PAX3", "SCN1A", "HDAC4"] }
  ],
  "Chr 3": [
    { humanStart: 0.0, humanEnd: 0.14, mouseChrom: "9", mouseStart: 0.0, mouseEnd: 0.18, inverted: false, color: [70, 130, 180], genes: ["VHL", "FANCD2", "RAF1"] },
    { humanStart: 0.14, humanEnd: 0.28, mouseChrom: "9", mouseStart: 0.18, mouseEnd: 0.35, inverted: false, color: [60, 179, 113], genes: ["MITF", "CTNNB1", "SLC22A5"] },
    { humanStart: 0.28, humanEnd: 0.42, mouseChrom: "14", mouseStart: 0.0, mouseEnd: 0.20, inverted: true, color: [220, 90, 90], genes: ["FHIT", "FOXP1", "ROBO2"] },
    { humanStart: 0.42, humanEnd: 0.58, mouseChrom: "14", mouseStart: 0.20, mouseEnd: 0.40, inverted: false, color: [255, 165, 0], genes: ["ETV5", "PIK3CA", "SOX2"] },
    { humanStart: 0.58, humanEnd: 0.72, mouseChrom: "6", mouseStart: 0.35, mouseEnd: 0.55, inverted: false, color: [147, 112, 219], genes: ["FGFR3", "WHSC1", "CLOCK"] },
    { humanStart: 0.72, humanEnd: 0.86, mouseChrom: "3", mouseStart: 0.40, mouseEnd: 0.60, inverted: true, color: [0, 191, 255], genes: ["MME", "PLOD2", "CLCN2"] },
    { humanStart: 0.86, humanEnd: 1.0, mouseChrom: "16", mouseStart: 0.0, mouseEnd: 0.15, inverted: false, color: [255, 215, 0], genes: ["TP63", "FGF12", "CHMP2B"] }
  ],
  "Chr 7": [
    { humanStart: 0.0, humanEnd: 0.13, mouseChrom: "5", mouseStart: 0.0, mouseEnd: 0.15, inverted: false, color: [70, 130, 180], genes: ["ELN", "LIMK1", "CLIP2"] },
    { humanStart: 0.13, humanEnd: 0.28, mouseChrom: "5", mouseStart: 0.15, mouseEnd: 0.30, inverted: true, color: [220, 90, 90], genes: ["EGFR", "BRAF", "MET"] },
    { humanStart: 0.28, humanEnd: 0.42, mouseChrom: "6", mouseStart: 0.55, mouseEnd: 0.70, inverted: false, color: [60, 179, 113], genes: ["HOXA", "GLI3", "FOXP2"] },
    { humanStart: 0.42, humanEnd: 0.55, mouseChrom: "11", mouseStart: 0.0, mouseEnd: 0.18, inverted: false, color: [255, 165, 0], genes: ["SHH", "CFTR", "GCK"] },
    { humanStart: 0.55, humanEnd: 0.70, mouseChrom: "11", mouseStart: 0.18, mouseEnd: 0.38, inverted: true, color: [147, 112, 219], genes: ["KCNH2", "LEP", "NCAPG2"] },
    { humanStart: 0.70, humanEnd: 0.85, mouseChrom: "5", mouseStart: 0.30, mouseEnd: 0.48, inverted: false, color: [0, 191, 255], genes: ["CAV1", "TES", "POT1"] },
    { humanStart: 0.85, humanEnd: 1.0, mouseChrom: "6", mouseStart: 0.70, mouseEnd: 0.85, inverted: false, color: [255, 215, 0], genes: ["SHE", "CDK5", "PRKAG2"] }
  ],
  "Chr 17": [
    { humanStart: 0.0, humanEnd: 0.15, mouseChrom: "11", mouseStart: 0.38, mouseEnd: 0.55, inverted: false, color: [70, 130, 180], genes: ["TP53", "MYH", "MAP2K4"] },
    { humanStart: 0.15, humanEnd: 0.30, mouseChrom: "11", mouseStart: 0.55, mouseEnd: 0.72, inverted: false, color: [60, 179, 113], genes: ["FLCN", "BRCA1", "RNF43"] },
    { humanStart: 0.30, humanEnd: 0.45, mouseChrom: "11", mouseStart: 0.72, mouseEnd: 0.88, inverted: true, color: [220, 90, 90], genes: ["NF1", "SUZ12", "EVI2A"] },
    { humanStart: 0.45, humanEnd: 0.60, mouseChrom: "11", mouseStart: 0.88, mouseEnd: 1.0, inverted: false, color: [255, 165, 0], genes: ["ERBB2", "CDK12", "GRB7"] },
    { humanStart: 0.60, humanEnd: 0.78, mouseChrom: "10", mouseStart: 0.0, mouseEnd: 0.22, inverted: false, color: [147, 112, 219], genes: ["ACE", "PRKAR1A", "MAPT"] },
    { humanStart: 0.78, humanEnd: 1.0, mouseChrom: "10", mouseStart: 0.22, mouseEnd: 0.42, inverted: true, color: [0, 191, 255], genes: ["GH1", "TBX2", "ACTG1"] }
  ]
};

let chromSelect;
let hoveredBlock = null;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Dropdown control
  chromSelect = createSelect();
  chromSelect.parent(document.querySelector('main'));
  let keys = Object.keys(syntenyData);
  for (let k of keys) {
    chromSelect.option(k);
  }
  chromSelect.style('font-size', '16px');
  chromSelect.style('padding', '4px 8px');
}

function draw() {
  background(255);

  // Draw region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, width, drawHeight);

  // Control region
  fill('white');
  noStroke();
  rect(0, drawHeight, width, controlHeight);

  // Position dropdown
  fill(30);
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Human Chromosome:", 10, drawHeight + controlHeight / 2);
  chromSelect.position(185, drawHeight + 12);

  // Title
  fill(30);
  textSize(24);
  textAlign(CENTER, TOP);
  text("Comparative Synteny Map: Human vs Mouse", width / 2, 10);

  let selectedChrom = chromSelect.value();
  let blocks = syntenyData[selectedChrom];
  if (!blocks) return;

  // Layout constants
  let topMargin = 50;
  let bottomMargin = 20;
  let chromH = drawHeight - topMargin - bottomMargin - 20;
  let chromW = 36;
  let humanX = width * 0.15;

  // Collect unique mouse chromosomes
  let mouseChromSet = [];
  for (let b of blocks) {
    if (mouseChromSet.indexOf(b.mouseChrom) === -1) {
      mouseChromSet.push(b.mouseChrom);
    }
  }

  // Position mouse chromosomes on right side
  let mouseStartX = width * 0.55;
  let mouseEndX = width * 0.92;
  let mouseSpacing = mouseChromSet.length > 1
    ? (mouseEndX - mouseStartX) / (mouseChromSet.length - 1)
    : 0;
  let mousePositions = {};
  for (let i = 0; i < mouseChromSet.length; i++) {
    mousePositions[mouseChromSet[i]] = mouseChromSet.length === 1
      ? (mouseStartX + mouseEndX) / 2
      : mouseStartX + i * mouseSpacing;
  }

  let hy = topMargin + 20;

  // Draw human chromosome
  drawChromBar(humanX - chromW / 2, hy, chromW, chromH, "Human " + selectedChrom);

  // Draw mouse chromosomes
  for (let mc of mouseChromSet) {
    let mx = mousePositions[mc];
    drawChromBar(mx - chromW / 2, hy, chromW, chromH, "Mouse Chr " + mc);
  }

  // Draw syntenic ribbons and colored segments
  hoveredBlock = null;
  for (let b of blocks) {
    let hy1 = hy + b.humanStart * chromH;
    let hy2 = hy + b.humanEnd * chromH;
    let mx = mousePositions[b.mouseChrom];
    let my1 = hy + b.mouseStart * chromH;
    let my2 = hy + b.mouseEnd * chromH;
    let c = b.color;

    let hovered = isOverRibbon(humanX + chromW / 2, hy1, hy2, mx - chromW / 2, my1, my2);
    if (hovered) hoveredBlock = b;
    let alpha = hovered ? 200 : 100;

    // Ribbon
    if (b.inverted) {
      drawInvertedRibbon(humanX + chromW / 2, hy1, hy2, mx - chromW / 2, my1, my2, c, alpha);
    } else {
      drawRibbon(humanX + chromW / 2, hy1, hy2, mx - chromW / 2, my1, my2, c, alpha);
    }

    // Colored segments on human chromosome
    noStroke();
    fill(c[0], c[1], c[2], 180);
    rect(humanX - chromW / 2, hy1, chromW, hy2 - hy1);

    // Colored segments on mouse chromosome
    fill(c[0], c[1], c[2], 180);
    rect(mx - chromW / 2, my1, chromW, my2 - my1);

    // Inversion X marks on chromosome segments
    if (b.inverted) {
      stroke(160, 30, 30);
      strokeWeight(2);
      let mH = (hy1 + hy2) / 2;
      let sH = (hy2 - hy1) * 0.25;
      line(humanX - chromW / 2 + 4, mH - sH, humanX + chromW / 2 - 4, mH + sH);
      line(humanX - chromW / 2 + 4, mH + sH, humanX + chromW / 2 - 4, mH - sH);

      let mM = (my1 + my2) / 2;
      let sM = (my2 - my1) * 0.25;
      line(mx - chromW / 2 + 4, mM - sM, mx + chromW / 2 - 4, mM + sM);
      line(mx - chromW / 2 + 4, mM + sM, mx + chromW / 2 - 4, mM - sM);
      strokeWeight(1);
    }
  }

  // Legend
  drawLegend(10, drawHeight - 65);

  // Info box on hover
  if (hoveredBlock) {
    drawInfoBox(mouseX, mouseY, hoveredBlock);
  }
}

function drawChromBar(x, y, w, h, label) {
  let r = w / 2;
  stroke(60);
  strokeWeight(1.5);
  fill(235, 235, 240);

  // Rounded rectangle for chromosome shape
  rect(x, y, w, h, r, r, r, r);

  // Centromere pinch
  let centY = y + h * 0.38;
  noFill();
  stroke(80);
  strokeWeight(1);
  beginShape();
  vertex(x, centY - 2);
  vertex(x + w / 2, centY + 3);
  vertex(x + w, centY - 2);
  endShape();
  beginShape();
  vertex(x, centY + 2);
  vertex(x + w / 2, centY - 3);
  vertex(x + w, centY + 2);
  endShape();

  // Label above
  noStroke();
  fill(30);
  textSize(16);
  textAlign(CENTER, BOTTOM);
  text(label, x + w / 2, y - 4);
  strokeWeight(1);
}

function drawRibbon(x1, y1t, y1b, x2, y2t, y2b, c, alpha) {
  noStroke();
  fill(c[0], c[1], c[2], alpha);
  beginShape();
  vertex(x1, y1t);
  bezierVertex(x1 + (x2 - x1) * 0.4, y1t, x2 - (x2 - x1) * 0.4, y2t, x2, y2t);
  vertex(x2, y2b);
  bezierVertex(x2 - (x2 - x1) * 0.4, y2b, x1 + (x2 - x1) * 0.4, y1b, x1, y1b);
  endShape(CLOSE);

  // Edge lines
  stroke(c[0], c[1], c[2], min(alpha + 50, 255));
  strokeWeight(0.7);
  noFill();
  beginShape();
  vertex(x1, y1t);
  bezierVertex(x1 + (x2 - x1) * 0.4, y1t, x2 - (x2 - x1) * 0.4, y2t, x2, y2t);
  endShape();
  beginShape();
  vertex(x1, y1b);
  bezierVertex(x1 + (x2 - x1) * 0.4, y1b, x2 - (x2 - x1) * 0.4, y2b, x2, y2b);
  endShape();
  strokeWeight(1);
}

function drawInvertedRibbon(x1, y1t, y1b, x2, y2t, y2b, c, alpha) {
  // Crossed ribbon: human top -> mouse bottom, human bottom -> mouse top
  noStroke();
  fill(c[0], c[1], c[2], alpha);
  beginShape();
  vertex(x1, y1t);
  bezierVertex(x1 + (x2 - x1) * 0.4, y1t, x2 - (x2 - x1) * 0.4, y2b, x2, y2b);
  vertex(x2, y2t);
  bezierVertex(x2 - (x2 - x1) * 0.4, y2t, x1 + (x2 - x1) * 0.4, y1b, x1, y1b);
  endShape(CLOSE);

  // Dashed center line indicating twist
  stroke(c[0] * 0.5, c[1] * 0.5, c[2] * 0.5, min(alpha + 80, 255));
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  let midY1 = (y1t + y1b) / 2;
  let midY2 = (y2t + y2b) / 2;
  line(x1, midY1, x2, midY2);
  drawingContext.setLineDash([]);
  strokeWeight(1);
}

function isOverRibbon(x1, y1t, y1b, x2, y2t, y2b) {
  let minX = min(x1, x2);
  let maxX = max(x1, x2);
  let minY = min(y1t, y2t, y2b) - 5;
  let maxY = max(y1b, y2t, y2b) + 5;
  if (mouseX < minX || mouseX > maxX || mouseY < minY || mouseY > maxY) return false;

  let t = constrain((mouseX - x1) / (x2 - x1), 0, 1);
  let topY = lerp(y1t, min(y2t, y2b), t);
  let botY = lerp(y1b, max(y2t, y2b), t);
  return mouseY >= topY - 8 && mouseY <= botY + 8;
}

function drawInfoBox(mx, my, block) {
  let boxW = 220;
  let lineH = 20;
  let boxH = 76 + block.genes.length * lineH;

  let bx = mx + 15;
  let by = my - boxH / 2;
  if (bx + boxW > width) bx = mx - boxW - 15;
  if (by < 5) by = 5;
  if (by + boxH > drawHeight - 5) by = drawHeight - boxH - 5;

  // Shadow
  noStroke();
  fill(0, 0, 0, 35);
  rect(bx + 3, by + 3, boxW, boxH, 8);

  // Background
  fill(255, 255, 248);
  stroke(80);
  strokeWeight(1.5);
  rect(bx, by, boxW, boxH, 8);

  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  let ty = by + 10;

  textSize(16);
  textStyle(BOLD);
  text("Mouse Chr " + block.mouseChrom, bx + 10, ty);
  ty += 22;

  textStyle(NORMAL);
  if (block.inverted) {
    fill(170, 30, 30);
    text("Inverted block", bx + 10, ty);
  } else {
    fill(40, 120, 40);
    text("Conserved block", bx + 10, ty);
  }
  ty += 24;

  fill(30);
  textStyle(BOLD);
  text("Genes:", bx + 10, ty);
  ty += 20;

  textStyle(NORMAL);
  textSize(16);
  for (let g of block.genes) {
    fill(50, 50, 140);
    text("\u2022 " + g, bx + 14, ty);
    ty += lineH;
  }
  textStyle(NORMAL);
  strokeWeight(1);
}

function drawLegend(lx, ly) {
  noStroke();
  fill(255, 255, 255, 230);
  rect(lx, ly, 275, 55, 6);
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(lx, ly, 275, 55, 6);

  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);

  // Conserved
  fill(70, 130, 180, 140);
  rect(lx + 10, ly + 8, 28, 14, 3);
  fill(30);
  text("Conserved block", lx + 46, ly + 15);

  // Inverted
  fill(220, 90, 90, 140);
  rect(lx + 10, ly + 30, 28, 14, 3);
  stroke(160, 30, 30);
  strokeWeight(1.5);
  line(lx + 13, ly + 33, lx + 35, ly + 41);
  line(lx + 13, ly + 41, lx + 35, ly + 33);
  strokeWeight(1);
  noStroke();
  fill(30);
  text("Inverted block", lx + 46, ly + 37);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const main = document.querySelector('main');
  containerWidth = main ? main.offsetWidth : windowWidth;
}

// Gene Discovery Workflow Pipeline
// CANVAS_HEIGHT: 510
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let canvasWidth;

// Pathway data
let currentPathway = 'positional';
let selectedNode = -1;
let animProgress = 0;
let timelineProgress = 0;
let timelineAnimating = false;

let positionalBtn, candidateBtn, resetBtn;

const positionalSteps = [
  {
    label: 'Observe\nPhenotype',
    detail: 'Identify heritable trait of interest',
    example: 'Cystic fibrosis: thick mucus, lung infections',
    technique: 'Clinical observation & pedigree analysis',
    timeline: '0-6 months',
    color: '#4A90D9'
  },
  {
    label: 'Linkage\nMapping',
    detail: 'Map trait to chromosomal region using markers',
    example: 'CF mapped to chromosome 7q31 via RFLPs',
    technique: 'LOD score analysis with polymorphic markers',
    timeline: '6-18 months',
    color: '#5BA55B'
  },
  {
    label: 'Fine\nMapping',
    detail: 'Narrow candidate region with more markers',
    example: 'Region narrowed to ~500 kb interval',
    technique: 'Recombination breakpoint analysis',
    timeline: '12-24 months',
    color: '#D4A843'
  },
  {
    label: 'Physical\nMapping',
    detail: 'Build contig map of candidate region',
    example: 'Overlapping BAC/YAC clones assembled',
    technique: 'Chromosome walking & jumping',
    timeline: '18-36 months',
    color: '#D97B4A'
  },
  {
    label: 'Gene\nIdentification',
    detail: 'Find genes within the mapped interval',
    example: 'CFTR gene identified among candidate genes',
    technique: 'Exon trapping, CpG island analysis, cDNA selection',
    timeline: '24-42 months',
    color: '#C75A8A'
  },
  {
    label: 'Mutation\nValidation',
    detail: 'Confirm causative mutations in affected individuals',
    example: 'ΔF508 deletion found in 70% of CF alleles',
    technique: 'Sequencing, functional assays, animal models',
    timeline: '30-48 months',
    color: '#7B5EC6'
  }
];

const candidateSteps = [
  {
    label: 'Observe\nPhenotype',
    detail: 'Identify heritable trait with known biology',
    example: 'Sickle cell disease: abnormal hemoglobin',
    technique: 'Clinical observation & biochemical analysis',
    timeline: '0-3 months',
    color: '#4A90D9'
  },
  {
    label: 'Biological\nHypothesis',
    detail: 'Propose candidate genes based on function',
    example: 'Hemoglobin genes as candidates for SCD',
    technique: 'Literature review, pathway analysis',
    timeline: '1-4 months',
    color: '#5BA55B'
  },
  {
    label: 'Expression\nAnalysis',
    detail: 'Check if candidate expressed in relevant tissue',
    example: 'HBB highly expressed in erythroid cells',
    technique: 'RNA-seq, Northern blot, in situ hybridization',
    timeline: '2-8 months',
    color: '#D4A843'
  },
  {
    label: 'Association\nStudy',
    detail: 'Test statistical association with phenotype',
    example: 'HBB variants strongly associated with SCD',
    technique: 'Case-control GWAS, TDT, chi-square tests',
    timeline: '4-12 months',
    color: '#D97B4A'
  },
  {
    label: 'Sequence\nVariants',
    detail: 'Identify specific mutations in candidate gene',
    example: 'Glu6Val (E6V) mutation in HBB gene',
    technique: 'Sanger sequencing, targeted resequencing',
    timeline: '6-14 months',
    color: '#C75A8A'
  },
  {
    label: 'Functional\nValidation',
    detail: 'Prove variant causes phenotype experimentally',
    example: 'E6V causes hemoglobin polymerization in vitro',
    technique: 'Transgenic models, cell assays, protein studies',
    timeline: '10-20 months',
    color: '#7B5EC6'
  }
];

function getSteps() {
  return currentPathway === 'positional' ? positionalSteps : candidateSteps;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  canvasWidth = container ? container.offsetWidth : windowWidth;
  canvasHeight = drawHeight + controlHeight;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  positionalBtn = createButton('Positional Cloning');
  positionalBtn.parent(document.querySelector('main'));
  positionalBtn.mousePressed(() => {
    currentPathway = 'positional';
    selectedNode = -1;
    positionalBtn.style('background-color', '#4A90D9');
    positionalBtn.style('color', 'white');
    candidateBtn.style('background-color', '#e0e0e0');
    candidateBtn.style('color', '#333');
    startTimeline();
  });
  positionalBtn.style('font-size', '16px');
  positionalBtn.style('padding', '8px 16px');
  positionalBtn.style('margin-right', '8px');
  positionalBtn.style('border', 'none');
  positionalBtn.style('border-radius', '6px');
  positionalBtn.style('cursor', 'pointer');
  positionalBtn.style('background-color', '#4A90D9');
  positionalBtn.style('color', 'white');

  candidateBtn = createButton('Candidate Gene');
  candidateBtn.parent(document.querySelector('main'));
  candidateBtn.mousePressed(() => {
    currentPathway = 'candidate';
    selectedNode = -1;
    candidateBtn.style('background-color', '#5BA55B');
    candidateBtn.style('color', 'white');
    positionalBtn.style('background-color', '#e0e0e0');
    positionalBtn.style('color', '#333');
    startTimeline();
  });
  candidateBtn.style('font-size', '16px');
  candidateBtn.style('padding', '8px 16px');
  candidateBtn.style('margin-right', '8px');
  candidateBtn.style('border', 'none');
  candidateBtn.style('border-radius', '6px');
  candidateBtn.style('cursor', 'pointer');
  candidateBtn.style('background-color', '#e0e0e0');
  candidateBtn.style('color', '#333');

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => {
    selectedNode = -1;
    startTimeline();
  });
  resetBtn.style('font-size', '16px');
  resetBtn.style('padding', '8px 16px');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '6px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('background-color', '#e0e0e0');
  resetBtn.style('color', '#333');

  startTimeline();
}

function startTimeline() {
  timelineProgress = 0;
  timelineAnimating = true;
}

function draw() {
  // Draw region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Position buttons
  let btnY = drawHeight + 15;
  let btnX = 20;
  positionalBtn.position(canvasWidth > 600 ? btnX : 10, btnY);
  candidateBtn.position(canvasWidth > 600 ? btnX + 185 : 10 + 165, btnY);
  resetBtn.position(canvasWidth > 600 ? btnX + 350 : 10 + 310, btnY);

  // Animate timeline
  if (timelineAnimating) {
    timelineProgress += 0.008;
    if (timelineProgress >= 1) {
      timelineProgress = 1;
      timelineAnimating = false;
    }
  }

  // Title
  noStroke();
  fill('#333');
  textAlign(CENTER, CENTER);
  textSize(24);
  let titleText = currentPathway === 'positional'
    ? 'Positional Cloning Pathway'
    : 'Candidate Gene Pathway';
  text(titleText, canvasWidth / 2, 28);

  // Subtitle
  textSize(16);
  fill('#666');
  let subtitleText = currentPathway === 'positional'
    ? 'Map first, then find the gene (e.g., Cystic Fibrosis)'
    : 'Hypothesize gene first, then confirm (e.g., Sickle Cell)';
  text(subtitleText, canvasWidth / 2, 54);

  drawFlowchart();
  drawTimelineBar();

  if (selectedNode >= 0) {
    drawDetailPanel();
  }
}

function drawFlowchart() {
  let steps = getSteps();
  let numSteps = steps.length;
  let margin = 40;
  let availW = canvasWidth - margin * 2;
  let nodeW = min(130, availW / numSteps - 20);
  let nodeH = 65;
  let spacing = availW / numSteps;
  let baseY = 120;

  // How many nodes to show based on animation
  let visibleCount = floor(timelineProgress * numSteps * 1.5);
  visibleCount = min(visibleCount, numSteps);

  for (let i = 0; i < numSteps; i++) {
    let cx = margin + spacing * i + spacing / 2;
    let cy = baseY;
    let nodeAlpha = i < visibleCount ? 255 : 50;

    // Draw connecting arrow to next node
    if (i < numSteps - 1) {
      let nextCx = margin + spacing * (i + 1) + spacing / 2;
      let arrowAlpha = (i + 1) < visibleCount ? 200 : 40;
      stroke(150, 150, 150, arrowAlpha);
      strokeWeight(2);
      let arrowStartX = cx + nodeW / 2 + 2;
      let arrowEndX = nextCx - nodeW / 2 - 2;
      line(arrowStartX, cy, arrowEndX, cy);
      // Arrowhead
      fill(150, 150, 150, arrowAlpha);
      noStroke();
      triangle(
        arrowEndX, cy,
        arrowEndX - 8, cy - 5,
        arrowEndX - 8, cy + 5
      );
    }

    // Draw step number circle
    let numAlpha = i < visibleCount ? 220 : 40;
    let c = color(steps[i].color);
    c.setAlpha(numAlpha);
    fill(c);
    noStroke();
    ellipse(cx, cy - nodeH / 2 - 14, 24, 24);
    fill(255, 255, 255, numAlpha);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(i + 1, cx, cy - nodeH / 2 - 15);
    textStyle(NORMAL);

    // Node rectangle
    let isSelected = (selectedNode === i);
    let nodeFill = isSelected ? color(steps[i].color) : color(255, 255, 255, nodeAlpha);
    let nodeStrokeCol = color(steps[i].color);
    nodeStrokeCol.setAlpha(nodeAlpha);

    fill(nodeFill);
    stroke(nodeStrokeCol);
    strokeWeight(isSelected ? 3 : 2);
    rectMode(CENTER);
    rect(cx, cy, nodeW, nodeH, 10);
    rectMode(CORNER);

    // Node label
    let labelColor = isSelected ? color(255) : color(50, 50, 50, nodeAlpha);
    fill(labelColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(max(13, min(16, nodeW / 8)));
    let lines = steps[i].label.split('\n');
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], cx, cy - 8 + j * 18);
    }

    // Store node bounds for click detection
    steps[i]._cx = cx;
    steps[i]._cy = cy;
    steps[i]._w = nodeW;
    steps[i]._h = nodeH;
  }
}

function drawTimelineBar() {
  let steps = getSteps();
  let barX = 60;
  let barY = drawHeight - 35;
  let barW = canvasWidth - 120;
  let barH = 16;

  // Label
  noStroke();
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Timeline:', barX - 55, barY);

  // Background bar
  fill('#ddd');
  noStroke();
  rect(barX, barY - barH / 2, barW, barH, barH / 2);

  // Colored segments based on steps
  let numSteps = steps.length;
  let segW = barW / numSteps;
  for (let i = 0; i < numSteps; i++) {
    let progress = min(1, max(0, timelineProgress * numSteps - i));
    if (progress > 0) {
      let c = color(steps[i].color);
      c.setAlpha(200);
      fill(c);
      noStroke();
      if (i === 0) {
        rect(barX + segW * i, barY - barH / 2, segW * progress, barH, barH / 2, 0, 0, barH / 2);
      } else if (i === numSteps - 1 && progress >= 1) {
        rect(barX + segW * i, barY - barH / 2, segW * progress, barH, 0, barH / 2, barH / 2, 0);
      } else {
        rect(barX + segW * i, barY - barH / 2, segW * progress, barH);
      }
    }
  }

  // Time labels
  textSize(14);
  fill('#777');
  textAlign(LEFT, CENTER);
  text('0 mo', barX, barY + 16);
  textAlign(RIGHT, CENTER);
  let maxTime = currentPathway === 'positional' ? '48 mo' : '20 mo';
  text(maxTime, barX + barW, barY + 16);
  textAlign(CENTER, CENTER);
  fill('#555');
  textSize(14);
  let midLabel = currentPathway === 'positional' ? '~4 years total' : '~1.5 years total';
  text(midLabel, barX + barW / 2, barY + 16);
}

function drawDetailPanel() {
  let steps = getSteps();
  let step = steps[selectedNode];
  let panelW = min(420, canvasWidth - 60);
  let panelH = 175;
  let panelX = canvasWidth / 2 - panelW / 2;
  let panelY = 170;

  // Shadow
  noStroke();
  fill(0, 0, 0, 30);
  rect(panelX + 4, panelY + 4, panelW, panelH, 12);

  // Panel background
  fill(255, 255, 255, 245);
  stroke(step.color);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 12);

  // Close hint
  fill('#999');
  noStroke();
  textAlign(RIGHT, TOP);
  textSize(14);
  text('click to close', panelX + panelW - 10, panelY + 8);

  // Title
  fill(step.color);
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  let title = step.label.replace('\n', ' ');
  text('Step ' + (selectedNode + 1) + ': ' + title, panelX + 16, panelY + 12);
  textStyle(NORMAL);

  // Content
  let contentX = panelX + 16;
  let contentY = panelY + 38;
  let lineH = 28;
  textSize(16);

  fill('#444');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Description: ', contentX, contentY);
  textStyle(NORMAL);
  fill('#333');
  text(step.detail, contentX + 105, contentY);

  contentY += lineH;
  fill('#444');
  textStyle(BOLD);
  text('Example: ', contentX, contentY);
  textStyle(NORMAL);
  fill('#333');
  let exampleText = step.example;
  text(exampleText, contentX + 80, contentY, panelW - 100, 40);

  contentY += lineH + 10;
  fill('#444');
  textStyle(BOLD);
  text('Technique: ', contentX, contentY);
  textStyle(NORMAL);
  fill('#333');
  text(step.technique, contentX + 95, contentY, panelW - 115, 40);

  contentY += lineH + 10;
  fill(step.color);
  textStyle(BOLD);
  textSize(16);
  text('Timeline: ' + step.timeline, contentX, contentY);
  textStyle(NORMAL);
}

function mousePressed() {
  let steps = getSteps();

  // Check if clicking on the detail panel to close it
  if (selectedNode >= 0) {
    let panelW = min(420, canvasWidth - 60);
    let panelH = 175;
    let panelX = canvasWidth / 2 - panelW / 2;
    let panelY = 170;
    if (mouseX >= panelX && mouseX <= panelX + panelW &&
        mouseY >= panelY && mouseY <= panelY + panelH) {
      selectedNode = -1;
      return;
    }
  }

  // Check node clicks
  for (let i = 0; i < steps.length; i++) {
    let s = steps[i];
    if (s._cx !== undefined) {
      let halfW = s._w / 2 + 5;
      let halfH = s._h / 2 + 5;
      if (mouseX >= s._cx - halfW && mouseX <= s._cx + halfW &&
          mouseY >= s._cy - halfH && mouseY <= s._cy + halfH) {
        selectedNode = (selectedNode === i) ? -1 : i;
        return;
      }
    }
  }

  // Click elsewhere closes panel
  selectedNode = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  canvasWidth = container ? container.offsetWidth : windowWidth;
  canvasHeight = drawHeight + controlHeight;
}

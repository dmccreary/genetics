// DTC Genetic Testing Decision Flow
// CANVAS_HEIGHT: 560
let drawHeight = 500;
let controlHeight = 60;
let canvasWidth, canvasHeight;

// Node data structure
let nodes = [];
let edges = [];
let selectedNode = null;
let scrollY = 0;
let maxScrollY = 0;
let resetBtn;

// Color palette
const COLORS = {
  info: { bg: '#d0e8ff', border: '#4a90d9', text: '#1a3a6b' },
  positive: { bg: '#d4edda', border: '#28a745', text: '#155724' },
  caution: { bg: '#fff3cd', border: '#e0a800', text: '#856404' },
  concerning: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' },
  root: { bg: '#e8d5f5', border: '#7b2d8e', text: '#4a1a5e' }
};

function buildTree() {
  nodes = [];
  edges = [];

  // Root node
  addNode('root', 'Considering a DTC\nGenetic Test?', 0, 0, 'root',
    'Direct-to-consumer (DTC) genetic tests analyze your DNA from a saliva or cheek swab sample. Before purchasing, consider your purpose, key questions to ask, and how to handle different outcomes.');

  // Level 1: Purpose branches
  addNode('ancestry', 'Ancestry &\nEthnicity', -3, 1, 'info',
    'Ancestry tests compare your DNA to reference populations worldwide. They can reveal geographic origins and connect you with genetic relatives. Results vary between companies due to different reference databases.');
  addNode('health', 'Health Risk\nReports', -1, 1, 'caution',
    'Health risk tests look for genetic variants associated with conditions like Alzheimer\'s or celiac disease. These show predisposition, NOT diagnosis. Most conditions involve multiple genes plus environmental factors.');
  addNode('carrier', 'Carrier\nScreening', 1, 1, 'info',
    'Carrier tests check if you carry one copy of a recessive gene variant (like cystic fibrosis or sickle cell). Carriers are typically unaffected but could pass the variant to children if both parents are carriers.');
  addNode('pharma', 'Pharmaco-\ngenomics', 3, 1, 'info',
    'Pharmacogenomic tests examine how your genes affect drug metabolism. Results may indicate if you metabolize certain medications faster or slower than average, potentially affecting dosage needs.');

  // Level 2: Key questions
  addNode('privacy', 'Privacy &\nData Sharing', -3, 2, 'caution',
    'Key questions: Who owns your genetic data? Can the company share it with third parties? Can you delete your data later? Some companies sell de-identified data to pharmaceutical companies for research.');
  addNode('validity', 'Test Validity &\nAccuracy', -1, 2, 'caution',
    'DTC tests use genotyping chips, not full genome sequencing. They test only selected variants and may miss others. FDA authorization covers only specific health reports. Always confirm significant findings with clinical-grade testing.');
  addNode('sample', 'Sample\nHandling', 1, 2, 'info',
    'Your DNA sample is typically processed in a CLIA-certified lab. Ask: Is your sample destroyed after testing? How long is DNA stored? Can law enforcement access your sample? Some companies retain samples indefinitely.');
  addNode('access', 'Who Has\nAccess?', 3, 2, 'concerning',
    'Consider: Family members share your DNA -- your results reveal information about relatives who did not consent. Genetic data could theoretically affect insurance (GINA protects health insurance but NOT life, disability, or long-term care insurance).');

  // Level 3: Outcomes
  addNode('reassuring', 'Reassuring\nResults', -2, 3, 'positive',
    'Low-risk results can provide peace of mind, but remember: DTC tests screen only selected variants. A "negative" result does not mean zero risk. Your family history remains an important risk factor regardless of DTC results.');
  addNode('uncertain', 'Uncertain or\nVariants of Unknown\nSignificance', 0, 3, 'caution',
    'You may receive results labeled "variant of uncertain significance" (VUS). Science has not yet determined if these variants affect health. These results can cause anxiety without providing actionable information.');
  addNode('unexpected', 'Unexpected\nFindings', 2, 3, 'concerning',
    'Possible surprises: non-paternity events, unknown siblings, unexpected ancestry, or increased disease risk. These discoveries can have profound emotional and family impacts. Consider if you are prepared for any result.');

  // Level 4: Next steps
  addNode('noaction', 'No Action\nNeeded', -3, 4, 'positive',
    'If results are straightforward and expected, you may simply file them for reference. Keep your raw data download in a secure location. Revisit periodically as scientific understanding of variants evolves.');
  addNode('counselor', 'Consult a Genetic\nCounselor', 0, 4, 'info',
    'A certified genetic counselor can interpret complex results, explain inheritance patterns, assess family risk, and help you make informed medical decisions. Find one at nsgc.org or ask your healthcare provider for a referral.');
  addNode('provider', 'Discuss with\nHealthcare Provider', 3, 4, 'info',
    'Share relevant results with your doctor, especially pharmacogenomic findings that might affect prescriptions. Clinical confirmation testing may be recommended before any medical decisions are made based on DTC results.');

  // Edges from root to purpose
  addEdge('root', 'ancestry');
  addEdge('root', 'health');
  addEdge('root', 'carrier');
  addEdge('root', 'pharma');

  // Edges from purpose to key questions
  addEdge('ancestry', 'privacy');
  addEdge('health', 'validity');
  addEdge('carrier', 'sample');
  addEdge('pharma', 'access');

  // Cross-links (key questions apply broadly)
  addEdge('ancestry', 'sample');
  addEdge('health', 'privacy');

  // Edges from key questions to outcomes
  addEdge('privacy', 'reassuring');
  addEdge('validity', 'uncertain');
  addEdge('sample', 'reassuring');
  addEdge('access', 'unexpected');
  addEdge('validity', 'reassuring');
  addEdge('privacy', 'unexpected');

  // Edges from outcomes to next steps
  addEdge('reassuring', 'noaction');
  addEdge('reassuring', 'counselor');
  addEdge('uncertain', 'counselor');
  addEdge('unexpected', 'counselor');
  addEdge('unexpected', 'provider');
  addEdge('uncertain', 'provider');
}

function addNode(id, label, col, row, colorType, detail) {
  nodes.push({ id, label, col, row, colorType, detail, x: 0, y: 0, w: 0, h: 0 });
}

function addEdge(fromId, toId) {
  edges.push({ from: fromId, to: toId });
}

function layoutNodes() {
  let marginX = 60;
  let marginTop = 60;
  let rowSpacing = 100;
  let nodeW = 140;
  let nodeH = 52;
  let usableWidth = canvasWidth - marginX * 2;

  // Find the range of columns per row
  let rows = {};
  for (let n of nodes) {
    if (!rows[n.row]) rows[n.row] = [];
    rows[n.row].push(n);
  }

  for (let r in rows) {
    let rowNodes = rows[r];
    let count = rowNodes.length;
    // Sort by col
    rowNodes.sort((a, b) => a.col - b.col);
    let spacing = usableWidth / (count + 1);
    for (let i = 0; i < count; i++) {
      let nd = rowNodes[i];
      nd.x = marginX + spacing * (i + 1);
      nd.y = marginTop + nd.row * rowSpacing;
      nd.w = nodeW;
      nd.h = nodeH;
    }
  }

  // Calculate max scroll needed
  let maxY = 0;
  for (let n of nodes) {
    let bottom = n.y + n.h + 20;
    if (bottom > maxY) maxY = bottom;
  }
  maxScrollY = max(0, maxY - drawHeight + 40);
}

function findNode(id) {
  return nodes.find(n => n.id === id);
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

  buildTree();
  layoutNodes();

  resetBtn = createButton('Reset View');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetView);
  resetBtn.style('font-size', '16px');
  resetBtn.style('padding', '6px 18px');
  resetBtn.style('margin', '8px 4px');
  resetBtn.style('cursor', 'pointer');
}

function resetView() {
  selectedNode = null;
  scrollY = 0;
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
  fill('#1a3a6b');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  textStyle(BOLD);
  text('DTC Genetic Testing Decision Flow', canvasWidth / 2, 10 - scrollY);
  textStyle(NORMAL);

  // Clip to draw region
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, canvasWidth, drawHeight);
  drawingContext.clip();

  push();
  translate(0, -scrollY);

  // Draw edges
  strokeWeight(1.5);
  for (let e of edges) {
    let fromN = findNode(e.from);
    let toN = findNode(e.to);
    if (fromN && toN) {
      let c = COLORS[fromN.colorType] || COLORS.info;
      stroke(c.border + '88');
      noFill();
      let x1 = fromN.x;
      let y1 = fromN.y + fromN.h / 2;
      let x2 = toN.x;
      let y2 = toN.y - toN.h / 2;
      // Draw curved line
      bezier(x1, y1, x1, y1 + 30, x2, y2 - 30, x2, y2);
    }
  }

  // Draw nodes
  for (let n of nodes) {
    drawNode(n);
  }

  pop();
  drawingContext.restore();

  // Draw detail panel if a node is selected
  if (selectedNode) {
    drawDetailPanel(selectedNode);
  }

  // Scroll indicator
  if (maxScrollY > 0) {
    let barH = drawHeight * (drawHeight / (drawHeight + maxScrollY));
    let barY = (scrollY / maxScrollY) * (drawHeight - barH);
    fill(180, 180, 180, 120);
    noStroke();
    rect(canvasWidth - 8, barY, 6, barH, 3);
  }

  // Instructions in control area
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  let instrText = selectedNode ? 'Click a node or background to navigate. Scroll to pan.' : 'Click any node to see details. Scroll to pan the view.';
  text(instrText, 10, drawHeight + controlHeight / 2);
}

function drawNode(n) {
  let c = COLORS[n.colorType] || COLORS.info;
  let isSelected = selectedNode && selectedNode.id === n.id;
  let isHovered = isMouseOverNode(n);

  // Shadow for hovered
  if (isHovered || isSelected) {
    fill(0, 0, 0, 30);
    noStroke();
    rect(n.x - n.w / 2 + 3, n.y - n.h / 2 + 3, n.w, n.h, 10);
  }

  // Node body
  fill(c.bg);
  stroke(c.border);
  strokeWeight(isSelected ? 3 : isHovered ? 2.5 : 1.5);
  rect(n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, 10);

  // Label
  fill(c.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);

  let lines = n.label.split('\n');
  let lineH = 16;
  let startY = n.y - (lines.length - 1) * lineH / 2;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], n.x, startY + i * lineH);
  }
  textStyle(NORMAL);
}

function drawDetailPanel(n) {
  let c = COLORS[n.colorType] || COLORS.info;
  let panelW = min(canvasWidth - 40, 500);
  let panelX = canvasWidth / 2 - panelW / 2;
  let panelY = drawHeight / 2 - 100;
  let panelH = 200;

  // Semi-transparent overlay
  fill(0, 0, 0, 80);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Panel shadow
  fill(0, 0, 0, 40);
  noStroke();
  rect(panelX + 4, panelY + 4, panelW, panelH, 12);

  // Panel
  fill(255);
  stroke(c.border);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 12);

  // Title bar
  fill(c.bg);
  noStroke();
  rect(panelX + 2, panelY + 2, panelW - 4, 36, 10, 10, 0, 0);

  // Title text
  fill(c.text);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(18);
  textStyle(BOLD);
  text(n.label.replace(/\n/g, ' '), panelX + 16, panelY + 20);
  textStyle(NORMAL);

  // Close hint
  fill(c.border);
  textAlign(RIGHT, CENTER);
  textSize(16);
  text('Click to close', panelX + panelW - 16, panelY + 20);

  // Detail text with word wrapping
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(16);
  let textX = panelX + 16;
  let textY = panelY + 48;
  let maxW = panelW - 32;
  wrapText(n.detail, textX, textY, maxW, 20);
}

function wrapText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let line = '';
  let cy = y;
  for (let w of words) {
    let test = line + (line ? ' ' : '') + w;
    if (textWidth(test) > maxW && line) {
      text(line, x, cy);
      cy += lineH;
      line = w;
    } else {
      line = test;
    }
  }
  if (line) text(line, x, cy);
}

function isMouseOverNode(n) {
  let mx = mouseX;
  let my = mouseY + scrollY;
  return mx > n.x - n.w / 2 && mx < n.x + n.w / 2 &&
         my > n.y - n.h / 2 && my < n.y + n.h / 2;
}

function mousePressed() {
  if (mouseY > drawHeight) return; // in control area

  // If detail panel is open, close it on click
  if (selectedNode) {
    selectedNode = null;
    return;
  }

  // Check if clicked on a node
  for (let n of nodes) {
    if (isMouseOverNode(n)) {
      selectedNode = n;
      return;
    }
  }
}

function mouseWheel(event) {
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= drawHeight) {
    scrollY = constrain(scrollY + event.delta, 0, maxScrollY);
    return false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutNodes();
}

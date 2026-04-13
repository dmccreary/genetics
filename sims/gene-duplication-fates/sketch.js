// Fates of Duplicated Genes - Interactive MicroSim
// CANVAS_HEIGHT: 530
let drawHeight = 450;
let controlHeight = 80;
let canvasWidth, canvasHeight;

// State
let currentFate = 'none'; // none, conservation, neo, sub, pseudo
let evoTime = 0;
let mutations = []; // {x, geneIndex, color, generation}
let animPhase = 0; // 0=ancestral, 1=duplicating, 2=duplicated
let splitProgress = 0;
let fateTriggered = false;
let fateExplanation = '';
let fateExample = '';

// Controls
let timeSlider;
let btnConserve, btnNeo, btnSub, btnPseudo, btnReset;

// Gene colors
let gene1Color, gene2Color;
let gene1Active = true;
let gene2Active = true;
let neoColor;

// Subfunctionalization domains
let gene1Domains = [true, true, true]; // brain, liver, heart
let gene2Domains = [true, true, true];
let domainLabels = ['Brain', 'Liver', 'Heart'];

// Pseudogenization
let hasStopCodon = false;

function updateCanvasSize() {
    const container = document.querySelector('main');
    canvasWidth = container ? container.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    gene1Color = color(70, 130, 220);
    gene2Color = color(70, 130, 220);
    neoColor = color(200, 80, 180);

    // Slider
    timeSlider = createSlider(0, 100, 0, 1);
    timeSlider.parent(document.querySelector('main'));
    timeSlider.style('width', '200px');
    timeSlider.position(10, drawHeight + 45);

    // Buttons
    let bx = 260;
    let bSpacing = 155;

    btnConserve = createButton('Conservation');
    btnConserve.parent(document.querySelector('main'));
    btnConserve.mousePressed(() => selectFate('conservation'));

    btnNeo = createButton('Neofunctionalization');
    btnNeo.parent(document.querySelector('main'));
    btnNeo.mousePressed(() => selectFate('neo'));

    btnSub = createButton('Subfunctionalization');
    btnSub.parent(document.querySelector('main'));
    btnSub.mousePressed(() => selectFate('sub'));

    btnPseudo = createButton('Pseudogenization');
    btnPseudo.parent(document.querySelector('main'));
    btnPseudo.mousePressed(() => selectFate('pseudo'));

    btnReset = createButton('Reset');
    btnReset.parent(document.querySelector('main'));
    btnReset.mousePressed(resetSim);

    positionControls();
    textFont('Helvetica');
}

function positionControls() {
    let sliderY = drawHeight + 48;
    timeSlider.position(10, sliderY);

    let btnY = sliderY - 6;
    let bx = 230;
    let sp = 5;

    btnConserve.position(bx, btnY);
    bx += btnConserve.elt.offsetWidth + sp;
    btnNeo.position(bx, btnY);
    bx += btnNeo.elt.offsetWidth + sp;
    btnSub.position(bx, btnY);
    bx += btnSub.elt.offsetWidth + sp;
    btnPseudo.position(bx, btnY);
    bx += btnPseudo.elt.offsetWidth + sp;
    btnReset.position(bx, btnY);
}

function selectFate(fate) {
    if (animPhase < 2) return; // must be duplicated first
    currentFate = fate;
    fateTriggered = true;

    // Reset gene states
    gene2Color = color(70, 130, 220);
    gene1Active = true;
    gene2Active = true;
    gene1Domains = [true, true, true];
    gene2Domains = [true, true, true];
    hasStopCodon = false;

    switch (fate) {
        case 'conservation':
            fateExplanation = 'Both gene copies are maintained by purifying selection.';
            fateExample = 'Example: Histone genes - dosage selection maintains multiple identical copies.';
            break;
        case 'neo':
            fateExplanation = 'One copy acquires mutations conferring a new function.';
            fateExample = 'Example: Globin genes - ancestral gene duplicated; one copy became alpha-globin, the other beta-globin.';
            gene2Color = neoColor;
            break;
        case 'sub':
            fateExplanation = 'Each copy loses a different subset of ancestral functions.';
            fateExample = 'Example: Zebrafish engrailed genes - each paralog expressed in different tissues.';
            gene1Domains = [true, false, true];
            gene2Domains = [false, true, false];
            break;
        case 'pseudo':
            fateExplanation = 'One copy accumulates deleterious mutations and becomes nonfunctional.';
            fateExample = 'Example: Olfactory receptor genes - ~60% are pseudogenes in humans.';
            gene2Active = false;
            hasStopCodon = true;
            break;
    }
}

function resetSim() {
    currentFate = 'none';
    evoTime = 0;
    mutations = [];
    animPhase = 0;
    splitProgress = 0;
    fateTriggered = false;
    fateExplanation = '';
    fateExample = '';
    gene1Color = color(70, 130, 220);
    gene2Color = color(70, 130, 220);
    gene1Active = true;
    gene2Active = true;
    gene1Domains = [true, true, true];
    gene2Domains = [true, true, true];
    hasStopCodon = false;
    timeSlider.value(0);
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
    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Fates of Duplicated Genes', canvasWidth / 2, 28);

    // Read slider
    evoTime = timeSlider.value();

    // Advance animation phases based on slider
    if (evoTime < 10) {
        animPhase = 0;
        splitProgress = 0;
    } else if (evoTime < 25) {
        animPhase = 1;
        splitProgress = map(evoTime, 10, 25, 0, 1);
    } else {
        animPhase = 2;
        splitProgress = 1;
    }

    // Generate mutations based on time
    generateMutations();

    // Draw genes
    let cx = canvasWidth / 2;
    let geneWidth = min(280, canvasWidth * 0.35);
    let geneHeight = 30;

    if (animPhase === 0) {
        // Single ancestral gene
        drawGene(cx - geneWidth / 2, 120, geneWidth, geneHeight, gene1Color, true, 'Ancestral Gene', -1);
        // Label
        fill(80);
        textSize(16);
        textAlign(CENTER, CENTER);
        text('Move the slider to begin duplication', cx, 200);

    } else if (animPhase === 1) {
        // Animating split
        let yOffset = splitProgress * 50;
        let xOffset = splitProgress * 20;

        // Draw duplication fork lines
        stroke(150);
        strokeWeight(2);
        let forkY = 100;
        line(cx, forkY, cx - xOffset, 120 - 15 + yOffset / 2);
        line(cx, forkY, cx + xOffset, 120 + 25 + yOffset / 2);
        noStroke();

        drawGene(cx - geneWidth / 2 - xOffset, 120 - yOffset / 2, geneWidth, geneHeight, gene1Color, true, 'Copy 1', -1);
        drawGene(cx - geneWidth / 2 + xOffset, 120 + yOffset, geneWidth, geneHeight, gene1Color, true, 'Copy 2', -1);

        // Label
        fill(80);
        textSize(16);
        textAlign(CENTER, CENTER);
        text('Gene Duplication in Progress...', cx, 220 + yOffset);

    } else {
        // Duplicated - show two genes with fate
        let gene1Y = 100;
        let gene2Y = 200;
        let gx = cx - geneWidth / 2;

        // Draw connection showing common origin
        stroke(180);
        strokeWeight(1.5);
        let originX = gx - 30;
        line(originX, (gene1Y + gene2Y) / 2, gx, gene1Y + geneHeight / 2);
        line(originX, (gene1Y + gene2Y) / 2, gx, gene2Y + geneHeight / 2);
        noStroke();

        // Gene 1
        let g1col = gene1Active ? gene1Color : color(180);
        drawGene(gx, gene1Y, geneWidth, geneHeight, g1col, gene1Active, 'Copy 1 (Paralog A)', 0);

        // Gene 2
        let g2col = gene2Active ? gene2Color : color(180);
        drawGene(gx, gene2Y, geneWidth, geneHeight, g2col, gene2Active, 'Copy 2 (Paralog B)', 1);

        // Draw mutations on genes
        drawMutations(gx, gene1Y, geneWidth, geneHeight, 0);
        drawMutations(gx, gene2Y, geneWidth, geneHeight, 1);

        // Stop codon for pseudogenization
        if (hasStopCodon && fateTriggered) {
            let stopX = gx + geneWidth * 0.6;
            let stopY = gene2Y + geneHeight / 2;
            stroke(220, 30, 30);
            strokeWeight(3);
            line(stopX - 10, stopY - 10, stopX + 10, stopY + 10);
            line(stopX + 10, stopY - 10, stopX - 10, stopY + 10);
            noStroke();
            fill(220, 30, 30);
            textSize(14);
            textAlign(LEFT, CENTER);
            text('STOP', stopX + 15, stopY);
        }

        // Subfunctionalization tissue icons
        if (currentFate === 'sub' && fateTriggered) {
            drawDomainIcons(gx + geneWidth + 15, gene1Y, gene1Domains);
            drawDomainIcons(gx + geneWidth + 15, gene2Y, gene2Domains);
        }

        // Neofunctionalization label
        if (currentFate === 'neo' && fateTriggered) {
            fill(200, 80, 180);
            textSize(14);
            textAlign(LEFT, CENTER);
            text('New Function', gx + geneWidth + 15, gene2Y + geneHeight / 2);
        }

        // Fate explanation box
        if (fateTriggered) {
            drawExplanationBox(cx, 300);
        } else {
            fill(100);
            textSize(16);
            textAlign(CENTER, CENTER);
            text('Select a fate to see what happens to the duplicated genes', cx, 310);
        }
    }

    // Slider label
    fill(50);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text('Evolutionary Time: ' + evoTime, 10, drawHeight + 32);

    // Timeline bar
    let tlX = 10;
    let tlY = drawHeight + 12;
    let tlW = 200;
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(tlX, tlY, tlW, 6, 3);
    fill(70, 130, 220);
    noStroke();
    rect(tlX, tlY, tlW * evoTime / 100, 6, 3);
}

function drawGene(x, y, w, h, col, active, label, geneIndex) {
    // Gene bar
    push();
    if (active) {
        fill(col);
        stroke(red(col) * 0.7, green(col) * 0.7, blue(col) * 0.7);
    } else {
        fill(180);
        stroke(140);
    }
    strokeWeight(2);
    rect(x, y, w, h, 6);

    // Exon/intron pattern
    if (active) {
        fill(red(col) * 0.85, green(col) * 0.85, blue(col) * 0.85);
    } else {
        fill(160);
    }
    noStroke();
    let exonW = w * 0.15;
    for (let i = 0; i < 4; i++) {
        let ex = x + w * 0.1 + i * (exonW + w * 0.08);
        rect(ex, y + 4, exonW, h - 8, 3);
    }
    pop();

    // Label
    fill(50);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text(label, x, y - 12);
}

function drawMutations(gx, gy, gw, gh, geneIndex) {
    for (let m of mutations) {
        if (m.geneIndex !== geneIndex) continue;
        if (m.generation > evoTime) continue;

        fill(m.col);
        noStroke();
        let mx = gx + m.xFrac * gw;
        let my = gy + gh / 2;
        circle(mx, my, 8);

        // Outline
        stroke(red(m.col) * 0.6, green(m.col) * 0.6, blue(m.col) * 0.6);
        strokeWeight(1);
        noFill();
        circle(mx, my, 8);
    }
}

function generateMutations() {
    // Seed-based mutation generation so it is deterministic per time value
    let targetCount;
    if (animPhase < 2) {
        mutations = [];
        return;
    }

    let timeSinceDup = max(0, evoTime - 25);
    targetCount = floor(timeSinceDup / 5);

    // Remove mutations beyond current time
    mutations = mutations.filter(m => m.generation <= evoTime);

    // Add mutations up to target
    while (mutations.length < targetCount * 2) {
        let gen = 25 + (mutations.length / 2 + 1) * 5;
        if (gen > evoTime) break;

        // Mutation colors: synonymous (yellow), missense (orange), beneficial (green)
        let mutColors = [
            color(240, 200, 50),  // synonymous
            color(240, 140, 40),  // missense
            color(80, 200, 100),  // beneficial
        ];

        // One mutation per gene per step
        for (let gi = 0; gi < 2; gi++) {
            let seed = mutations.length + gi * 1000;
            let xFrac = 0.08 + (((seed * 7 + 13) % 100) / 100) * 0.84;
            let cIdx = (seed * 3 + 7) % 3;

            // For neofunctionalization, gene 2 gets more beneficial mutations
            if (currentFate === 'neo' && gi === 1) {
                cIdx = 2; // beneficial
            }
            // For pseudogenization, gene 2 gets more missense mutations
            if (currentFate === 'pseudo' && gi === 1) {
                cIdx = 1; // missense
            }

            mutations.push({
                xFrac: xFrac,
                geneIndex: gi,
                col: mutColors[cIdx],
                generation: gen
            });
        }
    }
}

function drawDomainIcons(x, y, domains) {
    let icons = ['\u{1F9E0}', '\u{1FAB5}', '\u{2764}'];  // brain, organ, heart emojis as fallback
    let labels = domainLabels;

    for (let i = 0; i < 3; i++) {
        let iy = y + i * 12;
        if (domains[i]) {
            fill(60, 160, 80);
            textSize(12);
            textAlign(LEFT, CENTER);
            text('\u2713 ' + labels[i], x, iy + 6);
        } else {
            fill(180);
            textSize(12);
            textAlign(LEFT, CENTER);
            text('\u2717 ' + labels[i], x, iy + 6);
        }
    }
}

function drawExplanationBox(cx, y) {
    // Background box
    let boxW = min(500, canvasWidth - 40);
    let boxH = 100;
    let boxX = cx - boxW / 2;

    fill(255, 255, 240);
    stroke(200, 190, 140);
    strokeWeight(1.5);
    rect(boxX, y, boxW, boxH, 8);

    // Fate title
    noStroke();
    fill(40);
    textSize(18);
    textAlign(CENTER, TOP);
    let titleMap = {
        'conservation': 'Conservation (Gene Redundancy)',
        'neo': 'Neofunctionalization',
        'sub': 'Subfunctionalization',
        'pseudo': 'Pseudogenization'
    };
    text(titleMap[currentFate] || '', cx, y + 10);

    // Explanation
    fill(70);
    textSize(14);
    textAlign(CENTER, TOP);
    text(fateExplanation, cx, y + 36);

    // Example in italics style (slightly smaller, different color)
    fill(100, 80, 40);
    textSize(13);
    text(fateExample, boxX + 10, y + 60, boxW - 20, 40);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}

// Autosomal Dominant Pedigree Pattern
// CANVAS_HEIGHT: 560
let drawHeight = 500;
let controlHeight = 60;
let canvasWidth, canvasHeight;

// Pedigree individuals: {id, sex, affected, x, y, gen, label}
let individuals = [];
let marriages = []; // {p1, p2, children:[]}
let resetBtn, randomBtn;

// Layout constants
let pedigreeLeftFrac = 0.62;
let genY = [90, 220, 370];
let shapeSize = 32;

function updateCanvasSize() {
    const container = document.querySelector('main');
    canvasWidth = container ? container.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;
}

function buildDefaultPedigree() {
    individuals = [];
    marriages = [];

    // Generation I (grandparents)
    individuals.push({id: 0, sex: 'M', affected: true,  gen: 0, label: 'I-1'});
    individuals.push({id: 1, sex: 'F', affected: false, gen: 0, label: 'I-2'});
    marriages.push({p1: 0, p2: 1, children: [2, 3, 4]});

    // Generation II (parents + spouses)
    individuals.push({id: 2, sex: 'F', affected: true,  gen: 1, label: 'II-1'});
    individuals.push({id: 3, sex: 'M', affected: true,  gen: 1, label: 'II-2'});
    individuals.push({id: 4, sex: 'F', affected: false, gen: 1, label: 'II-3'});

    // Marry-in spouses
    individuals.push({id: 5, sex: 'M', affected: false, gen: 1, label: 'II-4'});
    individuals.push({id: 6, sex: 'F', affected: false, gen: 1, label: 'II-5'});

    marriages.push({p1: 5, p2: 2, children: [7, 8]});
    marriages.push({p1: 3, p2: 6, children: [9, 10, 11]});

    // Generation III (grandchildren)
    individuals.push({id: 7,  sex: 'M', affected: true,  gen: 2, label: 'III-1'});
    individuals.push({id: 8,  sex: 'F', affected: false, gen: 2, label: 'III-2'});
    individuals.push({id: 9,  sex: 'M', affected: false, gen: 2, label: 'III-3'});
    individuals.push({id: 10, sex: 'F', affected: true,  gen: 2, label: 'III-4'});
    individuals.push({id: 11, sex: 'M', affected: true,  gen: 2, label: 'III-5'});
}

function layoutPositions() {
    let pw = canvasWidth * pedigreeLeftFrac;

    // Generation I: one couple centered
    let cx1 = pw * 0.5;
    individuals[0].x = cx1 - 30;
    individuals[0].y = genY[0];
    individuals[1].x = cx1 + 30;
    individuals[1].y = genY[0];

    // Generation II: two couples + one single
    let spacing2 = pw / 4;
    individuals[5].x = spacing2 * 1 - 25;
    individuals[5].y = genY[1];
    individuals[2].x = spacing2 * 1 + 25;
    individuals[2].y = genY[1];

    individuals[3].x = spacing2 * 2.5 - 25;
    individuals[3].y = genY[1];
    individuals[6].x = spacing2 * 2.5 + 25;
    individuals[6].y = genY[1];

    individuals[4].x = spacing2 * 3.6;
    individuals[4].y = genY[1];

    // Generation III
    let parent1cx = (individuals[5].x + individuals[2].x) / 2;
    individuals[7].x = parent1cx - 25;
    individuals[7].y = genY[2];
    individuals[8].x = parent1cx + 25;
    individuals[8].y = genY[2];

    let parent2cx = (individuals[3].x + individuals[6].x) / 2;
    individuals[9].x  = parent2cx - 50;
    individuals[9].y  = genY[2];
    individuals[10].x = parent2cx;
    individuals[10].y = genY[2];
    individuals[11].x = parent2cx + 50;
    individuals[11].y = genY[2];
}

function randomizePedigree() {
    // Affected grandparent always present for AD
    individuals[0].affected = true;
    individuals[1].affected = false;

    // Gen I children: ~50% chance from affected parent
    for (let m of marriages) {
        if (m.p1 === 0 || m.p2 === 0) {
            for (let cid of m.children) {
                individuals[cid].affected = random() < 0.5;
            }
        }
    }

    // Marry-in spouses unaffected
    individuals[5].affected = false;
    individuals[6].affected = false;

    // Gen III: affected only if family-line parent is affected
    for (let m of marriages) {
        let familyParent = -1;
        if (m.p1 === 5) familyParent = m.p2;
        else if (m.p2 === 5) familyParent = m.p1;
        else if (m.p1 === 6) familyParent = m.p2;
        else if (m.p2 === 6) familyParent = m.p1;

        if (familyParent >= 0) {
            let parentAffected = individuals[familyParent].affected;
            for (let cid of m.children) {
                individuals[cid].affected = parentAffected ? (random() < 0.5) : false;
            }
        }
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    buildDefaultPedigree();
    layoutPositions();

    resetBtn = createButton('Reset Default');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.mousePressed(() => { buildDefaultPedigree(); layoutPositions(); });
    resetBtn.style('font-size', '16px');
    resetBtn.style('padding', '6px 14px');
    resetBtn.style('margin', '6px 8px');

    randomBtn = createButton('Randomize 50%');
    randomBtn.parent(document.querySelector('main'));
    randomBtn.mousePressed(() => { randomizePedigree(); });
    randomBtn.style('font-size', '16px');
    randomBtn.style('padding', '6px 14px');
    randomBtn.style('margin', '6px 8px');
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

    layoutPositions();

    // Title
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Autosomal Dominant Pedigree', canvasWidth * pedigreeLeftFrac / 2, 12);

    // Generation labels
    textSize(16);
    textAlign(LEFT, CENTER);
    fill(100);
    text('I',  12, genY[0]);
    text('II', 12, genY[1]);
    text('III',12, genY[2]);

    drawConnections();

    for (let ind of individuals) {
        drawIndividual(ind);
    }

    drawChecklist();

    // Instructions
    textSize(14);
    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Click individuals to toggle affected status', canvasWidth * pedigreeLeftFrac / 2, drawHeight - 18);
}

function drawIndividual(ind) {
    let s = shapeSize;
    strokeWeight(2);
    stroke(60);

    if (ind.affected) {
        fill(50, 50, 140);
    } else {
        fill(255);
    }

    if (ind.sex === 'M') {
        rectMode(CENTER);
        rect(ind.x, ind.y, s, s, 3);
        rectMode(CORNER);
    } else {
        ellipse(ind.x, ind.y, s, s);
    }

    // Label inside shape
    noStroke();
    fill(ind.affected ? 255 : 40);
    textAlign(CENTER, CENTER);
    textSize(11);
    text(ind.label, ind.x, ind.y);

    // Genotype above affected individuals
    if (ind.affected) {
        fill(180, 50, 50);
        textSize(12);
        text('Aa', ind.x, ind.y - s / 2 - 10);
    }
}

function drawConnections() {
    stroke(60);
    strokeWeight(2);
    noFill();

    for (let m of marriages) {
        let p1 = individuals[m.p1];
        let p2 = individuals[m.p2];
        let halfS = shapeSize / 2;

        // Horizontal marriage line
        line(p1.x + halfS, p1.y, p2.x - halfS, p2.y);

        // Midpoint for descent
        let mx = (p1.x + p2.x) / 2;
        let my = p1.y;

        if (m.children.length > 0) {
            let childY = individuals[m.children[0]].y - halfS - 15;
            line(mx, my, mx, childY);

            let leftChild = individuals[m.children[0]];
            let rightChild = individuals[m.children[m.children.length - 1]];
            line(leftChild.x, childY, rightChild.x, childY);

            for (let cid of m.children) {
                let child = individuals[cid];
                line(child.x, childY, child.x, child.y - halfS);
            }
        }
    }
}

function drawChecklist() {
    let rx = canvasWidth * pedigreeLeftFrac + 10;
    let rw = canvasWidth - rx - 10;
    let ry = 12;

    // Panel background
    fill(248, 248, 255);
    stroke(180);
    strokeWeight(1);
    rect(rx, ry, rw, drawHeight - 30, 8);

    // Panel title
    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(17);
    text('AD Hallmarks', rx + 12, ry + 12);

    let checks = evaluateHallmarks();

    let cy = ry + 42;
    textSize(14);
    for (let chk of checks) {
        let icon = chk.pass ? '\u2713' : '\u2717';
        fill(chk.pass ? color(30, 140, 50) : color(190, 50, 50));
        textStyle(BOLD);
        text(icon, rx + 14, cy);

        fill(50);
        textStyle(NORMAL);
        textSize(13);
        let wrapped = wrapText(chk.text, rw - 50);
        for (let i = 0; i < wrapped.length; i++) {
            text(wrapped[i], rx + 34, cy + i * 18);
        }
        cy += wrapped.length * 18 + 12;
    }

    // Legend
    cy += 10;
    textSize(15);
    fill(30);
    textStyle(BOLD);
    text('Legend', rx + 14, cy);
    textStyle(NORMAL);
    cy += 24;

    let lx = rx + 26;

    stroke(60);
    strokeWeight(2);
    fill(255);
    rectMode(CENTER);
    rect(lx, cy + 8, 18, 18, 2);
    rectMode(CORNER);
    noStroke();
    fill(50);
    textSize(13);
    text('Male (unaffected)', lx + 16, cy + 2);

    cy += 28;
    stroke(60);
    strokeWeight(2);
    fill(50, 50, 140);
    rectMode(CENTER);
    rect(lx, cy + 8, 18, 18, 2);
    rectMode(CORNER);
    noStroke();
    fill(50);
    text('Male (affected)', lx + 16, cy + 2);

    cy += 28;
    stroke(60);
    strokeWeight(2);
    fill(255);
    ellipse(lx, cy + 8, 18, 18);
    noStroke();
    fill(50);
    text('Female (unaffected)', lx + 16, cy + 2);

    cy += 28;
    stroke(60);
    strokeWeight(2);
    fill(50, 50, 140);
    ellipse(lx, cy + 8, 18, 18);
    noStroke();
    fill(50);
    text('Female (affected)', lx + 16, cy + 2);

    cy += 28;
    noStroke();
    fill(180, 50, 50);
    textSize(13);
    text('Aa = heterozygous', rx + 14, cy + 2);
}

function wrapText(txt, maxW) {
    let words = txt.split(' ');
    let lines = [];
    let current = '';
    for (let w of words) {
        let test = current ? current + ' ' + w : w;
        if (textWidth(test) < maxW) {
            current = test;
        } else {
            if (current) lines.push(current);
            current = w;
        }
    }
    if (current) lines.push(current);
    return lines;
}

function evaluateHallmarks() {
    let checks = [];

    // 1. Vertical transmission: affected in every generation
    let genAffected = [false, false, false];
    for (let ind of individuals) {
        if (ind.affected) genAffected[ind.gen] = true;
    }
    let vertical = genAffected[0] && genAffected[1] && genAffected[2];
    checks.push({
        pass: vertical,
        text: 'Vertical transmission: affected in every generation'
    });

    // 2. Both sexes affected
    let maleAffected = individuals.some(i => i.sex === 'M' && i.affected);
    let femaleAffected = individuals.some(i => i.sex === 'F' && i.affected);
    checks.push({
        pass: maleAffected && femaleAffected,
        text: 'Both sexes equally affected'
    });

    // 3. Male-to-male transmission (rules out X-linked)
    let maleToMale = false;
    for (let m of marriages) {
        let dad = individuals[m.p1];
        if (dad.sex === 'M' && dad.affected) {
            for (let cid of m.children) {
                if (individuals[cid].sex === 'M' && individuals[cid].affected) {
                    maleToMale = true;
                }
            }
        }
    }
    checks.push({
        pass: maleToMale,
        text: 'Male-to-male transmission (excludes X-linked)'
    });

    // 4. Every affected child has an affected parent
    let affectedHaveAffectedParent = true;
    let anyAffectedChild = false;
    for (let m of marriages) {
        for (let cid of m.children) {
            if (individuals[cid].affected) {
                anyAffectedChild = true;
                let parentAffected = individuals[m.p1].affected || individuals[m.p2].affected;
                if (!parentAffected) affectedHaveAffectedParent = false;
            }
        }
    }
    checks.push({
        pass: affectedHaveAffectedParent && anyAffectedChild,
        text: 'Every affected child has an affected parent'
    });

    // 5. ~50% of offspring affected from Aa x aa crosses
    let totalKids = 0;
    let affectedKids = 0;
    for (let m of marriages) {
        let p1aff = individuals[m.p1].affected;
        let p2aff = individuals[m.p2].affected;
        if ((p1aff && !p2aff) || (!p1aff && p2aff)) {
            for (let cid of m.children) {
                totalKids++;
                if (individuals[cid].affected) affectedKids++;
            }
        }
    }
    let ratio = totalKids > 0 ? affectedKids / totalKids : 0;
    let near50 = totalKids > 0 && ratio >= 0.2 && ratio <= 0.8;
    let ratioStr = totalKids > 0 ? (ratio * 100).toFixed(0) + '%' : 'N/A';
    checks.push({
        pass: near50,
        text: '~50% offspring from Aa x aa (' + ratioStr + ')'
    });

    // 6. Unaffected parents do not produce affected children
    let unaffectedTransmit = false;
    for (let m of marriages) {
        if (!individuals[m.p1].affected && !individuals[m.p2].affected) {
            for (let cid of m.children) {
                if (individuals[cid].affected) unaffectedTransmit = true;
            }
        }
    }
    checks.push({
        pass: !unaffectedTransmit,
        text: 'Unaffected x unaffected do not produce affected offspring'
    });

    return checks;
}

function mousePressed() {
    for (let ind of individuals) {
        let d;
        if (ind.sex === 'M') {
            d = max(abs(mouseX - ind.x), abs(mouseY - ind.y));
        } else {
            d = dist(mouseX, mouseY, ind.x, ind.y);
        }
        if (d < shapeSize / 2 + 4) {
            ind.affected = !ind.affected;
            return;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    layoutPositions();
}

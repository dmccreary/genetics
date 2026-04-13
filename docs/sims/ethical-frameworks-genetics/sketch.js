// Ethical Framework Comparison for Genetic Ethics Scenarios
// CANVAS_HEIGHT: 560
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let canvasWidth;

let scenarioSelect;
let currentScenario = 0;

// Framework colors
const frameworkColors = {
    'Principlism':      { bg: '#E3F2FD', border: '#1565C0', title: '#0D47A1' },
    'Consequentialism': { bg: '#FFF3E0', border: '#E65100', title: '#BF360C' },
    'Deontological':    { bg: '#E8F5E9', border: '#2E7D32', title: '#1B5E20' },
    'Virtue Ethics':    { bg: '#F3E5F5', border: '#7B1FA2', title: '#4A148C' }
};

const frameworks = ['Principlism', 'Consequentialism', 'Deontological', 'Virtue Ethics'];

const scenarios = [
    {
        title: 'Returning Incidental Findings',
        description: 'A researcher discovers a patient carries a BRCA1 mutation during an unrelated genomic study. Should the finding be disclosed?',
        analyses: {
            'Principlism': [
                'Beneficence: Disclosure could save the patient\'s life through early screening.',
                'Autonomy: The patient has a right to know information affecting their health decisions.',
                'Non-maleficence: Knowledge may cause anxiety; balance harm vs. benefit carefully.'
            ],
            'Consequentialism': [
                'Disclosure yields the greatest good: early detection can prevent cancer deaths.',
                'Weigh potential psychological harm against life-saving preventive action.',
                'Setting a disclosure norm encourages trust in research participation overall.'
            ],
            'Deontological': [
                'Duty to inform: withholding life-relevant information violates respect for persons.',
                'Researchers have a moral obligation that exists regardless of study outcomes.',
                'The categorical imperative demands we treat participants as ends, not mere data sources.'
            ],
            'Virtue Ethics': [
                'A compassionate researcher would want their own family informed in this situation.',
                'Honesty and transparency are virtues central to the researcher-participant relationship.',
                'Courage is needed to navigate difficult conversations about genetic risk.'
            ]
        }
    },
    {
        title: 'Biobank Data & Law Enforcement',
        description: 'Police request access to a research biobank\'s genetic data to identify a suspect in a violent crime. Should the data be shared?',
        analyses: {
            'Principlism': [
                'Justice: Solving crimes serves society, but breaching consent undermines research trust.',
                'Autonomy: Donors consented to research use only, not forensic identification.',
                'Non-maleficence: Sharing could deter future biobank participation, harming public health.'
            ],
            'Consequentialism': [
                'Short-term: catching a criminal benefits public safety immediately.',
                'Long-term: eroding biobank trust could reduce research participation and future cures.',
                'Net consequences likely favor protecting data to preserve the greater research enterprise.'
            ],
            'Deontological': [
                'Consent agreements create binding moral duties that cannot be overridden by utility.',
                'Using DNA for purposes beyond consent treats donors as means to an end.',
                'Rule-based ethics demands honoring promises made during the consent process.'
            ],
            'Virtue Ethics': [
                'Integrity requires honoring commitments made to research participants.',
                'Justice as a virtue asks: would sharing set a precedent we can live with?',
                'Prudence weighs immediate safety against long-term erosion of scientific trust.'
            ]
        }
    },
    {
        title: 'Germline Editing for Disease',
        description: 'CRISPR technology could edit the CCR5 gene in embryos to confer HIV resistance. Should germline editing be pursued for disease prevention?',
        analyses: {
            'Principlism': [
                'Beneficence: Preventing heritable disease serves the welfare of future generations.',
                'Non-maleficence: Off-target effects could introduce new harmful mutations.',
                'Justice: Access disparities could widen health inequities between rich and poor nations.'
            ],
            'Consequentialism': [
                'Eradicating genetic diseases could prevent enormous future suffering.',
                'Unknown long-term ecological and genetic consequences create incalculable risk.',
                'Cost-benefit must include the slippery slope toward non-medical enhancement.'
            ],
            'Deontological': [
                'Future persons cannot consent to permanent changes in their genome.',
                'Duty to prevent suffering must be weighed against duty not to impose irreversible risk.',
                'The precautionary principle imposes a moral duty to proceed with extreme caution.'
            ],
            'Virtue Ethics': [
                'Humility: We must acknowledge the limits of our understanding of complex genomes.',
                'Compassion drives the desire to eliminate suffering, but wisdom urges restraint.',
                'A virtuous society deliberates collectively before altering the human germline.'
            ]
        }
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

    // Scenario selector
    scenarioSelect = createSelect();
    scenarioSelect.parent(document.querySelector('main'));
    for (let i = 0; i < scenarios.length; i++) {
        scenarioSelect.option(scenarios[i].title, i);
    }
    scenarioSelect.changed(() => {
        currentScenario = parseInt(scenarioSelect.value());
    });
    scenarioSelect.style('font-size', '16px');
    scenarioSelect.style('padding', '4px 8px');
    scenarioSelect.style('margin', '6px 8px');
}

function draw() {
    background(255);

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

    let scenario = scenarios[currentScenario];
    let margin = 12;
    let colGap = 8;
    let availableWidth = canvasWidth - margin * 2 - colGap * 3;
    let colWidth = availableWidth / 4;
    let headerHeight = 80;

    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textSize(24);
    textStyle(BOLD);
    text('Ethical Frameworks in Genetics', canvasWidth / 2, 10);

    // Scenario description
    textSize(16);
    textStyle(NORMAL);
    fill(60);
    textAlign(CENTER, TOP);
    let descY = 40;
    let descText = scenario.description;
    text(descText, canvasWidth / 2 - (canvasWidth * 0.4), descY, canvasWidth * 0.8, 60);

    let topY = descY + 55;
    let columnTop = topY + 6;
    let columnBottom = drawHeight - 70;
    let columnHeight = columnBottom - columnTop;

    // Draw four framework columns
    for (let i = 0; i < 4; i++) {
        let fw = frameworks[i];
        let colors = frameworkColors[fw];
        let x = margin + i * (colWidth + colGap);

        // Column background
        fill(colors.bg);
        stroke(colors.border);
        strokeWeight(2);
        rect(x, columnTop, colWidth, columnHeight, 8);

        // Framework title
        noStroke();
        fill(colors.title);
        textAlign(CENTER, TOP);
        textSize(17);
        textStyle(BOLD);
        let titleLines = wrapTextLines(fw, colWidth - 16);
        let ty = columnTop + 8;
        for (let line of titleLines) {
            text(line, x + colWidth / 2, ty);
            ty += 20;
        }

        // Divider line under title
        stroke(colors.border);
        strokeWeight(1);
        line(x + 10, ty + 4, x + colWidth - 10, ty + 4);

        // Bullet points
        noStroke();
        fill(40);
        textSize(16);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        let bulletY = ty + 14;
        let bullets = scenario.analyses[fw];
        let bulletMargin = 10;
        let bulletWidth = colWidth - bulletMargin * 2 - 12;

        for (let b = 0; b < bullets.length; b++) {
            let bulletText = bullets[b];
            let wrappedLines = wrapTextLines(bulletText, bulletWidth);

            // Bullet dot
            fill(colors.border);
            ellipse(x + bulletMargin + 4, bulletY + 9, 6, 6);

            // Bullet text
            fill(40);
            let lineY = bulletY;
            for (let wl of wrappedLines) {
                text(wl, x + bulletMargin + 14, lineY);
                lineY += 18;
            }
            bulletY = lineY + 8;
        }
    }

    // Summary panel at bottom
    drawSummaryPanel(scenario, margin, drawHeight - 62, canvasWidth - margin * 2, 56);

    // Control region label
    noStroke();
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(16);
    textStyle(BOLD);
    text('Select Scenario:', margin, drawHeight + controlHeight / 2);
    textStyle(NORMAL);
}

function drawSummaryPanel(scenario, x, y, w, h) {
    // Determine agreement/divergence
    let agreementText = getAgreementSummary(currentScenario);

    fill(255, 255, 240);
    stroke('#B0A060');
    strokeWeight(2);
    rect(x, y, w, h, 6);

    noStroke();
    fill('#5D4E00');
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Summary:', x + 10, y + 6);
    textStyle(NORMAL);
    fill(60);
    textSize(16);
    let summaryLines = wrapTextLines(agreementText, w - 110);
    let sy = y + 6;
    for (let sl of summaryLines) {
        text(sl, x + 100, sy);
        sy += 18;
    }
}

function getAgreementSummary(idx) {
    const summaries = [
        'Agreement: All frameworks support some form of disclosure. Divergence: They differ on whether duty (Deontological), outcomes (Consequentialism), or character (Virtue) is the primary justification.',
        'Agreement: All frameworks value participant trust. Divergence: Consequentialism weighs long-term research impact; Deontological insists consent is inviolable regardless of outcomes.',
        'Agreement: All frameworks urge caution with germline editing. Divergence: Consequentialism focuses on risk-benefit calculus; Deontological highlights the impossibility of future consent; Virtue Ethics emphasizes collective humility.'
    ];
    return summaries[idx];
}

// Utility: wrap text into lines that fit a given pixel width
function wrapTextLines(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';
    for (let word of words) {
        let testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;
        if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }
    return lines;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

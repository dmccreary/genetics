// GINA Coverage Gaps - Interactive Two-Column Visualization
// CANVAS_HEIGHT: 560
let drawHeight = 500;
let controlHeight = 60;
let canvasWidth, canvasHeight;

let coveredItems = [
    {
        title: "Health Insurance",
        detail: "Insurers cannot use genetic information to deny coverage, set premiums, or impose pre-existing condition exclusions.",
        scenario: "A woman tested positive for BRCA1 mutation. Her health insurer cannot raise her premiums or deny coverage based on this result.",
        expanded: false
    },
    {
        title: "Employment",
        detail: "Employers with 15+ employees cannot use genetic information in hiring, firing, promotions, or job assignments.",
        scenario: "A company cannot require genetic testing as part of a pre-employment physical or use family medical history in promotion decisions.",
        expanded: false
    }
];

let notCoveredItems = [
    {
        title: "Life Insurance",
        detail: "Life insurers can request genetic test results and use them to deny coverage or increase premiums.",
        scenario: "After a positive Huntington's disease test, a life insurance company denies an applicant's policy entirely.",
        expanded: false
    },
    {
        title: "Disability Insurance",
        detail: "Disability insurers can factor in genetic predispositions when underwriting policies.",
        scenario: "A person with a genetic marker for early-onset arthritis is charged higher disability insurance premiums.",
        expanded: false
    },
    {
        title: "Long-Term Care",
        detail: "Long-term care insurance companies can use genetic information in coverage decisions.",
        scenario: "An applicant who tested positive for Alzheimer's risk genes is denied long-term care insurance.",
        expanded: false
    },
    {
        title: "Military Personnel",
        detail: "GINA does not apply to members of the U.S. military, who may be subject to genetic testing.",
        scenario: "The Department of Defense can require DNA samples and genetic testing for service members.",
        expanded: false
    },
    {
        title: "Small Employers (<15)",
        detail: "Businesses with fewer than 15 employees are exempt from GINA's employment protections.",
        scenario: "A small family business with 10 employees can legally consider genetic information when making hiring decisions.",
        expanded: false
    },
    {
        title: "Education",
        detail: "Schools and universities are not covered by GINA and can potentially access genetic information.",
        scenario: "A university research program could theoretically use a student's genetic data without GINA restrictions.",
        expanded: false
    },
    {
        title: "Housing",
        detail: "Landlords and housing authorities are not restricted by GINA from using genetic information.",
        scenario: "A housing authority could potentially consider genetic health risks, though other laws may offer some protection.",
        expanded: false
    }
];

let scrollOffset = 0;
let maxScroll = 0;
let resetButton;

// Colors
let coveredColor, coveredLight, notCoveredColor, notCoveredLight;
let headerHeight = 60;
let cardMargin = 8;
let cardPadding = 12;
let collapsedCardHeight = 44;
let columnGap = 16;
let summaryBarHeight = 40;
let topMargin = 10;

function updateCanvasSize() {
    const container = document.querySelector('main');
    canvasWidth = container ? container.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textWrap(WORD);

    coveredColor = color(34, 139, 34);
    coveredLight = color(220, 245, 220);
    notCoveredColor = color(210, 120, 20);
    notCoveredLight = color(255, 240, 220);

    resetButton = createButton('Collapse All');
    resetButton.parent(document.querySelector('main'));
    resetButton.mousePressed(collapseAll);
    resetButton.style('font-size', '16px');
    resetButton.style('padding', '6px 18px');
    resetButton.style('cursor', 'pointer');
}

function collapseAll() {
    for (let item of coveredItems) item.expanded = false;
    for (let item of notCoveredItems) item.expanded = false;
    scrollOffset = 0;
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
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text("GINA Coverage Gaps", canvasWidth / 2, 30);
    textStyle(NORMAL);

    let colWidth = (canvasWidth - columnGap - 24) / 2;
    let leftX = 12;
    let rightX = leftX + colWidth + columnGap;
    let cardsStartY = headerHeight + topMargin;

    // Column headers
    drawColumnHeader(leftX, headerHeight - 6, colWidth, "Protected by GINA", coveredColor);
    drawColumnHeader(rightX, headerHeight - 6, colWidth, "NOT Protected", notCoveredColor);

    // Clip to draw area below headers
    let clipY = cardsStartY + 28;
    let clipH = drawHeight - clipY - summaryBarHeight - 6;

    // Calculate card positions and total content height
    let leftCards = layoutCards(coveredItems, leftX, clipY - scrollOffset, colWidth);
    let rightCards = layoutCards(notCoveredItems, rightX, clipY - scrollOffset, colWidth);

    let leftBottom = leftCards.length > 0 ? leftCards[leftCards.length - 1].y + leftCards[leftCards.length - 1].h : clipY;
    let rightBottom = rightCards.length > 0 ? rightCards[rightCards.length - 1].y + rightCards[rightCards.length - 1].h : clipY;
    let contentBottom = max(leftBottom, rightBottom) + scrollOffset - clipY;
    maxScroll = max(0, contentBottom - clipH);

    // Draw cards with clipping
    push();
    // Manual clipping by checking bounds
    drawCards(leftCards, coveredColor, coveredLight, clipY, clipY + clipH, colWidth);
    drawCards(rightCards, notCoveredColor, notCoveredLight, clipY, clipY + clipH, colWidth);
    pop();

    // Summary proportion bar
    let barY = drawHeight - summaryBarHeight - 4;
    drawSummaryBar(12, barY, canvasWidth - 24, summaryBarHeight - 4);

    // Scroll indicator
    if (maxScroll > 0) {
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        let scrollText = scrollOffset < maxScroll ? "Scroll to see more" : "Top of list";
        if (scrollOffset > 0 && scrollOffset < maxScroll) {
            scrollText = "Scroll up/down for more";
        }
        // Draw on right edge
        push();
        let trackX = canvasWidth - 10;
        let trackTop = clipY + 4;
        let trackH = clipH - 8;
        fill(220);
        noStroke();
        rect(trackX - 3, trackTop, 6, trackH, 3);
        let thumbFrac = scrollOffset / max(1, maxScroll);
        let thumbH = max(20, trackH * (clipH / max(1, contentBottom)));
        let thumbY = trackTop + thumbFrac * (trackH - thumbH);
        fill(160);
        rect(trackX - 3, thumbY, 6, thumbH, 3);
        pop();
    }

    // Position reset button
    resetButton.position(canvasWidth / 2 - 60, drawHeight + 15);
}

function drawColumnHeader(x, y, w, label, col) {
    fill(col);
    noStroke();
    rect(x, y, w, 28, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(17);
    textStyle(BOLD);
    text(label, x + w / 2, y + 14);
    textStyle(NORMAL);
}

function layoutCards(items, x, startY, colWidth) {
    let cards = [];
    let currentY = startY;
    for (let i = 0; i < items.length; i++) {
        let h = getCardHeight(items[i], colWidth);
        cards.push({ x: x, y: currentY, w: colWidth, h: h, index: i, item: items[i] });
        currentY += h + cardMargin;
    }
    return cards;
}

function getCardHeight(item, colWidth) {
    if (!item.expanded) return collapsedCardHeight;

    // Estimate expanded height based on text
    let textW = colWidth - cardPadding * 2 - 8;
    push();
    textSize(16);
    let titleH = 28;

    textSize(15);
    // Rough estimate: characters per line
    let charsPerLine = max(1, floor(textW / 8));
    let detailLines = ceil(item.detail.length / charsPerLine);
    let scenarioLines = ceil(item.scenario.length / charsPerLine);

    pop();

    let detailH = detailLines * 20 + 24;
    let scenarioH = scenarioLines * 20 + 24;
    return titleH + detailH + scenarioH + cardPadding * 2 + 16;
}

function drawCards(cards, accentColor, bgColor, clipTop, clipBottom, colWidth) {
    for (let card of cards) {
        // Skip if entirely outside clip region
        if (card.y + card.h < clipTop || card.y > clipBottom) continue;

        let item = card.item;
        let x = card.x;
        let y = card.y;
        let w = card.w;
        let h = card.h;

        // Card background
        fill(bgColor);
        stroke(accentColor);
        strokeWeight(2);
        rect(x, y, w, h, 8);

        // Left accent bar
        fill(accentColor);
        noStroke();
        rect(x, y + 4, 5, h - 8, 3);

        // Title
        fill(40);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(17);
        textStyle(BOLD);
        let titleY = y + 22;
        text(item.title, x + cardPadding + 8, titleY);
        textStyle(NORMAL);

        // Expand/collapse indicator
        fill(accentColor);
        textAlign(RIGHT, CENTER);
        textSize(18);
        text(item.expanded ? "▲" : "▼", x + w - cardPadding, titleY);

        // Expanded content
        if (item.expanded) {
            let contentX = x + cardPadding + 8;
            let contentW = w - cardPadding * 2 - 16;
            let cy = y + 44;

            // Detail
            fill(accentColor);
            textAlign(LEFT, TOP);
            textSize(16);
            textStyle(BOLD);
            text("Details:", contentX, cy);
            textStyle(NORMAL);
            cy += 22;

            fill(50);
            textSize(15);
            textAlign(LEFT, TOP);
            text(item.detail, contentX, cy, contentW);
            let charsPerLine = max(1, floor(contentW / 8));
            let detailLines = ceil(item.detail.length / charsPerLine);
            cy += detailLines * 20 + 12;

            // Scenario
            fill(accentColor);
            textSize(16);
            textStyle(BOLD);
            textAlign(LEFT, TOP);
            text("Real-World Scenario:", contentX, cy);
            textStyle(NORMAL);
            cy += 22;

            fill(80);
            textSize(15);
            textStyle(ITALIC);
            textAlign(LEFT, TOP);
            text(item.scenario, contentX, cy, contentW);
            textStyle(NORMAL);
        }
    }
}

function drawSummaryBar(x, y, w, h) {
    let totalItems = coveredItems.length + notCoveredItems.length;
    let coveredFrac = coveredItems.length / totalItems;
    let notCoveredFrac = notCoveredItems.length / totalItems;

    // Background
    fill(240);
    stroke('silver');
    strokeWeight(1);
    rect(x, y, w, h, 6);

    // Green portion
    let greenW = (w - 4) * coveredFrac;
    fill(coveredColor);
    noStroke();
    rect(x + 2, y + 2, greenW, h - 4, 4, 0, 0, 4);

    // Orange portion
    let orangeW = (w - 4) * notCoveredFrac;
    fill(notCoveredColor);
    noStroke();
    rect(x + 2 + greenW, y + 2, orangeW, h - 4, 0, 4, 4, 0);

    // Labels
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    if (greenW > 80) {
        text(coveredItems.length + " Protected", x + 2 + greenW / 2, y + h / 2);
    }
    if (orangeW > 100) {
        text(notCoveredItems.length + " NOT Protected", x + 2 + greenW + orangeW / 2, y + h / 2);
    }
    textStyle(NORMAL);

    // Fraction text below bar or on bar
    fill(60);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text(
        coveredItems.length + " of " + totalItems + " categories protected (" + nf(coveredFrac * 100, 1, 0) + "%)",
        x + w / 2, y + h + 2
    );
}

function mousePressed() {
    if (mouseY < headerHeight + topMargin + 28 || mouseY > drawHeight - summaryBarHeight - 6) return;

    let colWidth = (canvasWidth - columnGap - 24) / 2;
    let leftX = 12;
    let rightX = leftX + colWidth + columnGap;
    let clipY = headerHeight + topMargin + 28;

    let leftCards = layoutCards(coveredItems, leftX, clipY - scrollOffset, colWidth);
    let rightCards = layoutCards(notCoveredItems, rightX, clipY - scrollOffset, colWidth);

    // Check left column clicks
    for (let card of leftCards) {
        if (mouseX >= card.x && mouseX <= card.x + card.w &&
            mouseY >= max(card.y, clipY) && mouseY <= card.y + card.h) {
            card.item.expanded = !card.item.expanded;
            return;
        }
    }

    // Check right column clicks
    for (let card of rightCards) {
        if (mouseX >= card.x && mouseX <= card.x + card.w &&
            mouseY >= max(card.y, clipY) && mouseY <= card.y + card.h) {
            card.item.expanded = !card.item.expanded;
            return;
        }
    }
}

function mouseWheel(event) {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < drawHeight) {
        scrollOffset += event.delta;
        scrollOffset = constrain(scrollOffset, 0, maxScroll);
        return false;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

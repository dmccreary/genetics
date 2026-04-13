// CANVAS_HEIGHT: 550

document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
            fontSize: '16px',
            fontFamily: 'Arial, Helvetica, sans-serif'
        },
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 30,
            rankSpacing: 40
        }
    });

    // Wait for Mermaid to finish rendering
    mermaid.run().then(function () {
        attachHoverListeners();
    }).catch(function () {
        // Fallback: try after a short delay if run() isn't available
        setTimeout(attachHoverListeners, 1000);
    });
});

function attachHoverListeners() {
    const infoContent = document.getElementById('info-content');
    const defaultContent = infoContent.innerHTML;
    const nodes = document.querySelectorAll('.node');

    nodes.forEach(function (node) {
        // Extract the node ID from the Mermaid-generated element
        const nodeId = extractNodeId(node);
        if (!nodeId || !nodeInfo[nodeId]) return;

        node.style.cursor = 'pointer';

        node.addEventListener('mouseenter', function () {
            const info = nodeInfo[nodeId];
            infoContent.innerHTML =
                '<div class="info-title">' + info.title + '</div>' +
                '<div class="info-description">' + info.description + '</div>';
        });

        node.addEventListener('mouseleave', function () {
            infoContent.innerHTML = defaultContent;
        });
    });
}

function extractNodeId(node) {
    // Mermaid generates IDs like "flowchart-A-0", "flowchart-B-1", etc.
    const id = node.id || '';
    const match = id.match(/flowchart-([A-Z])-/);
    if (match) return match[1];

    // Fallback: check data-id attribute
    const dataId = node.getAttribute('data-id');
    if (dataId && nodeInfo[dataId]) return dataId;

    // Fallback: check for single-letter ID in the node id
    const simpleMatch = id.match(/^([A-Z])$/);
    if (simpleMatch) return simpleMatch[1];

    return null;
}

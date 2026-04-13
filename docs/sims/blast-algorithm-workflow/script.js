// CANVAS_HEIGHT: 550

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 30,
        rankSpacing: 40
    },
    themeVariables: {
        fontSize: '16px'
    }
});

// Wait for Mermaid to render, then attach hover listeners
mermaid.run().then(() => {
    attachNodeListeners();
});

function attachNodeListeners() {
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const defaultTitle = 'Hover over a node';
    const defaultDescription = 'Move your mouse over any node in the flowchart to learn more about that step in the BLAST algorithm.';

    // Select all Mermaid node groups
    const nodes = document.querySelectorAll('.mermaid .node');

    nodes.forEach(node => {
        // Extract the node ID from the data-id attribute or the id attribute
        let nodeId = node.getAttribute('data-id') || '';

        // Fallback: try to parse from the element id (e.g., "flowchart-A-0")
        if (!nodeId && node.id) {
            const match = node.id.match(/flowchart-([A-Z])-/);
            if (match) {
                nodeId = match[1];
            }
        }

        if (nodeId && nodeInfo[nodeId]) {
            node.addEventListener('mouseenter', () => {
                infoTitle.textContent = nodeInfo[nodeId].title;
                infoDescription.textContent = nodeInfo[nodeId].description;
            });

            node.addEventListener('mouseleave', () => {
                infoTitle.textContent = defaultTitle;
                infoDescription.textContent = defaultDescription;
            });
        }
    });
}

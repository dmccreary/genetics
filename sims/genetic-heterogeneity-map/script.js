// Genetic Heterogeneity Concept Map
// CANVAS_HEIGHT: 500
// vis-network MicroSim

// --- Color palette ---
var COLOR_PHENOTYPE = '#e74c3c';   // red
var COLOR_GENE      = '#3498db';   // blue
var COLOR_MUTATION  = '#27ae60';   // green
var COLOR_HIGHLIGHT = '#f1c40f';   // yellow highlight
var COLOR_DIM       = '#d5d5d5';   // dimmed

// --- Node definitions ---
var nodes = new vis.DataSet([
    // Central phenotype node
    { id: 1,  label: 'Same\nPhenotype',           color: { background: COLOR_PHENOTYPE, border: '#c0392b' }, font: { color: '#fff', size: 16, face: 'Arial', bold: true }, shape: 'ellipse', size: 35 },

    // Genetic heterogeneity umbrella
    { id: 2,  label: 'Genetic\nHeterogeneity',    color: { background: COLOR_GENE, border: '#2980b9' }, font: { color: '#fff', size: 14, face: 'Arial', bold: true }, shape: 'box', size: 30 },

    // Two sub-types
    { id: 3,  label: 'Locus\nHeterogeneity',      color: { background: COLOR_GENE, border: '#2980b9' }, font: { color: '#fff', size: 13, face: 'Arial' }, shape: 'box', size: 25 },
    { id: 4,  label: 'Allelic\nHeterogeneity',     color: { background: COLOR_GENE, border: '#2980b9' }, font: { color: '#fff', size: 13, face: 'Arial' }, shape: 'box', size: 25 },

    // Locus heterogeneity description
    { id: 5,  label: 'Mutations in\nDIFFERENT genes', color: { background: '#85c1e9', border: '#2980b9' }, font: { size: 12, face: 'Arial' }, shape: 'box' },

    // Allelic heterogeneity description
    { id: 6,  label: 'Mutations in\nSAME gene',       color: { background: '#85c1e9', border: '#2980b9' }, font: { size: 12, face: 'Arial' }, shape: 'box' },

    // Locus heterogeneity example: Hearing Loss
    { id: 7,  label: 'Hearing\nLoss',             color: { background: COLOR_PHENOTYPE, border: '#c0392b' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'ellipse', size: 20 },

    // Genes causing hearing loss
    { id: 8,  label: 'GJB2',                      color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },
    { id: 9,  label: 'SLC26A4',                   color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },
    { id: 10, label: 'MYO7A',                     color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },

    // Allelic heterogeneity example: Cystic Fibrosis
    { id: 11, label: 'Cystic\nFibrosis',          color: { background: COLOR_PHENOTYPE, border: '#c0392b' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'ellipse', size: 20 },

    // CFTR gene
    { id: 12, label: 'CFTR\nGene',                color: { background: COLOR_GENE, border: '#2980b9' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'box', size: 20 },

    // Mutations in CFTR
    { id: 13, label: '\u0394F508',                 color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },
    { id: 14, label: 'G551D',                     color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },
    { id: 15, label: 'R117H',                     color: { background: COLOR_MUTATION, border: '#1e8449' }, font: { color: '#fff', size: 12, face: 'Arial' }, shape: 'diamond', size: 18 },
]);

// --- Edge definitions ---
// Slight y-offsets on near-horizontal edges to fix vis-network label rendering
var edges = new vis.DataSet([
    // Core structure
    { from: 1, to: 2,  arrows: 'to', label: 'explained by',       font: { size: 11, align: 'top' }, color: '#555' },
    { from: 2, to: 3,  arrows: 'to', label: 'type 1',             font: { size: 11, align: 'top' }, color: '#555' },
    { from: 2, to: 4,  arrows: 'to', label: 'type 2',             font: { size: 11, align: 'top' }, color: '#555' },

    // Descriptions
    { from: 3, to: 5,  arrows: 'to', label: 'defined as',         font: { size: 10, align: 'top' }, color: '#888', dashes: true },
    { from: 4, to: 6,  arrows: 'to', label: 'defined as',         font: { size: 10, align: 'top' }, color: '#888', dashes: true },

    // Locus heterogeneity example
    { from: 3, to: 7,  arrows: 'to', label: 'example',            font: { size: 10, align: 'top' }, color: '#c0392b' },
    { from: 7, to: 8,  arrows: 'to', label: 'gene 1',             font: { size: 10, align: 'top' }, color: '#1e8449' },
    { from: 7, to: 9,  arrows: 'to', label: 'gene 2',             font: { size: 10, align: 'top' }, color: '#1e8449' },
    { from: 7, to: 10, arrows: 'to', label: 'gene 3',             font: { size: 10, align: 'top' }, color: '#1e8449' },

    // Allelic heterogeneity example
    { from: 4, to: 11, arrows: 'to', label: 'example',            font: { size: 10, align: 'top' }, color: '#c0392b' },
    { from: 11, to: 12, arrows: 'to', label: 'caused by\nmutations in', font: { size: 10, align: 'top' }, color: '#2980b9' },
    { from: 12, to: 13, arrows: 'to', label: 'mutation 1',        font: { size: 10, align: 'top' }, color: '#1e8449' },
    { from: 12, to: 14, arrows: 'to', label: 'mutation 2',        font: { size: 10, align: 'top' }, color: '#1e8449' },
    { from: 12, to: 15, arrows: 'to', label: 'mutation 3',        font: { size: 10, align: 'top' }, color: '#1e8449' },
]);

// --- Fixed positions for a clean layout ---
// Using slight y-offsets to avoid perfectly horizontal edges
var positions = {
    1:  { x: 0,    y: 0 },       // Same Phenotype (center)
    2:  { x: 0,    y: 110 },     // Genetic Heterogeneity
    3:  { x: -220, y: 220 },     // Locus Heterogeneity
    4:  { x: 220,  y: 225 },     // Allelic Heterogeneity (slight y-offset)
    5:  { x: -220, y: 320 },     // Different genes desc
    6:  { x: 220,  y: 325 },     // Same gene desc (slight y-offset)
    7:  { x: -220, y: 420 },     // Hearing Loss
    8:  { x: -340, y: 530 },     // GJB2
    9:  { x: -220, y: 535 },     // SLC26A4 (slight y-offset)
    10: { x: -100, y: 530 },     // MYO7A
    11: { x: 220,  y: 420 },     // Cystic Fibrosis
    12: { x: 220,  y: 530 },     // CFTR Gene
    13: { x: 100,  y: 640 },     // deltaF508
    14: { x: 220,  y: 645 },     // G551D (slight y-offset)
    15: { x: 340,  y: 640 },     // R117H
};

// Apply fixed positions to nodes
nodes.forEach(function(node) {
    if (positions[node.id]) {
        nodes.update({ id: node.id, x: positions[node.id].x, y: positions[node.id].y });
    }
});

// --- Create the network ---
var container = document.getElementById('network');
var data = { nodes: nodes, edges: edges };
var options = {
    interaction: {
        zoomView: false,
        dragView: false,
        navigationButtons: true,
        hover: true,
        tooltipDelay: 200
    },
    physics: {
        enabled: false
    },
    edges: {
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'vertical',
            roundness: 0.2
        },
        width: 2
    },
    nodes: {
        borderWidth: 2,
        shadow: {
            enabled: true,
            size: 4,
            x: 2,
            y: 2
        }
    }
};

var network = new vis.Network(container, data, options);

// Fit the network to view after stabilization
network.once('afterDrawing', function() {
    network.fit({ animation: false });
});

// --- Click-to-highlight ---
var allNodeIds = nodes.getIds();
var allEdgeIds = edges.getIds();

// Store original colors for restoration
var originalNodeColors = {};
nodes.forEach(function(node) {
    originalNodeColors[node.id] = {
        background: node.color.background,
        border: node.color.border
    };
});

var originalEdgeColors = {};
edges.forEach(function(edge) {
    originalEdgeColors[edge.id] = edge.color;
});

function highlightNode(selectedNodeId) {
    var connectedNodes = network.getConnectedNodes(selectedNodeId);
    var connectedEdges = network.getConnectedEdges(selectedNodeId);

    // Dim all nodes
    var nodeUpdates = [];
    allNodeIds.forEach(function(id) {
        if (id === selectedNodeId || connectedNodes.indexOf(id) !== -1) {
            nodeUpdates.push({
                id: id,
                color: {
                    background: originalNodeColors[id].background,
                    border: id === selectedNodeId ? COLOR_HIGHLIGHT : originalNodeColors[id].border
                },
                borderWidth: id === selectedNodeId ? 4 : 2
            });
        } else {
            nodeUpdates.push({
                id: id,
                color: { background: COLOR_DIM, border: COLOR_DIM },
                borderWidth: 1
            });
        }
    });
    nodes.update(nodeUpdates);

    // Dim all edges
    var edgeUpdates = [];
    allEdgeIds.forEach(function(id) {
        if (connectedEdges.indexOf(id) !== -1) {
            edgeUpdates.push({ id: id, color: originalEdgeColors[id], width: 3 });
        } else {
            edgeUpdates.push({ id: id, color: COLOR_DIM, width: 1 });
        }
    });
    edges.update(edgeUpdates);

    // Update info text
    var selectedNode = nodes.get(selectedNodeId);
    document.getElementById('node-info').textContent = 'Selected: ' + selectedNode.label.replace(/\n/g, ' ');
    document.getElementById('node-info').style.fontStyle = 'normal';
    document.getElementById('node-info').style.color = '#2c3e50';
}

function resetHighlight() {
    var nodeUpdates = [];
    allNodeIds.forEach(function(id) {
        nodeUpdates.push({
            id: id,
            color: {
                background: originalNodeColors[id].background,
                border: originalNodeColors[id].border
            },
            borderWidth: 2
        });
    });
    nodes.update(nodeUpdates);

    var edgeUpdates = [];
    allEdgeIds.forEach(function(id) {
        edgeUpdates.push({ id: id, color: originalEdgeColors[id], width: 2 });
    });
    edges.update(edgeUpdates);

    document.getElementById('node-info').textContent = 'Click a node to highlight its connections';
    document.getElementById('node-info').style.fontStyle = 'italic';
    document.getElementById('node-info').style.color = '#555';
}

network.on('click', function(params) {
    if (params.nodes.length > 0) {
        highlightNode(params.nodes[0]);
    } else {
        resetHighlight();
    }
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', function() {
    resetHighlight();
    network.fit({ animation: true });
});

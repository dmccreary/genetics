// Capstone Project Integration Map
// CANVAS_HEIGHT: 600
// vis-network MicroSim

// Color palette
var COLOR_CAPSTONE = '#6A1B9A';
var COLOR_OPTION_A = '#E65100';
var COLOR_OPTION_B = '#1565C0';
var COLOR_OPTION_C = '#2E7D32';
var COLOR_OPTION_D = '#C62828';
var COLOR_DIM = '#e0e0e0';
var COLOR_EDGE_DIM = '#eeeeee';

// Chapter-based concept colors (for dot nodes)
var CH_PROB   = '#FF8F00'; // Ch1 Probabilistic Reasoning
var CH_PED    = '#8E24AA'; // Ch2 Pedigree Analysis
var CH_EPIST  = '#00897B'; // Ch3 Epistasis
var CH_GENOME = '#5C6BC0'; // Ch4 Genome Structure
var CH_VAR    = '#E53935'; // Ch5 Genetic Variation
var CH_MAP    = '#43A047'; // Ch7 Genetic Mapping
var CH_GWAS   = '#1E88E5'; // Ch10 GWAS
var CH_REG    = '#F4511E'; // Ch11 Gene Regulation
var CH_EXP    = '#00ACC1'; // Ch13 Experimental Genetics
var CH_BIOINF = '#7B1FA2'; // Ch14 Bioinformatics
var CH_HUMAN  = '#C2185B'; // Ch15 Human Genetics
var CH_CANC   = '#6D4C41'; // Ch16 Cancer Genetics
var CH_ETHIC  = '#546E7A'; // Ch17 Ethics
var CH_QUANT  = '#FDD835'; // Ch9 Quantitative Genetics

// Nodes
var nodes = new vis.DataSet([
    // Central capstone node
    { id: 'cap', label: 'Capstone\nProject', shape: 'ellipse', color: { background: COLOR_CAPSTONE, border: '#4A148C' }, font: { color: '#fff', size: 16, bold: true }, size: 40 },

    // Four option nodes (box shape)
    { id: 'A', label: 'Option A:\nVariant Analysis', shape: 'box', color: { background: COLOR_OPTION_A, border: '#BF360C' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'B', label: 'Option B:\nGWAS Replication', shape: 'box', color: { background: COLOR_OPTION_B, border: '#0D47A1' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'C', label: 'Option C:\nGene Expression', shape: 'box', color: { background: COLOR_OPTION_C, border: '#1B5E20' }, font: { color: '#fff', size: 14, bold: true } },
    { id: 'D', label: 'Option D:\nEthical Analysis', shape: 'box', color: { background: COLOR_OPTION_D, border: '#B71C1C' }, font: { color: '#fff', size: 14, bold: true } },

    // Concept nodes (dot shape) - Option A connections
    { id: 'c_var',   label: 'Genetic\nVariation',      shape: 'dot', color: { background: CH_VAR },   size: 18, font: { size: 11 } },
    { id: 'c_bioinf',label: 'Bioinformatics\nTools',   shape: 'dot', color: { background: CH_BIOINF }, size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_genome',label: 'Genome\nStructure',       shape: 'dot', color: { background: CH_GENOME }, size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_human', label: 'Human\nGenetics',         shape: 'dot', color: { background: CH_HUMAN },  size: 18, font: { size: 11, color: '#fff' } },

    // Concept nodes - Option B connections
    { id: 'c_gwas',  label: 'GWAS\nMethods',           shape: 'dot', color: { background: CH_GWAS },   size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_quant', label: 'Quantitative\nGenetics',  shape: 'dot', color: { background: CH_QUANT },  size: 18, font: { size: 11 } },
    { id: 'c_prob',  label: 'Probabilistic\nReasoning', shape: 'dot', color: { background: CH_PROB },  size: 18, font: { size: 11 } },
    { id: 'c_map',   label: 'Genetic\nMapping',        shape: 'dot', color: { background: CH_MAP },    size: 18, font: { size: 11, color: '#fff' } },

    // Concept nodes - Option C connections
    { id: 'c_reg',   label: 'Gene\nRegulation',        shape: 'dot', color: { background: CH_REG },    size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_exp',   label: 'Experimental\nGenetics',  shape: 'dot', color: { background: CH_EXP },    size: 18, font: { size: 11 } },
    { id: 'c_epist', label: 'Epistasis &\nInteraction', shape: 'dot', color: { background: CH_EPIST }, size: 18, font: { size: 11, color: '#fff' } },

    // Concept nodes - Option D connections
    { id: 'c_ethic', label: 'Ethics &\nPolicy',        shape: 'dot', color: { background: CH_ETHIC },  size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_canc',  label: 'Cancer\nGenetics',        shape: 'dot', color: { background: CH_CANC },   size: 18, font: { size: 11, color: '#fff' } },
    { id: 'c_ped',   label: 'Pedigree\nAnalysis',      shape: 'dot', color: { background: CH_PED },    size: 18, font: { size: 11, color: '#fff' } },

    // Shared concept nodes (connected to multiple options)
    { id: 'c_bioinf2', label: 'Sequencing &\nAlignment', shape: 'dot', color: { background: CH_BIOINF }, size: 18, font: { size: 11, color: '#fff' } }
]);

// Edges with skill-type labels and slight y-offsets for horizontal rendering
var edges = new vis.DataSet([
    // Capstone to Options
    { from: 'cap', to: 'A', width: 3, color: { color: COLOR_OPTION_A }, smooth: { type: 'curvedCW', roundness: 0.1 } },
    { from: 'cap', to: 'B', width: 3, color: { color: COLOR_OPTION_B }, smooth: { type: 'curvedCW', roundness: 0.1 } },
    { from: 'cap', to: 'C', width: 3, color: { color: COLOR_OPTION_C }, smooth: { type: 'curvedCCW', roundness: 0.1 } },
    { from: 'cap', to: 'D', width: 3, color: { color: COLOR_OPTION_D }, smooth: { type: 'curvedCCW', roundness: 0.1 } },

    // Option A: Variant Analysis connections
    { from: 'A', to: 'c_var',    label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#E65100' } },
    { from: 'A', to: 'c_bioinf', label: 'computation',  font: { size: 10, align: 'top' }, color: { color: '#E65100' } },
    { from: 'A', to: 'c_genome', label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#E65100' } },
    { from: 'A', to: 'c_human',  label: 'application',  font: { size: 10, align: 'top' }, color: { color: '#E65100' } },

    // Option B: GWAS Replication connections
    { from: 'B', to: 'c_gwas',   label: 'computation',  font: { size: 10, align: 'top' }, color: { color: '#1565C0' } },
    { from: 'B', to: 'c_quant',  label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#1565C0' } },
    { from: 'B', to: 'c_prob',   label: 'statistics',   font: { size: 10, align: 'top' }, color: { color: '#1565C0' } },
    { from: 'B', to: 'c_map',    label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#1565C0' } },
    { from: 'B', to: 'c_bioinf2',label: 'computation',  font: { size: 10, align: 'top' }, color: { color: '#1565C0' } },

    // Option C: Gene Expression connections
    { from: 'C', to: 'c_reg',    label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#2E7D32' } },
    { from: 'C', to: 'c_exp',    label: 'experimental', font: { size: 10, align: 'top' }, color: { color: '#2E7D32' } },
    { from: 'C', to: 'c_epist',  label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#2E7D32' } },
    { from: 'C', to: 'c_bioinf2',label: 'computation',  font: { size: 10, align: 'top' }, color: { color: '#2E7D32' } },

    // Option D: Ethical Analysis connections
    { from: 'D', to: 'c_ethic',  label: 'ethics',       font: { size: 10, align: 'top' }, color: { color: '#C62828' } },
    { from: 'D', to: 'c_canc',   label: 'application',  font: { size: 10, align: 'top' }, color: { color: '#C62828' } },
    { from: 'D', to: 'c_human',  label: 'ethics',       font: { size: 10, align: 'top' }, color: { color: '#C62828' } },
    { from: 'D', to: 'c_ped',    label: 'analysis',     font: { size: 10, align: 'top' }, color: { color: '#C62828' } }
]);

// Store original colors for reset
var originalNodeColors = {};
nodes.forEach(function(n) { originalNodeColors[n.id] = n.color; });
var originalEdgeColors = {};
edges.forEach(function(e) { originalEdgeColors[e.id] = e.color; });

// Fixed positions for hierarchical-like layout (manual for better control)
// Capstone center, options in ring, concepts on outside
var positions = {
    'cap':      { x: 0,    y: 0 },
    'A':        { x: -300, y: -140 },
    'B':        { x: 300,  y: -140 },
    'C':        { x: -300, y: 150 },
    'D':        { x: 300,  y: 150 },
    // Option A concepts (upper-left)
    'c_var':    { x: -520, y: -250 },
    'c_bioinf': { x: -500, y: -110 },
    'c_genome': { x: -180, y: -280 },
    'c_human':  { x: -120, y: -170 },
    // Option B concepts (upper-right)
    'c_gwas':   { x: 520,  y: -250 },
    'c_quant':  { x: 500,  y: -110 },
    'c_prob':   { x: 180,  y: -280 },
    'c_map':    { x: 160,  y: -170 },
    // Option C concepts (lower-left)
    'c_reg':    { x: -520, y: 260 },
    'c_exp':    { x: -500, y: 120 },
    'c_epist':  { x: -180, y: 290 },
    // Option D concepts (lower-right)
    'c_ethic':  { x: 520,  y: 260 },
    'c_canc':   { x: 500,  y: 120 },
    'c_ped':    { x: 180,  y: 290 },
    // Shared node (between C and B, bottom center)
    'c_bioinf2': { x: 0, y: 290 }
};

// Apply slight y-offsets to avoid perfectly horizontal edges (vis-network label rendering bug)
// Shift nodes at y:-140 to y:-145 or y:-135 alternating
nodes.forEach(function(n) {
    if (positions[n.id]) {
        // Add slight offset to break horizontal symmetry
        var pos = positions[n.id];
        if (n.id === 'A') pos.y = -145;
        if (n.id === 'B') pos.y = -135;
        if (n.id === 'C') pos.y = 145;
        if (n.id === 'D') pos.y = 155;
        n.x = pos.x;
        n.y = pos.y;
    }
});

// Create network
var container = document.getElementById('network');
var data = { nodes: nodes, edges: edges };
var options = {
    interaction: {
        zoomView: false,
        dragView: false,
        navigationButtons: true,
        hover: true
    },
    physics: {
        enabled: false
    },
    edges: {
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'none',
            roundness: 0.2
        },
        width: 1.5
    },
    nodes: {
        borderWidth: 2,
        shadow: true
    }
};

var network = new vis.Network(container, data, options);

// Fit network to view after stabilization
network.once('afterDrawing', function() {
    network.fit({ animation: false });
});

// Click handler: highlight selected node and its connections
network.on('click', function(params) {
    if (params.nodes.length > 0) {
        highlightNode(params.nodes[0]);
    } else {
        resetHighlight();
    }
});

function highlightNode(nodeId) {
    var connectedNodes = network.getConnectedNodes(nodeId);
    var connectedEdges = network.getConnectedEdges(nodeId);

    // Dim all nodes
    var updatedNodes = [];
    nodes.forEach(function(n) {
        if (n.id === nodeId || connectedNodes.indexOf(n.id) !== -1) {
            updatedNodes.push({ id: n.id, color: originalNodeColors[n.id], opacity: 1.0 });
        } else {
            updatedNodes.push({ id: n.id, color: { background: COLOR_DIM, border: COLOR_DIM }, opacity: 0.3 });
        }
    });
    nodes.update(updatedNodes);

    // Dim all edges
    var updatedEdges = [];
    edges.forEach(function(e) {
        if (connectedEdges.indexOf(e.id) !== -1) {
            updatedEdges.push({ id: e.id, color: originalEdgeColors[e.id], width: 3 });
        } else {
            updatedEdges.push({ id: e.id, color: { color: COLOR_EDGE_DIM }, width: 0.5 });
        }
    });
    edges.update(updatedEdges);

    // Update info text
    var clickedNode = nodes.get(nodeId);
    document.getElementById('info-text').textContent =
        'Selected: ' + clickedNode.label.replace(/\n/g, ' ') + ' (' + connectedNodes.length + ' connections)';
}

function resetHighlight() {
    var updatedNodes = [];
    nodes.forEach(function(n) {
        updatedNodes.push({ id: n.id, color: originalNodeColors[n.id], opacity: 1.0 });
    });
    nodes.update(updatedNodes);

    var updatedEdges = [];
    edges.forEach(function(e) {
        updatedEdges.push({ id: e.id, color: originalEdgeColors[e.id], width: 1.5 });
    });
    edges.update(updatedEdges);

    document.getElementById('info-text').textContent = 'Click any node to highlight its connections';
}

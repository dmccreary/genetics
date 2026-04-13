// Systems Genetics Framework
// vis-network MicroSim

var nodes = new vis.DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
]);

var edges = new vis.DataSet([
    { from: 1, to: 2, arrows: 'to' },
    { from: 2, to: 3, arrows: 'to' },
]);

var container = document.getElementById('network');
var data = { nodes: nodes, edges: edges };
var options = {
    layout: { hierarchical: { direction: 'LR' } },
    physics: { enabled: false },
};
var network = new vis.Network(container, data, options);

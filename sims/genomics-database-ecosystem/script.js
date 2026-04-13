// Genomics Database Ecosystem - vis-network MicroSim
// CANVAS_HEIGHT: 550

// Database info for click interactions
var dbInfo = {
    ncbi: {
        title: "NCBI (National Center for Biotechnology Information)",
        text: "The largest hub for biological data. Hosts GenBank (DNA/RNA sequences), RefSeq (curated reference sequences), PubMed (biomedical literature), and dozens of interconnected databases. Serves as the primary US repository for nucleotide and protein sequences."
    },
    ensembl: {
        title: "Ensembl Genome Browser",
        text: "A joint project of EMBL-EBI and the Wellcome Sanger Institute. Provides genome assemblies, gene annotations, comparative genomics, and regulatory data for vertebrates and other eukaryotes. Known for its comprehensive automated annotation pipeline."
    },
    ucsc: {
        title: "UCSC Genome Browser",
        text: "An interactive web-based genome browser hosted by UC Santa Cruz. Offers hundreds of annotation tracks, custom track support, and tools like BLAT for sequence alignment. Widely used for visualizing genomic regions with layered annotations."
    },
    clinvar: {
        title: "ClinVar",
        text: "An NCBI archive of genomic variation and its relationship to human health. Aggregates reports of variant clinical significance from labs, researchers, and expert panels. Essential for clinical genetics and diagnostic interpretation."
    },
    dbsnp: {
        title: "dbSNP (Database of Single Nucleotide Polymorphisms)",
        text: "A public archive for short genetic variations including SNPs, indels, and microsatellites. Contains over 1 billion variants across multiple species. Assigns stable rs-number identifiers used universally in genetics research."
    },
    go: {
        title: "Gene Ontology (GO)",
        text: "A structured vocabulary and database describing gene functions across three domains: molecular function, biological process, and cellular component. Provides standardized annotations used across all model organisms and enables functional enrichment analysis."
    }
};

// Define nodes with size proportional to scope and color by type
var nodes = new vis.DataSet([
    {
        id: "ncbi",
        label: "NCBI",
        size: 50,
        color: { background: "#4A90D9", border: "#2E6DAF", highlight: { background: "#6AABEF", border: "#2E6DAF" } },
        font: { size: 18, color: "#fff", face: "Arial" },
        shape: "dot",
        x: 0, y: 0
    },
    {
        id: "ensembl",
        label: "Ensembl",
        size: 40,
        color: { background: "#5CB85C", border: "#3D8B3D", highlight: { background: "#7ED47E", border: "#3D8B3D" } },
        font: { size: 16, color: "#fff", face: "Arial" },
        shape: "dot",
        x: -250, y: -120
    },
    {
        id: "ucsc",
        label: "UCSC\nGenome\nBrowser",
        size: 35,
        color: { background: "#5CB85C", border: "#3D8B3D", highlight: { background: "#7ED47E", border: "#3D8B3D" } },
        font: { size: 13, color: "#fff", face: "Arial", multi: true },
        shape: "dot",
        x: 250, y: -120
    },
    {
        id: "clinvar",
        label: "ClinVar",
        size: 30,
        color: { background: "#D9534F", border: "#B52B27", highlight: { background: "#E8807D", border: "#B52B27" } },
        font: { size: 14, color: "#fff", face: "Arial" },
        shape: "dot",
        x: -200, y: 160
    },
    {
        id: "dbsnp",
        label: "dbSNP",
        size: 28,
        color: { background: "#D9534F", border: "#B52B27", highlight: { background: "#E8807D", border: "#B52B27" } },
        font: { size: 14, color: "#fff", face: "Arial" },
        shape: "dot",
        x: 200, y: 160
    },
    {
        id: "go",
        label: "Gene\nOntology",
        size: 32,
        color: { background: "#9B59B6", border: "#7D3C98", highlight: { background: "#BB84D1", border: "#7D3C98" } },
        font: { size: 13, color: "#fff", face: "Arial", multi: true },
        shape: "dot",
        x: 0, y: -200
    }
]);

// Define edges with labels showing data types exchanged
// Slight y-offsets applied via node positioning to avoid perfectly horizontal edges
var edges = new vis.DataSet([
    {
        from: "ncbi", to: "ensembl",
        label: "sequences",
        arrows: { to: { enabled: true, scaleFactor: 0.7 }, from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 2
    },
    {
        from: "ncbi", to: "ucsc",
        label: "assemblies",
        arrows: { to: { enabled: true, scaleFactor: 0.7 }, from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 2
    },
    {
        from: "ncbi", to: "clinvar",
        label: "variant reports",
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 2
    },
    {
        from: "ncbi", to: "dbsnp",
        label: "SNP data",
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 2
    },
    {
        from: "ensembl", to: "ucsc",
        label: "annotations",
        arrows: { to: { enabled: true, scaleFactor: 0.7 }, from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    },
    {
        from: "ensembl", to: "go",
        label: "gene functions",
        arrows: { from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    },
    {
        from: "ucsc", to: "dbsnp",
        label: "variant tracks",
        arrows: { from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    },
    {
        from: "clinvar", to: "dbsnp",
        label: "rs-numbers",
        arrows: { to: { enabled: true, scaleFactor: 0.7 }, from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    },
    {
        from: "ncbi", to: "go",
        label: "gene annotations",
        arrows: { to: { enabled: true, scaleFactor: 0.7 }, from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    },
    {
        from: "ensembl", to: "clinvar",
        label: "clinical variants",
        arrows: { from: { enabled: true, scaleFactor: 0.7 } },
        color: { color: "#888", highlight: "#555" },
        font: { size: 11, color: "#555", strokeWidth: 3, strokeColor: "#fff" },
        width: 1.5
    }
]);

// Create network
var container = document.getElementById("network");
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
    layout: {
        randomSeed: 42
    },
    edges: {
        smooth: {
            type: "curvedCW",
            roundness: 0.15
        }
    }
};

var network = new vis.Network(container, data, options);

// Fit the network after stabilization
network.once("afterDrawing", function () {
    network.fit({ animation: false });
});

// Click handler to show database info
network.on("click", function (params) {
    var infoTitle = document.getElementById("info-title");
    var infoText = document.getElementById("info-text");

    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        var info = dbInfo[nodeId];
        if (info) {
            infoTitle.textContent = info.title;
            infoText.textContent = info.text;
        }
    } else {
        infoTitle.textContent = "Click a database node";
        infoText.textContent = "Select any node to learn what the database stores and its role in the genomics ecosystem.";
    }
});

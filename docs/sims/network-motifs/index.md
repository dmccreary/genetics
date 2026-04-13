# Network Motifs

[Open Network Motifs Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0"></iframe>

## About This MicroSim

**Chapter 11:** Gene Regulation and Regulatory Networks

**Library:** vis-network

Type: Interactive network diagram
**sim-id:** network-motifs<br/>
**Library:** vis-network<br/>
**Status:** Specified

An interactive display of four network motifs: positive feedback loop, negative feedback loop, coherent feed-forward loop, and incoherent feed-forward loop. Each motif is shown as a small directed graph with colored nodes (genes) and edges (activation in green with arrowheads, repression in red with blunt ends). The user selects a motif from a dropdown menu. Below the graph, an animated time-series plot shows the expression levels of each gene in the selected motif over time, demonstrating the dynamic behavior (bistability for positive feedback, oscillation for negative feedback, delay/filtering for feed-forward). A "Pulse Signal" button triggers a transient input so the user can see how each motif responds.

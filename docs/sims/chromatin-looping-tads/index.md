# Chromatin Looping and TAD Organization

[Open Chromatin Looping and TAD Organization Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0"></iframe>

## About This MicroSim

**Chapter 4:** Genome Structure and Chromatin Organization

**Library:** p5.js

Type: Interactive diagram
**sim-id:** chromatin-looping-tads<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive visualization of a genomic region showing two adjacent TADs separated by a CTCF-marked boundary. Within each TAD, colored arcs represent chromatin loops connecting enhancers to promoters. Users can click on a CTCF boundary element to "delete" it, at which point the two TADs merge and an enhancer from the left TAD incorrectly activates a gene in the right TAD (shown by a new arc appearing in red, representing enhancer hijacking). A toggle allows users to switch between a linear genome view and a 3D-style circular contact map view. Include labels for cohesin rings, CTCF proteins, enhancers, and promoters.

# BLAST Algorithm Workflow

[Open BLAST Algorithm Workflow Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0"></iframe>

## About This MicroSim

**Chapter 14:** Genomics, Sequencing, and Bioinformatics

**Library:** Mermaid

Type: flowchart
**sim-id:** blast-algorithm-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

A flowchart showing the three phases of the BLAST algorithm: (1) Seeding phase -- query broken into k-mer words, exact matches found in database index; (2) Extension phase -- seed matches extended bidirectionally using dynamic programming, low-scoring extensions dropped; (3) Evaluation phase -- surviving alignments scored, E-values calculated, results ranked. Include example input (query sequence) and output (ranked hit list with E-values).

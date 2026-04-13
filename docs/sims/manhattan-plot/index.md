# Interactive Manhattan Plot

[Open Interactive Manhattan Plot Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0"></iframe>

## About This MicroSim

**Chapter 10:** GWAS and Population Genetics

**Library:** Chart.js or Plotly

Type: Interactive visualization
**sim-id:** manhattan-plot<br/>
**Library:** Chart.js or Plotly<br/>
**Status:** Specified

A simulated Manhattan plot showing 22 autosomes with alternating colors. Each chromosome has scattered points (simulated SNPs) with most clustered at low -log10(p) values (1-3). Three to five "peaks" rise above the genome-wide significance line (drawn at -log10(5×10^-8) = 7.3). Hovering over a peak displays a tooltip with the SNP ID, chromosome, position, p-value, and nearest gene. A slider controls the number of simulated significant loci (1-10). A checkbox toggles a suggestive significance line at -log10(1×10^-5) = 5.

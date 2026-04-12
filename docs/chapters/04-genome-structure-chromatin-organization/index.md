---
title: Genome Structure and Chromatin Organization
description: Explores genome organization from nucleosomes to chromosome territories, chromatin remodeling, histone modifications, epigenetic mechanisms, and higher-order chromatin architecture.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Genome Structure and Chromatin Organization

## Summary

This chapter explores the physical organization of the genome from the nucleosome level to chromosome territories, including chromatin remodeling, histone modifications, epigenetic mechanisms, and higher-order chromatin architecture. Students examine how X-inactivation, DNA methylation, and chromatin states regulate genome function. After completing this chapter, students will understand how genome structure influences gene accessibility and expression.

## Concepts Covered

This chapter covers the following 28 concepts from the learning graph:

1. Genome Organization
2. Chromosome Structure
3. Euchromatin
4. Heterochromatin
5. Constitutive Heterochromatin
6. Facultative Heterochromatin
7. Centromere Structure
8. Telomere Structure
9. Chromatin
10. Nucleosome
11. Histone Proteins
12. Histone Modifications
13. Histone Acetylation
14. Histone Methylation
15. Chromatin Remodeling
16. CpG Islands
17. Epigenetics
18. DNA Methylation
19. Epigenetic Inheritance
20. X-Inactivation
21. Dosage Compensation
22. Barr Body
23. Chromatin State
24. Open Chromatin
25. Closed Chromatin
26. Bivalent Chromatin
27. Chromatin Looping
28. Topologically Assoc Domain

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Welcome to Genome Structure!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome, fellow investigators! In this chapter, we zoom inside the nucleus to explore how DNA is packaged, organized, and regulated. Let's look at the evidence for how genome structure shapes gene expression!

## Introduction: Why Genome Organization Matters

If you stretched out all the DNA from a single human cell, it would measure roughly two meters in length. Yet this DNA fits inside a nucleus only about six micrometers in diameter. This extraordinary feat of packaging is not random. The way DNA is organized within the nucleus directly influences which genes can be read by the cell's molecular machinery and which genes remain silent. **Genome organization** refers to the complete arrangement of genetic material within a cell, encompassing the linear sequence of DNA, its three-dimensional folding, and the proteins that package it.

Understanding genome organization is foundational because structure dictates function. A gene buried deep in tightly packed DNA behaves very differently from one sitting in a loosely coiled, accessible region. Throughout this chapter, we will build from the smallest unit of DNA packaging up to the large-scale architecture of the nucleus.

## The Architecture of Chromosomes

### Chromosome Structure

A **chromosome** is a single, continuous molecule of DNA complexed with proteins that compact and organize it. Human cells contain 46 chromosomes arranged in 23 pairs. Each chromosome has three essential structural elements: a **centromere** that facilitates chromosome segregation during cell division, **telomeres** that cap and protect each end, and **origins of replication** where DNA copying begins.

**Centromere structure** deserves special attention. The centromere is the constricted region of a chromosome where the kinetochore assembles, a protein complex that attaches to spindle fibers during mitosis and meiosis. Human centromeres contain highly repetitive DNA sequences called alpha-satellite DNA, organized into arrays that can span millions of base pairs. The centromere divides a chromosome into a short arm (designated "p" for *petit*) and a long arm (designated "q").

**Telomere structure** is equally important. Telomeres consist of short, tandemly repeated DNA sequences, specifically TTAGGG in humans, that are added by the enzyme telomerase. These repetitive caps prevent chromosome ends from being recognized as broken DNA, which would trigger repair mechanisms and cause chromosome fusions. Telomeres shorten with each cell division in most somatic cells, a process linked to cellular aging.

| Chromosome Feature | Function | Key Sequences |
|---|---|---|
| Centromere | Spindle fiber attachment during division | Alpha-satellite repeats |
| Telomere | End protection, prevents fusion | TTAGGG repeats (humans) |
| Origin of replication | Initiates DNA copying | AT-rich sequences |
| p arm | Short arm of chromosome | Variable gene content |
| q arm | Long arm of chromosome | Variable gene content |

## Chromatin: The DNA-Protein Complex

### What Is Chromatin?

**Chromatin** is the complex of DNA and proteins that makes up chromosomes. The primary proteins in chromatin are histones, although many non-histone proteins also contribute to its organization and function. Chromatin is not static; it is a dynamic structure that can shift between tightly packed and loosely coiled forms depending on the cell's needs.

### The Nucleosome: The Basic Unit of Packaging

The fundamental repeating unit of chromatin is the **nucleosome**. A nucleosome consists of approximately 147 base pairs of DNA wrapped 1.65 times around a disc-shaped core of eight **histone proteins**. This core contains two copies each of histones H2A, H2B, H3, and H4, forming what is called the histone octamer. A fifth histone, H1, binds the linker DNA between nucleosomes and helps stabilize higher-order chromatin folding.

The wrapping of DNA around nucleosomes achieves approximately a seven-fold compaction of DNA length. This is just the first level of packaging. Nucleosomes are further organized into a fiber approximately 30 nanometers in diameter, and this fiber is arranged into loops and higher-order structures that ultimately produce the compact metaphase chromosome visible under a light microscope.

#### Diagram: Nucleosome Structure and DNA Packaging Levels
<iframe src="../../sims/nucleosome-packaging/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Nucleosome Structure and DNA Packaging Levels</summary>
Type: Interactive diagram
**sim-id:** nucleosome-packaging<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive diagram showing the hierarchical levels of DNA packaging: bare DNA double helix (2nm) wrapping around the histone octamer to form a nucleosome (11nm), the "beads on a string" arrangement, the 30nm chromatin fiber, looped domains (300nm), and metaphase chromosome (1400nm). Users can click through each level to see a zoomed view. Labels indicate compaction ratios at each level. The histone octamer should show H2A, H2B, H3, and H4 subunits in distinct colors, with H1 linker histone visible between nucleosomes.
</details>

!!! mascot-thinking "Think About It"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    The histone octamer has a net positive charge due to abundant lysine and arginine residues. Why does this matter? DNA carries a strong negative charge from its phosphate backbone. Opposite charges attract, holding DNA tightly around the histone core. What might happen if we reduce those positive charges?

## Euchromatin and Heterochromatin

Not all chromatin looks or behaves the same. When scientists first stained chromosomes, they noticed two distinct types based on how densely they absorbed dye.

**Euchromatin** is loosely packed chromatin that stains lightly. It is gene-rich and transcriptionally active or poised for activation. Most protein-coding genes reside in euchromatic regions. Euchromatin tends to be located in the interior of the nucleus and replicates early during S phase of the cell cycle.

**Heterochromatin** is densely packed chromatin that stains darkly. It is generally gene-poor and transcriptionally silent. Heterochromatin tends to localize near the nuclear periphery and replicates late in S phase. Scientists further divide heterochromatin into two categories based on its behavior.

**Constitutive heterochromatin** remains condensed in all cell types and at all developmental stages. It consists mainly of repetitive DNA sequences, such as those found at centromeres and telomeres. Constitutive heterochromatin plays structural roles and is rarely transcribed.

**Facultative heterochromatin**, in contrast, is chromatin that can switch between condensed and open states depending on the cell type or developmental context. A gene packaged as facultative heterochromatin in a liver cell might be open and active in a neuron. The most dramatic example of facultative heterochromatin is the inactive X chromosome in female mammals, which we will discuss later in this chapter.

| Property | Euchromatin | Heterochromatin |
|---|---|---|
| Packaging density | Loosely packed | Tightly packed |
| Staining | Light | Dark |
| Gene density | High | Low |
| Transcriptional activity | Active or poised | Generally silent |
| Replication timing | Early S phase | Late S phase |
| Nuclear position | Interior | Periphery |

## Histone Modifications: The Histone Code

### How Histones Are Modified

Histone proteins are not passive spools for DNA. Their N-terminal tails extend outward from the nucleosome core, and specific amino acid residues on these tails can be chemically modified. These **histone modifications** act as molecular signals that recruit proteins to alter chromatin structure or gene activity. The most common modifications include acetylation, methylation, phosphorylation, and ubiquitination.

### Histone Acetylation

**Histone acetylation** is the addition of an acetyl group (\(-COCH_3\)) to lysine residues on histone tails, catalyzed by enzymes called histone acetyltransferases (HATs). Acetylation neutralizes the positive charge on lysine, weakening the electrostatic interaction between the histone and DNA. This loosens chromatin structure and is strongly associated with transcriptional activation.

The reverse reaction, removal of acetyl groups, is performed by histone deacetylases (HDACs). HDACs restore the positive charge, tighten DNA-histone binding, and promote gene silencing. Many cancer drugs target HDACs to reactivate silenced tumor suppressor genes.

### Histone Methylation

**Histone methylation** is the addition of one, two, or three methyl groups (\(-CH_3\)) to lysine or arginine residues on histone tails by histone methyltransferases (HMTs). Unlike acetylation, methylation does not change the charge of the residue. Instead, its effect depends entirely on which residue is modified and how many methyl groups are added.

For example, trimethylation of lysine 4 on histone H3 (written H3K4me3) is associated with active gene promoters. In contrast, trimethylation of lysine 27 on histone H3 (H3K27me3) is associated with gene silencing. This context-dependent behavior is a key reason scientists describe histone modifications as a "code" rather than a simple on/off switch.

| Modification | Enzyme | Effect on Transcription | Mechanism |
|---|---|---|---|
| H3K4me3 | SET1/MLL methyltransferases | Activation | Marks active promoters |
| H3K27me3 | PRC2 (Polycomb) | Silencing | Recruits Polycomb repressors |
| H3K9me3 | SUV39H methyltransferases | Silencing | Marks constitutive heterochromatin |
| H3/H4 acetylation | HATs (p300, CBP) | Activation | Loosens DNA-histone contacts |
| H3K36me3 | SETD2 | Activation | Marks transcribed gene bodies |

### Chromatin Remodeling

Beyond covalent histone modifications, cells use ATP-dependent **chromatin remodeling** complexes to physically reposition, eject, or restructure nucleosomes along the DNA. These large molecular machines use the energy of ATP hydrolysis to slide nucleosomes along the DNA strand, temporarily unwrap DNA from the histone core, or swap standard histones for variant histones with different properties.

The four major families of chromatin remodelers are SWI/SNF, ISWI, CHD, and INO80. Each family has distinct activities, but together they allow the cell to dynamically expose or conceal specific DNA sequences. Chromatin remodeling is essential for transcription, DNA replication, and DNA repair, since all of these processes require direct access to the DNA double helix.

!!! mascot-tip "Practical Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    When reading research papers, pay attention to the specific histone modification notation. H3K27me3 means histone H3, lysine (K) at position 27, trimethylated (me3). This shorthand tells you exactly which residue is modified and how, which determines whether the mark activates or silences a gene.

## Epigenetics and DNA Methylation

### Defining Epigenetics

**Epigenetics** is the study of heritable changes in gene expression that do not involve changes to the DNA sequence itself. Epigenetic mechanisms include histone modifications (discussed above), DNA methylation, and non-coding RNA regulation. These mechanisms allow cells with identical DNA to have vastly different identities, which is why a neuron behaves nothing like a skin cell despite containing the same genome.

### DNA Methylation

**DNA methylation** is the addition of a methyl group to the 5-carbon position of cytosine bases, primarily at CG dinucleotides (often written CpG, where "p" denotes the phosphodiester bond between cytosine and guanine). The enzymes responsible are DNA methyltransferases (DNMTs). DNMT3A and DNMT3B establish new methylation patterns (*de novo* methylation), while DNMT1 copies existing methylation patterns to newly synthesized DNA strands during replication (maintenance methylation).

DNA methylation at gene promoters is strongly associated with transcriptional silencing. The methyl groups can directly block transcription factor binding or recruit methyl-CpG-binding proteins that in turn recruit histone deacetylases and other repressive complexes. This creates a reinforcing loop: DNA methylation promotes histone deacetylation, which promotes further chromatin compaction.

### CpG Islands

**CpG islands** are genomic regions of at least 200 base pairs with a GC content greater than 50% and an observed-to-expected CpG ratio greater than 0.6. Approximately 70% of human gene promoters overlap with CpG islands. In normal cells, CpG islands at active gene promoters are typically unmethylated, allowing gene expression. Aberrant methylation of CpG islands is a hallmark of many cancers, silencing tumor suppressor genes without any mutation in the DNA sequence.

The following equation expresses the observed-to-expected CpG ratio used to identify CpG islands:

\[
\text{CpG ratio} = \frac{N_{\text{CpG}} \times L}{N_C \times N_G}
\]

where \(N_{\text{CpG}}\) is the number of CpG dinucleotides, \(L\) is the length of the region, \(N_C\) is the number of cytosines, and \(N_G\) is the number of guanines.

#### Diagram: DNA Methylation and Gene Silencing
<iframe src="../../sims/dna-methylation-silencing/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>DNA Methylation and Gene Silencing</summary>
Type: Interactive diagram
**sim-id:** dna-methylation-silencing<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive diagram showing a gene promoter region with CpG dinucleotides. Users toggle methylation on/off for individual CpG sites using checkboxes. When a CpG is unmethylated, the promoter appears open (green), transcription factors bind, and an mRNA molecule is produced. As CpGs become methylated (shown with red methyl group markers), methyl-binding proteins appear, histone deacetylases are recruited, chromatin compacts, and transcription stops. A status bar shows the expression level decreasing as methylation increases. Include labels for DNMT enzymes, MBD proteins, and HDAC complexes.
</details>

### Epigenetic Inheritance

**Epigenetic inheritance** is the transmission of epigenetic marks from one cell generation to the next (mitotic inheritance) or, in some cases, from parent to offspring across generations (transgenerational inheritance). During DNA replication, the maintenance methyltransferase DNMT1 recognizes hemi-methylated CpG sites, where the old strand is methylated but the new strand is not, and copies the methyl mark to the new strand. This ensures that methylation patterns are faithfully propagated through cell division.

Transgenerational epigenetic inheritance is well documented in plants and has been observed in some animal models, though its extent in humans remains an active area of research. Classic examples include coat color variation in Agouti mice, where maternal diet affects DNA methylation at a retrotransposon that controls offspring coat color, without changing any DNA sequence.

## X-Inactivation and Dosage Compensation

### The Problem of Dosage

In mammals, females carry two X chromosomes (XX) while males carry one X and one Y (XY). Since the X chromosome contains over 800 protein-coding genes, females would produce twice as much X-linked gene product as males unless a compensating mechanism existed. **Dosage compensation** is the process that equalizes X-linked gene expression between the sexes.

### X-Inactivation

Mammals solve the dosage problem through **X-inactivation**, a process discovered by Mary Lyon in 1961. Early in female embryonic development, one of the two X chromosomes in each cell is randomly silenced. This inactivation is initiated by the XIST (X-inactive specific transcript) gene, which produces a long non-coding RNA that coats the X chromosome targeted for silencing. XIST RNA recruits Polycomb repressive complexes that deposit H3K27me3, followed by DNA methylation and other silencing modifications.

Once established, X-inactivation is stably maintained through all subsequent cell divisions. However, the choice of which X to silence is random and independent in each cell. As a result, adult females are genetic mosaics: some cells express genes from the maternal X, while others express genes from the paternal X. This mosaicism is beautifully visible in calico cats, where patches of orange and black fur correspond to cells that inactivated different X chromosomes.

### The Barr Body

The inactivated X chromosome forms a compact, darkly staining structure at the nuclear periphery called a **Barr body**, named after Murray Barr who first described it in 1949. The number of Barr bodies in a cell equals the number of X chromosomes minus one. Normal females have one Barr body, normal males have none, and individuals with XXX have two.

!!! mascot-thinking "Think About It"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    Calico cats are almost always female. What does the data tell us? The orange and black patches result from random X-inactivation in a cat heterozygous for an X-linked coat color gene. A male cat, with only one X, can be orange or black, but not both!

- **Key features of X-inactivation:**
    - Random choice in each cell during early development
    - Initiated by XIST long non-coding RNA
    - Involves H3K27me3, DNA methylation, and histone deacetylation
    - Stable through all subsequent cell divisions (clonal inheritance)
    - Results in genetic mosaicism in females
    - Approximately 15% of genes on the inactive X escape silencing

## Chromatin States: Open, Closed, and Bivalent

Chromatin exists on a spectrum from fully open to fully closed, and some regions occupy a special intermediate state.

### Open Chromatin

**Open chromatin** (also called accessible chromatin) is characterized by the absence of nucleosomes or the presence of loosely associated nucleosomes at regulatory regions like promoters and enhancers. Open chromatin is marked by histone acetylation and H3K4me3, and it is accessible to transcription factors and RNA polymerase. Techniques such as ATAC-seq and DNase-seq map open chromatin regions genome-wide by identifying DNA that is sensitive to enzymatic cleavage.

### Closed Chromatin

**Closed chromatin** is densely packed and inaccessible to transcription machinery. It is marked by H3K9me3 (constitutive heterochromatin) or H3K27me3 (facultative heterochromatin) and often associated with DNA methylation. Genes embedded in closed chromatin are silenced.

### Bivalent Chromatin

**Bivalent chromatin** is a remarkable state found primarily in embryonic stem cells, where both activating (H3K4me3) and repressive (H3K27me3) histone marks coexist on the same nucleosome or nearby nucleosomes. Bivalent domains typically mark developmental gene promoters. These genes are silenced in stem cells but "poised" for rapid activation or permanent silencing as the cell differentiates. Upon receiving a differentiation signal, one mark is removed: loss of the repressive mark leads to gene activation, while loss of the activating mark leads to stable silencing.

| Chromatin State | Key Marks | Transcription | Typical Location |
|---|---|---|---|
| Open | H3K4me3, H3/H4ac | Active | Gene promoters, enhancers |
| Closed (constitutive) | H3K9me3, DNA methylation | Silent | Centromeres, telomeres, repeats |
| Closed (facultative) | H3K27me3 | Silent, reversible | Developmental genes in wrong cell type |
| Bivalent | H3K4me3 + H3K27me3 | Poised (silent but ready) | Developmental genes in stem cells |

## Higher-Order Chromatin Architecture

### Chromatin Looping

Beyond the linear arrangement of nucleosomes and modifications, the genome folds into complex three-dimensional structures that bring distant DNA elements into close spatial proximity. **Chromatin looping** is a mechanism by which DNA forms loops that allow enhancers, which may be located hundreds of kilobases away from a gene, to make physical contact with gene promoters and activate transcription.

Looping is mediated by proteins such as cohesin (a ring-shaped complex that holds DNA strands together) and CTCF (CCCTC-binding factor, a zinc finger protein that binds specific DNA sequences and establishes loop boundaries). The interaction between CTCF binding sites and cohesin creates anchored loops that organize the genome into functional domains.

### Topologically Associating Domains

**Topologically associating domains** (TADs) are self-interacting genomic regions, typically 200 kilobases to 2 megabases in length, within which DNA sequences interact with each other much more frequently than with sequences outside the domain. TADs are defined by chromosome conformation capture techniques, particularly Hi-C, which measures the frequency of physical contacts between all pairs of genomic loci.

TADs serve as structural and functional units of genome organization. Genes and their regulatory elements tend to reside within the same TAD, ensuring proper gene regulation. The boundaries between TADs are enriched for CTCF binding sites, housekeeping genes, and other insulator elements. Disruption of TAD boundaries, for example by deletion or inversion of a CTCF binding site, can cause developmental abnormalities by allowing enhancers to inappropriately activate genes in a neighboring TAD, a phenomenon called "enhancer hijacking."

#### Diagram: Chromatin Looping and TAD Organization
<iframe src="../../sims/chromatin-looping-tads/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Chromatin Looping and TAD Organization</summary>
Type: Interactive diagram
**sim-id:** chromatin-looping-tads<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive visualization of a genomic region showing two adjacent TADs separated by a CTCF-marked boundary. Within each TAD, colored arcs represent chromatin loops connecting enhancers to promoters. Users can click on a CTCF boundary element to "delete" it, at which point the two TADs merge and an enhancer from the left TAD incorrectly activates a gene in the right TAD (shown by a new arc appearing in red, representing enhancer hijacking). A toggle allows users to switch between a linear genome view and a 3D-style circular contact map view. Include labels for cohesin rings, CTCF proteins, enhancers, and promoters.
</details>

!!! mascot-celebration "Section Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Excellent work, researchers! You have traveled from the double helix to the three-dimensional organization of the nucleus. Remember: genome structure is not just about packaging. It is a powerful regulatory mechanism that controls which genes are expressed, when, and where. Next, we will explore how variation arises across this organized landscape.

## Chapter Summary

In this chapter, we examined genome organization across multiple scales:

1. **Chromosome architecture** includes centromeres for segregation, telomeres for end protection, and arms defined by the centromere position.
2. **Chromatin and nucleosomes** provide the fundamental packaging unit, with ~147 bp of DNA wrapped around a histone octamer of H2A, H2B, H3, and H4.
3. **Euchromatin and heterochromatin** represent the two major chromatin states, with constitutive heterochromatin always condensed and facultative heterochromatin conditionally silenced.
4. **Histone modifications** such as acetylation and methylation serve as a combinatorial code that recruits effector proteins to activate or repress genes.
5. **Chromatin remodeling** complexes use ATP to physically reposition nucleosomes and regulate DNA accessibility.
6. **DNA methylation** at CpG sites, particularly at CpG islands in promoters, provides a stable mechanism for long-term gene silencing.
7. **Epigenetic inheritance** ensures that methylation patterns and chromatin states are propagated through cell division.
8. **X-inactivation** achieves dosage compensation in female mammals by silencing one X chromosome, forming a Barr body.
9. **Chromatin states** range from open (active) to closed (silent), with bivalent domains poised for rapid decisions in stem cells.
10. **Higher-order architecture** including chromatin looping and topologically associating domains organizes the genome in three dimensions to ensure proper enhancer-promoter communication.

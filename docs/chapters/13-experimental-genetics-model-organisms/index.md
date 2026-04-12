---
title: Experimental Genetics and Model Organisms
description: Forward and reverse genetic screens, model organisms, CRISPR gene editing, transgenic tools, and experimental design principles for genetic research.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Experimental Genetics and Model Organisms

## Summary

This chapter provides comprehensive coverage of experimental approaches in genetics, from classical forward and reverse genetic screens to modern CRISPR-based gene editing. Students learn about model organisms, mutagenesis strategies, knockout and knockdown techniques, transgenic tools, and experimental design principles. After completing this chapter, students will be able to evaluate and design genetic experiments using appropriate tools and organisms.

## Concepts Covered

This chapter covers the following 43 concepts from the learning graph:

1. Forward Genetics
2. Reverse Genetics
3. Mutagenesis Screen
4. Chemical Mutagenesis
5. EMS Mutagenesis
6. Insertional Mutagenesis
7. Saturation Mutagenesis
8. Enhancer Trap
9. Suppressor Screen
10. Modifier Screen
11. Genetic Mosaic Analysis
12. Clonal Analysis
13. Model Organism
14. Drosophila Genetics
15. Yeast Genetics
16. Mouse Genetics
17. C. Elegans Genetics
18. Zebrafish Genetics
19. Arabidopsis Genetics
20. Gene Knockout
21. Conditional Knockout
22. Knockdown
23. RNA Interference Screen
24. CRISPR-Cas9
25. Guide RNA Design
26. Gene Editing
27. Homology Directed Repair
28. NHEJ Repair
29. Base Editing
30. Prime Editing
31. Gene Drive
32. Transgenic Organism
33. Reporter Gene
34. GFP Reporter
35. Cre-Lox System
36. GAL4-UAS System
37. Transposon Mutagenesis
38. Functional Genomics
39. Phenotype Scoring
40. Genetic Interaction
41. Synthetic Lethality
42. Experimental Design
43. Hypothesis Testing

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)
- [Chapter 5: Genetic Variation and Genome Diversity](../05-genetic-variation-genome-diversity/index.md)
- [Chapter 10: GWAS and Population Genetics](../10-gwas-population-genetics/index.md)
- [Chapter 11: Gene Regulation and Regulatory Networks](../11-gene-regulation-regulatory-networks/index.md)
- [Chapter 12: Post-Transcriptional Regulation and Cell Identity](../12-post-transcriptional-regulation-cell-identity/index.md)

---

!!! mascot-welcome "Welcome to the Genetics Laboratory!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome, fellow investigators! As a fruit fly myself, I have a special place in my heart for this chapter. Model organisms like me have been helping scientists uncover the secrets of genetics for over a century. Let's look at the evidence and discover how researchers design experiments to reveal gene function!

## Introduction: Asking Questions About Genes

Genetics is fundamentally an experimental science. Researchers do not simply observe genomes and predict what genes do. Instead, they design experiments that systematically disrupt, modify, or track genes to understand their roles in living organisms. This chapter introduces the two major experimental strategies -- **forward genetics** and **reverse genetics** -- and the tools that make each approach possible.

Forward genetics begins with an observable trait (a phenotype) and works backward to identify the responsible gene. Reverse genetics starts with a known gene sequence and works forward to determine what that gene does in the organism. These complementary strategies, combined with powerful model organisms and modern gene editing technologies, form the backbone of experimental genetics.

Understanding experimental approaches is essential for interpreting the genomics data you will encounter in Chapter 14. Every gene annotation, every functional assignment in a database, traces back to an experiment someone designed and executed using the methods described here.

## Forward Genetics: From Phenotype to Gene

**Forward genetics** is the classical approach to gene discovery. The researcher creates random mutations across the genome, screens for organisms with altered phenotypes, and then identifies which gene was disrupted. This approach is powerful because it makes no assumptions about which genes are involved -- the screen is unbiased.

The logic of a **mutagenesis screen** follows a straightforward path: mutagenize a population, screen for interesting phenotypes, confirm that the phenotype is heritable, map the mutation to a chromosomal region, and identify the specific gene. Each step requires careful experimental design and appropriate controls.

### Chemical Mutagenesis

**Chemical mutagenesis** uses reactive chemicals to introduce point mutations throughout the genome. The most widely used chemical mutagen is **ethyl methanesulfonate (EMS)**, which alkylates guanine bases and causes G:C to A:T transitions during DNA replication. **EMS mutagenesis** is popular because it produces a high density of single-nucleotide changes distributed randomly across chromosomes.

Other chemical mutagens include N-ethyl-N-nitrosourea (ENU), which is particularly effective in mice, and nitrosoguanidine, used in bacterial genetics. The choice of mutagen depends on the organism, the desired mutation rate, and the types of mutations needed.

### Insertional and Transposon Mutagenesis

**Insertional mutagenesis** disrupts genes by inserting foreign DNA sequences into the genome. When a transposable element or engineered DNA construct lands within a gene, it typically abolishes gene function. The major advantage of insertional mutagenesis is that the inserted DNA serves as a molecular tag, making the disrupted gene easy to identify.

**Transposon mutagenesis** uses mobile genetic elements -- transposons -- as the insertional agent. In *Drosophila*, P-elements are the classic tool for this purpose. In bacteria, Tn elements serve a similar role. Because the inserted sequence is known, researchers can use inverse PCR or plasmid rescue to rapidly clone the flanking genomic DNA and identify the disrupted gene.

A specialized application of insertional mutagenesis is the **enhancer trap**, a construct containing a minimal promoter driving a reporter gene. When the enhancer trap inserts near a genomic enhancer, the reporter gene is expressed in the pattern dictated by that enhancer. This reveals where and when nearby genes are normally active, providing spatial and temporal expression information.

### Saturation Mutagenesis

**Saturation mutagenesis** aims to mutate every gene in the genome at least once. By screening very large numbers of mutagenized organisms, researchers can identify all genes required for a particular process. The pioneering Nusslein-Volhard and Wieschaus screen in *Drosophila* used saturation mutagenesis to identify the genes controlling embryonic body patterning -- work that earned the 1995 Nobel Prize in Physiology or Medicine.

The concept of saturation follows Poisson statistics. If each gene has an equal probability of being hit, the fraction of genes mutated at least once after screening \( n \) genomes is:

\[
P(\text{at least one hit}) = 1 - e^{-n \cdot \mu}
\]

where \( \mu \) is the per-gene mutation rate per genome. To achieve 95% saturation, researchers typically need to screen thousands to tens of thousands of mutagenized lines.

!!! mascot-thinking "Thinking Like a Geneticist"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    What does the data tell us? If you screen 5,000 mutagenized fly lines and find 15 genes required for wing development, how do you know you have found them all? Saturation analysis tells you whether additional screening would likely reveal new genes or just re-identify the same ones.

### Specialized Genetic Screens

Beyond simple loss-of-function screens, geneticists have developed sophisticated screening strategies that reveal how genes interact with each other.

A **suppressor screen** starts with an organism carrying a known mutation that causes a specific phenotype. The researcher then mutagenizes these organisms and looks for second-site mutations that suppress (reverse) the original phenotype. Suppressors often identify genes in the same pathway or protein complex as the original gene.

A **modifier screen** is similar but broader: it searches for mutations that either enhance or suppress a sensitized genetic background. **Modifier screens** can reveal genetic interactions that would be invisible in a wild-type background. For example, a mutation that has no visible phenotype on its own might dramatically worsen the phenotype of a specific sensitized mutant.

| Screen Type | Starting Material | What You Find | Biological Insight |
|---|---|---|---|
| Loss-of-function | Wild-type | Genes required for a process | Essential gene functions |
| Suppressor screen | Single mutant | Genes that rescue the phenotype | Pathway relationships |
| Modifier screen | Sensitized background | Enhancers and suppressors | Genetic interactions |
| Saturation screen | Wild-type (large scale) | All genes for a process | Pathway completeness |

### Genetic Mosaic and Clonal Analysis

Some genes are essential for viability, making it impossible to study their later functions in organisms that die without them. **Genetic mosaic analysis** solves this problem by creating organisms composed of two genetically distinct cell populations -- some cells are mutant while others are wild-type.

**Clonal analysis** is a specific form of mosaic analysis where a single mutant cell is generated in an otherwise wild-type organism, and researchers track the descendants (clone) of that cell. In *Drosophila*, the FLP/FRT system uses site-specific recombination to generate marked clones of homozygous mutant cells in a heterozygous animal. This reveals what a gene does in specific tissues and at specific developmental times without killing the organism.

## Model Organisms: Choosing the Right System

A **model organism** is a species chosen for experimental genetics because of practical advantages such as short generation time, small genome size, ease of genetic manipulation, and well-characterized biology. The choice of model organism shapes the questions a researcher can ask and the tools available to answer them.

The following table summarizes the key model organisms used in genetics research. Each organism offers distinct advantages, and many discoveries are validated across multiple species.

| Organism | Genome Size | Generation Time | Key Advantages | Classic Contributions |
|---|---|---|---|---|
| *Saccharomyces cerevisiae* (yeast) | 12 Mb | 2 hours | Haploid/diploid cycling, gene deletion collections | Cell cycle, DNA repair |
| *Drosophila melanogaster* (fruit fly) | 180 Mb | 10 days | Balancer chromosomes, GAL4-UAS, large-scale screens | Developmental genetics, homeotic genes |
| *Caenorhabditis elegans* (nematode) | 100 Mb | 3 days | Complete cell lineage, RNAi by feeding, transparent | Apoptosis, RNA interference |
| *Danio rerio* (zebrafish) | 1,400 Mb | 3 months | Transparent embryos, vertebrate, forward genetics | Organ development, regeneration |
| *Mus musculus* (mouse) | 2,700 Mb | 2 months | Mammalian, knockout technology, disease models | Cancer, immunology, neuroscience |
| *Arabidopsis thaliana* (plant) | 135 Mb | 6 weeks | Small plant genome, T-DNA insertion libraries | Plant development, hormone signaling |

### Drosophila Genetics

**Drosophila genetics** has contributed more fundamental discoveries to the field than perhaps any other organism. The fruit fly offers balancer chromosomes that prevent recombination and maintain lethal mutations in stock, the GAL4-UAS system for targeted gene expression, and a rich toolkit of genetic markers and mutant collections.

### Yeast Genetics

**Yeast genetics** exploits the ability of *Saccharomyces cerevisiae* to grow as either haploid or diploid cells. Researchers have created systematic gene deletion collections covering nearly every yeast gene, enabling genome-wide functional analysis. Yeast two-hybrid screens have mapped thousands of protein-protein interactions.

### Mouse Genetics

**Mouse genetics** provides the closest model for human disease among standard laboratory organisms. Gene targeting by homologous recombination in embryonic stem cells enables precise **gene knockout** creation. The mouse is essential for studying mammalian development, immunology, neuroscience, and cancer.

### C. Elegans Genetics

**C. elegans genetics** benefits from the complete cell lineage map of this transparent nematode -- every cell division from fertilized egg to adult has been traced. The discovery that double-stranded RNA triggers gene silencing (RNA interference) was made in *C. elegans*, earning Andrew Fire and Craig Mello the 2006 Nobel Prize.

### Zebrafish Genetics

**Zebrafish genetics** combines the advantages of a vertebrate body plan with transparent embryos that develop externally. Researchers can watch organ formation in real time under a microscope. Large-scale forward genetic screens in zebrafish have identified hundreds of genes required for vertebrate development.

### Arabidopsis Genetics

**Arabidopsis genetics** provides the primary model for plant biology. With a small genome of only 135 megabases and extensive T-DNA insertion mutant collections, *Arabidopsis thaliana* enables systematic analysis of plant gene function, hormone signaling, and responses to environmental stress.

!!! mascot-tip "Choosing Your Model"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    When reading a genetics paper, always ask: why did the researchers choose this particular organism? The model shapes the experiment. A question about vertebrate organ regeneration calls for zebrafish. A question about cell cycle control calls for yeast. Matching the question to the organism is a core skill in experimental genetics.

## Reverse Genetics: From Gene to Function

**Reverse genetics** starts with a known gene and asks: what does this gene do? Rather than screening for random mutations, the researcher deliberately targets a specific gene for disruption or modification and observes the phenotypic consequences.

### Gene Knockouts and Conditional Knockouts

A **gene knockout** is an organism in which a specific gene has been completely inactivated. In mice, traditional knockouts are created by replacing the target gene with a selectable marker through homologous recombination in embryonic stem cells. The resulting heterozygous mice are bred to produce homozygous knockouts.

However, many genes are essential for embryonic development, and complete knockouts are lethal. A **conditional knockout** solves this problem by flanking the target gene with loxP sites (a "floxed" allele) and using the **Cre-lox system** to delete the gene only in specific tissues or at specific times. The Cre recombinase, expressed from a tissue-specific promoter, recognizes the loxP sites and excises the DNA between them.

The **Cre-lox system** works as follows:

1. Two short loxP sequences (34 base pairs each) are inserted flanking the target gene
2. Cre recombinase, expressed from a chosen promoter, recognizes the loxP sites
3. Cre catalyzes recombination between the two loxP sites, excising the intervening DNA
4. The gene is deleted only in cells where Cre is expressed

This approach allows researchers to study essential genes in specific tissues without causing lethality, and to study gene function at specific developmental stages.

### Knockdown Approaches

A **knockdown** reduces gene expression without completely eliminating it. The most common knockdown method is **RNA interference (RNAi)**, which uses small double-stranded RNA molecules to trigger degradation of complementary mRNA transcripts.

An **RNA interference screen** applies RNAi systematically to many genes -- sometimes every gene in the genome -- to identify those required for a particular cellular process. In *C. elegans*, RNAi can be delivered simply by feeding worms bacteria that express double-stranded RNA, making genome-wide screens remarkably efficient.

Advantages and limitations of knockouts versus knockdowns:

- **Knockouts** provide complete loss of function but may cause lethality or compensation
- **Knockdowns** allow partial reduction and temporal control but may have incomplete penetrance
- **Conditional knockouts** combine the completeness of knockouts with spatial and temporal control

### The GAL4-UAS System

The **GAL4-UAS system** is a powerful tool in *Drosophila* genetics for controlling when and where a gene is expressed. The system has two components: a GAL4 driver line expressing the yeast transcription factor GAL4 under the control of a tissue-specific promoter, and a UAS responder line carrying the gene of interest downstream of GAL4-binding upstream activating sequences (UAS).

When the two lines are crossed, GAL4 binds to UAS and activates transcription of the downstream gene only in the tissues where GAL4 is expressed. This modular system allows any gene to be expressed in any pattern simply by choosing the appropriate GAL4 driver line.

## CRISPR-Cas9 and Modern Gene Editing

**CRISPR-Cas9** has revolutionized experimental genetics by providing a simple, efficient, and programmable system for **gene editing** in virtually any organism. The system uses a guide RNA (gRNA) to direct the Cas9 nuclease to a specific genomic location, where it creates a double-strand break.

### How CRISPR-Cas9 Works

The CRISPR-Cas9 system requires two components: the Cas9 protein (a DNA endonuclease) and a **guide RNA** that contains a 20-nucleotide sequence complementary to the target site. **Guide RNA design** is critical -- the 20-nucleotide targeting sequence must be unique in the genome and must be adjacent to a protospacer adjacent motif (PAM), typically NGG for *Streptococcus pyogenes* Cas9.

After Cas9 creates a double-strand break, the cell repairs the damage through one of two major pathways:

**NHEJ repair** (non-homologous end joining) is error-prone and often introduces small insertions or deletions (indels) at the cut site. These indels frequently disrupt the reading frame of a gene, creating a functional knockout. NHEJ is the default repair pathway and requires no additional components beyond the Cas9 and guide RNA.

**Homology directed repair (HDR)** uses a supplied DNA template with sequences homologous to the regions flanking the cut site. By providing an engineered template, researchers can introduce precise changes -- point mutations, epitope tags, fluorescent protein fusions, or entirely new sequences -- at the target locus. HDR is less efficient than NHEJ but enables precise genome engineering.

#### Diagram: CRISPR-Cas9 Repair Pathways
<iframe src="../../sims/crispr-repair-pathways/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>CRISPR-Cas9 Repair Pathways</summary>
Type: flowchart
**sim-id:** crispr-repair-pathways<br/>
**Library:** Mermaid<br/>
**Status:** Specified

A flowchart showing the two repair pathways after CRISPR-Cas9 creates a double-strand break. Left branch: NHEJ pathway leading to random indels and gene disruption. Right branch: HDR pathway using a donor template leading to precise edits (point mutations, insertions, or gene replacements). Include decision point about whether a repair template is provided.
</details>

### Advanced Gene Editing Technologies

**Base editing** allows single-nucleotide changes without creating double-strand breaks. Base editors fuse a catalytically impaired Cas9 (which still binds DNA but does not cut both strands) to a deaminase enzyme that chemically converts one base to another. Cytosine base editors convert C to T, while adenine base editors convert A to G. This approach avoids the unpredictable indels of NHEJ and does not require a donor template.

**Prime editing** is an even more versatile approach that can install any point mutation, small insertion, or small deletion without double-strand breaks or donor templates. Prime editors fuse Cas9 nickase to a reverse transcriptase and use an extended guide RNA (called a pegRNA) that encodes both the target site and the desired edit. The reverse transcriptase copies the new sequence directly into the genome.

| Editing Method | Creates DSB? | Template Needed? | Edit Types | Efficiency |
|---|---|---|---|---|
| CRISPR knockout (NHEJ) | Yes | No | Indels, frameshifts | High |
| CRISPR knock-in (HDR) | Yes | Yes | Any precise edit | Low-moderate |
| Base editing | No | No | C-to-T or A-to-G transitions | Moderate-high |
| Prime editing | No | No | Any small edit | Low-moderate |

### Gene Drives

A **gene drive** is a genetic element engineered to spread through a population at rates faster than normal Mendelian inheritance. CRISPR-based gene drives work by encoding both Cas9 and a guide RNA on the same DNA element. When a gene drive heterozygote reproduces, the CRISPR system cuts the wild-type chromosome and the gene drive copies itself onto the repaired chromosome, converting heterozygotes to homozygotes.

Gene drives have been proposed for controlling mosquito populations that transmit malaria, but they raise significant ecological and ethical concerns because they could permanently alter wild populations.

!!! mascot-warning "Proceed with Caution"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie looking cautious">
    Gene drives are one of the most powerful and controversial applications of CRISPR technology. Because they can spread through wild populations and are difficult to reverse, gene drive research requires strict biosafety containment and broad societal discussion before any environmental release.

## Transgenic Tools and Reporter Systems

A **transgenic organism** carries foreign DNA that has been stably integrated into its genome. Transgenic technology enables researchers to express genes in new patterns, track cell lineages, visualize protein localization, and create disease models.

### Reporter Genes and GFP

A **reporter gene** encodes a protein whose activity is easily detected, allowing researchers to monitor gene expression patterns. Common reporters include beta-galactosidase (lacZ), luciferase, and fluorescent proteins.

The **GFP reporter** (green fluorescent protein, originally from the jellyfish *Aequorea victoria*) is the most widely used reporter in modern genetics. GFP fluoresces green when exposed to blue light and requires no substrates or cofactors. By fusing GFP to a promoter of interest, researchers can visualize where and when that gene is expressed in living organisms. Fusing GFP directly to a protein of interest reveals the protein's subcellular localization in real time.

Variants of GFP now span the visible spectrum -- yellow (YFP), cyan (CFP), and red (mCherry) fluorescent proteins enable simultaneous tracking of multiple genes or proteins in the same cell.

## Functional Genomics and Genetic Interactions

**Functional genomics** aims to determine the function of every gene in an organism's genome. Rather than studying genes one at a time, functional genomics uses systematic, genome-wide approaches.

**Phenotype scoring** is the systematic observation and recording of traits in mutant organisms. Careful phenotype scoring requires standardized conditions, appropriate controls, and often quantitative measurements rather than subjective descriptions.

### Genetic Interactions and Synthetic Lethality

A **genetic interaction** occurs when the combined effect of mutations in two genes differs from what you would predict based on each single mutation alone. Genetic interactions reveal functional relationships between genes -- whether they act in the same pathway, parallel pathways, or opposing pathways.

**Synthetic lethality** is a particularly important type of genetic interaction: two genes are synthetically lethal when mutation of either gene alone is viable but mutation of both genes simultaneously causes cell death. Synthetic lethality demonstrates that the two genes provide redundant or compensatory functions.

Synthetic lethality has major clinical implications. In cancer, tumor cells often carry mutations in DNA repair genes. If a second repair pathway can be identified as synthetically lethal with the first, drugs targeting that second pathway will selectively kill cancer cells while sparing normal cells. The success of PARP inhibitors in BRCA-mutant cancers is a direct application of synthetic lethality.

#### Diagram: Synthetic Lethality
<iframe src="../../sims/synthetic-lethality/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Synthetic Lethality</summary>
Type: concept diagram
**sim-id:** synthetic-lethality<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive diagram showing the concept of synthetic lethality. Display a 2x2 grid representing combinations of wild-type and mutant alleles for Gene A and Gene B. Three quadrants (WT/WT, mut/WT, WT/mut) show viable cells (green). The fourth quadrant (mut/mut) shows cell death (red with X). Include toggles to show the parallel pathway model: when either pathway functions, the cell survives; when both are disrupted, the cell dies.
</details>

## Experimental Design and Hypothesis Testing

Every genetic experiment is built on sound **experimental design** principles. A well-designed experiment includes clear hypotheses, appropriate controls, sufficient sample sizes, and statistical frameworks for interpreting results.

**Hypothesis testing** in genetics follows the same logic as in other sciences but often involves genetic-specific considerations:

1. **Formulate a hypothesis** -- for example, "Gene X is required for wing vein formation in *Drosophila*"
2. **Design the experiment** -- create a loss-of-function mutation in Gene X and examine wing morphology
3. **Include controls** -- compare mutant wings to wild-type siblings from the same cross
4. **Determine sample size** -- ensure enough individuals are scored to detect the expected effect
5. **Analyze results** -- use appropriate statistical tests (chi-square for categorical data, t-test for continuous measurements)
6. **Consider alternative explanations** -- could background mutations, environmental factors, or genetic modifiers explain the result?

Key controls in genetic experiments include:

- **Positive controls**: a known mutation with the expected phenotype, confirming the assay works
- **Negative controls**: wild-type organisms processed identically, establishing the baseline
- **Genetic background controls**: backcrossing mutants into a defined genetic background to eliminate confounding mutations
- **Complementation tests**: crossing two independently derived mutants to determine whether they affect the same gene

!!! mascot-thinking "Designing Your Own Experiment"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    What does the data tell us? Whenever you read about a genetic experiment, ask yourself: What was the hypothesis? What were the controls? Could there be an alternative explanation? Thinking critically about experimental design is just as important as learning the techniques themselves.

## Integrating Forward and Reverse Approaches

Modern genetics rarely uses forward or reverse approaches in isolation. A typical research program might begin with a forward genetic screen to identify candidate genes, then switch to reverse genetics to create precise mutations, tagged alleles, and conditional knockouts for detailed mechanistic analysis.

The workflow often looks like this:

1. **Forward screen** identifies candidate genes through mutagenesis and phenotype analysis
2. **Gene identification** uses mapping and sequencing to pinpoint the responsible gene
3. **Validation** uses reverse genetics (CRISPR knockouts, RNAi) to confirm the gene's role
4. **Mechanistic analysis** uses reporter genes, conditional alleles, and protein interaction studies
5. **Cross-species comparison** tests whether the gene has a conserved function in other model organisms

This integration of approaches -- combining the unbiased discovery of forward genetics with the precision of reverse genetics -- represents the most powerful strategy in modern experimental genetics.

!!! mascot-celebration "Chapter Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Excellent work, fellow investigators! You now understand the major experimental strategies that geneticists use to discover gene function. From classical mutagenesis screens to CRISPR gene editing, these tools allow us to ask -- and answer -- precise questions about how genes build organisms. In the next chapter, we will explore how genomic sequencing and bioinformatics turn raw DNA data into biological knowledge.

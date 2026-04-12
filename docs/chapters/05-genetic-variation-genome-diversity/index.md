---
title: Genetic Variation and Genome Diversity
description: Surveys the full landscape of genetic variation from SNPs to structural variants, tandem repeats, transposable elements, haplotype structure, and chromosomal abnormalities.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Genetic Variation and Genome Diversity

## Summary

This chapter surveys the full landscape of genetic variation in genomes, from single nucleotide polymorphisms to large structural variants, tandem repeats, transposable elements, and chromosomal abnormalities. Students learn about haplotype structure, linkage disequilibrium, and the role of mobile genetic elements in genome evolution. After completing this chapter, students will be able to classify and analyze different types of genetic variation.

## Concepts Covered

This chapter covers the following 29 concepts from the learning graph:

1. Genetic Variation
2. Single Nucleotide Polymorphism
3. Insertion Deletion Variant
4. Structural Variation
5. Copy Number Variation
6. Chromosomal Inversion
7. Chromosomal Translocation
8. Chromosomal Deletion
9. Chromosomal Duplication
10. Tandem Repeat
11. Short Tandem Repeat
12. Microsatellite
13. Minisatellite
14. Variable Number Tandem Repeat
15. Haplotype
16. Linkage Disequilibrium
17. Haplotype Block
18. Tag SNP
19. HapMap Project
20. Transposable Elements
21. DNA Transposon
22. Retrotransposon
23. LINE Element
24. SINE Element
25. Alu Element
26. Aneuploidy
27. Trisomy
28. Monosomy
29. Nondisjunction

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)
- [Chapter 4: Genome Structure and Chromatin Organization](../04-genome-structure-chromatin-organization/index.md)

---

!!! mascot-welcome "Welcome to Genetic Variation!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome back, fellow investigators! No two genomes are exactly alike, and in this chapter we will explore the many forms of variation that make each organism unique. Let's look at the evidence for what makes genomes different!

## Introduction: The Scope of Genetic Variation

**Genetic variation** is any difference in DNA sequence among individuals within a population or between populations. It is the raw material for evolution, the basis for phenotypic diversity, and the foundation for modern genetic medicine. When we compare any two human genomes, they differ at roughly 4 to 5 million positions, which sounds like a large number but represents only about 0.1% of the 3.2 billion base pairs in the human genome.

Genetic variants range enormously in size. Some affect a single nucleotide, while others rearrange millions of base pairs across chromosomes. Understanding the types, frequencies, and consequences of these variants is essential for interpreting genome sequences, conducting genetic association studies, and diagnosing genetic disorders.

In this chapter, we organize genetic variation by scale, starting with the smallest variants and working up to whole-chromosome abnormalities.

## Small-Scale Sequence Variants

### Single Nucleotide Polymorphisms

A **single nucleotide polymorphism** (SNP, pronounced "snip") is a position in the genome where a single base differs between individuals in a population, with the less common variant (the minor allele) present at a frequency of at least 1%. SNPs are by far the most abundant type of genetic variation: the human genome contains approximately 10 million common SNPs.

SNPs can occur anywhere in the genome. Those in protein-coding regions are classified as either synonymous (the nucleotide change does not alter the amino acid) or nonsynonymous (the change does alter the amino acid). SNPs in regulatory regions can affect gene expression levels without changing protein sequence. Most SNPs are selectively neutral, meaning they have no detectable effect on organismal fitness, but some contribute to disease risk, drug response, or observable traits.

SNPs are identified using standardized identifiers from the dbSNP database, such as rs1426654, which is a SNP in the *SLC24A5* gene associated with skin pigmentation differences between European and African populations.

### Insertion-Deletion Variants

An **insertion-deletion variant** (indel) is a variant in which one or more nucleotides are inserted into or deleted from a genomic position relative to a reference sequence. Indels range in size from a single nucleotide to thousands of base pairs. When an indel occurs within a protein-coding region and its length is not a multiple of three, it causes a frameshift that disrupts the reading frame and usually produces a nonfunctional protein.

Indels are the second most common type of genetic variation after SNPs. The human genome harbors approximately 1.5 to 2.5 million short indels per individual compared to the reference genome. Because indels change the length of the DNA sequence, they are more likely than SNPs to have functional consequences when they occur in genes.

| Variant Type | Size Range | Abundance (per genome) | Common Detection Method |
|---|---|---|---|
| SNP | 1 bp | ~4-5 million | Genotyping arrays, sequencing |
| Short indel | 1-50 bp | ~1.5-2.5 million | Sequencing |
| Structural variant | >50 bp | ~20,000-30,000 | Long-read sequencing, arrays |

## Structural Variation

### Overview

**Structural variation** (SV) refers to genomic variants larger than 50 base pairs that alter the structure of chromosomes. Although structural variants are far less numerous than SNPs, they collectively affect more total base pairs of the genome. A single structural variant can span thousands to millions of base pairs. The major classes of structural variation include copy number variants, inversions, translocations, deletions, and duplications.

### Copy Number Variation

A **copy number variation** (CNV) is a segment of DNA, typically 1 kilobase or larger, that is present in different copy numbers in different individuals. Some individuals may carry one copy of a particular segment, while others carry two, three, or more copies. CNVs arise through unequal crossing over during meiosis, errors in DNA replication, or the activity of transposable elements.

CNVs have significant medical relevance. For example, variation in copy number of the *AMY1* gene, which encodes salivary amylase, correlates with dietary starch consumption across human populations. Individuals from populations with high-starch diets tend to carry more copies of *AMY1*, producing more amylase enzyme. CNVs can also cause disease: deletion of a region on chromosome 7q11.23 causes Williams syndrome, while duplication of the same region causes a distinct set of symptoms.

### Chromosomal Inversions, Translocations, Deletions, and Duplications

Several types of structural rearrangements change the order or orientation of DNA segments without necessarily changing copy number.

A **chromosomal inversion** occurs when a segment of a chromosome is reversed end-to-end. Inversions can be paracentric (not including the centromere) or pericentric (including the centromere). Individuals heterozygous for an inversion may experience reduced recombination in the inverted region, which can maintain groups of alleles together as a unit.

A **chromosomal translocation** involves the transfer of a segment from one chromosome to a nonhomologous chromosome. Translocations can be reciprocal (segments are exchanged between two chromosomes) or Robertsonian (two acrocentric chromosomes fuse at their centromeres). The Philadelphia chromosome, a translocation between chromosomes 9 and 22 that creates the BCR-ABL fusion gene, is a well-known cause of chronic myelogenous leukemia.

A **chromosomal deletion** is the loss of a segment of a chromosome. Large deletions are typically deleterious because they remove one copy of potentially many genes, unmasking recessive mutations on the remaining chromosome. Cri-du-chat syndrome results from a deletion on the short arm of chromosome 5.

A **chromosomal duplication** is the gain of an extra copy of a chromosomal segment. While duplications are generally less harmful than deletions of equivalent size, they can cause disease through gene dosage effects. Duplications also provide raw material for evolution, as the extra copy can accumulate mutations and potentially evolve new functions.

#### Diagram: Types of Structural Variation
<iframe src="../../sims/structural-variation-types/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Types of Structural Variation</summary>
Type: Interactive diagram
**sim-id:** structural-variation-types<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive diagram showing a reference chromosome segment with lettered blocks (A-B-C-D-E-F). Dropdown menu lets users select a structural variant type (deletion, duplication, inversion, translocation, CNV). The diagram animates the rearrangement: deletion removes a block, duplication adds a copy, inversion reverses a block's orientation (shown with reversed colors/arrows), translocation moves a block to a second chromosome shown below, and CNV shows variable copy counts with a slider from 0 to 4 copies. Each variant type displays a brief description of its mechanism and a clinical example.
</details>

!!! mascot-thinking "Think About It"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    Why might a chromosomal inversion persist in a population even if it does not change any gene? What does the data tell us? Inversions suppress recombination in heterozygotes, keeping groups of alleles together. If those alleles work well as a set, natural selection can favor the inversion.

## Tandem Repeats

### What Are Tandem Repeats?

A **tandem repeat** is a DNA sequence pattern in which two or more copies of a short sequence motif are arranged directly adjacent to one another, head to tail, without intervening sequence. Tandem repeats are inherently unstable because the repetitive structure makes them prone to expansion or contraction through replication slippage, a process in which the DNA polymerase "stutters" and adds or removes repeat units.

The different classes of tandem repeats are distinguished primarily by the length of the repeat unit.

### Short Tandem Repeats and Microsatellites

A **short tandem repeat** (STR), also called a **microsatellite**, is a tandem repeat in which the repeat unit is 1 to 6 base pairs long. Common examples include dinucleotide repeats like (CA)n and trinucleotide repeats like (CAG)n. STRs are highly polymorphic because replication slippage frequently changes the number of repeat copies, making them excellent markers for genetic mapping, forensic identification, and paternity testing.

The FBI's Combined DNA Index System (CODIS) uses a panel of 20 STR loci to generate DNA profiles for forensic analysis. Because each STR locus has many alleles (different repeat lengths) in the population, the probability that two unrelated individuals share the same profile across all 20 loci is extraordinarily small, typically less than one in a trillion.

Some trinucleotide repeat expansions cause human diseases. Huntington disease results from expansion of a CAG repeat in the *HTT* gene beyond 36 copies, and fragile X syndrome results from expansion of a CGG repeat in the *FMR1* gene beyond 200 copies. These diseases show a distinctive pattern called anticipation, where the repeat tends to expand further in successive generations, causing earlier onset and more severe symptoms.

### Minisatellites and Variable Number Tandem Repeats

A **minisatellite** is a tandem repeat with a repeat unit of approximately 10 to 60 base pairs. The term **variable number tandem repeat** (VNTR) is often used as a broader category that encompasses both minisatellites and sometimes microsatellites, though in practice it most often refers to minisatellite-length repeats. Minisatellites tend to cluster near the ends of chromosomes (subtelomeric regions) and are highly variable in repeat number between individuals.

Minisatellites were the basis for the original "DNA fingerprinting" technique developed by Alec Jeffreys in 1984. While STR-based profiling has largely replaced minisatellite analysis in forensics, VNTRs remain important markers in population genetics and genome mapping.

| Repeat Class | Unit Length | Typical Array Length | Key Application |
|---|---|---|---|
| Microsatellite (STR) | 1-6 bp | <1 kb | Forensics (CODIS), genetic mapping |
| Minisatellite (VNTR) | 10-60 bp | 0.5-30 kb | DNA fingerprinting, population genetics |

## Haplotypes and Linkage Disequilibrium

### Haplotypes

A **haplotype** is a set of genetic variants (typically SNPs) that are located close together on the same chromosome and tend to be inherited as a unit. Because recombination is relatively rare between nearby markers, alleles at closely linked SNPs are often coinherited across many generations. For example, if SNP A on chromosome 6 almost always appears with SNP B located 5,000 base pairs away, those two alleles form part of the same haplotype.

Haplotypes are important because they capture the correlation structure of genetic variation. Rather than genotyping every SNP in a region, researchers can genotype a few representative SNPs that define the common haplotypes.

### Linkage Disequilibrium

**Linkage disequilibrium** (LD) is the non-random association of alleles at two or more loci. When alleles at different loci occur together on the same chromosome more often than would be expected by chance (based on their individual frequencies), those loci are said to be in linkage disequilibrium. LD is measured by statistics such as \(D'\) and \(r^2\).

The statistic \(r^2\) is the squared correlation coefficient between two loci. It ranges from 0 (no LD; alleles are randomly associated) to 1 (perfect LD; knowing the allele at one locus perfectly predicts the allele at the other). The formula for \(r^2\) between two biallelic loci A and B is:

\[
r^2 = \frac{(p_{AB} - p_A \cdot p_B)^2}{p_A \cdot p_a \cdot p_B \cdot p_b}
\]

where \(p_{AB}\) is the frequency of the AB haplotype, \(p_A\) and \(p_a\) are the frequencies of alleles A and a, and \(p_B\) and \(p_b\) are the frequencies of alleles B and b.

LD decays over time as recombination breaks apart haplotypes. Older populations, such as those in sub-Saharan Africa where modern humans originated, tend to have shorter blocks of LD because they have had more generations for recombination to act.

### Haplotype Blocks, Tag SNPs, and the HapMap Project

A **haplotype block** is a region of the genome where LD is strong, meaning there is little historical recombination within the block and only a few common haplotypes exist. Between haplotype blocks, LD breaks down sharply at recombination hotspots.

Because of the block structure of LD, it is not necessary to genotype every SNP in a haplotype block. Instead, researchers can identify one or a few **tag SNPs**, representative SNPs whose alleles are strongly correlated with (and thus predict) the alleles at all other SNPs in the block. Tag SNPs dramatically reduce the cost of genome-wide association studies.

The **HapMap Project** was an international effort, launched in 2002 and published in phases from 2005 to 2010, to catalog common haplotypes and LD patterns across the human genome in multiple populations. By genotyping millions of SNPs in individuals of African, European, and Asian ancestry, the HapMap Project identified haplotype blocks and tag SNPs that became the foundation for designing efficient genotyping arrays used in genome-wide association studies (GWAS).

#### Diagram: Haplotype Blocks and Linkage Disequilibrium
<iframe src="../../sims/haplotype-blocks-ld/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Haplotype Blocks and Linkage Disequilibrium</summary>
Type: Interactive diagram
**sim-id:** haplotype-blocks-ld<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive visualization showing a linear genomic region with multiple SNP positions. The top panel shows individual haplotypes as rows of colored alleles. The bottom panel shows an LD heatmap (triangle plot) where cell color intensity represents \(r^2\) values between SNP pairs (dark red = high LD, white = low LD). Haplotype block boundaries are outlined on the heatmap. Tag SNPs are highlighted with a star icon. Users can adjust a "generations of recombination" slider to watch LD decay over time as haplotype blocks shrink and the heatmap becomes lighter. Population dropdown (African, European, Asian) shows different LD block sizes.
</details>

!!! mascot-tip "Practical Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    In genome-wide association studies, a significant association with a tag SNP does not necessarily mean that tag SNP is the causal variant. It may simply be in LD with the true causal variant nearby. Fine-mapping studies are needed to identify the actual functional variant within the haplotype block.

## Transposable Elements: Mobile DNA

### Overview

**Transposable elements** (TEs) are DNA sequences that can move from one location in the genome to another. First discovered by Barbara McClintock in maize during the 1940s, transposable elements are now recognized as a major source of genomic diversity and structural change. Remarkably, transposable elements and their remnants make up approximately 45% of the human genome, far exceeding the roughly 1.5% that encodes proteins.

Transposable elements are classified into two major groups based on their mechanism of movement.

### DNA Transposons

**DNA transposons** move by a "cut-and-paste" mechanism. The transposon encodes an enzyme called transposase, which excises the transposon from its original location and inserts it at a new site. DNA transposons are flanked by terminal inverted repeats (TIRs) that the transposase recognizes. In the human genome, DNA transposons are largely inactive fossils; they comprise about 3% of the genome but have not been actively transposing for roughly 37 million years.

### Retrotransposons

**Retrotransposons** move by a "copy-and-paste" mechanism that involves an RNA intermediate. The retrotransposon is first transcribed into RNA, then reverse-transcribed back into DNA, and the new DNA copy is inserted at a new genomic location. Unlike DNA transposons, retrotransposons increase in copy number with each transposition event, which is why they have accumulated to dominate large fractions of mammalian genomes.

Retrotransposons are divided into two categories: those with long terminal repeats (LTR retrotransposons, related to retroviruses) and those without (non-LTR retrotransposons).

### LINE, SINE, and Alu Elements

**LINE elements** (Long Interspersed Nuclear Elements) are autonomous non-LTR retrotransposons that encode the enzymatic machinery needed for their own transposition, including a reverse transcriptase and an endonuclease. The most important human LINE family is LINE-1 (L1), which has approximately 500,000 copies in the human genome and comprises about 17% of genomic DNA. About 100 L1 elements remain active and capable of transposition in the current human genome.

**SINE elements** (Short Interspersed Nuclear Elements) are non-autonomous retrotransposons that do not encode their own transposition machinery. Instead, they rely on the reverse transcriptase and endonuclease produced by LINE elements to copy and insert themselves. SINEs are typically 100-700 base pairs long.

The most abundant SINE in the human genome is the **Alu element**, named after the *Alu*I restriction enzyme site it contains. There are more than 1 million Alu copies in the human genome, comprising about 11% of genomic DNA. Alu elements are approximately 300 base pairs long and are derived from the 7SL RNA gene. New Alu insertions can cause disease by disrupting genes or regulatory elements. Alu elements are primate-specific and serve as useful markers for studying primate evolution.

| TE Class | Mechanism | Size | Copy Number (Human) | % of Genome |
|---|---|---|---|---|
| DNA transposons | Cut-and-paste | 1-3 kb | ~300,000 | ~3% |
| LINE-1 (L1) | Copy-and-paste (autonomous) | ~6 kb (full) | ~500,000 | ~17% |
| Alu (SINE) | Copy-and-paste (non-autonomous) | ~300 bp | ~1,100,000 | ~11% |
| LTR retrotransposons | Copy-and-paste | 6-11 kb | ~450,000 | ~8% |

#### Diagram: Transposable Element Mechanisms
<iframe src="../../sims/transposable-elements/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Transposable Element Mechanisms</summary>
Type: Interactive animation
**sim-id:** transposable-elements<br/>
**Library:** p5.js<br/>
**Status:** Specified

An animated diagram showing the two major transposition mechanisms side by side. On the left, a DNA transposon (shown as a colored block with TIR arrows at each end) is excised by transposase (animated scissors), creating a gap at the donor site, and inserted at a target site. On the right, a retrotransposon is first transcribed to RNA (animated arrow from DNA to wavy RNA), then reverse-transcribed to cDNA (animated arrow from RNA to DNA), and the cDNA is inserted at a new target site while the original copy remains. A counter at the bottom tracks total TE copy number, incrementing only for the retrotransposon side. Users can click "Transpose" to animate each step. A toggle switches between LINE (autonomous, showing encoded reverse transcriptase) and SINE/Alu (non-autonomous, borrowing LINE machinery shown as a dotted arrow).
</details>

## Chromosomal Abnormalities

### Aneuploidy

**Aneuploidy** is the condition of having an abnormal number of chromosomes, typically one more or one fewer than the normal diploid set. Unlike polyploidy (where entire chromosome sets are added), aneuploidy involves individual chromosomes. Aneuploidy is one of the most common types of chromosomal abnormality in humans, occurring in approximately 5% of clinically recognized pregnancies.

### Trisomy and Monosomy

**Trisomy** is the presence of three copies of a particular chromosome instead of the normal two. The most well-known human trisomy is trisomy 21 (Down syndrome), in which an individual has three copies of chromosome 21. Other viable human trisomies include trisomy 18 (Edwards syndrome) and trisomy 13 (Patau syndrome), both of which cause severe developmental abnormalities and greatly reduced life expectancy.

**Monosomy** is the presence of only one copy of a particular chromosome. In humans, autosomal monosomies are almost always lethal during embryonic development because the loss of an entire chromosome's worth of genes is too severe. The only viable human monosomy is monosomy X, known as Turner syndrome (45,X), in which an individual has a single X chromosome and no second sex chromosome.

### Nondisjunction

**Nondisjunction** is the failure of homologous chromosomes (in meiosis I) or sister chromatids (in meiosis II) to separate properly during cell division. Nondisjunction produces gametes with an extra chromosome (n+1) and gametes missing a chromosome (n-1). When these abnormal gametes are fertilized by a normal gamete, the resulting zygote is either trisomic (2n+1) or monosomic (2n-1).

Nondisjunction can occur during either meiotic division:

- **Meiosis I nondisjunction:** Homologous chromosomes fail to separate. All four resulting gametes are abnormal: two have an extra chromosome and two are missing one.
- **Meiosis II nondisjunction:** Sister chromatids fail to separate. Two of the four resulting gametes are normal, one has an extra chromosome, and one is missing a chromosome.

The risk of nondisjunction increases with maternal age, which is why the incidence of trisomy 21 rises significantly in pregnancies of women over 35. The mechanism is thought to involve deterioration of the cohesin proteins that hold homologous chromosomes together during the prolonged arrest of oocytes in meiosis I, which can last decades.

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie warning about a common mistake">
    Students often confuse nondisjunction in meiosis I with nondisjunction in meiosis II. The key difference is which structures fail to separate: homologous chromosome pairs (meiosis I) versus sister chromatids (meiosis II). The consequences for gamete composition are also different.

!!! mascot-celebration "Chapter Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Outstanding work, researchers! You now understand genetic variation across every scale, from a single nucleotide change to whole-chromosome gains and losses. In the next chapter, we will explore how gene duplication and structural rearrangements drive genome evolution over millions of years.

## Chapter Summary

In this chapter, we surveyed the complete landscape of genetic variation:

1. **SNPs** are single-base changes and the most abundant variant type, with ~4-5 million per human genome.
2. **Indels** are insertions or deletions that can cause frameshifts in coding regions.
3. **Structural variants** (>50 bp) include CNVs, inversions, translocations, deletions, and duplications that collectively affect more base pairs than SNPs.
4. **Tandem repeats** include microsatellites (STRs, 1-6 bp units) used in forensics and minisatellites (VNTRs, 10-60 bp units) used in DNA fingerprinting.
5. **Haplotypes** are linked sets of variants inherited together, organized into **haplotype blocks** defined by LD patterns and efficiently captured by **tag SNPs**.
6. **The HapMap Project** cataloged common haplotypes across human populations to enable genome-wide association studies.
7. **Transposable elements**, including DNA transposons (cut-and-paste) and retrotransposons (copy-and-paste), constitute ~45% of the human genome. LINEs are autonomous, while SINEs (including **Alu elements**) depend on LINE machinery.
8. **Aneuploidy** (abnormal chromosome number) arises from **nondisjunction** during meiosis, producing **trisomy** (2n+1) or **monosomy** (2n-1).

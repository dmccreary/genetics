---
title: Genomics, Sequencing, and Bioinformatics
description: Genome sequencing technologies, alignment algorithms, variant calling, file formats, genomic databases, RNA-seq analysis, and reproducible computational workflows.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Genomics, Sequencing, and Bioinformatics

## Summary

This chapter covers the technologies and computational methods that power modern genomics, from sequencing platforms to bioinformatics analysis pipelines. Students learn about alignment algorithms, variant calling, file formats, genomic databases, reproducible workflows, and RNA-seq analysis. After completing this chapter, students will understand how to process, analyze, and interpret genomic data using standard bioinformatics tools.

## Concepts Covered

This chapter covers the following 41 concepts from the learning graph:

1. Genome Sequencing
2. Sanger Sequencing
3. Next-Gen Sequencing
4. Illumina Sequencing
5. Long-Read Sequencing
6. Whole Genome Sequencing
7. Whole Exome Sequencing
8. Targeted Sequencing
9. Sequence Alignment
10. BLAST Algorithm
11. Pairwise Alignment
12. Multiple Sequence Alignment
13. Genome Annotation
14. Gene Prediction
15. Functional Annotation
16. Gene Ontology
17. Variant Calling
18. VCF File Format
19. Variant Annotation
20. Variant Classification
21. Benign Variant
22. Pathogenic Variant
23. Variant of Uncertain Sig
24. FASTA File Format
25. FASTQ File Format
26. BAM File Format
27. BED File Format
28. Genomic Databases
29. NCBI Database
30. Ensembl Database
31. UCSC Genome Browser
32. ClinVar Database
33. dbSNP Database
34. Reproducible Workflows
35. Pipeline Automation
36. Version Control in Genomics
37. Computational Workflow
38. RNA-Seq Analysis
39. Differential Expression
40. Pathway Enrichment
41. Data Interpretation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)
- [Chapter 5: Genetic Variation and Genome Diversity](../05-genetic-variation-genome-diversity/index.md)
- [Chapter 11: Gene Regulation and Regulatory Networks](../11-gene-regulation-regulatory-networks/index.md)
- [Chapter 13: Experimental Genetics and Model Organisms](../13-experimental-genetics-model-organisms/index.md)

---

!!! mascot-welcome "Welcome to the Digital Side of Genetics!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome back, fellow investigators! Today we trade the lab bench for the computer screen. Modern genetics generates enormous amounts of sequence data, and making sense of it all requires computational tools. Let's look at the evidence -- one nucleotide at a time!

## Introduction: The Genomic Revolution

**Genome sequencing** -- the process of determining the complete DNA sequence of an organism's genome -- has transformed biology. The Human Genome Project, completed in 2003, took 13 years and roughly three billion dollars. Today, a human genome can be sequenced in hours for under a thousand dollars. This dramatic reduction in cost and time has made sequencing a routine tool in research and clinical practice.

This chapter traces the path from raw DNA in a tube to biological insight on a screen. We begin with the sequencing technologies that generate data, then examine the computational methods that process and interpret that data, and finally explore the databases and workflows that make genomic analysis reproducible and shareable.

## Sequencing Technologies

### Sanger Sequencing: The Foundation

**Sanger sequencing**, developed by Frederick Sanger in 1977, was the first practical method for reading DNA sequences. The method uses dideoxynucleotides (ddNTPs) -- modified nucleotides that lack the 3' hydroxyl group needed for chain elongation. When a ddNTP is randomly incorporated during DNA synthesis, the growing chain terminates at that position.

The reaction produces fragments of every possible length, each ending at a known base. Modern automated Sanger sequencers separate these fragments by capillary electrophoresis and read the sequence from fluorescently labeled terminators. A single Sanger sequencing run produces 700-1,000 bases of high-quality sequence.

Sanger sequencing remains the gold standard for:

- Confirming specific mutations identified by other methods
- Sequencing individual PCR products
- Validating CRISPR edits and cloned constructs
- Reading short stretches with very high accuracy (99.999%)

### Next-Generation Sequencing

**Next-generation sequencing (NGS)** technologies perform millions of sequencing reactions simultaneously, generating gigabases of data in a single run. Unlike Sanger sequencing, which reads one fragment at a time, NGS platforms massively parallelize the process.

**Illumina sequencing** is the most widely used NGS platform. It works through sequencing by synthesis:

1. DNA is fragmented and adapters are ligated to the ends
2. Fragments are amplified in clusters on a flow cell surface
3. Fluorescently labeled nucleotides are added one at a time
4. After each incorporation, the machine images the entire flow cell
5. The color at each cluster position reveals the incorporated base
6. The process repeats for 150-300 cycles, producing reads of 150-300 bases

Illumina sequencing generates extremely high throughput (hundreds of gigabases per run) with low per-base error rates (~0.1%), but read lengths are relatively short.

**Long-read sequencing** platforms from Pacific Biosciences (PacBio) and Oxford Nanopore Technologies produce reads of 10,000 to over 100,000 bases. PacBio uses single-molecule real-time (SMRT) sequencing, where a polymerase synthesizes DNA in a tiny well and fluorescent pulses from each incorporated nucleotide are detected in real time. Oxford Nanopore threads single DNA strands through a protein pore and measures changes in electrical current as each base passes through.

Long reads are essential for:

- Assembling repetitive genomic regions
- Detecting structural variants
- Phasing haplotypes
- Assembling complete genomes without gaps

| Technology | Read Length | Throughput per Run | Error Rate | Cost per Gb | Best For |
|---|---|---|---|---|---|
| Sanger | 700-1,000 bp | ~1 kb | 0.001% | Very high | Validation, single targets |
| Illumina | 150-300 bp | 100-6,000 Gb | 0.1% | Low | Variant calling, RNA-seq |
| PacBio HiFi | 10-25 kb | 30-100 Gb | 0.1% (HiFi) | Moderate | Genome assembly, structural variants |
| Oxford Nanopore | 10-100+ kb | 50-300 Gb | 1-5% | Moderate | Real-time sequencing, field work |

### Sequencing Strategies

Not every experiment requires sequencing an entire genome. Different research questions call for different sequencing strategies.

**Whole genome sequencing (WGS)** determines the complete DNA sequence of an organism. WGS captures all variation -- coding, non-coding, regulatory, and structural -- but generates large datasets and requires substantial computational resources.

**Whole exome sequencing (WES)** targets only the protein-coding regions (exons), which comprise roughly 1-2% of the human genome but harbor about 85% of disease-causing mutations. WES uses hybridization capture probes to enrich exonic DNA before sequencing, reducing both cost and data volume compared to WGS.

**Targeted sequencing** focuses on specific genomic regions of interest, such as a panel of known disease genes. Clinical gene panels for conditions like hereditary cancer or cardiac arrhythmias typically sequence 50-500 genes at very high depth, providing high sensitivity for detecting variants in those regions.

!!! mascot-thinking "Choosing a Sequencing Strategy"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    What does the data tell us? The choice between WGS, WES, and targeted sequencing depends on your question. Looking for a known disease mutation? A targeted panel is fastest and cheapest. Searching for novel non-coding regulatory variants? Only WGS will find them. Always match the sequencing strategy to the biological question.

## Sequence Alignment

Once sequencing reads are generated, they must be mapped back to a reference genome or compared to other sequences. **Sequence alignment** is the computational process of determining where each read originated in the genome, or how two or more sequences correspond to each other.

### Pairwise and Multiple Sequence Alignment

**Pairwise alignment** compares two sequences to find the best correspondence between them. Two classic algorithms accomplish this: the Needleman-Wunsch algorithm for global alignment (aligning sequences end-to-end) and the Smith-Waterman algorithm for local alignment (finding the best matching subsequence).

Both algorithms use dynamic programming to fill a scoring matrix. Each cell in the matrix represents the best alignment score up to that position, considering matches, mismatches, and gaps. The optimal alignment is found by tracing back through the matrix from the highest-scoring cell.

The scoring for a pairwise alignment uses a substitution matrix and gap penalties. For protein sequences, the BLOSUM62 matrix assigns positive scores to biochemically similar amino acid substitutions and negative scores to dissimilar ones. A simple scoring scheme for DNA might be:

\[
S(i,j) = \begin{cases} +1 & \text{if } x_i = y_j \text{ (match)} \\ -1 & \text{if } x_i \neq y_j \text{ (mismatch)} \end{cases}
\]

with a gap penalty of \( -2 \) per gap position.

**Multiple sequence alignment (MSA)** extends pairwise alignment to three or more sequences simultaneously. MSA is essential for evolutionary analysis, identifying conserved functional domains, and building phylogenetic trees. Programs like Clustal Omega, MUSCLE, and MAFFT use heuristic approaches because exact multiple alignment is computationally prohibitive for more than a few sequences.

### The BLAST Algorithm

The **BLAST algorithm** (Basic Local Alignment Search Tool) is the most widely used bioinformatics tool in the world. BLAST searches a database of sequences to find those similar to a query sequence. Unlike Smith-Waterman, BLAST uses a heuristic approach that sacrifices some sensitivity for enormous gains in speed.

BLAST works in three steps:

1. **Seeding**: The query is broken into short "words" (typically 11 nucleotides or 3 amino acids), and exact matches are found in the database
2. **Extension**: Each seed match is extended in both directions, keeping track of the alignment score
3. **Evaluation**: The statistical significance of each alignment is assessed using an E-value -- the expected number of alignments with that score or better that would occur by chance in a database of that size

An E-value of \( 10^{-50} \) means you would need to search \( 10^{50} \) random databases before finding an equally good match by chance -- strong evidence of true homology. An E-value near 1 suggests the match could be coincidental.

#### Diagram: BLAST Algorithm Workflow
<iframe src="../../sims/blast-algorithm-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>BLAST Algorithm Workflow</summary>
Type: flowchart
**sim-id:** blast-algorithm-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

A flowchart showing the three phases of the BLAST algorithm: (1) Seeding phase -- query broken into k-mer words, exact matches found in database index; (2) Extension phase -- seed matches extended bidirectionally using dynamic programming, low-scoring extensions dropped; (3) Evaluation phase -- surviving alignments scored, E-values calculated, results ranked. Include example input (query sequence) and output (ranked hit list with E-values).
</details>

## Genomic File Formats

Bioinformatics relies on standardized file formats to store and exchange data. Understanding these formats is essential for working with genomic data.

### Sequence Formats

The **FASTA file format** stores nucleotide or protein sequences in a simple text format. Each entry begins with a header line starting with `>` followed by the sequence identifier and optional description. The sequence follows on subsequent lines:

```
>chr1_gene_example Human beta-globin gene
ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTG
AACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGTTGGTATCAAGGTTACAAGA
```

The **FASTQ file format** extends FASTA by adding quality scores for each base. Each read occupies four lines: a header line (starting with `@`), the sequence, a separator line (`+`), and the quality string. Quality scores are encoded as ASCII characters, where each character represents the Phred quality score:

\[
Q = -10 \cdot \log_{10}(P_{\text{error}})
\]

A Phred score of 30 (ASCII character `?`) means a 1 in 1,000 chance of error (99.9% accuracy). A score of 40 means 1 in 10,000 (99.99% accuracy).

```
@read_001
ATGGTGCATCTGACTCCTGA
+
IIIIIHHHHHGGGGGFFFFF
```

### Alignment and Annotation Formats

The **BAM file format** (Binary Alignment Map) stores the results of aligning sequencing reads to a reference genome. BAM is the compressed binary version of the SAM (Sequence Alignment Map) format. Each record in a BAM file contains the read sequence, its quality scores, the reference position where it aligned, the alignment quality (mapping quality), and a CIGAR string that describes matches, mismatches, insertions, and deletions.

The **BED file format** (Browser Extensible Data) stores genomic coordinate ranges in a simple tab-delimited format. Each line specifies a chromosome, start position, end position, and optional additional fields like name, score, and strand. BED files are used to define genomic regions of interest, such as exons, enhancers, or ChIP-seq peaks.

| Format | Extension | Content | Text/Binary | Typical Size (Human WGS) |
|---|---|---|---|---|
| FASTA | .fa, .fasta | Reference sequences | Text | 3 GB (reference genome) |
| FASTQ | .fq, .fastq | Reads + quality scores | Text | 50-200 GB |
| BAM | .bam | Aligned reads | Binary | 30-100 GB |
| BED | .bed | Genomic intervals | Text | KB to MB |
| VCF | .vcf | Variant calls | Text | 100 MB - 1 GB |

!!! mascot-tip "File Format Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    Think of these file formats as stages in a pipeline. Raw reads come off the sequencer as FASTQ files. Alignment maps those reads to a reference, producing BAM files. Variant calling compares the aligned reads to the reference, producing VCF files. Each format captures a different stage of the analysis.

## Genome Annotation

**Genome annotation** is the process of identifying the functional elements in a genome -- genes, regulatory regions, non-coding RNAs, and other features. Annotation transforms a raw sequence of nucleotides into a meaningful biological map.

### Gene Prediction

**Gene prediction** uses computational methods to identify protein-coding genes within a genome sequence. Two main approaches are used:

- **Ab initio prediction** uses statistical models of gene structure (splice sites, start codons, codon usage) to identify likely genes directly from the sequence. Programs like Augustus and GenScan use hidden Markov models trained on known gene structures.
- **Homology-based prediction** aligns known genes or proteins from related organisms to the target genome. If a region of the genome aligns well to a known gene, it likely encodes a similar gene. Programs like Exonerate and GeneWise perform spliced alignment of proteins to genomic DNA.

Modern annotation pipelines combine both approaches with evidence from RNA-seq data (which directly reveals expressed transcripts) to produce comprehensive gene models.

### Functional Annotation and Gene Ontology

**Functional annotation** assigns biological roles to predicted genes. This involves comparing predicted protein sequences to databases of characterized proteins, identifying conserved domains, and predicting subcellular localization, enzymatic activity, and interaction partners.

The **Gene Ontology (GO)** provides a standardized vocabulary for describing gene function across species. GO organizes functional descriptions into three hierarchical categories:

1. **Molecular Function** -- what the gene product does biochemically (e.g., "protein kinase activity")
2. **Biological Process** -- the larger process the gene contributes to (e.g., "signal transduction")
3. **Cellular Component** -- where the gene product is located (e.g., "nucleus")

Each GO term has a unique identifier (e.g., GO:0006915 for "apoptotic process") and is connected to broader and narrower terms in a directed acyclic graph. GO annotations are supported by evidence codes that indicate how the annotation was determined -- experimentally, computationally, or by curator inference.

## Variant Calling and Classification

**Variant calling** is the process of identifying positions where a sequenced genome differs from the reference. This is the critical step that connects sequencing data to biological and clinical meaning.

The variant calling pipeline proceeds as follows:

1. Align reads to the reference genome (producing a BAM file)
2. Identify positions where the aligned reads differ from the reference
3. Distinguish true variants from sequencing errors using statistical models
4. Filter variants based on quality metrics (read depth, mapping quality, strand bias)
5. Output variants in a standardized format

### The VCF File Format

The **VCF file format** (Variant Call Format) is the standard for recording genomic variants. Each variant record contains the chromosome, position, reference allele, alternate allele(s), quality score, filter status, and additional annotations. The VCF header defines metadata and the INFO fields used in the file.

A simplified VCF record looks like:

```
#CHROM  POS     ID          REF  ALT  QUAL  FILTER  INFO
chr7    117559593  rs113488022  A    T    99    PASS   DP=45;AF=0.5
```

This record indicates a heterozygous A-to-T variant at position 117,559,593 on chromosome 7, supported by 45 reads, with the alternate allele present in approximately 50% of reads.

### Variant Annotation and Classification

**Variant annotation** adds biological context to each variant call -- determining whether it falls within a gene, what effect it has on the encoded protein, and whether it has been seen before in databases. Tools like VEP (Variant Effect Predictor), SnpEff, and ANNOVAR perform this annotation.

**Variant classification** is the process of assessing whether a variant is likely to cause disease. The American College of Medical Genetics and Genomics (ACMG) guidelines define five categories:

- **Pathogenic** -- the variant is disease-causing, supported by strong evidence
- **Likely pathogenic** -- strong evidence suggests disease causation but some uncertainty remains
- **Variant of uncertain significance (VUS)** -- insufficient evidence to classify as pathogenic or benign
- A **benign variant** is one that does not cause disease
- **Likely benign** -- strong evidence suggests the variant is not disease-causing

A **pathogenic variant** typically has multiple lines of supporting evidence: it is rare in the population, it disrupts a known disease gene, functional studies show it impairs protein function, and it co-segregates with disease in families.

The **variant of uncertain significance** category is particularly challenging in clinical genomics. As more population data and functional studies accumulate, many VUS will eventually be reclassified as either pathogenic or benign, but until then they cannot guide clinical decisions.

!!! mascot-warning "The VUS Challenge"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie looking cautious">
    Variants of uncertain significance are one of the most difficult challenges in clinical genomics. Reporting a VUS to a patient requires careful communication -- it does not mean the variant is harmless, and it does not mean it causes disease. As databases grow and functional assays improve, many VUS will be reclassified, but this process can take years.

## Genomic Databases

**Genomic databases** store, organize, and provide access to the vast amounts of sequence, annotation, and variation data generated by the genomics community. Knowing which database to query -- and how to interpret the results -- is a core bioinformatics skill.

### Major Databases

The **NCBI database** (National Center for Biotechnology Information) hosts a suite of interconnected databases including GenBank (nucleotide sequences), RefSeq (curated reference sequences), PubMed (literature), and the Sequence Read Archive (raw sequencing data). NCBI's Entrez system links records across these databases.

The **Ensembl database**, maintained by the European Bioinformatics Institute, provides comprehensive genome annotation for vertebrate and other eukaryotic genomes. Ensembl is particularly strong for comparative genomics, regulatory annotation, and variation data.

The **UCSC Genome Browser** is an interactive web tool for visualizing genomic data. Researchers can view gene models, conservation tracks, regulatory elements, and custom data tracks aligned to a reference genome. The UCSC browser's track hub system allows labs to share their own data as public or private tracks.

For clinical genomics, two specialized databases are essential:

- **ClinVar database** collects relationships between human genetic variants and clinical phenotypes. Each submission includes the variant, the associated condition, and the submitter's classification (pathogenic, benign, VUS, etc.).
- **dbSNP database** catalogs short sequence variations (SNPs and small indels) across species. Each variant receives an rs identifier (e.g., rs113488022) that serves as a universal reference.

| Database | Hosted By | Primary Content | Key Use |
|---|---|---|---|
| NCBI / GenBank | NIH (USA) | All public sequences | Sequence search, BLAST |
| Ensembl | EBI (Europe) | Annotated genomes | Comparative genomics |
| UCSC Genome Browser | UC Santa Cruz | Genome visualization | Data browsing, track analysis |
| ClinVar | NIH (USA) | Clinical variant interpretations | Clinical variant lookup |
| dbSNP | NIH (USA) | Cataloged sequence variants | Variant identification |

#### Diagram: Genomics Database Ecosystem
<iframe src="../../sims/genomics-database-ecosystem/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Genomics Database Ecosystem</summary>
Type: network diagram
**sim-id:** genomics-database-ecosystem<br/>
**Library:** vis-network<br/>
**Status:** Specified

An interactive network diagram showing major genomic databases as nodes (NCBI, Ensembl, UCSC, ClinVar, dbSNP, Gene Ontology) with edges representing data flows and cross-references between them. Node size proportional to database scope. Color-code nodes by type: sequence databases (blue), annotation databases (green), clinical databases (red), ontology databases (purple). Include click interactions to show what each database stores.
</details>

## Reproducible Workflows and Pipeline Automation

Modern genomics analyses involve dozens of computational steps, each with specific software, parameters, and dependencies. **Reproducible workflows** ensure that an analysis can be repeated exactly, by the same researcher months later or by a different lab entirely.

### Why Reproducibility Matters

A typical variant calling pipeline might include:

1. Quality control of raw reads (FastQC, Trimmomatic)
2. Alignment to the reference genome (BWA-MEM, STAR)
3. Post-alignment processing (duplicate marking, base quality recalibration)
4. Variant calling (GATK HaplotypeCaller, DeepVariant)
5. Variant filtering and annotation (VEP, ClinVar lookup)

Each step has parameters that affect the results. Changing the alignment software, the quality filters, or even the reference genome version can change which variants are called. Without careful documentation, results become irreproducible.

### Computational Workflow Management

A **computational workflow** formally defines the steps of an analysis, their inputs and outputs, and their dependencies. Workflow management systems like Snakemake, Nextflow, and WDL (Workflow Description Language) allow researchers to define pipelines as code, making them:

- **Reproducible** -- the same workflow on the same data produces the same results
- **Portable** -- workflows run on laptops, clusters, or cloud platforms
- **Scalable** -- workflows automatically parallelize across available resources
- **Documentable** -- the workflow definition itself is the protocol

**Pipeline automation** uses these systems to run multi-step analyses without manual intervention. A well-designed pipeline checks input data quality, logs every step, handles errors gracefully, and produces standardized output.

**Version control in genomics** extends the software engineering practice of tracking changes to code (using tools like Git) to the entire analysis environment -- including software versions, reference data, and configuration files. Container technologies like Docker and Singularity capture the complete computational environment, ensuring that an analysis can be reproduced even as software evolves.

## RNA-Seq Analysis

**RNA-seq analysis** uses sequencing to measure gene expression levels across the entire transcriptome. By counting how many sequencing reads map to each gene, researchers quantify which genes are active in a sample and at what level.

The RNA-seq workflow involves:

1. Extract RNA and convert to cDNA
2. Fragment, add adapters, and sequence (typically Illumina)
3. Align reads to the reference genome or transcriptome
4. Count reads per gene
5. Normalize counts to account for gene length and sequencing depth
6. Compare expression between conditions

### Differential Expression

**Differential expression** analysis identifies genes whose expression levels differ significantly between two or more experimental conditions. Statistical tools like DESeq2 and edgeR model the count data using a negative binomial distribution and test for significant differences while controlling for multiple testing.

A gene is typically considered differentially expressed if it meets two criteria: a fold change threshold (e.g., \(\geq 2\)-fold change between conditions) and a statistical significance threshold (e.g., adjusted p-value \( < 0.05 \) after Benjamini-Hochberg correction for multiple testing).

The fold change for a gene is calculated as:

\[
\text{Fold Change} = \frac{\text{Expression in condition B}}{\text{Expression in condition A}}
\]

Results are often visualized as volcano plots (log fold change vs. negative log p-value) or MA plots (average expression vs. log fold change).

### Pathway Enrichment Analysis

**Pathway enrichment** analysis asks whether the differentially expressed genes are enriched for particular biological functions or pathways. Rather than interpreting genes one at a time, enrichment analysis identifies coordinated changes in functional categories.

The basic approach uses the Gene Ontology or pathway databases (like KEGG or Reactome) and a statistical test (typically a hypergeometric test or Fisher's exact test) to determine whether a GO term or pathway appears more often in the differentially expressed gene list than expected by chance.

For example, if 50 out of 500 differentially expressed genes are annotated with the GO term "immune response," but only 200 out of 20,000 total genes carry that annotation, the enrichment is highly significant -- the immune response pathway is specifically affected in the experimental condition.

## Data Interpretation: From Numbers to Biology

**Data interpretation** is the final and most critical step in any bioinformatics analysis. Raw numbers -- read counts, p-values, variant calls -- must be translated into biological understanding.

Key principles for interpreting genomic data include:

- **Statistical significance is not biological significance** -- a gene with a tiny p-value but a 1.1-fold change may be statistically significant but biologically irrelevant
- **Context matters** -- a variant in a gene with no known function requires different interpretation than a variant in a well-characterized disease gene
- **Replication is essential** -- findings from one dataset should be validated in independent samples
- **Multiple testing correction is mandatory** -- when testing thousands of genes or variants simultaneously, raw p-values are misleading without correction
- **Beware batch effects** -- technical differences between sample processing batches can create false biological signals

!!! mascot-celebration "Chapter Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Outstanding work, fellow investigators! You now have a solid foundation in the technologies and computational methods that drive modern genomics. From the sequencer to the database, you understand how raw DNA becomes actionable knowledge. In the next chapter, we will apply these tools to human genetics and clinical medicine -- where sequencing data directly impacts patient care.

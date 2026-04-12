---
title: Cancer Genetics
description: Exploring the genetic basis of cancer, from oncogenes and tumor suppressors to hereditary syndromes and liquid biopsy diagnostics.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Cancer Genetics

## Summary

This chapter focuses on the genetic basis of cancer, from oncogenes and tumor suppressors to somatic mutations, hereditary cancer syndromes, and emerging diagnostic approaches. Students learn about driver and passenger mutations, tumor mutational burden, microsatellite instability, BRCA genes, and liquid biopsy technologies. After completing this chapter, students will understand how genetic changes drive cancer development and inform treatment strategies.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Cancer Genetics
2. Oncogene
3. Tumor Suppressor Gene
4. Two-Hit Hypothesis
5. Somatic Mutation in Cancer
6. Driver Mutation
7. Passenger Mutation
8. Tumor Mutational Burden
9. Microsatellite Instability
10. Lynch Syndrome
11. BRCA Genes
12. Liquid Biopsy
13. Circulating Tumor DNA
14. Hereditary Cancer Syndrome
15. Chromosomal Instability
16. Cancer Predisposition

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Pedigree Analysis and Inheritance Patterns](../02-pedigree-analysis-inheritance-patterns/index.md)
- [Chapter 5: Genetic Variation and Genome Diversity](../05-genetic-variation-genome-diversity/index.md)
- [Chapter 6: Gene Duplication, Structural Rearrangements, and Genome Evolution](../06-gene-duplication-rearrangements-evolution/index.md)
- [Chapter 15: Human Genetics and Clinical Applications](../15-human-genetics-clinical-applications/index.md)

---

## Introduction: Cancer as a Genetic Disease

!!! mascot-welcome "Welcome, Fellow Investigators!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Cancer is, at its core, a disease of the genome. Every tumor tells a genetic story, and learning to read that story is one of the most important skills in modern genetics. Let's look at the evidence!

**Cancer genetics** is the study of how changes in DNA sequence and chromosome structure lead to the uncontrolled cell growth that defines cancer. Unlike the inherited traits we explored in earlier chapters, most cancer-causing mutations arise during a person's lifetime in individual cells of the body. These **somatic mutations** accumulate over years or decades, gradually transforming a normal cell into one that divides without restraint.

Cancer is not a single disease but a collection of more than 200 distinct diseases, each defined by the tissue of origin and the specific genetic alterations driving it. Despite this diversity, all cancers share a common thread: they result from disruptions to the genes that normally regulate cell growth, DNA repair, and programmed cell death. Understanding those disruptions is the central goal of this chapter.

The modern era of cancer genetics began in the 1970s when researchers discovered that certain viruses could cause cancer by inserting growth-promoting genes into host cells. Since then, scientists have cataloged thousands of genetic changes associated with cancer, classified the genes involved into functional categories, and developed diagnostic tools that detect cancer-related mutations in a simple blood draw.

## Oncogenes: Accelerators of Cell Growth

Normal cells contain genes called **proto-oncogenes** that encode proteins promoting cell division. These proteins are essential during development and tissue repair, but they operate under tight regulatory control. When a proto-oncogene acquires a mutation that makes its protein product permanently active or overexpressed, it becomes an **oncogene** — a gene that drives cells toward uncontrolled proliferation.

Think of a proto-oncogene as the accelerator pedal in a car. Under normal conditions, the driver presses the pedal only when needed and then releases it. An oncogene is like an accelerator pedal stuck to the floor: the car speeds forward regardless of whether the driver wants to go.

Several types of mutations can convert a proto-oncogene into an oncogene:

- **Point mutations** that change a single amino acid, locking a signaling protein in its active conformation (e.g., *RAS* mutations found in roughly 30% of all human cancers)
- **Gene amplification** that produces many extra copies of a growth-promoting gene, flooding the cell with growth signals (e.g., *HER2* amplification in breast cancer)
- **Chromosomal translocations** that fuse two genes together, creating a hybrid protein with abnormal activity (e.g., the *BCR-ABL* fusion in chronic myeloid leukemia)

Because a single mutant copy is sufficient to promote growth, oncogenes act in a **dominant** fashion at the cellular level. A cell needs only one activated oncogene allele to feel the effect.

| Activation Mechanism | Example Gene | Cancer Type | Effect |
|---|---|---|---|
| Point mutation | *RAS* | Pancreatic, colorectal, lung | Constitutively active GTPase |
| Gene amplification | *HER2* (ERBB2) | Breast cancer | Excess growth factor receptor |
| Chromosomal translocation | *BCR-ABL* | Chronic myeloid leukemia | Constitutive tyrosine kinase |
| Viral insertion | *MYC* | Burkitt lymphoma | Overexpression of transcription factor |

## Tumor Suppressor Genes: The Brakes

If oncogenes are stuck accelerators, **tumor suppressor genes** are the brakes. These genes encode proteins that slow the cell cycle, repair damaged DNA, or trigger apoptosis (programmed cell death) when damage is beyond repair. When both copies of a tumor suppressor gene are inactivated, the cell loses a critical safety mechanism.

!!! mascot-thinking "Accelerators and Brakes"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    Cancer requires both a stuck accelerator (oncogene activation) and failed brakes (tumor suppressor loss). That is why cancer usually needs multiple mutations to develop — a concept called multi-step carcinogenesis.

The most famous tumor suppressor is **TP53**, often called the "guardian of the genome." The p53 protein monitors DNA integrity. When it detects damage, p53 halts the cell cycle to allow repairs or, if the damage is too severe, initiates apoptosis. Mutations in *TP53* are found in more than half of all human cancers.

Another well-studied tumor suppressor is the **retinoblastoma protein (RB1)**. The RB protein blocks the cell cycle at the G1/S checkpoint by binding to transcription factors needed for DNA replication. Loss of both *RB1* alleles removes this checkpoint entirely, allowing damaged cells to replicate their DNA.

Unlike oncogenes, tumor suppressors typically require **both** alleles to be inactivated before the cell loses protection. This recessive behavior at the cellular level led to a landmark insight known as the two-hit hypothesis.

## The Two-Hit Hypothesis

In 1971, Alfred Knudson studied retinoblastoma, a rare childhood eye cancer, and proposed the **two-hit hypothesis**. Knudson observed two patterns of the disease:

1. **Hereditary retinoblastoma**: Children inherited one defective *RB1* allele from a parent (first hit) and needed only one additional somatic mutation (second hit) to lose tumor suppressor function. These children often developed tumors in both eyes at a young age.
2. **Sporadic retinoblastoma**: Children without an inherited mutation needed two independent somatic mutations in the same cell (both hits acquired during life). This was much rarer and typically produced a tumor in only one eye, appearing later in childhood.

The two-hit model explains why inherited cancer syndromes show earlier onset and multiple tumors compared to sporadic cases. Every cell in the body of a hereditary carrier already has one hit, so the probability of a second hit occurring in at least one cell is high.

\[
P(\text{tumor}) = 1 - (1 - p)^{N}
\]

In this expression, \( p \) represents the probability of the second hit occurring in any single cell, and \( N \) is the number of cells at risk. When \( N \) is large (millions of retinal cells in a developing eye), even a small per-cell probability produces a near-certain outcome.

#### Diagram: Two-Hit Hypothesis Comparison
<iframe src="../../sims/two-hit-hypothesis/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Two-Hit Hypothesis Comparison</summary>
Type: Comparative Diagram
**sim-id:** two-hit-hypothesis<br/>
**Library:** p5.js<br/>
**Status:** Specified

Side-by-side comparison of hereditary vs sporadic retinoblastoma. Left panel shows a germline mutation inherited at birth (first hit present in all cells) followed by a single somatic event (second hit) leading to tumor formation. Right panel shows two independent somatic mutations required in the same cell. Include a timeline showing age of onset for each pathway: hereditary (early childhood, bilateral) vs sporadic (later, unilateral). Use color coding: green for functional RB1 alleles, red for inactivated alleles.
</details>

## Somatic Mutations in Cancer

A **somatic mutation in cancer** is any genetic alteration that arises in a non-germline cell and contributes to or accompanies tumor development. Unlike germline mutations that are present in every cell from conception, somatic mutations appear in individual cells during a person's lifetime and are passed only to daughter cells during mitosis.

Somatic mutations accumulate throughout life due to several sources:

- **Replication errors**: DNA polymerase makes approximately one error per billion base pairs per cell division, but with trillions of cell divisions over a lifetime, errors accumulate
- **Environmental mutagens**: Ultraviolet radiation, tobacco smoke, and certain chemicals damage DNA and increase mutation rates
- **Endogenous damage**: Reactive oxygen species generated by normal metabolism cause thousands of DNA lesions per cell per day

Most somatic mutations occur in non-coding regions or in genes irrelevant to cell growth and are harmless. However, when a somatic mutation strikes a gene controlling proliferation, survival, or DNA repair, it can set a cell on the path toward cancer.

## Driver Mutations vs. Passenger Mutations

Not all mutations found in a tumor are equally important. Cancer genomics distinguishes between two categories:

A **driver mutation** is a somatic alteration that confers a selective growth advantage to the cell, directly contributing to cancer development. Driver mutations occur in cancer-related genes such as oncogenes and tumor suppressors. They are the mutations that "drive" tumor progression.

A **passenger mutation** is a somatic alteration that happened to be present in the cell when a driver mutation occurred but does not itself contribute to cancer development. Passenger mutations are carried along for the ride as the tumor cell divides, but they provide no growth advantage.

!!! mascot-tip "Sorting Drivers from Passengers"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    A typical tumor carries 30 to 80 protein-altering mutations, but only 2 to 8 of these are drivers. The rest are passengers. Distinguishing the two is one of the biggest challenges in cancer genomics.

Researchers use several strategies to identify driver mutations:

1. **Recurrence**: Mutations found repeatedly across many independent tumors of the same type are likely drivers
2. **Functional impact**: Mutations predicted to severely disrupt protein function (e.g., truncating mutations in tumor suppressors) are prioritized
3. **Pathway analysis**: Mutations affecting known cancer signaling pathways are more likely to be drivers
4. **Statistical models**: Computational tools compare the observed mutation frequency in a gene against the expected background rate

| Feature | Driver Mutation | Passenger Mutation |
|---|---|---|
| Growth advantage | Yes | No |
| Frequency across tumors | Recurrent | Random |
| Location | Cancer genes | Any gene |
| Number per tumor | 2-8 | 30-70+ |
| Therapeutic relevance | Often targetable | Generally not targetable |

## Tumor Mutational Burden

**Tumor mutational burden (TMB)** is the total number of somatic mutations per megabase of sequenced DNA in a tumor. TMB serves as a quantitative measure of how many mutations a tumor has accumulated. A tumor with a high TMB (typically defined as greater than 10 mutations per megabase) has accumulated an unusually large number of genetic changes.

TMB has emerged as an important clinical biomarker because tumors with high mutational burdens tend to produce many abnormal proteins, called neoantigens, on their cell surfaces. These neoantigens can be recognized by the immune system, making high-TMB tumors more responsive to **immunotherapy** — treatments that boost the body's own immune defenses against cancer.

The relationship between TMB and immunotherapy response can be summarized as:

\[
\text{High TMB} \rightarrow \text{More neoantigens} \rightarrow \text{Better immune recognition} \rightarrow \text{Better immunotherapy response}
\]

TMB varies dramatically across cancer types. Melanoma and lung cancer (both associated with environmental mutagens — UV radiation and tobacco smoke, respectively) typically have high TMB, while pediatric cancers and some leukemias have low TMB.

## Microsatellite Instability and Lynch Syndrome

**Microsatellite instability (MSI)** is a condition in which short repetitive DNA sequences (microsatellites) gain or lose repeat units at an abnormally high rate. MSI results from defects in the **mismatch repair (MMR)** system, the cellular machinery that corrects errors introduced during DNA replication.

When mismatch repair proteins such as MLH1, MSH2, MSH6, or PMS2 are defective, replication errors in microsatellite regions go uncorrected. The resulting instability affects thousands of microsatellite loci throughout the genome and leads to high tumor mutational burden.

MSI is clinically significant because it identifies tumors that may respond to immunotherapy and because it signals a possible hereditary cancer syndrome. Testing tumor samples for MSI involves comparing the lengths of specific microsatellite markers between tumor DNA and normal DNA from the same patient.

**Lynch syndrome** (also called hereditary nonpolyposis colorectal cancer, or HNPCC) is the most common hereditary cancer syndrome caused by germline mutations in mismatch repair genes. Individuals with Lynch syndrome inherit one defective copy of an MMR gene, placing them at substantially elevated risk for colorectal, endometrial, ovarian, and several other cancer types.

Key features of Lynch syndrome:

- **Autosomal dominant** inheritance pattern
- Germline mutation in *MLH1*, *MSH2*, *MSH6*, or *PMS2*
- Lifetime colorectal cancer risk of 50-80% (compared to ~5% in the general population)
- Tumors characteristically show high microsatellite instability (MSI-H)
- Diagnosed using the Amsterdam criteria or Bethesda guidelines, confirmed by genetic testing

#### Diagram: Mismatch Repair and Microsatellite Instability
<iframe src="../../sims/msi-repair-pathway/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Mismatch Repair and Microsatellite Instability</summary>
Type: Process Diagram
**sim-id:** msi-repair-pathway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Animated diagram showing two parallel pathways. Left pathway: Normal mismatch repair — DNA replication introduces a slippage error in a microsatellite repeat, MMR proteins (MLH1, MSH2) detect and correct the error, microsatellite length remains stable. Right pathway: Defective mismatch repair — same replication error occurs but MMR proteins are absent or nonfunctional, error persists, microsatellite length changes with each replication cycle. Bottom panel shows accumulating mutations over successive cell divisions, with a counter tracking total mutations. Color coding: correct bases in blue, mismatched bases in red, MMR proteins in green.
</details>

## BRCA Genes and Hereditary Cancer Risk

The **BRCA genes** — *BRCA1* (chromosome 17) and *BRCA2* (chromosome 13) — encode proteins essential for repairing double-strand DNA breaks through a process called homologous recombination. When these genes are functioning normally, they serve as tumor suppressors by maintaining genomic integrity.

!!! mascot-warning "BRCA Mutations Are Not a Diagnosis"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie giving a warning">
    Carrying a BRCA1 or BRCA2 mutation significantly increases cancer risk but does not mean cancer is inevitable. Lifetime breast cancer risk for BRCA1 carriers is approximately 55-72%, compared to about 13% in the general population. Risk management strategies can substantially reduce these numbers.

Individuals who inherit a pathogenic variant in *BRCA1* or *BRCA2* have one functional copy of the gene in every cell. If the remaining functional copy is lost through a somatic mutation (the second hit), the cell can no longer perform homologous recombination repair. This leads to an accumulation of chromosomal rearrangements and an elevated risk of breast, ovarian, prostate, and pancreatic cancers.

The inability to perform homologous recombination creates a therapeutic vulnerability. **PARP inhibitors** are drugs that block an alternative DNA repair pathway (base excision repair). Normal cells can tolerate PARP inhibition because they use homologous recombination as a backup, but BRCA-deficient cancer cells cannot survive without either pathway. This strategy, called **synthetic lethality**, selectively kills cancer cells while sparing normal tissue.

| Gene | Chromosome | Primary Cancers | Lifetime Breast Cancer Risk | Repair Pathway |
|---|---|---|---|---|
| *BRCA1* | 17q21 | Breast, ovarian | 55-72% | Homologous recombination |
| *BRCA2* | 13q12 | Breast, ovarian, prostate, pancreatic | 45-69% | Homologous recombination |

## Hereditary Cancer Syndromes and Cancer Predisposition

A **hereditary cancer syndrome** is a genetic condition caused by an inherited pathogenic variant that substantially increases the risk of developing specific cancers. These syndromes account for approximately 5-10% of all cancers. They typically follow an autosomal dominant inheritance pattern, meaning that inheriting a single pathogenic allele from either parent confers elevated risk.

**Cancer predisposition** is the broader concept describing an inherited genetic state that increases susceptibility to cancer. While hereditary cancer syndromes represent the most dramatic examples, cancer predisposition also includes lower-penetrance variants identified by genome-wide association studies that individually contribute small increases in risk.

Common hereditary cancer syndromes include:

- **Lynch syndrome**: MMR gene mutations; colorectal, endometrial, ovarian cancers
- **Hereditary breast and ovarian cancer (HBOC)**: *BRCA1/BRCA2* mutations
- **Li-Fraumeni syndrome**: *TP53* mutations; sarcomas, breast cancer, brain tumors, leukemia
- **Familial adenomatous polyposis (FAP)**: *APC* mutations; hundreds of colorectal polyps progressing to cancer
- **Retinoblastoma**: *RB1* mutations; childhood eye tumors
- **Von Hippel-Lindau syndrome**: *VHL* mutations; renal cell carcinoma, hemangioblastomas

Identifying individuals with hereditary cancer syndromes is critical for clinical management. These patients benefit from enhanced surveillance (earlier and more frequent screening), risk-reducing surgeries, and targeted therapies. Genetic counseling helps patients and families understand their risks and options.

## Chromosomal Instability

**Chromosomal instability (CIN)** refers to an increased rate of gains and losses of whole chromosomes or large chromosomal segments during cell division. Unlike microsatellite instability, which affects short repetitive sequences, CIN produces large-scale changes in chromosome number and structure.

CIN is one of the most common features of solid tumors. It arises from defects in several cellular processes:

- **Mitotic checkpoint errors**: The spindle assembly checkpoint normally prevents cells from proceeding through mitosis until all chromosomes are properly attached to the mitotic spindle. Defects in checkpoint proteins allow cells to divide with missegregated chromosomes.
- **Centrosome amplification**: Cells with extra centrosomes form multipolar spindles, leading to unequal chromosome distribution.
- **Telomere dysfunction**: Shortened or damaged telomeres cause chromosome fusions, creating unstable dicentric chromosomes that break during cell division.

CIN produces **aneuploidy** — an abnormal number of chromosomes. Aneuploidy is found in approximately 90% of solid tumors and 75% of blood cancers. The resulting gene dosage imbalances can simultaneously activate oncogenes (through chromosome gains) and inactivate tumor suppressors (through chromosome losses).

#### Diagram: Chromosomal Instability Mechanisms
<iframe src="../../sims/chromosomal-instability/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Chromosomal Instability Mechanisms</summary>
Type: Interactive Diagram
**sim-id:** chromosomal-instability<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive visualization showing three mechanisms of chromosomal instability. Panel 1: Normal mitosis with proper spindle attachment and equal chromosome segregation. Panel 2: Mitotic checkpoint failure — chromosomes missegregate, producing one daughter cell with an extra chromosome (trisomy) and one missing a chromosome (monosomy). Panel 3: Centrosome amplification with multipolar spindle producing uneven distribution. Users can click buttons to toggle between mechanisms. Each mechanism shows before and after chromosome counts with a karyotype summary bar at the bottom.
</details>

## Liquid Biopsy and Circulating Tumor DNA

Traditional cancer diagnosis relies on tissue biopsy — a surgical procedure to extract a piece of the tumor for analysis. **Liquid biopsy** is a revolutionary alternative that detects cancer-related biomarkers in blood or other body fluids. This non-invasive approach provides a molecular snapshot of the tumor without surgery.

The key analyte in most liquid biopsies is **circulating tumor DNA (ctDNA)** — short fragments of DNA released into the bloodstream when tumor cells die and break apart. These fragments carry the same mutations present in the tumor, making them a molecular fingerprint of the cancer.

ctDNA detection works because:

1. Tumor cells undergo apoptosis and necrosis, releasing DNA fragments (typically 150-200 base pairs) into the blood
2. These fragments circulate in the plasma alongside cell-free DNA from normal cells
3. Sensitive sequencing technologies can detect tumor-specific mutations even when ctDNA represents less than 0.1% of total cell-free DNA

Liquid biopsy has several clinical applications:

- **Early detection**: Identifying cancer before symptoms appear by screening for tumor-derived mutations in blood
- **Treatment monitoring**: Tracking tumor response to therapy by measuring ctDNA levels over time (decreasing ctDNA suggests effective treatment)
- **Resistance detection**: Identifying new mutations that confer drug resistance, often months before clinical progression is evident
- **Minimal residual disease**: Detecting tiny amounts of remaining cancer after surgery or treatment

!!! mascot-celebration "A Blood Test for Cancer"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    The ability to monitor cancer through a simple blood draw represents one of the most exciting advances in modern oncology. Liquid biopsy transforms cancer monitoring from periodic imaging scans to continuous molecular surveillance.

## Multi-Step Carcinogenesis: Putting It All Together

Cancer does not arise from a single genetic event. Instead, it develops through a multi-step process in which a cell progressively acquires driver mutations over years or decades. Each mutation provides a slight growth advantage, and natural selection within the tissue favors cells with the most mutations.

The classic model of multi-step carcinogenesis comes from colorectal cancer:

1. **Initiation**: Loss of the *APC* tumor suppressor gene leads to increased cell proliferation in the colon lining
2. **Promotion**: Activation of the *KRAS* oncogene further accelerates growth, forming a small benign polyp (adenoma)
3. **Progression**: Loss of *SMAD4* and *TP53* tumor suppressors transforms the adenoma into a malignant carcinoma capable of invasion and metastasis

\[
\text{Normal epithelium} \xrightarrow{APC^{-}} \text{Hyperplasia} \xrightarrow{KRAS^{+}} \text{Adenoma} \xrightarrow{SMAD4^{-}, TP53^{-}} \text{Carcinoma}
\]

This progression typically takes 10 to 15 years, which is why colorectal cancer screening beginning at age 45 is so effective at catching pre-cancerous polyps before they become malignant.

#### Diagram: Multi-Step Colorectal Carcinogenesis
<iframe src="../../sims/multistep-carcinogenesis/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Multi-Step Colorectal Carcinogenesis</summary>
Type: Animated Pathway Diagram
**sim-id:** multistep-carcinogenesis<br/>
**Library:** p5.js<br/>
**Status:** Specified

Animated left-to-right progression showing the stages of colorectal cancer development. Begin with normal colon epithelium, then show each genetic event (APC loss, KRAS activation, SMAD4 loss, TP53 loss) as a labeled step that triggers a visual transformation of the tissue. At each stage, display: (1) the tissue morphology changing from normal to hyperplastic to adenoma to carcinoma, (2) the gene affected and whether it is an oncogene activation or tumor suppressor loss, (3) a running count of accumulated driver mutations. Include a timeline bar at the bottom showing approximate years elapsed. Users can click "Play" to watch the animation or step through manually.
</details>

## The Hallmarks of Cancer

In 2000, Douglas Hanahan and Robert Weinberg proposed a framework organizing the biological capabilities acquired by cancer cells into a set of **hallmarks**. This framework, updated in 2011 and again in 2022, provides a unified way to understand how the genetic changes discussed in this chapter translate into cancer biology.

The original six hallmarks include:

1. **Sustaining proliferative signaling** (oncogene activation)
2. **Evading growth suppressors** (tumor suppressor loss)
3. **Resisting cell death** (apoptosis avoidance)
4. **Enabling replicative immortality** (telomerase activation)
5. **Inducing angiogenesis** (new blood vessel growth)
6. **Activating invasion and metastasis** (tissue boundaries breached)

Later additions include:

- Genome instability and mutation (CIN, MSI)
- Tumor-promoting inflammation
- Deregulating cellular energetics
- Avoiding immune destruction

Each hallmark corresponds to specific genetic alterations. For example, sustaining proliferative signaling maps to *RAS* and *HER2* oncogene activation, while evading growth suppressors maps to *RB1* and *TP53* loss. This framework connects the molecular details of cancer genetics to the clinical behaviors of tumors.

## Summary and Key Takeaways

Cancer is fundamentally a genetic disease driven by the accumulation of somatic mutations in genes controlling cell growth, repair, and death. The interplay between oncogene activation (gain of function) and tumor suppressor loss (loss of function) underlies the development of all cancers.

Key concepts from this chapter:

- **Oncogenes** promote cell growth and act dominantly; a single mutant allele is sufficient
- **Tumor suppressor genes** restrain growth and act recessively at the cellular level; both alleles must be inactivated
- The **two-hit hypothesis** explains why hereditary cancers appear earlier and more frequently than sporadic cases
- **Driver mutations** directly contribute to cancer; **passenger mutations** are bystanders
- **Tumor mutational burden** predicts immunotherapy response
- **Microsatellite instability** results from mismatch repair defects and characterizes Lynch syndrome
- **BRCA genes** maintain genomic stability through homologous recombination; their loss creates therapeutic opportunities via synthetic lethality
- **Chromosomal instability** produces aneuploidy and is a pervasive feature of solid tumors
- **Liquid biopsy** and **circulating tumor DNA** enable non-invasive cancer detection and monitoring
- **Hereditary cancer syndromes** account for 5-10% of cancers and require specialized genetic counseling and surveillance

## Review Questions

1. Explain the functional difference between an oncogene and a tumor suppressor gene. Why does oncogene activation require only one mutant allele, while tumor suppressor inactivation typically requires two?

2. A child is diagnosed with bilateral retinoblastoma at age 18 months. Using Knudson's two-hit hypothesis, explain why bilateral presentation strongly suggests a hereditary rather than sporadic case.

3. A tumor sequencing report shows 15 mutations per megabase and high microsatellite instability. What does this suggest about the tumor's DNA repair capacity, and how might this information guide treatment decisions?

4. Compare and contrast chromosomal instability (CIN) and microsatellite instability (MSI) as mechanisms of genomic instability in cancer. Which genes are typically affected in each?

5. A patient with ovarian cancer is found to carry a germline *BRCA1* mutation. Explain the concept of synthetic lethality and how PARP inhibitors exploit this patient's tumor biology.

6. Describe three clinical applications of liquid biopsy using circulating tumor DNA. What advantages does liquid biopsy offer over traditional tissue biopsy?

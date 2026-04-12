---
title: GWAS and Population Genetics
description: Population genetics fundamentals integrated with genome-wide association studies, covering Hardy-Weinberg equilibrium, selection, drift, gene flow, GWAS methodology, and polygenic risk scores.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# GWAS and Population Genetics

## Summary

This chapter integrates population genetics fundamentals with modern genome-wide association studies. Students learn Hardy-Weinberg equilibrium, natural selection, genetic drift, gene flow, and population structure alongside GWAS methodology, statistical corrections, effect sizes, and polygenic risk scores. After completing this chapter, students will understand how population-level genetic variation connects to trait associations and disease risk.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

1. Population Genetics
2. Allele Frequency
3. Genotype Frequency
4. Hardy-Weinberg Equilibrium
5. Hardy-Weinberg Assumptions
6. Chi-Square HWE Test
7. Natural Selection
8. Fitness
9. Selection Coefficient
10. Directional Selection
11. Stabilizing Selection
12. Disruptive Selection
13. Balancing Selection
14. Heterozygote Advantage
15. Genetic Drift
16. Bottleneck Effect
17. Founder Effect
18. Gene Flow
19. Migration
20. Mutation Rate
21. Population Structure
22. Fixation Index
23. GWAS
24. Manhattan Plot
25. Significance Threshold
26. Multiple Testing Correction
27. Bonferroni Correction
28. False Discovery Rate
29. Effect Size
30. Odds Ratio
31. Polygenic Risk Score
32. Missing Heritability

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)
- [Chapter 5: Genetic Variation and Genome Diversity](../05-genetic-variation-genome-diversity/index.md)
- [Chapter 9: Quantitative Genetics and Heritability](../09-quantitative-genetics-heritability/index.md)

---

## Introduction: Thinking About Populations

!!! mascot-welcome "Welcome, Fellow Investigators!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome to the world of population genetics! In previous chapters we studied how genes behave in families and individuals. Now we zoom out to ask: how does genetic variation behave across entire populations? Let's look at the evidence!

Up to this point in the course, we have focused on inheritance within families, pedigrees, and controlled crosses. **Population genetics** shifts that lens from the family to the population, studying how allele and genotype frequencies change — or remain stable — across generations of organisms. This field provides the mathematical framework for understanding evolution and serves as the statistical foundation for modern genomic medicine.

Population genetics matters for a practical reason: most human diseases and traits are influenced by many variants scattered across the genome. To find those variants, researchers scan entire populations using a method called a **genome-wide association study (GWAS)**. Understanding population genetics is therefore a prerequisite for interpreting GWAS results correctly.

This chapter is organized in three major sections. First, we build the population genetics toolkit: allele frequencies, Hardy-Weinberg equilibrium, and the evolutionary forces that change allele frequencies. Second, we examine population structure and how genetic variation is partitioned among groups. Third, we apply all of this to GWAS methodology, statistical corrections, effect sizes, and polygenic risk scores.

## Part 1: Foundations of Population Genetics

### Allele Frequency and Genotype Frequency

A population, in genetic terms, is a group of interbreeding individuals sharing a common gene pool. The most fundamental measurement in population genetics is the **allele frequency** — the proportion of a specific allele among all copies of that gene in the population. If a population of 500 diploid individuals carries a gene with two alleles, \( A \) and \( a \), there are 1,000 total allele copies. The allele frequency of \( A \) is the count of \( A \) alleles divided by 1,000.

The **genotype frequency** is the proportion of individuals with a particular genotype. For a biallelic locus, the three possible genotypes are \( AA \), \( Aa \), and \( aa \). If we let \( p \) represent the frequency of allele \( A \) and \( q \) represent the frequency of allele \( a \), then \( p + q = 1 \).

Consider a sample population of 200 individuals:

| Genotype | Count | Genotype Frequency | Allele Contribution |
|----------|-------|--------------------|---------------------|
| \( AA \) | 90 | 0.45 | 180 copies of \( A \) |
| \( Aa \) | 80 | 0.40 | 80 copies of \( A \), 80 copies of \( a \) |
| \( aa \) | 30 | 0.15 | 60 copies of \( a \) |
| **Total** | **200** | **1.00** | **260 \( A \), 140 \( a \)** |

From this table we calculate \( p = 260/400 = 0.65 \) and \( q = 140/400 = 0.35 \).

### Hardy-Weinberg Equilibrium

In 1908, mathematician G. H. Hardy and physician Wilhelm Weinberg independently proved that allele frequencies in a population remain constant from generation to generation in the absence of evolutionary forces. This principle is called **Hardy-Weinberg equilibrium (HWE)**. Under HWE, genotype frequencies are predicted by the simple expansion of the binomial:

\[
p^2 + 2pq + q^2 = 1
\]

where \( p^2 \) is the expected frequency of \( AA \), \( 2pq \) is the expected frequency of \( Aa \), and \( q^2 \) is the expected frequency of \( aa \).

!!! mascot-thinking "Why Does HWE Matter?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    Hardy-Weinberg equilibrium is like the "null hypothesis" of population genetics. We don't expect real populations to be in perfect equilibrium — but when they deviate, that deviation tells us something interesting is happening!

### Hardy-Weinberg Assumptions

The **Hardy-Weinberg assumptions** define the idealized conditions under which equilibrium holds:

1. **No mutation** — alleles do not change from one form to another.
2. **Random mating** — individuals pair without regard to genotype.
3. **No natural selection** — all genotypes have equal survival and reproduction.
4. **Infinite population size** — no random fluctuations in allele frequency (no genetic drift).
5. **No gene flow** — no migration of individuals into or out of the population.

When any of these assumptions is violated, allele frequencies may change over time — and that is evolution. Each violation corresponds to a specific evolutionary force that we will examine below.

### Chi-Square HWE Test

To determine whether a real population deviates from Hardy-Weinberg equilibrium, we use the **chi-square HWE test**. This goodness-of-fit test compares observed genotype counts to the counts expected under HWE.

The procedure is straightforward:

1. Count the observed genotypes and calculate allele frequencies.
2. Use \( p^2 \), \( 2pq \), and \( q^2 \) to compute expected genotype counts.
3. Calculate the chi-square statistic:

\[
\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}
\]

4. Compare the statistic to a chi-square distribution with 1 degree of freedom (for a biallelic locus).

Using our example above (\( p = 0.65, q = 0.35, N = 200 \)):

| Genotype | Observed | Expected (\( N \times \text{HWE freq} \)) | \( (O - E)^2 / E \) |
|----------|----------|--------------------------------------------|----------------------|
| \( AA \) | 90 | \( 200 \times 0.4225 = 84.5 \) | 0.358 |
| \( Aa \) | 80 | \( 200 \times 0.455 = 91.0 \) | 1.330 |
| \( aa \) | 30 | \( 200 \times 0.1225 = 24.5 \) | 1.235 |
| **Total** | **200** | **200** | **\( \chi^2 = 2.92 \)** |

The critical value at \( \alpha = 0.05 \) with 1 degree of freedom is 3.84. Since 2.92 < 3.84, we fail to reject the null hypothesis: this population is consistent with HWE.

## Part 2: Evolutionary Forces

### Natural Selection

**Natural selection** is the differential survival and reproduction of individuals due to differences in phenotype. In population genetics, we quantify selection using the concept of **fitness**, denoted \( w \). Fitness is the relative reproductive success of a genotype compared to the most successful genotype.

The **selection coefficient**, \( s \), measures the reduction in fitness relative to the fittest genotype: \( w = 1 - s \). A genotype with \( s = 0.1 \) has 90% the fitness of the reference genotype.

Selection operates in several distinct patterns, each producing a different effect on the distribution of phenotypes in a population:

- **Directional selection** favors one extreme of the phenotype distribution, shifting the population mean in one direction over time. Example: antibiotic resistance increasing in a bacterial population.
- **Stabilizing selection** favors intermediate phenotypes and reduces variation. Example: human birth weight, where very low and very high weights reduce survival.
- **Disruptive selection** favors both extremes over intermediate phenotypes, potentially splitting the population into distinct groups. Example: beak size in seed-cracking finches when only very small and very large seeds are available.

#### Diagram: Selection Types Comparison
<iframe src="../../sims/selection-types/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Selection Types Comparison</summary>
Type: Interactive simulation
**sim-id:** selection-types<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive simulation showing three bell curves representing a phenotype distribution. Users select one of three modes — directional, stabilizing, or disruptive — using radio buttons. After pressing "Run Selection," the simulation animates the distribution changing over 10 generations. Directional shifts the mean, stabilizing narrows the curve, and disruptive creates a bimodal distribution. A slider controls selection strength (s = 0.01 to 0.5). The x-axis shows phenotype value and the y-axis shows frequency.
</details>

### Balancing Selection and Heterozygote Advantage

**Balancing selection** maintains multiple alleles in a population at stable frequencies. The most studied mechanism is **heterozygote advantage** (also called overdominance), where heterozygotes have higher fitness than either homozygote.

The classic example is sickle-cell anemia and malaria resistance. Individuals heterozygous for the sickle-cell allele (\( HbA/HbS \)) have partial protection against malaria without the severe anemia that affects \( HbS/HbS \) homozygotes. In malaria-endemic regions, this keeps both alleles in the population.

| Genotype | Phenotype | Fitness in Malaria Region |
|----------|-----------|--------------------------|
| \( HbA/HbA \) | Normal hemoglobin | Susceptible to malaria (\( w \approx 0.9 \)) |
| \( HbA/HbS \) | Sickle-cell trait | Malaria resistant (\( w = 1.0 \)) |
| \( HbS/HbS \) | Sickle-cell disease | Severe anemia (\( w \approx 0.2 \)) |

Under heterozygote advantage, the equilibrium allele frequency of the deleterious allele depends on the relative fitness values. If the selection coefficient against \( HbA/HbA \) is \( s_1 \) and against \( HbS/HbS \) is \( s_2 \), then the equilibrium frequency of \( HbS \) is:

\[
\hat{q} = \frac{s_1}{s_1 + s_2}
\]

### Genetic Drift

**Genetic drift** is the random change in allele frequencies that occurs because populations are finite. Unlike selection, drift is not directed by fitness differences — it is pure chance. Small populations experience stronger drift than large ones.

Two special cases of drift have dramatic effects on allele frequencies:

- The **bottleneck effect** occurs when a population's size is sharply reduced by a catastrophic event (disease, natural disaster, habitat loss). The surviving individuals carry only a subset of the original genetic variation, and allele frequencies may shift dramatically.
- The **founder effect** occurs when a small group of individuals colonizes a new area. The new population's allele frequencies reflect the founders, not the original population. This explains the high frequency of certain genetic disorders in isolated communities, such as Ellis-van Creveld syndrome among the Old Order Amish.

!!! mascot-tip "Drift vs. Selection"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    A key distinction: natural selection is deterministic (predictable direction), while genetic drift is stochastic (random direction). In large populations, selection dominates. In small populations, drift can overpower even moderately strong selection.

### Gene Flow and Migration

**Gene flow** is the transfer of alleles between populations through **migration** — the movement of individuals (or their gametes) from one population to another. Gene flow tends to homogenize allele frequencies across populations, counteracting the divergence caused by drift and local selection.

The effect of migration on allele frequency can be modeled simply. If a population receives migrants at rate \( m \) per generation, and the migrant allele frequency is \( p_m \) while the resident frequency is \( p_0 \), then the new allele frequency after one generation is:

\[
p_1 = (1 - m) p_0 + m \cdot p_m
\]

### Mutation Rate

The **mutation rate** is the probability that an allele changes to a different form per generation. Mutation is the ultimate source of all new genetic variation. However, mutation rates are typically very low (\( 10^{-8} \) to \( 10^{-9} \) per nucleotide per generation in humans), so mutation alone changes allele frequencies very slowly. Mutation's primary role is to supply the raw material upon which selection, drift, and gene flow act.

### Summary of Evolutionary Forces

| Force | Effect on Allele Frequency | Directional? | Depends on Population Size? |
|-------|---------------------------|--------------|----------------------------|
| Natural Selection | Increases frequency of beneficial alleles | Yes | No (but effectiveness does) |
| Genetic Drift | Random changes | No | Yes — stronger in small populations |
| Gene Flow | Homogenizes across populations | Toward migrant frequency | No |
| Mutation | Introduces new alleles | Weak directional pressure | No |

## Part 3: Population Structure

### What Is Population Structure?

**Population structure** refers to the systematic differences in allele frequencies among subpopulations. Humans do not form a single randomly mating population. Geographic barriers, cultural practices, and historical events create partially isolated subgroups with distinct allele frequency profiles.

Population structure matters enormously for GWAS because it can create spurious associations. If a trait happens to be more common in one subpopulation and certain alleles are also more common in that subpopulation, a naive analysis may falsely conclude that those alleles cause the trait.

### Fixation Index (F_ST)

The **fixation index**, or \( F_{ST} \), quantifies genetic differentiation between populations. It compares the variance in allele frequencies among subpopulations to the total variance expected under random mating:

\[
F_{ST} = \frac{H_T - H_S}{H_T}
\]

where \( H_T \) is the expected heterozygosity in the total population and \( H_S \) is the average expected heterozygosity within subpopulations. Values of \( F_{ST} \) range from 0 (no differentiation) to 1 (complete fixation of different alleles).

For humans, global \( F_{ST} \) is approximately 0.12, meaning about 12% of genetic variation is distributed among continental populations, while 88% is found within populations. This relatively low value reflects the recency of human population divergence and ongoing gene flow.

| \( F_{ST} \) Range | Interpretation |
|--------------------|---------------|
| 0.00 – 0.05 | Little genetic differentiation |
| 0.05 – 0.15 | Moderate differentiation |
| 0.15 – 0.25 | Great differentiation |
| > 0.25 | Very great differentiation |

## Part 4: Genome-Wide Association Studies (GWAS)

### What Is a GWAS?

A **genome-wide association study (GWAS)** tests hundreds of thousands or millions of genetic variants — typically single nucleotide polymorphisms (SNPs) — across the genome for association with a trait or disease. The core idea is simple: compare allele frequencies between a case group (individuals with the trait) and a control group (individuals without the trait). If a SNP's allele is significantly more common in cases than controls, it may be associated with the trait.

!!! mascot-thinking "From Population Genetics to GWAS"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    Notice how GWAS depends on concepts we just learned! If allele frequencies differ between populations (population structure), and our cases and controls come from different populations, we could get false signals. That's why population genetics is the essential foundation for GWAS.

A typical GWAS workflow includes:

1. **Collect samples** — recruit thousands of individuals, collect DNA, and record phenotype information.
2. **Genotype** — use SNP arrays or whole-genome sequencing to determine genotypes at hundreds of thousands of loci.
3. **Quality control** — remove low-quality SNPs, check for population stratification, exclude related individuals.
4. **Statistical testing** — test each SNP for association with the trait using logistic regression (for binary traits) or linear regression (for quantitative traits), correcting for covariates including population structure.
5. **Interpret results** — identify significant associations, replicate in independent cohorts, and investigate biological mechanisms.

### The Manhattan Plot

Results from a GWAS are typically displayed in a **Manhattan plot**, named for its resemblance to the New York City skyline. In this plot:

- The **x-axis** shows genomic position, with chromosomes arranged in order.
- The **y-axis** shows the negative log10 of the p-value for each SNP: \( -\log_{10}(p) \).
- SNPs with stronger associations appear as taller peaks.

#### Diagram: Interactive Manhattan Plot
<iframe src="../../sims/manhattan-plot/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Interactive Manhattan Plot</summary>
Type: Interactive visualization
**sim-id:** manhattan-plot<br/>
**Library:** Chart.js or Plotly<br/>
**Status:** Specified

A simulated Manhattan plot showing 22 autosomes with alternating colors. Each chromosome has scattered points (simulated SNPs) with most clustered at low -log10(p) values (1-3). Three to five "peaks" rise above the genome-wide significance line (drawn at -log10(5×10^-8) = 7.3). Hovering over a peak displays a tooltip with the SNP ID, chromosome, position, p-value, and nearest gene. A slider controls the number of simulated significant loci (1-10). A checkbox toggles a suggestive significance line at -log10(1×10^-5) = 5.
</details>

### Significance Threshold and Multiple Testing Correction

When testing hundreds of thousands of SNPs, some will appear significant by chance alone. This is the **multiple testing problem**. If you test 1 million SNPs at \( \alpha = 0.05 \), you expect 50,000 false positives — clearly unacceptable.

The **significance threshold** for GWAS is conventionally set at \( p < 5 \times 10^{-8} \), which accounts for approximately 1 million independent tests across the human genome. This stringent threshold is derived from the **Bonferroni correction**, the simplest multiple testing correction:

\[
\alpha_{\text{corrected}} = \frac{\alpha}{n}
\]

where \( n \) is the number of independent tests. For \( \alpha = 0.05 \) and \( n = 1{,}000{,}000 \):

\[
\alpha_{\text{corrected}} = \frac{0.05}{1{,}000{,}000} = 5 \times 10^{-8}
\]

The **Bonferroni correction** is conservative — it controls the probability of even one false positive (the family-wise error rate). This is appropriate for GWAS because false positives are expensive to follow up experimentally.

An alternative approach is the **false discovery rate (FDR)**, which controls the expected proportion of false positives among all rejected hypotheses. The Benjamini-Hochberg procedure sorts p-values from smallest to largest and finds the largest p-value \( p_{(k)} \) satisfying:

\[
p_{(k)} \leq \frac{k}{m} \cdot q
\]

where \( m \) is the total number of tests and \( q \) is the desired FDR (typically 0.05). FDR is less conservative than Bonferroni and is used when researchers want to maximize discovery while accepting that a known fraction of results will be false positives.

| Method | Controls | Stringency | Best Used When |
|--------|----------|------------|----------------|
| Bonferroni | Family-wise error rate | Very conservative | Few tests, expensive follow-up |
| FDR (Benjamini-Hochberg) | False discovery rate | Moderate | Many tests, prioritizing discovery |

### Effect Size and Odds Ratio

Once a significant association is identified, we need to quantify how strong it is. The **effect size** describes the magnitude of the association between a genetic variant and a trait.

For binary traits (disease present/absent), the standard measure is the **odds ratio (OR)**:

\[
OR = \frac{P(\text{disease} \mid \text{risk allele}) / P(\text{no disease} \mid \text{risk allele})}{P(\text{disease} \mid \text{other allele}) / P(\text{no disease} \mid \text{other allele})}
\]

An OR of 1.0 means no association. An OR greater than 1.0 indicates increased risk; less than 1.0 indicates decreased risk. Most GWAS-identified variants have modest effect sizes, with odds ratios between 1.05 and 1.50. This is a critical finding: common variants individually contribute very little to disease risk.

!!! mascot-warning "Effect Size vs. Significance"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie giving a warning">
    Don't confuse statistical significance with effect size! A variant can be highly significant (very small p-value) but have a tiny effect size. Significance tells you the association is real; effect size tells you how much it matters clinically. Always report both.

### Polygenic Risk Score

Because individual variants have small effects, researchers combine them into a **polygenic risk score (PRS)**. A PRS sums the effects of many variants, each weighted by its estimated effect size:

\[
PRS = \sum_{i=1}^{n} \beta_i \cdot x_i
\]

where \( \beta_i \) is the effect size (log odds ratio) for variant \( i \) and \( x_i \) is the number of risk alleles (0, 1, or 2) the individual carries at that variant.

The steps for constructing a PRS are:

1. **Select variants** from a discovery GWAS — often thousands to millions of SNPs, not just genome-wide significant ones.
2. **Assign weights** using the effect sizes from the discovery study.
3. **Calculate scores** in an independent target sample.
4. **Evaluate prediction** by testing whether the PRS predicts the trait in the target sample.

PRS distributions typically overlap substantially between cases and controls. Individuals in the top percentiles of the PRS distribution may have 2-5 times the risk compared to those in the bottom percentiles, but a high PRS does not guarantee disease, nor does a low PRS guarantee protection.

#### Diagram: Polygenic Risk Score Distribution
<iframe src="../../sims/prs-distribution/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Polygenic Risk Score Distribution</summary>
Type: Interactive visualization
**sim-id:** prs-distribution<br/>
**Library:** Chart.js or p5.js<br/>
**Status:** Specified

Two overlapping bell curves representing the PRS distribution in cases (red) and controls (blue). The x-axis shows PRS value; the y-axis shows frequency. A vertical draggable threshold line allows the user to explore how different cutoffs change the proportion of cases vs. controls classified as "high risk." A readout panel shows sensitivity, specificity, and positive predictive value at the selected threshold. A slider controls the degree of separation between the two distributions (AUC from 0.55 to 0.85).
</details>

### Missing Heritability

GWAS have been remarkably successful, identifying thousands of trait-associated variants. Yet for most traits, the variants discovered by GWAS explain only a fraction of the estimated heritability. This gap is called **missing heritability**.

Several explanations have been proposed for missing heritability:

- **Rare variants** with larger effects that are not captured by standard SNP arrays.
- **Gene-gene interactions** (epistasis) that are not detected by single-variant tests.
- **Gene-environment interactions** that vary across study populations.
- **Structural variants** (deletions, duplications, inversions) that are difficult to genotype.
- **Epigenetic effects** that influence gene expression without changing DNA sequence.
- **Overestimated heritability** in twin studies due to shared environment assumptions.

The search for missing heritability has driven the development of whole-genome sequencing studies, larger sample sizes (now exceeding 1 million participants for some traits), and new statistical methods that aggregate the effects of rare variants.

## Connecting the Concepts

The relationship between population genetics and GWAS is not merely historical — it is structural. Every step of a GWAS depends on population genetics principles:

- **Study design** requires understanding population structure and gene flow to match cases and controls appropriately.
- **Quality control** uses Hardy-Weinberg tests to flag genotyping errors (variants far out of HWE in controls suggest technical problems).
- **Statistical analysis** corrects for population stratification using principal components derived from genome-wide allele frequency patterns.
- **Interpretation** requires understanding that allele frequency differences among populations reflect drift and selection, not necessarily disease risk.

!!! mascot-celebration "Chapter Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Excellent work, fellow investigators! You've built a complete framework from allele frequencies through evolutionary forces to modern GWAS methodology. This foundation will serve you well as genomic studies continue to grow in size and complexity. What does the data tell us? That understanding populations is the key to understanding genomes!

## Review Questions

1. A population of 1,000 individuals has genotype frequencies of 0.49 \( AA \), 0.42 \( Aa \), and 0.09 \( aa \). Is this population in Hardy-Weinberg equilibrium? Show your work.
2. Explain why the Bonferroni correction is considered conservative. In what situations might FDR control be more appropriate?
3. A GWAS identifies a SNP with \( p = 3 \times 10^{-12} \) and an odds ratio of 1.08. Interpret these numbers in plain language.
4. Why does genetic drift have a stronger effect in small populations than in large ones? Relate this to the bottleneck effect.
5. A polygenic risk score explains 8% of the variance in a trait whose heritability is estimated at 50%. What might account for the remaining 42%?

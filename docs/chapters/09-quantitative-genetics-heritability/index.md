---
title: Quantitative Genetics and Heritability
description: Inheritance and analysis of quantitative traits including variance partitioning, heritability estimation, twin studies, and QTL mapping
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Quantitative Genetics and Heritability

## Summary

This chapter explores how quantitative traits are inherited and analyzed, covering variance partitioning, heritability estimation, twin studies, and QTL mapping. Students learn the distinction between broad-sense and narrow-sense heritability and how molecular markers enable the mapping of quantitative trait loci. After completing this chapter, students will be able to estimate heritability and interpret QTL mapping results.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

1. Quantitative Genetics
2. Quantitative Trait
3. Continuous Variation
4. Polygenic Inheritance
5. Multifactorial Trait
6. Threshold Trait
7. Phenotypic Variance
8. Additive Genetic Variance
9. Dominance Variance
10. Epistatic Variance
11. Environmental Variance
12. Heritability
13. Broad Sense Heritability
14. Narrow Sense Heritability
15. Twin Studies
16. Monozygotic Twins
17. Dizygotic Twins
18. Concordance Rate
19. Heritability Estimation
20. Quantitative Trait Locus
21. QTL Mapping
22. Interval Mapping
23. Marker Assisted Selection

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)
- [Chapter 7: Genetic Mapping and Linkage Analysis](../07-genetic-mapping-linkage-analysis/index.md)

---

!!! mascot-welcome "Beyond Simple Mendelian Ratios"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    Welcome, fellow investigators! Most traits in nature do not sort into neat 3:1 ratios. Height, weight, blood pressure, crop yield — these vary continuously across populations. Let's look at the evidence for how genetics drives this continuous variation!

## What Is Quantitative Genetics?

**Quantitative genetics** is the branch of genetics that studies the inheritance of traits showing continuous, measurable variation in populations. Unlike Mendelian genetics, which focuses on traits controlled by single genes with discrete phenotypic classes, quantitative genetics deals with traits influenced by many genes and environmental factors simultaneously.

The field has its origins in a historical tension. In the early 1900s, Mendelians argued that inheritance was governed by discrete factors, while biometricians (led by Karl Pearson and W.F.R. Weldon) emphasized the smooth, continuous distributions they measured in natural populations. Ronald Fisher resolved this conflict in his landmark 1918 paper, showing that many Mendelian factors acting together could produce the continuous distributions observed by the biometricians.

Quantitative genetics provides the mathematical framework for predicting how populations respond to selection — a question central to agriculture, medicine, and evolutionary biology.

## Quantitative Traits and Continuous Variation

A **quantitative trait** is any phenotype that is measured on a continuous numerical scale rather than classified into discrete categories. Examples include height, weight, blood pressure, grain yield, milk production, and IQ scores. When you measure a quantitative trait across a large population and plot the distribution, you typically observe a bell-shaped (normal) curve — this is **continuous variation**.

Continuous variation arises from two sources working together. First, multiple genes contribute to the trait, each adding a small increment to the phenotype. Second, environmental factors introduce additional variation. The combined effect of many small genetic and environmental influences produces the smooth, continuous distribution predicted by the central limit theorem.

Not all continuously distributed traits are quantitative genetic traits, and not all genetically complex traits show continuous distributions. However, the combination of multiple genetic loci and environmental influence is the hallmark of quantitative trait inheritance.

## Polygenic Inheritance

**Polygenic inheritance** describes the situation where multiple genes (typically many) each contribute a small, additive effect to a phenotype. The classic demonstration of polygenic inheritance comes from Nilsson-Ehle's 1909 experiments with wheat kernel color. He crossed red-kerneled and white-kerneled varieties and observed F2 ratios that could be explained by two or three independently segregating loci, each with an additive effect on pigmentation.

With \( n \) loci, each having two alleles with additive effects, the number of phenotypic classes in the F2 generation is \( 2n + 1 \). As the number of loci increases, the discrete phenotypic classes merge into a continuous distribution:

| Number of Loci | Phenotypic Classes in F2 | Distribution Shape |
|---|---|---|
| 1 | 3 | Discrete, 1:2:1 |
| 2 | 5 | Stepped |
| 3 | 7 | Approaching bell curve |
| 5 | 11 | Nearly continuous |
| 10 | 21 | Smooth bell curve |
| 50+ | 101+ | Indistinguishable from continuous |

#### Diagram: Polygenic Inheritance and Phenotype Distributions
<iframe src="../../sims/polygenic-inheritance/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Polygenic Inheritance and Phenotype Distributions</summary>
Type: Interactive simulation
**sim-id:** polygenic-inheritance<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive simulation where users adjust the number of contributing loci (1 to 20) using a slider. The display shows a histogram of phenotypic values in a simulated F2 population, demonstrating how increasing the number of loci transforms the distribution from discrete classes to a smooth bell curve. A second slider adds environmental noise to show how environment further smooths the distribution. The current number of phenotypic classes and distribution statistics are displayed.
</details>

## Multifactorial Traits and Threshold Traits

A **multifactorial trait** is any trait influenced by both genetic and environmental factors. All quantitative traits are multifactorial, but the term also applies to discrete traits that have complex underlying causes. Many common diseases — diabetes, heart disease, schizophrenia, asthma — are multifactorial: they result from the combined effects of multiple genes and environmental exposures.

A **threshold trait** is a special category of multifactorial trait that appears qualitative (present or absent) despite having a continuous underlying genetic and environmental liability. The liability is a hidden, normally distributed variable that represents an individual's overall predisposition. When liability exceeds a threshold value, the trait is expressed; when it falls below the threshold, the individual appears unaffected.

Examples of threshold traits include:

- **Cleft palate** — either present or absent, but the underlying developmental liability is continuous
- **Type 2 diabetes** — clinical diagnosis is binary, but glucose regulation falls on a spectrum
- **Pyloric stenosis** — more common in males, suggesting the threshold differs between sexes

The threshold model explains why multifactorial diseases can "run in families" without following Mendelian ratios. Affected individuals tend to have liability values well above the threshold, so their relatives — who share some of the same predisposing alleles — are more likely to exceed the threshold themselves.

!!! mascot-thinking "Hidden Continuity"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    When you see a trait that is either present or absent, do not assume it is controlled by a single gene. Many either/or traits actually have a continuous underlying liability influenced by dozens or hundreds of genes. What does the data tell us about the genetics beneath the surface?

## Partitioning Phenotypic Variance

The fundamental equation of quantitative genetics partitions the total **phenotypic variance** (\( V_P \)) of a trait into genetic and environmental components:

\[
V_P = V_G + V_E
\]

where \( V_G \) is the genetic variance and \( V_E \) is the **environmental variance**. Environmental variance captures all nongenetic sources of phenotypic variation, including nutrition, temperature, developmental noise, and measurement error.

The genetic variance can be further subdivided into three components:

\[
V_G = V_A + V_D + V_I
\]

- **Additive genetic variance** (\( V_A \)) arises from the additive effects of individual alleles. Each allele contributes a fixed increment or decrement to the phenotype, regardless of which other alleles are present. Additive variance is the most important component for predicting response to selection because parents pass individual alleles — not genotypes — to offspring.

- **Dominance variance** (\( V_D \)) arises from interactions between alleles at the same locus. When heterozygotes do not have a phenotype exactly intermediate between the two homozygotes, dominance contributes to genetic variance. Dominance variance is not transmitted predictably from parent to offspring because genotype combinations are reshuffled each generation.

- **Epistatic variance** (\( V_I \)) arises from interactions between alleles at different loci. When the effect of an allele at one locus depends on the genotype at another locus, epistasis contributes to genetic variance. Like dominance variance, epistatic variance is difficult to predict across generations.

The complete variance partition is therefore:

\[
V_P = V_A + V_D + V_I + V_E
\]

This partition is the foundation for defining heritability and predicting the response of populations to selection.

## Heritability

**Heritability** quantifies the proportion of phenotypic variation in a population that is attributable to genetic differences among individuals. It is a population-level statistic, not a property of an individual. Heritability ranges from 0 (all variation is environmental) to 1 (all variation is genetic).

Two distinct measures of heritability are commonly used, each capturing different aspects of genetic influence.

### Broad-Sense Heritability

**Broad-sense heritability** (\( H^2 \)) is the proportion of phenotypic variance due to all genetic variance:

\[
H^2 = \frac{V_G}{V_P} = \frac{V_A + V_D + V_I}{V_P}
\]

Broad-sense heritability tells us how much of the phenotypic variation is genetic in origin, but it does not distinguish between additive, dominance, and epistatic effects.

### Narrow-Sense Heritability

**Narrow-sense heritability** (\( h^2 \)) is the proportion of phenotypic variance due to additive genetic variance alone:

\[
h^2 = \frac{V_A}{V_P}
\]

Narrow-sense heritability is the more useful measure for predicting the response to selection. Because parents transmit individual alleles (not complete genotypes) to offspring, only additive genetic effects are reliably passed from generation to generation. Narrow-sense heritability determines how effectively selection can change a population's mean phenotype.

| Trait | Organism | \( h^2 \) Estimate | Interpretation |
|---|---|---|---|
| Height | Humans | 0.80 | Highly heritable |
| Milk yield | Dairy cattle | 0.35 | Moderately heritable |
| Egg production | Chickens | 0.10 | Low heritability |
| Litter size | Pigs | 0.15 | Low heritability |
| Grain yield | Wheat | 0.25 | Moderately heritable |

!!! mascot-warning "Heritability Is Not Destiny"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie giving a warning">
    A heritability of 0.80 for height does NOT mean that 80% of your height is determined by your genes. It means that 80% of the variation in height within a specific population, at a specific time, in a specific environment, is attributable to genetic differences. Change the environment, and heritability changes too.

## Twin Studies

**Twin studies** are one of the most powerful natural experiments for estimating heritability in humans, where controlled breeding experiments are impossible. The logic relies on comparing the similarity of two types of twins.

**Monozygotic (MZ) twins** — identical twins — develop from a single fertilized egg that splits into two embryos. They share 100% of their DNA sequence. **Dizygotic (DZ) twins** — fraternal twins — develop from two separately fertilized eggs. They share, on average, 50% of their segregating alleles, the same as any pair of siblings.

Both MZ and DZ twins typically share the same prenatal environment and similar postnatal environments (same household, same age, same cohort). The key insight is this: if genes contribute to a trait, MZ twins should be more similar to each other than DZ twins, because MZ twins share twice the genetic relatedness.

### Concordance Rate

The **concordance rate** measures how often both twins in a pair share the same trait. For binary traits (affected vs. unaffected), the concordance rate is:

\[
\text{Concordance rate} = \frac{\text{Number of concordant pairs}}{\text{Total twin pairs}} \times 100\%
\]

A concordant pair is one where both twins are affected; a discordant pair has one affected and one unaffected twin. Higher concordance in MZ twins compared to DZ twins suggests genetic influence.

| Disease | MZ Concordance | DZ Concordance | Genetic Influence |
|---|---|---|---|
| Schizophrenia | ~48% | ~17% | Strong |
| Type 2 diabetes | ~70% | ~25% | Strong |
| Breast cancer | ~27% | ~12% | Moderate |
| Measles | ~95% | ~87% | Weak (mostly environmental) |

### Heritability Estimation from Twin Data

**Heritability estimation** from twin studies uses the difference in correlation between MZ and DZ twin pairs. A common formula for estimating broad-sense heritability is:

\[
H^2 \approx 2(r_{MZ} - r_{DZ})
\]

where \( r_{MZ} \) is the correlation between MZ twin pairs and \( r_{DZ} \) is the correlation between DZ twin pairs. This formula assumes that environmental influences are equally shared by MZ and DZ twins (the equal environments assumption).

For estimating narrow-sense heritability, the Falconer formula is:

\[
h^2 \approx 2(r_{MZ} - r_{DZ})
\]

This formula gives the same result because, under the assumption that MZ twins share all genetic effects and DZ twins share half the additive genetic effects, the difference in correlations reflects additive genetic variance. More sophisticated models (structural equation modeling) can separate additive genetic, shared environmental, and non-shared environmental components.

!!! mascot-tip "The Equal Environments Assumption"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie giving a tip">
    Twin studies assume that MZ and DZ twins experience equally similar environments. This assumption has been tested and generally holds for most traits, though it may be violated when MZ twins are treated more similarly because they look alike. Modern twin studies use statistical methods to test and correct for this.

#### Diagram: Twin Study Heritability Calculator
<iframe src="../../sims/twin-study-calculator/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Twin Study Heritability Calculator</summary>
Type: Interactive calculator
**sim-id:** twin-study-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive visualization where users input MZ and DZ twin correlations using sliders. The calculator displays the estimated broad-sense heritability, shared environmental component, and non-shared environmental component using Falconer's formula and an ACE model decomposition. A bar chart shows the relative proportions of genetic and environmental variance. Preset buttons load real twin study data for traits like height, BMI, and schizophrenia.
</details>

## Quantitative Trait Loci

A **quantitative trait locus** (QTL) is a region of the genome that contains one or more genes affecting a quantitative trait. The concept bridges Mendelian and quantitative genetics: although the trait varies continuously, it is still controlled by discrete loci — there are simply many of them, each with a small effect.

Not all QTLs contribute equally. QTL effects follow a distribution where a few loci have relatively large effects and many loci have small effects. The largest-effect QTL for a trait might explain 10–20% of the phenotypic variance, while most QTLs individually explain less than 1%.

## QTL Mapping

**QTL mapping** identifies the chromosomal locations of loci that influence quantitative traits. The fundamental approach combines phenotypic measurements with genotypic data at molecular markers distributed across the genome.

The basic QTL mapping procedure works as follows:

1. **Create a mapping population** — cross two parental lines that differ in the quantitative trait to produce an F2 or backcross population
2. **Genotype the population** — determine the marker genotypes at hundreds or thousands of loci across the genome
3. **Phenotype the population** — measure the quantitative trait in each individual
4. **Test for marker-trait associations** — at each marker, compare the mean phenotype of individuals with different marker genotypes. If a marker is linked to a QTL, individuals with different marker genotypes will have significantly different mean phenotypic values

The simplest QTL mapping approach tests one marker at a time by comparing phenotypic means between genotype classes using ANOVA or a t-test. However, this single-marker approach has limitations: it cannot distinguish between a tightly linked QTL with a large effect and a loosely linked QTL with an even larger effect.

### Interval Mapping

**Interval mapping**, developed by Eric Lander and David Botstein in 1989, improves on single-marker analysis by testing positions between markers rather than at markers. The method uses a statistical framework (maximum likelihood or regression) to estimate the probability that a QTL exists at each position along the chromosome.

The key output of interval mapping is a LOD score profile — a curve showing the strength of evidence for a QTL at every position along each chromosome. Peaks in the LOD profile indicate likely QTL locations. A LOD threshold (typically 2.5–3.0 for experimental crosses) determines which peaks are statistically significant.

Interval mapping offers several advantages over single-marker analysis:

- **Better resolution** — QTL position can be estimated between markers
- **Greater statistical power** — uses information from flanking markers simultaneously
- **Accounts for missing genotype data** — probabilistically imputes missing marker genotypes
- **Provides confidence intervals** — the width of the LOD peak indicates precision of QTL localization

#### Diagram: QTL Mapping LOD Profile
<iframe src="../../sims/qtl-mapping-lod/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>QTL Mapping LOD Profile</summary>
Type: Interactive data visualization
**sim-id:** qtl-mapping-lod<br/>
**Library:** Chart.js<br/>
**Status:** Specified

An interactive LOD score profile across multiple chromosomes. Users see a line graph with chromosomes arranged along the x-axis (separated by vertical dividers) and LOD score on the y-axis. A dashed horizontal line marks the significance threshold. Peaks above the threshold are highlighted and labeled with estimated QTL effect size and position. Users can adjust the threshold with a slider and toggle between additive, dominance, and total LOD components.
</details>

## Marker-Assisted Selection

**Marker-assisted selection** (MAS) applies QTL mapping results to practical breeding. Once molecular markers linked to favorable QTLs have been identified, breeders can select individuals based on their marker genotypes rather than (or in addition to) their phenotypes.

MAS offers several advantages over traditional phenotypic selection:

- **Selection at the seedling stage** — traits that are expensive or time-consuming to measure (like disease resistance that requires pathogen exposure) can be selected using DNA markers from a tiny tissue sample
- **Selection for multiple traits simultaneously** — markers for different QTLs can be tested at the same time
- **Selection in early generations** — breeders can identify favorable genotypes before the plants or animals are old enough to express the trait
- **Breaking linkage drag** — when introgressing a favorable allele from a wild relative, markers flanking the target gene enable selection for recombinants that carry the desired allele with minimal surrounding donor chromatin

The effectiveness of MAS depends on the proportion of genetic variance explained by the markers, the reliability of the marker-QTL association across different genetic backgrounds, and the cost of genotyping relative to phenotyping.

| Selection Method | Information Used | Speed | Best For |
|---|---|---|---|
| Phenotypic selection | Trait measurement | Slow (must wait for expression) | Highly heritable traits |
| Marker-assisted selection | Marker genotypes + phenotype | Faster | Traits hard to measure |
| Genomic selection | Genome-wide markers | Fastest | Low-heritability traits |

#### Diagram: Marker-Assisted Selection Workflow
<iframe src="../../sims/marker-assisted-selection/main.html" width="100%" height="450px" scrolling="no"></iframe>
<details markdown="1">
<summary>Marker-Assisted Selection Workflow</summary>
Type: Animated workflow diagram
**sim-id:** marker-assisted-selection<br/>
**Library:** p5.js<br/>
**Status:** Specified

An animated diagram showing the MAS breeding pipeline. Starting from a cross between two parent lines, the workflow shows: F1 generation, F2 segregating population, DNA extraction, marker genotyping, selection of favorable genotypes, and advancement to the next generation. Icons represent laboratory steps (DNA extraction, PCR, gel). Selected plants/animals are highlighted green; rejected ones are grayed out. A generation counter tracks progress, and a graph shows the population mean shifting over selection cycles.
</details>

## The Breeder's Equation: Predicting Response to Selection

The response of a population to selection is predicted by the **breeder's equation**:

\[
R = h^2 \times S
\]

where \( R \) is the response to selection (the change in mean phenotype from one generation to the next), \( h^2 \) is the narrow-sense heritability, and \( S \) is the selection differential (the difference between the mean phenotype of selected parents and the mean of the whole population).

This elegantly simple equation shows why narrow-sense heritability is so important in applied genetics. A trait with \( h^2 = 0.50 \) will show half the selection differential as its response — if you select parents that are 10 units above the population mean, the offspring generation will average 5 units above the original mean.

The breeder's equation also reveals a fundamental constraint: selection can only change a population's mean phenotype if additive genetic variance exists. When all individuals in a population are genetically identical at the relevant loci (\( V_A = 0 \)), no amount of selection can shift the population mean.

!!! mascot-celebration "Quantitative Genetics Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Superb work, researchers! You now understand how continuous traits arise from polygenic inheritance, how variance is partitioned into genetic and environmental components, how twin studies estimate heritability, and how QTL mapping connects molecular markers to quantitative traits. These tools are fundamental to modern agriculture, medicine, and evolutionary biology.

## Key Takeaways

- **Quantitative genetics** studies traits with **continuous variation** arising from **polygenic inheritance** and environmental influences.
- **Multifactorial traits** are influenced by both genes and environment; **threshold traits** appear binary but have continuous underlying liability.
- **Phenotypic variance** is partitioned into **additive genetic variance**, **dominance variance**, **epistatic variance**, and **environmental variance**.
- **Broad-sense heritability** (\( H^2 \)) captures all genetic variance; **narrow-sense heritability** (\( h^2 \)) captures only additive variance and predicts selection response.
- **Twin studies** compare **monozygotic** and **dizygotic** twins using **concordance rates** and correlations to estimate heritability.
- Heritability is a population statistic that depends on the specific population and environment — it is not a fixed property of a trait.
- **QTL mapping** identifies chromosomal regions affecting quantitative traits; **interval mapping** provides better resolution than single-marker tests.
- **Marker-assisted selection** uses QTL-linked markers to accelerate breeding programs, especially for traits that are difficult or expensive to measure directly.

---
title: Pedigree Analysis and Inheritance Patterns
description: Systematic analysis of family pedigrees to determine inheritance patterns and calculate genetic risks.
generated_by: claude skill chapter-content-generator
date: 2026-04-12 15:44:31
version: 0.07
---

# Pedigree Analysis and Inheritance Patterns

## Summary

This chapter covers the systematic analysis of family pedigrees to determine inheritance patterns and calculate genetic risks. Students explore autosomal dominant, autosomal recessive, and X-linked inheritance, along with penetrance, expressivity, and age-related genetic phenomena. After completing this chapter, students will be able to interpret pedigrees and predict inheritance outcomes in clinical and research contexts.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Pedigree Analysis
2. Autosomal Dominant Pedigree
3. Autosomal Recessive Pedigree
4. X-Linked Inheritance
5. X-Linked Recessive Pedigree
6. X-Linked Dominant Pedigree
7. Carrier Probability
8. Penetrance
9. Incomplete Penetrance
10. Expressivity
11. Variable Expressivity
12. Phenocopy
13. Age of Onset
14. Anticipation
15. Somatic Mosaicism
16. Germline Mosaicism

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Genetic Inference and Probabilistic Reasoning](../01-genetic-inference-probabilistic-reasoning/index.md)

---

## Introduction: Reading the Story of a Family

!!! mascot-welcome "Welcome Back, Researchers!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Dottie waving welcome">
    In Chapter 1, we built our probabilistic toolkit. Now it is time to put those tools to work on one of the oldest and most powerful methods in human genetics — pedigree analysis. Let's look at the evidence!

Long before DNA sequencing or genome-wide association studies, geneticists studied inheritance by drawing family trees. A **pedigree** is a diagram that traces the transmission of a trait through multiple generations of a family. **Pedigree analysis** is the systematic process of examining these diagrams to determine the mode of inheritance, identify carriers, and calculate the probability that future offspring will be affected.

Pedigree analysis remains indispensable in clinical genetics. When a family visits a genetic counselor, the first step is always to draw a detailed pedigree. The pattern of affected and unaffected individuals across generations reveals whether a trait is dominant or recessive, autosomal or sex-linked, and sometimes whether additional complications like incomplete penetrance or variable expressivity are involved.

### Standard Pedigree Symbols

Before analyzing pedigrees, you must know the visual language. The symbols are standardized across genetics.

| Symbol | Meaning |
|--------|---------|
| Square | Male |
| Circle | Female |
| Filled shape | Affected individual |
| Open shape | Unaffected individual |
| Half-filled shape | Carrier (known or inferred) |
| Horizontal line connecting square and circle | Mating |
| Vertical line descending from mating line | Offspring |
| Diamond | Sex unknown |
| Diagonal line through symbol | Deceased |
| Double horizontal line | Consanguineous mating |

A pedigree typically labels generations with Roman numerals (I, II, III) along the left margin and numbers individuals within each generation from left to right.

## Autosomal Dominant Inheritance

An **autosomal dominant pedigree** pattern arises when a single copy of a mutant allele on an autosome (non-sex chromosome) is sufficient to produce the phenotype. Only one affected parent is needed to transmit the trait, and affected individuals appear in every generation.

### Hallmarks of Autosomal Dominant Inheritance

Autosomal dominant traits display several distinctive features in pedigrees.

- Every affected individual has at least one affected parent (no skipping of generations)
- The trait affects both sexes equally
- Unaffected individuals do not transmit the trait (unless penetrance is incomplete)
- Approximately 50% of offspring of an affected heterozygote are affected
- Male-to-male transmission can occur (ruling out X-linkage)

### Example: Huntington Disease

Huntington disease (HD) is a progressive neurodegenerative disorder caused by an expansion of a CAG trinucleotide repeat in the *HTT* gene on chromosome 4. The expanded allele is dominant: one copy is sufficient to cause disease. Examining HD pedigrees reveals the classic autosomal dominant pattern — the trait never skips a generation, both sexes are affected equally, and affected individuals have an affected parent.

An affected individual who is heterozygous (Hd) mated with an unaffected individual (hh) produces offspring with a 1/2 probability of inheriting the disease allele. Using the Bayesian framework from Chapter 1, we can update this probability as an at-risk individual ages without symptoms.

#### Diagram: Autosomal Dominant Pedigree Pattern
<iframe src="../../sims/autosomal-dominant-pedigree/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Autosomal Dominant Pedigree Pattern</summary>
Type: Interactive pedigree diagram
**sim-id:** autosomal-dominant-pedigree<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive three-generation pedigree showing autosomal dominant inheritance. Users can click on individuals to toggle their affected status and see how the pattern changes. The simulation highlights the key features: vertical transmission, both sexes affected, ~50% of offspring affected. A sidebar lists the diagnostic hallmarks and checks them against the displayed pedigree.
</details>

## Autosomal Recessive Inheritance

An **autosomal recessive pedigree** pattern appears when two copies of a mutant allele are required to produce the phenotype. Carriers (heterozygotes) are phenotypically normal but can transmit the allele to their offspring.

### Hallmarks of Autosomal Recessive Inheritance

- Affected individuals often appear in a single generation (horizontal pattern)
- Unaffected parents can have affected children (both parents are carriers)
- The trait affects both sexes equally
- Consanguinity (mating between relatives) increases the frequency of affected individuals
- Approximately 25% of offspring from two carrier parents are affected

### The Role of Consanguinity

When two individuals share a recent common ancestor, they are more likely to both carry the same recessive allele inherited from that ancestor. This is why autosomal recessive disorders are more common in populations with high rates of consanguineous marriage. The probability that a child of first cousins is homozygous for a recessive allele carried by a shared grandparent can be calculated using the coefficient of inbreeding.

!!! mascot-thinking "Carrier Frequency and Population Size"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Dottie thinking">
    In small, isolated populations, the carrier frequency for certain recessive alleles can be surprisingly high. The founder effect — when a small group establishes a new population — can dramatically increase the frequency of rare alleles. This is why some recessive disorders are concentrated in specific communities.

### Carrier Probability Calculations

**Carrier probability** is the likelihood that an unaffected individual carries one copy of a recessive disease allele. For siblings of an affected individual whose parents are both carriers (Aa × Aa), the carrier probability among unaffected siblings is 2/3 — the same conditional probability calculation we performed in Chapter 1.

More complex carrier probability calculations arise when we trace alleles through multi-generation pedigrees. Consider a woman whose maternal uncle has an autosomal recessive disorder. Working backward:

1. Her maternal grandparents are both carriers: Aa × Aa
2. Her mother, who is unaffected, has a 2/3 probability of being a carrier
3. If her mother is Aa and her father is unaffected (probability of being a carrier depends on population frequency), the woman's carrier probability is:

\[
P(\text{woman is carrier}) = P(\text{mother is Aa}) \times P(\text{inherits } a \text{ from mother}) + P(\text{father is Aa}) \times P(\text{inherits } a \text{ from father})
\]

For the maternal contribution alone:

\[
P(\text{carrier via mother}) = \frac{2}{3} \times \frac{1}{2} = \frac{1}{3}
\]

Each generation of unaffected individuals reduces the carrier probability by applying conditional probability, exactly as Bayesian reasoning predicts.

## X-Linked Inheritance

**X-linked inheritance** involves genes located on the X chromosome. Because males have only one X chromosome (hemizygous), they express whatever allele they carry. Females have two X chromosomes, so they can be homozygous or heterozygous.

### X-Linked Recessive Inheritance

An **X-linked recessive pedigree** has distinctive features that clearly separate it from autosomal patterns.

- Affected individuals are predominantly male
- The trait appears to skip generations (carrier mothers pass to affected sons)
- Affected males receive the allele from their carrier mothers
- No male-to-male transmission (fathers pass their Y chromosome, not X, to sons)
- All daughters of an affected male are carriers (they receive his only X)

Color blindness and hemophilia A are classic examples of X-linked recessive traits. Consider a carrier woman (X^H X^h) mated with a normal man (X^H Y):

| | X^H (from father) | Y (from father) |
|---|---|---|
| **X^H (from mother)** | X^H X^H (normal female) | X^H Y (normal male) |
| **X^h (from mother)** | X^H X^h (carrier female) | X^h Y (affected male) |

Half the sons are affected, and half the daughters are carriers, but no daughters are affected.

### X-Linked Dominant Inheritance

An **X-linked dominant pedigree** is rarer but produces a different pattern than autosomal dominant inheritance.

- Affected males pass the trait to all daughters but no sons
- Affected heterozygous females pass the trait to approximately half of all children
- The trait may be more common in females than males in a population
- Some X-linked dominant conditions are lethal in hemizygous males

Rett syndrome, caused by mutations in the *MECP2* gene on the X chromosome, is a well-known example. It occurs almost exclusively in females because affected males rarely survive to birth.

#### Diagram: Comparing Inheritance Patterns
<iframe src="../../sims/inheritance-pattern-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Comparing Inheritance Patterns</summary>
Type: Interactive comparison tool
**sim-id:** inheritance-pattern-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

A side-by-side display of four pedigree types: autosomal dominant, autosomal recessive, X-linked recessive, and X-linked dominant. Each pedigree shows three generations. A dropdown menu lets the user select which pattern to highlight. Below each pedigree, a checklist of diagnostic features is displayed with checkmarks indicating which features are present. Users can click a "randomize" button to generate new pedigrees and practice identification.
</details>

## Penetrance and Expressivity

Not all genetic traits follow clean, predictable patterns. Two phenomena — penetrance and expressivity — explain why individuals with the same genotype can have different phenotypes.

### Penetrance

**Penetrance** is the proportion of individuals with a particular genotype who actually display the expected phenotype. If 80 out of 100 individuals carrying a dominant allele show the trait, the penetrance is 80%.

Full penetrance (100%) means every carrier shows the trait. **Incomplete penetrance** means some carriers do not show the trait despite having the causative genotype. Incomplete penetrance makes pedigree analysis more challenging because the trait can appear to "skip" a generation — not because the allele was absent, but because a carrier did not express it.

The BRCA1 gene provides a medically important example. Women carrying a BRCA1 mutation have a lifetime breast cancer risk of approximately 60-80%, not 100%. The penetrance is incomplete, meaning some carriers never develop breast cancer despite carrying the mutation.

### Expressivity

While penetrance is an all-or-nothing measure (does the trait appear or not?), **expressivity** describes the *degree* to which a trait is expressed. **Variable expressivity** means that individuals with the same genotype show different severity or manifestations of the phenotype.

Neurofibromatosis type 1 (NF1) is a classic example. All individuals carrying an NF1 mutation show some signs of the disease (penetrance is essentially 100%), but the severity varies enormously. Some individuals have only a few café-au-lait spots (light brown skin patches), while others develop thousands of neurofibromas, learning disabilities, and skeletal abnormalities.

| Feature | Penetrance | Expressivity |
|---------|-----------|-------------|
| Question asked | Does the trait appear at all? | How severe is the trait? |
| Measurement | Percentage of carriers affected | Range of phenotypic severity |
| Complete/Full | 100% of carriers show the trait | All carriers show identical severity |
| Reduced/Variable | Some carriers show no phenotype | Carriers range from mild to severe |
| Example | BRCA1 (~70% penetrance for breast cancer) | NF1 (mild spots to severe tumors) |

!!! mascot-tip "Distinguishing Penetrance from Expressivity"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Dottie offering a tip">
    A helpful analogy: penetrance is like a light switch (on or off), while expressivity is like a dimmer switch (how bright). A gene with incomplete penetrance sometimes stays off. A gene with variable expressivity is always on, but at different brightness levels.

### Factors Influencing Penetrance and Expressivity

Several factors contribute to incomplete penetrance and variable expressivity.

- **Modifier genes**: Other genes in the genome can enhance or suppress the expression of the primary gene
- **Environmental factors**: Diet, temperature, toxin exposure, and other environmental variables can influence whether and how strongly a genotype is expressed
- **Epigenetic modifications**: Chemical modifications to DNA or histones can alter gene expression without changing the DNA sequence
- **Stochastic (random) effects**: Random fluctuations in gene expression during development can produce different outcomes even in genetically identical cells
- **Age of onset**: Some conditions require time to manifest, meaning penetrance increases with age

## Phenocopies

A **phenocopy** is an environmentally caused phenotype that mimics a genetic condition. The individual displays the trait but does not carry the causative allele. Phenocopies complicate pedigree analysis because they appear to be genetic cases but do not follow inheritance rules.

For example, hearing loss can be caused by genetic mutations (hereditary) or by environmental factors such as loud noise exposure, infections, or ototoxic medications. A person who becomes deaf from a childhood ear infection is a phenocopy of genetic deafness. Their children will not be at increased risk of deafness (unless they independently carry deafness alleles), even though the parent's pedigree might initially suggest a genetic cause.

Identifying phenocopies requires careful clinical evaluation and sometimes molecular testing to determine whether an affected individual actually carries the genetic variant.

## Age of Onset and Anticipation

### Age of Onset

**Age of onset** refers to the age at which symptoms of a genetic disorder first appear. Many genetic conditions do not manifest at birth but develop later in life. Huntington disease typically presents between ages 30 and 50, while familial breast cancer risk increases through adulthood.

Age of onset creates a special challenge for pedigree analysis and carrier probability calculation. A young, asymptomatic individual may not yet have reached the age when the disease would manifest. Their "unaffected" status provides less evidence against carrier status than would the same status in an older individual. Bayesian analysis accounts for age of onset by adjusting the likelihood calculation based on the probability of remaining unaffected at the individual's current age.

### Anticipation

**Anticipation** is a phenomenon in which a genetic disorder becomes more severe or has an earlier age of onset in successive generations. Anticipation is caused by the expansion of unstable trinucleotide repeats during DNA replication. Each generation, the repeat region may grow longer, producing a more severe phenotype.

Myotonic dystrophy illustrates anticipation clearly. A grandparent may have cataracts and mild muscle weakness (onset in the 50s), their child may develop significant myotonia in the 30s, and their grandchild may have severe congenital myotonic dystrophy at birth. The molecular basis is the progressive expansion of a CTG repeat in the *DMPK* gene.

| Generation | Repeat Length | Symptoms | Age of Onset |
|-----------|:------------:|----------|:----------:|
| Grandparent | 50–100 repeats | Mild (cataracts) | 50s |
| Parent | 100–1000 repeats | Moderate (myotonia, weakness) | 30s |
| Child | >1000 repeats | Severe (congenital) | Birth |

## Somatic and Germline Mosaicism

In Chapter 1, we introduced mosaicism as a condition where an organism contains genetically distinct cell populations. Here we distinguish two forms that have very different consequences for inheritance.

### Somatic Mosaicism

**Somatic mosaicism** occurs when a mutation arises during mitotic cell division after fertilization, producing a patch of cells with a different genotype from the rest of the body. The earlier in development the mutation occurs, the larger the proportion of affected cells.

Somatic mosaicism explains several puzzling clinical observations.

- A parent who does not appear affected on standard genetic testing may have a child with a "de novo" dominant disorder — but close examination reveals the parent carries the mutation in a subset of cells
- McCune-Albright syndrome, caused by somatic mutations in the *GNAS1* gene, produces patchy bone lesions and skin pigmentation that correspond to the distribution of mutant cells
- The severity of somatic mosaic conditions depends on which tissues contain the mutation and what fraction of cells are affected

!!! mascot-warning "Hidden Carriers"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Dottie with a warning">
    Somatic mosaicism means that standard blood-based genetic testing can miss mutations that are present in other tissues. A negative blood test does not always rule out a genetic diagnosis. When clinical suspicion is high, testing additional tissue types (skin biopsy, saliva) or using ultra-sensitive sequencing methods may reveal low-level mosaicism.

### Germline Mosaicism

**Germline mosaicism** (also called gonadal mosaicism) occurs when a mutation is present in a subset of an individual's egg or sperm cells but not in their somatic cells. The parent appears completely unaffected on clinical examination and even on blood-based genetic testing, yet they can transmit the mutation to their offspring.

Germline mosaicism explains one of the most troubling scenarios in genetic counseling: apparently "de novo" mutations that recur in siblings. If a couple has one child with a dominant disorder and neither parent is affected, the recurrence risk is usually quoted as very low (approximately 1%). However, if one parent has germline mosaicism, the actual recurrence risk can be much higher — sometimes 5-10% or more.

Duchenne muscular dystrophy (DMD) provides a well-documented example. Approximately 15-20% of mothers who have a son with DMD and test negative for the mutation in their blood are germline mosaics. Their ovaries contain a mixture of eggs with and without the mutation.

#### Diagram: Somatic vs. Germline Mosaicism
<iframe src="../../sims/mosaicism-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Somatic vs. Germline Mosaicism</summary>
Type: Interactive comparison diagram
**sim-id:** mosaicism-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

A split-screen visualization. The left side shows somatic mosaicism: an embryo divides, and at a user-selected cell division stage, a mutation occurs in one cell. The simulation shows how the mutant clone expands, with affected tissue highlighted in a different color. The right side shows germline mosaicism: the somatic cells are all normal-colored, but a subset of germ cells in the gonad are highlighted as carrying the mutation. A slider controls when during development the mutation occurs, affecting the proportion of mutant cells. Below each diagram, text explains the inheritance implications.
</details>

## Integrating Pedigree Analysis: A Systematic Approach

When confronted with a pedigree, apply the following decision-making framework to determine the most likely mode of inheritance.

**Step 1: Check for X-linkage.** Does the trait show male-to-male transmission? If yes, the trait cannot be X-linked (fathers give Y, not X, to sons). If no male-to-male transmission is observed, X-linkage remains possible.

**Step 2: Check for dominance vs. recessiveness.** Do two unaffected parents ever have an affected child? If yes, the trait is recessive (both parents are carriers). If affected individuals always have at least one affected parent, the trait is likely dominant.

**Step 3: Assess sex bias.** Is the trait disproportionately found in males? This suggests X-linked recessive. Is it found equally in both sexes? This suggests autosomal inheritance.

**Step 4: Look for complications.** Does the trait appear to skip generations in a dominant pattern? Consider incomplete penetrance. Does severity vary widely? Consider variable expressivity. Does an "unaffected" parent have multiple affected children? Consider germline mosaicism.

| Observation | Most Likely Pattern |
|------------|-------------------|
| Male-to-male transmission | Autosomal (not X-linked) |
| Two unaffected parents → affected child | Autosomal recessive |
| Trait in every generation | Autosomal dominant |
| Mostly males affected, no male-to-male | X-linked recessive |
| Affected father → all daughters affected | X-linked dominant |
| Trait skips a generation (dominant context) | Incomplete penetrance |
| Variable severity among affected relatives | Variable expressivity |

#### Diagram: Pedigree Analysis Decision Tree
<iframe src="../../sims/pedigree-decision-tree/main.html" width="100%" height="500px" scrolling="no"></iframe>
<details markdown="1">
<summary>Pedigree Analysis Decision Tree</summary>
Type: Interactive decision tree
**sim-id:** pedigree-decision-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive flowchart that guides students through pedigree analysis. The user answers yes/no questions about features they observe in a pedigree (male-to-male transmission? unaffected parents with affected child? sex bias?). Each answer highlights the next branch of the decision tree and eventually arrives at a conclusion about the most likely inheritance pattern. A "practice" mode generates random pedigrees for the student to classify, with feedback on their answers.
</details>

## Key Concepts Summary

| Concept | Definition | Clinical Significance |
|---------|-----------|---------------------|
| Pedigree analysis | Systematic study of trait transmission in families | Primary tool in clinical genetics |
| Autosomal dominant | One mutant copy sufficient; appears every generation | 50% recurrence risk per child |
| Autosomal recessive | Two mutant copies required; carriers unaffected | 25% recurrence risk from carrier parents |
| X-linked recessive | Hemizygous males affected; carrier females unaffected | Sons of carrier females at 50% risk |
| X-linked dominant | One mutant copy sufficient; affects both sexes | May be lethal in hemizygous males |
| Carrier probability | Likelihood of carrying a recessive allele | Essential for genetic counseling |
| Penetrance | Proportion of carriers who show the phenotype | Explains "skipped" generations |
| Expressivity | Degree of phenotypic severity | Explains clinical variability |
| Phenocopy | Environmental mimic of a genetic trait | Must be excluded before genetic diagnosis |
| Age of onset | Age when symptoms first appear | Complicates risk assessment in young individuals |
| Anticipation | Increasing severity across generations | Caused by trinucleotide repeat expansion |
| Somatic mosaicism | Mutation in a subset of body cells | Variable severity; may be missed by testing |
| Germline mosaicism | Mutation in a subset of germ cells | Explains recurrence of "de novo" mutations |

!!! mascot-celebration "Chapter Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Dottie celebrating">
    Outstanding detective work, fellow investigators! You can now read the genetic stories hidden in family pedigrees and account for the complications that make real genetics so much more interesting than textbook examples. In the next chapter, we will explore how genes interact with each other to produce unexpected ratios. What does the data tell us? Let's find out!

# Learning Graph

[Open Learning Graph Viewer Fullscreen](../sims/graph-viewer/main.html){ .md-button .md-button--primary }

<iframe src="../sims/graph-viewer/main.html" width="100%" height="600px" frameborder="0"></iframe>

## Genetics: Analysis, Genomics, and Modern Inference

The learning graph is the foundational data structure for this intelligent textbook. It maps **450 concepts** across **14 taxonomy categories** with **617 dependency edges**, creating a directed acyclic graph (DAG) that guides personalized learning pathways.

## What is a Learning Graph?

A learning graph is a concept dependency network where:

- **Nodes** represent individual concepts students need to learn
- **Edges** represent prerequisite relationships between concepts
- **Groups** organize concepts into color-coded taxonomy categories
- **Foundational concepts** (no prerequisites) serve as entry points

The graph supports multiple learning pathways — students can explore different routes through the material based on their goals and prior knowledge.

## Graph Statistics

| Metric | Value |
|--------|-------|
| Total Concepts | 450 |
| Taxonomy Categories | 14 |
| Dependency Edges | 617 |
| Foundational Concepts | 11 |
| Maximum Chain Length | 10 |
| Connected Components | 1 |

## Taxonomy Categories

| Category | TaxonomyID | Color | Concepts |
|----------|-----------|-------|----------|
| Foundation Concepts | FOUND | LightCoral | 22 |
| Probabilistic Reasoning | PROB | PeachPuff | 10 |
| Pedigree and Inheritance | PED | LightPink | 40 |
| Genome Structure | GSTR | Thistle | 28 |
| Genetic Variation | GVAR | Plum | 38 |
| Mapping and Linkage | MAP | PowderBlue | 46 |
| Quantitative Genetics | QUANT | LightYellow | 32 |
| Population Genetics | POP | PaleGreen | 21 |
| Gene Regulation | REG | Aquamarine | 45 |
| Experimental Methods | EXP | LightSteelBlue | 39 |
| Genomics and Bioinformatics | BIOINFO | Honeydew | 40 |
| Human and Clinical Genetics | CLIN | MistyRose | 45 |
| Ethics and Society | ETHICS | Lavender | 24 |
| Frontier Topics | FRONT | PaleTurquoise | 20 |

## Reports

- [Course Description Assessment](course-description-assessment.md) — Quality analysis of the source course description
- [Concept List](concept-list.md) — Complete numbered list of all 450 concepts
- [Graph Quality Analysis](quality-metrics.md) — DAG validation, chain analysis, and structural metrics
- [Concept Taxonomy](concept-taxonomy.md) — Category definitions and descriptions
- [Taxonomy Distribution](taxonomy-distribution.md) — Distribution analysis across categories

## Data Files

- `learning-graph.csv` — Concept dependency data with taxonomy assignments
- `learning-graph.json` — Complete graph in vis-network.js JSON format
- `metadata.json` — Dublin Core metadata for the learning graph
- `taxonomy-names.json` — Taxonomy ID to human-readable name mapping
- `color-config.json` — Color assignments for taxonomy visualization

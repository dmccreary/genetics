# Mascot Generation Log — Dottie the Drosophila

**Date:** 2026-03-31
**Skill:** book-installer → learning-mascot
**Project:** Genetics Intelligent Textbook

## Character Design Decisions

| Question | Answer |
|----------|--------|
| Character type | Drosophila (fruit fly) — iconic genetics model organism |
| Name | Dottie — alliterative, evokes "connecting the dots" (inference) |
| Personality | Curious, precise, encouraging, slightly witty |
| Catchphrase | "Let's look at the evidence!" |
| Art style | Modern flat vector / cartoon |
| Appearance | Warm amber/honey-gold body, large red compound eyes, translucent iridescent wings, round glasses, small deep-red lab coat |
| Color palette | Primary: amber/honey gold (#F59E0B), Accent: deep red (#DC2626) |

## Files Created

| File | Purpose |
|------|---------|
| `docs/css/mascot.css` | 7 custom admonition types with Dottie's color scheme |
| `docs/img/mascot/image-prompts.md` | 7 fully self-contained AI image generation prompts |
| `docs/learning-graph/mascot-test.md` | Test page showing all admonition variants |
| `CLAUDE.md` | Character guidelines for consistent AI-generated content |

## Files Modified

| File | Change |
|------|--------|
| `mkdocs.yml` | Theme palette: teal → amber/deep orange; added `css/mascot.css` to `extra_css`; added Mascot Style Guide to nav |

## Mascot Images Generated

All images generated via ChatGPT/DALL-E at 1024x1024, then trimmed with `trim-padding-from-image.py`:

| Image | Trimmed Size |
|-------|-------------|
| `docs/img/mascot/celebration.png` | 707x654 |
| `docs/img/mascot/encouraging.png` | 592x652 |
| `docs/img/mascot/neutral.png` | 614x650 |
| `docs/img/mascot/thinking.png` | 552x732 |
| `docs/img/mascot/tip.png` | 568x640 |
| `docs/img/mascot/warning.png` | 603x638 |
| `docs/img/mascot/welcome.png` | 604x649 |

Trim command used:
```bash
python /Users/dan/Documents/ws/claude-skills/src/image-utils/trim-padding-from-image.py docs/img/mascot/*.png
```

## Admonition Types

| Type | Usage | Title Bar Color |
|------|-------|-----------------|
| `mascot-neutral` | General sidebars / default | Slate gray |
| `mascot-welcome` | Chapter openings | Amber |
| `mascot-thinking` | Key concepts | Deep red |
| `mascot-tip` | Tips and hints | Teal |
| `mascot-warning` | Warnings | Red |
| `mascot-celebration` | Achievements | Purple |
| `mascot-encourage` | Difficult content | Blue |

## Skill Updates Made

Updated `~/.claude/skills/book-installer/references/learning-mascot.md` with:
- Performance guidelines: skip TaskCreate/TaskUpdate, run file ops in parallel
- Trim script path documented so future runs don't search for it
- Guidance to ask all design questions in as few turns as possible

## Performance Notes

This session took longer than expected (~12+ minutes for file generation) due to:
- Unnecessary TaskCreate/TaskUpdate overhead (14 extra tool calls loading deferred tools)
- Searching for file paths already present in loaded reference docs
- Verifying existence of files the user had confirmed

Feedback saved to memory and skill updated to prevent recurrence.

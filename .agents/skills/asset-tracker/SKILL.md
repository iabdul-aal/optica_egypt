---
name: asset-tracker
description: >
  Check and update the asset generation progress log at
  .agents/memory/asset-status.md. Invoke when asked about
  which assets are done, what is missing, or to mark an asset complete.
metadata:
  author: optica-egypt-local-section
  version: "1.0.0"
---

# Asset Tracker Skill

When invoked:
1. Read .agents/memory/asset-status.md
2. Report current progress as a table grouped by category
3. If user provides new completed assets, mark them DONE
4. Identify the next priority group to generate

## Marking an asset done
Change [ ] to [x] in asset-status.md for that item.
Add a completion date in parentheses: [x] filename.ext (2026-09-17)

## Priority order
Category 1 Logo -> Category 8 Favicon -> Category 2 Hero -> Category 9 OG
-> Category 6 Social -> Category 7 Events -> Category 3-4 SVGs
-> Category 5 Icons -> Category 10-11 Photography and Fallbacks

---
name: research-first
description: >
  Apply before writing any code. Read relevant source files, trace data flow,
  check the architecture decision log, understand existing patterns, and produce
  a one-paragraph plan. Invoke for every non-trivial feature, component change,
  or data structure modification.
metadata:
  author: optica-egypt-local-section
  version: "2.0.0"
---

# Research-First Instinct

Before writing any code, read. Before modifying any file, understand it.
Before adding any feature, check the architecture decision log.

## Mandatory pre-task checklist

Complete every item before producing output:

1. **Identify the affected layer.** Is this a data change (`data/`), logic
   change (`lib/`), component change (`components/`), page change (`app/`),
   localization change (`messages/`), or infrastructure change
   (`.github/workflows/`)?

2. **Read the architecture decision log.** Open `.agents/memory/decisions.md`
   and check whether a relevant decision has already been made. Do not
   re-litigate closed decisions. If the new task conflicts with an existing
   decision, flag it before proceeding.

3. **Read the source of truth for the domain.**
   - Identity tasks: read `data/site_config.json` first.
   - Event tasks: read `data/events.json` and `lib/events.ts`.
   - Member/officer tasks: read `data/members.json` and `lib/members.ts`.
   - Content/copy tasks: read `docs/CONTENT.md` and both locale message
     files (`messages/en.json`, `messages/ar.json`).
   - Design tasks: read `docs/DESIGN.md` in full.
   - Never assume field names or data structures.

4. **Read every file you will touch** in full before writing a single line.

5. **Check for existing abstractions.**
   - Before writing a helper, search `lib/` for an existing one.
   - Before creating a component, check `components/` for a reusable candidate.
   - Before adding a locale key, verify it does not already exist in
     `messages/en.json`.

6. **Trace the data flow end to end.** For any UI change:
   `data/*.json` -> `lib/` loader -> page component -> rendered component -> locale string.
   Understand every step.

7. **Write a one-paragraph plan.** State what you will change, why, and what
   you will NOT change. Confirm the plan satisfies:
   - `docs/DESIGN.md` design constraints
   - `docs/CONTENT.md` writing and bilingual parity rules
   - `.agents/AGENTS.md` universal rules (no `&`, no em-dash, community voice)
   - The open decisions in `.agents/memory/decisions.md`

## Forbidden actions

- Modifying a file without first reading it in full.
- Hardcoding a value that belongs in `data/site_config.json` or another data file.
- Duplicating logic already present in `lib/`.
- Creating a component without checking `components/` first.
- Adding a static string without a corresponding entry in both locale files.
- Adding a static data field without asking whether automation is possible.
- Using `&` as a connective or the Unicode em-dash (U+2014) anywhere.
- Introducing a new font family or color not defined in `app/globals.css`.
- Referencing "OSA" or "Optical Society"; always write "Optica".

## After the task

- Run `npm run check` before reporting completion.
- If a new pattern emerged that is likely to recur, append a one-line note to
  `.agents/memory/patterns.md`.
- If something was tried and reverted, append a one-line note to
  `.agents/memory/anti-patterns.md`.
- If a significant architectural decision was made, add a new entry to
  `.agents/memory/decisions.md` following the ADL format.


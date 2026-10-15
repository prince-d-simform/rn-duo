---
name: code-review
description: Review a pull request when it is opened and Copilot is assigned as reviewer — assign the Copilot coding agent to the PR and have it review the diff against this repo's own review checklist, and PR description. Use when asked to review a PR, run the PR review, or check a PR.
---

# code-review

Assigns the Copilot coding agent to a pull request and has it review the diff
against **this project's own** review checklist and feedback history — not a
generic best-practices pass.

Trigger: **a PR is opened and Copilot is assigned as reviewer.**

Copilot is assigned to the PR directly (a PullRequest is an Assignable), which
spins up the full coding-agent sandbox. A brief is posted as a PR comment so the
agent's session has its review instructions.

Paths below are relative to the repo root.

## What it does

1. **Assign `copilot-swe-agent` directly to the PR** (no issue created).
2. **Post the review brief** as a PR comment. The brief asks Copilot to:
   - **First check the "PR Description Validation" workflow status** for the
     PR's latest commit (the `validate-claude-instructions` and
     `validate-pr-description` jobs in
     [`.github/workflows/pr-description-validation.yml`](../../workflows/pr-description-validation.yml)).
     Only continue to review the changes if both **succeeded**. If either
     **failed** (or hasn't run yet), do **not** review the code — instead post
     a comment asking the author to fix the flagged validation error first, and
     stop.
   - **Read the PR description** (title + body) — including the Zoho Task ID —
     to understand the stated intent of the change.
   - **Review the file changes against that description** — verify each changed
     file actually implements what the description claims, flag changes that
     are unrelated to or contradict the description, and note anything the
     description promises that is missing from the diff.
   - **Follow the full project review checklist** at
     [`.claude/skills/review-code/SKILL.md`](../../../.claude/skills/review-code/SKILL.md).
     That file is the single source of truth for this repo's standards
     (architecture & 4-file structure, theme/styling, TypeScript, strings,
     Redux, navigation, performance, security, accessibility, SonarLint-style
     code quality, imports, docs) — work through every section in it and use
     its exact **REJECT / WARN / PASS** reporting format.
3. Copilot reviews the diff in its sandbox and posts its findings as a review on
   the PR, using the REJECT/WARN/PASS format from `.claude/skills/review-code/SKILL.md`.
4. **Copilot adds a confirmation line inside the "Pull request overview"** it
   generates, stating that the `code-review` skill was used and which checklist file it consulted. This is the marker that proves the skill was
   actually loaded and used by Copilot in the session — added by default,
   without checking.

## Why this doesn't duplicate the existing review checklist

`.claude/skills/review-code/SKILL.md` is already Claude Code's own `/review-code`
slash-command skill for this repo, and it stays the single source of truth for
the checklist itself — it's more detailed and more current than a generic
review pass would be (it encodes this project's state management via Redux
Toolkit & async thunks, theming, Atomic Design, and forms
conventions directly). This file only wires GitHub's Copilot
code review feature to **read and follow that same checklist**, so a rule update in one place applies to both a local `/review-code`
run and an automated Copilot PR review — there is nothing to keep in sync by
hand.

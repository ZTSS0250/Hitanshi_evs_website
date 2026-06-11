# Task File Template
# Copy this file, rename to: hevs-NNN-type-short-description.md
# Fill the Planning section, then tell Claude: "move hevs-NNN to specification"
# Delete this comment block before saving your real task file.

---

## Metadata
- **Task ID**: hevs-NNN-type-short-description
- **Title**: Human-readable title
- **Type**: feature | bug | task
- **Status**: planning
- **Complexity**: — *(Claude fills this)*
- **Created**: YYYY-MM-DD
- **Author**: Your name
- **Quality Gates**: Gate 1: pending | Gate 2: pending | Gate 3: pending

---

## Planning
*(You fill this section)*

**Description**: What is the problem or feature, in plain English?

**Goal**: What does "done" look like?

**Objectives**:
- [ ] ...

**Deliverables**:
- [ ] ...

---

## Specification
*(Claude fills this after reading the codebase)*

**Complexity**: —

**Reason**: —

### Code Changes

| File | Action | Description |
|------|--------|-------------|
| — | — | — |

### Implementation Notes

—

---

## Test Cases
*(Claude writes these; you execute and mark pass/fail)*

### Unit Tests
| # | Test Name | Input / Condition | Expected Result | Status |
|---|-----------|-------------------|-----------------|--------|
| 1 | — | — | — | pending |

### Functional Tests
| # | Test Name | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 1 | — | — | — | pending |

### Edge Cases
| # | Scenario | Expected Behaviour | Status |
|---|----------|--------------------|--------|
| 1 | — | — | pending |

### QA Test Plan
*(Copied verbatim into the PR description)*

**Scope**: —

**Pre-conditions**:
- —

**QA Steps**:
1. —

**Expected Outcomes**:
- —

**Out of Scope**:
- —

---

## Quality Gates
*(Claude fills this)*

### Gate 1 — Senior Developer Review
Date: — | Status: pending

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|

Verdict: pending

### Gate 2 — Security & Performance Review
Date: — | Status: pending

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|

Verdict: pending

### Gate 3 — Pre-Development Sweep
Date: — | Status: pending

**Part A — Gate 1 & 2 resolution confirmed**: pending

**Part B — Predicted implementation bugs**:
| # | Pattern | Predicted Bug | Edge Case Added? |
|---|---------|--------------|-----------------|

Verdict: pending

---

## Done
*(Claude fills this when tests pass and PR is merged)*

- **PR**: #—
- **Merged**: —
- **Release Notes entry**: —

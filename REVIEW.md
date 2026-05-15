# FALLOW REVIEW

## HEALTH

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 23147 |
| Avg Cyclomatic | 1.5 |
| P90 Cyclomatic | 3 |
| Dead Files | 0.0% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 94.1 |
| Circular Deps | 0 |
| Unused Deps | 0 |

## Fallow: 1 high complexity function

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `scripts/ship.mts:23` | `run` | high | 7 | 6 | 56.0 **!** | 17 |

**194** files, **940** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)



## AUDIT

Comparing against baseline: /Users/michael/Projects/test-create-next-app/.fallow/baselines/dead-code.json
Comparing against duplication baseline: /Users/michael/Projects/test-create-next-app/.fallow/baselines/dupes.json
Comparing against health baseline: /Users/michael/Projects/test-create-next-app/.fallow/baselines/health.json

Audit scope: 150 changed files vs main (12e779f..HEAD)
✓ No issues in 150 changed files (0.55s)


## DEAD

## Fallow: no issues found



## DUPLICATION

## Fallow: 18 clone groups found (2.2% duplication)

### Duplicates

**Clone group 1** (16 lines, 3 instances)

- `app/components/examples/input-group.tsx:4-19`
- `app/components/examples/input-otp.tsx:4-18`
- `app/components/examples/inputs.tsx:4-13`

**Clone group 2** (45 lines, 2 instances)

- `app/privacy/page.tsx:14-51`
- `app/terms/page.tsx:14-58`

**Clone group 3** (24 lines, 2 instances)

- `app/privacy/page.tsx:52-75`
- `app/terms/page.tsx:100-122`

**Clone group 4** (17 lines, 3 instances)

- `app/privacy/page.tsx:57-73`
- `app/privacy/page.tsx:75-88`
- `app/terms/page.tsx:104-120`

**Clone group 5** (15 lines, 2 instances)

- `app/privacy/page.tsx:62-76`
- `app/privacy/page.tsx:114-127`

**Clone group 6** (16 lines, 2 instances)

- `app/privacy/page.tsx:66-80`
- `app/terms/page.tsx:117-132`

**Clone group 7** (17 lines, 2 instances)

- `app/privacy/page.tsx:81-94`
- `app/terms/page.tsx:119-135`

**Clone group 8** (16 lines, 2 instances)

- `app/privacy/page.tsx:88-103`
- `app/privacy/page.tsx:108-123`

**Clone group 9** (20 lines, 3 instances)

- `app/privacy/page.tsx:97-114`
- `app/privacy/page.tsx:120-135`
- `app/terms/page.tsx:140-159`

**Clone group 10** (19 lines, 2 instances)

- `app/privacy/page.tsx:98-114`
- `app/terms/page.tsx:160-178`

**Clone group 11** (24 lines, 2 instances)

- `app/privacy/page.tsx:118-138`
- `app/terms/page.tsx:138-161`

**Clone group 12** (29 lines, 2 instances)

- `app/privacy/page.tsx:186-213`
- `app/terms/page.tsx:273-301`

**Clone group 13** (28 lines, 2 instances)

- `app/privacy/page.tsx:200-227`
- `app/terms/page.tsx:320-347`

**Clone group 14** (34 lines, 2 instances)

- `app/terms/page.tsx:54-81`
- `app/terms/page.tsx:239-272`

**Clone group 15** (21 lines, 2 instances)

- `app/terms/page.tsx:62-82`
- `app/terms/page.tsx:146-166`

**Clone group 16** (22 lines, 2 instances)

- `app/terms/page.tsx:88-109`
- `app/terms/page.tsx:155-175`

**Clone group 17** (25 lines, 2 instances)

- `app/terms/page.tsx:94-118`
- `app/terms/page.tsx:141-165`

**Clone group 18** (25 lines, 2 instances)

- `app/terms/page.tsx:230-251`
- `app/terms/page.tsx:260-284`

### Clone Families

**Family 1** (1 group, 16 lines across `app/components/examples/input-group.tsx`, `app/components/examples/input-otp.tsx`, `app/components/examples/inputs.tsx`)

- Extract shared function (16 lines) from input-group.tsx, input-otp.tsx, inputs.tsx (~32 lines saved)

**Family 2** (2 groups, 31 lines across `app/privacy/page.tsx`)

- Extract shared function (15 lines) from page.tsx, page.tsx (~15 lines saved)
- Extract shared function (16 lines) from page.tsx, page.tsx (~16 lines saved)

**Family 3** (10 groups, 239 lines across `app/privacy/page.tsx`, `app/terms/page.tsx`)

- Extract 10 shared clone groups (239 lines) from page.tsx, page.tsx into a shared directory (~276 lines saved)

**Family 4** (5 groups, 127 lines across `app/terms/page.tsx`)

- Extract 5 shared clone groups (127 lines) from page.tsx into app/terms (~127 lines saved)

**Summary:** 466 duplicated lines (2.2%) across 5 files



## DOCSTRINGS

✔︎ 100% docstring coverage


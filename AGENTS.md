<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:developing-locally-agent-rules -->
## REQUIREMENTS

- Bun runtime is to be used exclusively.
- bun run dev has been modified to deploy development on <project-name>.localhost
- bun run build cannot be used to verify that the project builds
- bun tsc --watch and bun lint can be used to verify that typescript is valid.
- bun tsc && bun lint --fix must be run before committing changes.
- ~/bin/freview (outputs ./REVIEW.md) must be run and satisfied/resolved before  pushing commits.
  - bunx --bun fallow health --quiet --explain
  - bunx --bun fallow audit --quiet --explain
  - bunx --bun fallow dead-code --quiet --explain
  - bunx --bun fallow dupes --quiet --explain
- prefer graphite to git/gh see ~/.config/aliases (you must check that the project is tracked in graphite otherwise this does not apply.)

@README.md
<!-- END:developing-locally-agent-rules -->

---

<!-- fallow:setup-hooks:start -->
## Fallow local gate

Before any `git commit` or `git push`, run `fallow audit --format json --quiet --explain`. If the verdict is `fail`, fix the reported findings before retrying. Treat JSON runtime errors like `{ "error": true, ... }` as non-blocking.
<!-- fallow:setup-hooks:end -->

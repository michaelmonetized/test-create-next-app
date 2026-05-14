# Tailwind token page benchmark

Date: 2026-04-27

## What changed

- Replaced the generated `/tailwindcss` page with a handwritten client-rendered page.
- Added `/tailwindcss-ssr` as the SSR comparison route.
- Removed the kitchen-sink generator from package lifecycle scripts and deleted the generated example components.
- Added `components/tailwindcss/token-matrix.tsx` and `lib/tailwind-token-matrix.ts` as the durable token coverage surface.
- Made React Compiler benchmarkable with `REACT_COMPILER=false`; default remains enabled.

## Token coverage

The matrix renders variable-backed utilities from `app/globals.css` across fonts, text sizes, block sizing, inline sizing, containers, padding, margin, gap, spacing, insets, radius, aspect ratio, animation, semantic colors, input states, sidebar tokens, chart colors, and the full Catppuccin palette.

Coverage manifest count:

| Area                           | Count |
| ------------------------------ | ----: |
| Color tokens                   |   213 |
| Text size utilities            |    16 |
| Font utilities                 |     3 |
| Spacing tokens                 |    19 |
| Block size utilities           |    54 |
| Inline size utilities          |    54 |
| Container utilities            |    18 |
| Total utility touches rendered | 1,844 |

## Benchmark method

For each React Compiler mode:

1. Cleared `.next` and `tsconfig.tsbuildinfo`.
2. Built production with `bun run build`.
3. Started `next start` locally.
4. Measured `/tailwindcss` and `/tailwindcss-ssr` with 12 warmed `curl` TTFB samples each.
5. Captured HTML bytes plus unique initial JS script count/bytes referenced by each route.

Raw JSONL: `docs/benchmark-raw/tailwind-client-ssr-react-compiler-20260427-123320.jsonl`

## Results

| React Compiler | Route                 |   Build |      HTML |  Initial JS | Scripts | Median TTFB |
| -------------- | --------------------- | ------: | --------: | ----------: | ------: | ----------: |
| on             | `/tailwindcss` client | 18.174s | 216,344 B | 1,360,422 B |      16 |       8.0ms |
| on             | `/tailwindcss-ssr`    | 18.174s | 533,068 B | 1,310,660 B |      15 |      14.0ms |
| off            | `/tailwindcss` client | 16.843s | 216,344 B | 1,350,052 B |      16 |       8.0ms |
| off            | `/tailwindcss-ssr`    | 16.843s | 533,068 B | 1,302,733 B |      15 |      14.0ms |

## Read

- Client route sends less HTML but about 50KB more initial JS than SSR.
- SSR route sends much more HTML because the full token matrix is rendered server-side.
- React Compiler increased this benchmark build by 1.331s and added roughly 8-10KB to initial JS in this snapshot.
- Server TTFB stayed effectively unchanged: client 8ms, SSR 14ms.

## Verification

- `REACT_COMPILER=true bun run build` passed.
- `bun run typecheck` passed with `tsgo --noEmit`.
- `bun run lint` passed with the existing warning in `components/ui/sidebar.tsx` for direct `document.cookie` assignment.
- `git diff --check` passed.

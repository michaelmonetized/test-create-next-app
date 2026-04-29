# Biome + tsgo + React Compiler benchmark

Benchmark date: 2026-04-27

Comparison:
- Before: `65626ee5344fb2bd478ade023ab130485d140f1a`
- After: `chore/biome-tsgo-react-compiler`
- Machine: local M1 Pro host, Bun 1.3.1, Node 25.1.0

## Summary

| Area | Before | After | Delta |
| --- | ---: | ---: | ---: |
| Lint median | 4.37s | 0.112s | 39x faster |
| Typecheck median | 1.42s (`tsc --noEmit`) | 0.339s (`tsgo --noEmit`) | 4.2x faster |
| Clean production build median | 13.97s | 16.18s | 15.8% slower |
| Lighthouse perf score median | 74 | 67 | -7 points |

## Command benchmarks

### Lint

Before used `bun run lint` with ESLint. After used `bun run lint` with Biome.

- Before runs: 5.869s, 4.773s, 4.301s, 4.358s, 4.372s
- Before median: 4.372s
- After passing runs: 0.113s, 0.109s, 0.112s, 0.111s, 0.118s, 0.109s, 0.113s, 0.111s, 0.119s, 0.102s
- After median: 0.112s

Result: Biome is dramatically faster.

### Typecheck

Before used `bunx tsc --noEmit`. After used `bun run typecheck`, which runs `tsgo --noEmit`.

- Before runs: 5.930s, 1.865s, 1.423s, 1.390s, 1.399s
- Before median: 1.423s
- After runs: 0.550s, 0.329s, 0.339s, 0.335s, 0.348s
- After median: 0.339s

Result: tsgo is materially faster after warmup.

### Build

Both used `bun run build` with `.next` and `tsconfig.tsbuildinfo` cleared before each run.

- Before runs: 13.842s, 13.971s, 14.691s
- Before median: 13.971s
- After runs: 16.251s, 16.133s, 16.182s
- After median: 16.182s

Result: React Compiler makes clean builds slower in this repo right now.

Next build internal timings from representative run:

- Before compile: 5.5s, TypeScript: 6.4s
- After compile: 6.2s, TypeScript: 8.6s

## Lighthouse homepage performance

Ran Lighthouse performance category against production `next start`, 3 runs each.

| Metric | Before median | After median | Delta |
| --- | ---: | ---: | ---: |
| Score | 74 | 67 | -7 |
| FCP | 1363ms | 1395ms | +32ms |
| LCP | 3931ms | 4417ms | +486ms |
| TBT | 547ms | 714ms | +167ms |
| TTI | 4659ms | 5364ms | +705ms |
| CLS | 0 | 0 | same |

Result: no user-facing performance win from React Compiler in this snapshot. It regresses Lighthouse on the homepage.

## Route response feel

Measured 10 warmed `curl` requests per route against production `next start`.

| Route | Before median | After median | Delta |
| --- | ---: | ---: | ---: |
| `/` | 8.69ms | 6.45ms | faster |
| `/components` | 22.32ms | 21.99ms | same |
| `/ui-kit` | 5.09ms | 4.92ms | same |
| `/tailwindcss` | 13.02ms | 12.76ms | same |

Result: server response feel is effectively unchanged. The Lighthouse regression is more likely client-side JS execution/hydration cost than server latency.

## Recommendation

Keep Biome and tsgo. They are clear wins.

Be cautious with React Compiler. In this repo it increases build time and worsens Lighthouse. If we keep it, add a follow-up issue to inspect bundle/hydration behavior and decide per project instead of blindly enabling it everywhere.

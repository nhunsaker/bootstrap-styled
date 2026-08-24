# Contributing to bootstrap-styled

Thanks for your interest — contributions are welcome, from typo fixes to new components.

## Ground rules

- **Be kind and concrete.** Bug reports with a reproduction (CodeSandbox / StackBlitz / a minimal
  snippet) get fixed fastest.
- This is an early project maintained in spare time. Response times vary; nothing is a slight.
- By contributing you agree your work is released under the project's [MIT license](./LICENSE).

## Getting set up

```bash
git clone https://github.com/nhunsaker/bootstrap-styled
cd bootstrap-styled
npm install
npm run build        # build the library
npm test             # run the test suite
```

## Parity is the bar

Components are held to visual + accessibility parity with Bootstrap 5.3.8. The `parity/` harness
pixel-diffs each component against a vendored Bootstrap oracle and runs axe-core on both sides:

```bash
npm run parity       # regenerate parity/scorecard.md
```

A change that regresses a component's diff % or introduces an axe violation the native Bootstrap
cell doesn't have will not be merged. New components should ship with a parity fixture.

## Pull requests

1. Fork, branch from `main` (`feat/…`, `fix/…`, `docs/…`).
2. Keep PRs focused — one component or one concern per PR.
3. Run `npm test` and `npm run parity` before opening the PR; include the scorecard delta if you
   touched a component.
4. Describe what changed and why. Screenshots help for visual changes.

## Good first issues

Look for the [`good first issue`](https://github.com/nhunsaker/bootstrap-styled/labels/good%20first%20issue)
label. Docs improvements, additional parity fixtures, and filling in `PARTIAL` components from the
[gap analysis](./parity/gap-analysis.md) are all great starting points.

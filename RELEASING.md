# Releasing `@metatoy/bootstrap-styled`

Publishing is automated: **publishing a GitHub Release triggers
`.github/workflows/release.yml`**, which typechecks, tests, builds, and runs
`npm publish` at the release tag's version.

## One-time setup

1. **npm scope/org.** The `@metatoy` scope must exist on npm and your account
   must be able to publish to it (create the org, or get added as a member).
   The package is already `publishConfig.access: "public"`.

2. **npm automation token.** Create a **granular/automation token** on npmjs.com
   with *publish* permission for `@metatoy/*` (and "bypass 2FA" so CI can use it
   non-interactively). Restrict scope/expiry as you prefer.

3. **Repo secret.** In GitHub → repo **Settings → Secrets and variables →
   Actions**, add a secret named **`NPM_TOKEN`** with that token.

That's it — `release.yml` reads `secrets.NPM_TOKEN` as `NODE_AUTH_TOKEN`.

## Cut a release

1. Update `CHANGELOG.md` (move `[x.y.z] — unreleased` to a dated released
   section) and make sure `package.json` `version` is right (the workflow also
   sets it from the tag, but keep them in sync).
2. Commit + push to `main`.
3. Create a **GitHub Release** with a tag `vX.Y.Z` (e.g. `v0.1.0`) — the tag
   version (minus the `v`) is what gets published.
4. The **Release** workflow runs and publishes to npm. Watch it under the repo's
   **Actions** tab.

### Manual publish (fallback)

```bash
npm login            # account with @metatoy publish rights
npm version 0.1.0 --no-git-tag-version   # if not already set
npm publish --access public              # prepublishOnly builds dist/ first
```

## Notes

- Only `dist/` is published (`files: ["dist"]`); `prepublishOnly` runs the tsup
  build so a manual `npm publish` always ships fresh output.
- `react`, `react-dom`, and `styled-components` are **peer dependencies**;
  `@floating-ui/react` is a regular dependency (installed for consumers).
- No lockfile is committed (gitignored), so CI uses `npm install`. Commit a
  `package-lock.json` and switch CI to `npm ci` if you want reproducible installs.

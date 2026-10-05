# Contributing to LunaBot public documentation

The permanent branches are `main` (published site and releases) and `develop` (documentation integration). Use short-lived branches from `develop` for proposed changes:

- `feature/<issue>-<short-description>` for new guides or capabilities.
- `fix/<issue>-<short-description>` for corrections.
- `release/<version>` for candidate review and release-specific edits.
- `hotfix/<version>-<short-description>` for urgent published-site corrections.

Open a pull request into `develop`, check links, accessibility, responsive layouts, image privacy, and release claims, then merge after review. Promote reviewed release content from `develop` into `main` and tag the corresponding public release. Merge release corrections back into `develop`. Delete short-lived branches only after their work is merged and linked worktrees are clean.

Do not publish private LunaBot source, account data, credentials, signing keys, or private diagnostics here. Never force-push `main` or `develop`, and never move an existing release tag.

The public repo's `develop` branch was initialized from the current published `main` tip on 2026-10-05. Existing legacy worktree changes must be reviewed before their branches are removed; old documentation must not overwrite the currently published pilot pages without review.

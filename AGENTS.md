# Agent working agreement — public LunaBot docs

Use Git Flow and keep the published website stable. Do not commit directly to `main`.

## 🌿 Permanent branches

| Emoji | Branch | Role | Changes arrive from |
|---|---|---|---|
| 🌐 | `main` | Published website, user guides and approved release notes | Reviewed `release/<version>` or `hotfix/<version>-<slug>` |
| 🧭 | `develop` | Integration branch for upcoming documentation | Reviewed `feature/<issue>-<slug>` and `fix/<issue>-<slug>` |

Only `main` and `develop` are permanent. Short-lived branches should use lowercase kebab-case and be deleted after merge.

## 🧰 Branch naming and flow

| Emoji | Prefix | Create from | Merge into | Scope |
|---|---|---|---|---|
| ✨ | `feature/<issue>-<slug>` | `develop` | `develop` | New guide, page or approved product documentation |
| 🐛 | `fix/<issue>-<slug>` | `develop` | `develop` | Documentation correction |
| 📦 | `release/<version>` | `develop` | `main`, then back to `develop` | Release-specific review and corrections |
| 🚑 | `hotfix/<version>-<slug>` | `main` | `main` and `develop` | Urgent live-site correction |

Review every release claim against the exact artifact and test evidence. Check links, keyboard and screen-reader use, responsive layout, screenshot privacy, light/dark modes, and reduced motion before merging. Never force-push `main`/`develop`, move an existing tag, publish private source or account data, or let an older guide replace current release instructions without review.

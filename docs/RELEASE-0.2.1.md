# LunaBot 0.2.1 — public desktop debut

Windows x64 desktop distribution. **to the mooon 🌙**

## In this build

- Overview, charts, watched markets and versioned strategy workflows.
- Trade Desk with separate positions, orders, proposals and current/historical Scouts.
- Manual market/pending order preparation with exact preview before submission.
- Guided, account-scoped assistant setup and bounded permissions.
- Report overview, performance and operational review, with supported export/print workflows.
- One-calendar-month offline trial, device activation and explicit update checks.
- Quick Monitor, tray preferences and compact trading-mode/startup settings.
- Closable operational alerts and expansion/draft preservation during polling.

## Installation and identity

| Item | Identity |
| --- | --- |
| Desktop version | 0.2.1 |
| Installer | LunaBot_0.2.1_x64-setup.exe |
| Platform | Windows x64 |
| Installer bytes | 241954493 |
| SHA-256 | `4fb9852b41f89b93bb886aee245083cf5cf0f9342c04d7007a96709484236b37` |
| Authenticode | Unsigned |
| Bundled engine protocol | 1 |
| Bundled engine version label | 0.2.0-rc.2 |

The engine/footer version label remains distinct from the installed desktop version; it is not a different installer download. This release does not claim a signed updater or unattended installation.

Download the installer and SHA256SUMS.txt from this release. Compare the complete digest using PowerShell:

```powershell
Get-FileHash .\LunaBot_0.2.1_x64-setup.exe -Algorithm SHA256
```

Run the installer only after reviewing Windows security prompts. Do not disable security protections. Start with Paper or MT5 Demo and follow the [illustrated guide](https://emmanuelmmanda.github.io/LunaBot-Desktop/guide.html). MT5 is a separate broker dependency.

## Updating an existing installation

Review open positions, pending orders and local management before stopping LunaBot. Broker-held exposure can remain open while local management is offline. Install the new build, reopen, reconnect and reconcile before resuming monitoring. Existing account records, settings and protected licensing identity remain in place; an update is not a fresh-trial reset.

## Verification and limits

Current isolated Paper-engine browser acceptance passed: onboarding, strategy save, manual/pending workflows, Scout review, frozen-record checks, reports and PDF print workflow, polling stability, keyboard navigation, light/dark themes, narrow widths and scaling.

Focused About, settings, report and update-contract checks passed. The public-site checks cover seven scene previews, keyboard tabs, zoom dismissal, theme selection, reduced motion, responsive widths and resource/link validity.

These are software checks, not independent broker certification. The native Windows installer was installed and its binary hashes checked. End-to-end native WebView/real broker journeys are not fully certified by the browser harness. The broader engine suite previously had two timing failures; focused reruns passed, but a new full-suite pass is not claimed here.

Use Demo first. Live activation and account permission are separate controls. Trial access never bypasses execution checks. Read [Product limits](PRODUCT-LIMITS.md).

Public source archives contain only showcase material, not private application source. Contact: [luneya17@gmail.com](mailto:luneya17@gmail.com).

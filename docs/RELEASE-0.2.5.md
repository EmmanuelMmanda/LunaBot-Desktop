# LunaBot 0.2.5

Clearer answers when a strategy is waiting instead of trading.

- Monitoring now distinguishes a connected terminal from fresh market prices. Stale or missing prices show a dismissible warning; new entries remain blocked.
- Strategy details report the latest attempt, including stale candles, warm-up and entry checks. Data failures retry without waiting for the next full candle interval.
- Strategy activation offers Observe, Review and Automatic explicitly. Automatic requires confirmation; existing risk limits remain in force.
- Repeated evaluation preserves duplicate-proposal safeguards.

## Install

Download the Windows x64 EXE, or extract the ZIP and run the included installer. The ZIP is not a portable application. Close LunaBot before upgrading; accounts, strategies and settings are preserved. Installation interrupts local monitoring and management, but does not close broker-held trades. Reopen, verify the account connection and review monitoring before continuing.

The release includes a manifest and SHA-256 checksums. The installer is **unsigned**. A checksum checks integrity, not publisher identity; do not disable Windows security protections.

Desktop: **0.2.5**. Engine label: **0.2.0-rc.2**, protocol 1. Application source remains private; GitHub source archives contain only the public website and documentation.

## Verification and limits

Focused feed/activation checks and isolated Paper browser checks cover the changed interface. The unchanged bundled engine previously passed 529 tests and a 25-command packaged smoke check. Four unrelated broader UI assertions remain unresolved; this is not certification of every feature or Live trading. Market hours and broker feed availability are controlled by the broker. No trading performance is guaranteed.

Support: luneya17@gmail.com

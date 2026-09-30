# LunaBot 0.2.7

Three built-in gold recipes, plus clearer broker reconciliation.

## Built-in strategies

Open Strategies → Library, choose a recipe, then review the builder before saving. New copies start disabled in Review mode. Existing deployments, account settings and trading history are preserved.

| Recipe | Rules | Entry limits |
| --- | --- | --- |
| Trend pullback H1 | EMA 20/50, RSI 14 at 55/45; ATR 14 stop ×2, target 2R | Existing account rules |
| Gold scalp M1 — experimental | EMA 5/13, RSI 7 at 50/50; ATR 10 stop ×1.5, target 2R | 1-minute cooldown; 20 entries per rolling 24 hours |
| Gold scalp M5 — experimental | EMA 8/21, RSI 7 at 50/50; ATR 10 stop ×1.5, target 2R | 5-minute cooldown; 6 entries per rolling 24 hours |

The scalp recipes use closed candles, quotes no older than five seconds, a maximum spread of 30 broker points and a USD high-impact news filter with 15 minutes before/after. News protection requires available calendar data. Each recipe recommends 0.25% risk and minimum 1.5 after-cost reward/risk. Account risk limits still apply; caps are not trade targets. M1 and M5 operate independently, not as multi-timeframe confirmation.

Scalp recipes are for experimental Demo testing, not proven profitable systems. An earlier M1 historical test lost money; the limited M5 sample does not establish an edge. Test with realistic costs and your broker's symbol specifications before considering use. No profit or trade-frequency guarantee.

## Fixes

- Broker reconciliation now actually runs from the warning button and reports success, remaining uncertainty or an error. Repeated clicks do not start duplicate checks or resubmit orders.
- Recent MT5 history queries account for the verified broker clock offset, allowing matching fills to resolve uncertain requests.
- Watched-market stars and symbols share one row. A header shortcut opens the manual trading workspace without submitting a trade.

## Install

Use the Windows x64 EXE, or extract the ZIP and run its installer. The ZIP is not portable. Close LunaBot before upgrading. Local trade management is interrupted during installation; broker-held trades are not closed. Reopen and verify connection and monitoring. Data and existing strategies remain in place.

The installer is **unsigned**. SHA-256 checks integrity, not publisher identity. Do not disable Windows security protections. Desktop 0.2.7; engine label 0.2.0-rc.2, protocol 1. Application source remains private; GitHub source archives contain the public website and documentation only.

This release is not certification of every feature or Live trading. Support: luneya17@gmail.com.

# LunaBot workstation guide

Prefer an illustrated walkthrough? [Open the visual guide](https://emmanuelmmanda.github.io/LunaBot-Desktop/guide.html). Each scene uses the current interface and labelled synthetic Paper data.

LunaBot is a Windows desktop workstation for reviewing trading accounts, analysing markets, preparing orders, monitoring strategies and understanding recorded outcomes. This guide describes the purpose of each workspace area and a practical order of use. It is not trading advice.

## A typical session

1. **Confirm context.** Check the selected account, account type (Paper, Demo or Live), monitoring mode, connection health and last successful sync. Do not treat a stale account snapshot as current.
2. **Review exposure.** Check open positions, pending orders, reserved risk and any paused-entry or broker attention notice. A pause on new entries does not necessarily stop reconciliation or management of existing positions.
3. **Read the market.** Open Markets or Charts, choose the instrument and timeframe, and check quote freshness and the time of the latest closed bar. Chart history is analysis context; it does not itself mean the market is enabled for a strategy.
4. **Prepare deliberately.** In Trade Desk, select the account and instrument, enter supported order terms, review the preview and its risk/cost details, then submit only when the displayed terms and account are correct. An uncertain outcome should be inspected and reconciled before any retry.
5. **Review automation.** In Strategies, verify the strategy, version, market/timeframe, filters, risk settings and current state. Monitoring and permission to trade are distinct; Automatic mode remains subject to account and execution checks.
6. **Investigate exceptions.** Use activity, Scout records, reports or a frozen investigation case to inspect the stored evidence. A check against captured records is not proof of market causation or future performance.

## Where to go

| Area | Use it for | Check before you act |
| --- | --- | --- |
| **Overview** | Account summary, exposure, watched markets, strategy activity and current actionable Scouts | Account identity, data freshness, pauses and exceptions |
| **Charts / Markets** | Inspect tracked instruments, price history, timeframe and analytical context | Instrument, timeframe, price scale and quote/bar freshness |
| **Trade Desk** | Prepare, preview and manage supported manual order workflows | Account, side, order type, size, entry/protection, risk and preview validity |
| **Strategies** | Review strategy configuration, status and versioned activity | Market and timeframe, enabled state, filters, risk and account permission |
| **Forward Test** | Review forward observations separately from historical research | Strategy version, dates, account and whether results are complete |
| **Scouts** | Review actionable candidates and their current disposition | Candidate state and evidence; historical rejected/closed items belong in history |
| **Research** | Run and inspect backtests or experiments and their assumptions | Data range, costs, configuration and limitations; historical replay is not a forecast |
| **Reports / Activity** | Trace recorded decisions, requests and broker outcomes | Timestamps, reconciliation state and any unknown outcome |
| **Settings** | Configure trading mode, risk limits, markets, connected apps, authentication and setup | Effective permissions and the scope of each change |
| **About** | Check installed build, activation, updates and support details | Verify build identity before following an update guide |

Names and available actions can vary with the installed release, account connection, permissions and broker capabilities. Use the controls shown by the installed application; this guide does not imply that every broker supports every order type or market.

## Modes and account types

- **Paper** is a local simulated environment. Its balances, prices and results are not broker records.
- **Demo** is a broker-provided practice account. Confirm the broker server and account shown in the app.
- **Live** involves real funds and requires the relevant account and application permissions. A Demo setup is not Live authorization.
- **Observe, Review & approve, and Automatic** describe how eligible strategy proposals are handled. They do not remove risk checks, broker constraints or the need to confirm which account is selected.

## Connected assistants

An MCP-compatible assistant connects to LunaBot on the local machine. The user chooses which accounts and permissions that connection can request. A setup/configuration test checks the local connection path; a request initiated from the selected assistant is the evidence that the host itself can reach LunaBot. Review grants periodically and revoke access that is no longer needed. Do not paste passwords, PINs, licence tokens or private account records into public issues or prompts.

## Quick Monitor and the system tray

Quick Monitor is a compact status and control surface, not a second trading engine. It should report the selected account, connection/monitoring state, open-position and pending-work counts, strategy count and recent account update. Use **Open LunaBot** for detailed review. A pause on new entries is not the same as closing positions, stopping MT5 or disconnecting the account. Tray behavior depends on the user's Settings and the current application state.

## If something looks wrong

- **Stale or disconnected:** reconnect and wait for account reconciliation. Check the latest sync time before relying on displayed exposure.
- **Order timed out or unknown:** inspect the original request and broker status first. Do not create a new request key and repeat an order whose outcome is unknown.
- **Spread/session/risk rejection:** read the named broker or account constraint; do not bypass it by changing unrelated limits.
- **Strategy has no activity:** confirm that its exact market is tracked and available, its filters/time window are satisfied, the required bars and quotes are fresh, and the account is allowed to trade.
- **Update needed:** use About → Check for updates and follow the published release's checksum and installation instructions. Do not install an unverified executable.

## Data, safety and limitations

LunaBot records local account and execution context to support review. It is not a broker, exchange, investment adviser or guarantee of execution. Historical testing does not establish future results. Connectivity loss, broker execution, slippage, gaps and market conditions can produce outcomes software cannot predict. Read [Product limits and trading risk](PRODUCT-LIMITS.md) and begin with a Demo account.

For installation steps, see [Start here](START-HERE.md). For private support, contact [luneya17@gmail.com](mailto:luneya17@gmail.com). When reporting a problem publicly, include a reproducible description and sanitised evidence only.

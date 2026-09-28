# Start here

See the [illustrated installation and workstation guide](https://emmanuelmmanda.github.io/LunaBot-Desktop/guide.html) for current screenshots of Overview, Charts, Trade Desk, manual orders, Strategies, connected assistants and Reports.

LunaBot is a Windows desktop trading workstation. Use a Demo account first, follow the in-app setup, and verify the selected account and trading mode before enabling monitoring.

## Before installation

- Read the release notes and confirm the installer version and SHA-256 checksum.
- Windows SmartScreen may report that an installer is unsigned; do not disable security protections to bypass that warning.
- MT5 is a separate broker dependency. LunaBot can guide terminal detection and account connection.
- Review activation status in Settings → About.

## First run

1. Install a published release from the Releases page.
2. Choose Paper to learn the workspace with synthetic data, or connect an MT5 Demo account.
3. Review the account, strategy, risk settings, timezone and monitoring mode.
4. Start monitoring only after confirming the account and mode shown in LunaBot.
5. Review order and broker outcomes in the activity and report views.

## Connected assistants

LunaBot supports account-scoped MCP connections for compatible clients. Select the client in Settings, choose accounts and permissions, configure its local MCP entry and verify with a real client request. A local setup test alone does not prove that the assistant has connected.

## Troubleshooting

If a page reports stale account data, reconnect the selected account and wait for broker reconciliation before acting. If an order outcome is uncertain, inspect its recorded request and broker status; do not resubmit with a new idempotency key. If the local PIN is lost, use the lock screen's reactivation request and contact support with the displayed App code. Never send your PIN, broker password or licence token by email.

For a product issue, open a GitHub issue with LunaBot version, Windows version, steps to reproduce and a sanitised screenshot. Email [luneya17@gmail.com](mailto:luneya17@gmail.com) for private support.

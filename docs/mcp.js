const examples = {
  health: {
    title: 'Demo account health',
    request: 'Check my Demo account health. Verify connection, prices and sync, review strategy activity, and flag anything unusual. Do not change anything.',
    steps: [
      ['Confirm shared account', 'connection_capabilities + list_accounts', 'The client can see only accounts and permissions granted to that connection. This is illustrative, not a real lookup.'],
      ['Check connection and prices', 'account_summary + runtime_health', 'Example result: connection is available, but the watched XAUUSD quote is stale. A real response must include its own update time.'],
      ['Inspect strategy activity', 'list_strategies + strategy_activity', 'Example result: one strategy is paused. No strategy is started or changed by this read.'],
      ['Check data quality and anomalies', 'runtime_health + reconciliation_report', 'The stale quote is reported as a data-quality issue; the assistant does not infer a market move from missing freshness.'],
      ['Explain evidence and safe next step', 'assistant response - no order tool', 'The assistant recommends refreshing or verifying the feed before relying on the quote. No order was requested or sent.']
    ],
    summary: 'Evidence-led result: one stale quote is visible; no account settings or trades were changed.'
  },
  strategy: {
    title: 'Strategy review',
    request: 'Review my Demo strategies. Compare their latest decisions with current data quality and explain any reason for no trade. Do not start or edit them.',
    steps: [
      ['Confirm selected account', 'connection_capabilities + list_accounts', 'Only accounts explicitly shared with this client are in scope.'],
      ['Read strategy configuration', 'list_strategies + strategy_deployments', 'The assistant reads names, state and declared markets; it does not assume a strategy is profitable.'],
      ['Inspect latest evaluations', 'strategy_activity + strategy_details', 'Example result: the latest evaluation was blocked because its required quote was stale.'],
      ['Check supporting market data', 'account_summary + explain_strategy', 'The returned symbol and timestamp must match the strategy inputs. Missing data stays unavailable.'],
      ['Summarise limits and next step', 'assistant response - read only', 'The assistant explains the recorded no-trade reason and suggests reviewing the feed. No strategy is changed or activated.']
    ],
    summary: 'A useful review can end with a clear no-trade explanation; historical results do not guarantee future performance.'
  },
  anomaly: {
    title: 'Operational anomaly review',
    request: 'Investigate anything unusual on my shared Demo account. Separate confirmed evidence from uncertainty, and do not take action.',
    steps: [
      ['Confirm account scope', 'connection_capabilities + list_accounts', 'The assistant verifies the allowed account before requesting any records.'],
      ['Read connection and sync state', 'account_summary + runtime_health', 'Example result: account connected; the last successful sync is older than expected.'],
      ['Check orders and positions', 'account_summary + list_pending_orders', 'The assistant compares returned records with the sync status; it does not infer that a missing record is zero.'],
      ['Inspect recorded incidents', 'reconciliation_report + investigation_context', 'An event shows a worker reconnect. The cause is not claimed unless the event records it.'],
      ['Report facts and uncertainty', 'assistant response - no action tool', 'The assistant names the stale sync, lists what evidence is missing and recommends a fresh reconciliation. No trade or restart is performed.']
    ],
    summary: 'An anomaly report should distinguish observed facts, unavailable data and recommended checks.'
  }
};

const byId = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const demo = document.querySelector('.mcp-demo');
if (demo) {
  const setup = document.createElement('section');
  setup.className = 'mcp-setup-path';
  setup.id = 'connect';
  setup.setAttribute('aria-labelledby', 'mcp-connect-title');
  setup.innerHTML = '<div class="section-heading"><p class="eyebrow">Set up once</p><h2 id="mcp-connect-title">From connected client to useful answer.</h2><p>The assistant can see only the accounts and tools you explicitly share in LunaBot.</p></div><ol><li><span>01</span><strong>Choose your client</strong><p>Open <b>Settings &gt; Connected apps</b> and select Codex, Claude Desktop, Claude Code or another supported MCP client.</p></li><li><span>02</span><strong>Choose account and access</strong><p>Start with a Demo account and account records. Add research or proposal permissions only when needed.</p></li><li><span>03</span><strong>Apply its configuration</strong><p>Follow the client-specific setup LunaBot provides. Restart that client if required; preserve unrelated MCP connections.</p></li><li><span>04</span><strong>Verify a real request</strong><p>Ask for account status without changes, then confirm the request appears in Connected apps activity.</p></li></ol><p class="mcp-setup-link"><a class="button" href="guides/connected-apps.html">Open connected-app setup guide</a> <a class="quiet-link" href="guides/mcp.html">Read prompts and permissions</a></p>';
  document.querySelector('#try-it')?.before(setup);

  const tabs = [...demo.querySelectorAll('[data-scenario]')];
  ['Check account health', 'Review a strategy', 'Investigate an anomaly'].forEach((label, i) => {
    tabs[i]?.setAttribute('data-scenario', ['health', 'strategy', 'anomaly'][i]);
    if (tabs[i]) tabs[i].textContent = label;
  });

  const grid = demo.querySelector('.demo-grid');
  if (grid) {
    grid.innerHTML = '<section class="demo-chat" aria-label="Example assistant conversation"><span class="eyebrow">Example conversation</span><div class="chat-message user-message"><span>You</span><blockquote id="demo-request"></blockquote></div><div class="chat-message assistant-message"><span>Assistant</span><div class="assistant-answer" aria-live="polite" aria-atomic="true"><span class="live-dot" aria-hidden="true"></span><p id="demo-answer">Select Play or Next to see the example tool calls and evidence.</p></div></div><p class="mock-disclaimer">Illustration only - no real account, balance or broker request</p><div class="demo-controls"><button class="button" id="demo-play">Play walkthrough</button><button class="copy-prompt" id="demo-next">Next step</button><button class="copy-prompt" id="demo-reset">Reset</button><span id="demo-status" role="status" aria-live="polite">Ready to demonstrate</span></div></section><section class="demo-desk" aria-label="Illustrative account-scoped tool-call timeline"><div class="demo-market"><strong id="demo-title"></strong><span id="demo-badge">SIMULATED WORKFLOW</span></div><ol class="demo-timeline">' + Array.from({ length: 5 }, (_, i) => '<li data-stage="' + i + '"><span class="timeline-node">0' + (i + 1) + '</span><div><strong data-stage-title></strong><small data-stage-tool></small><p data-stage-result>Waiting for the example.</p></div><span class="stage-state">Waiting</span></li>').join('') + '</ol><div id="demo-result" class="demo-result">No account data is being fetched. This is an illustration, not a live MCP session.</div></section>';
  }

  let scenario = 'health';
  let step = -1;
  let timer = 0;
  const status = byId('demo-status');
  const stop = () => { window.clearInterval(timer); timer = 0; };
  const draw = () => {
    const example = examples[scenario];
    byId('demo-request').textContent = example.request;
    byId('demo-title').textContent = example.title;
    byId('demo-answer').textContent = step < 0 ? 'Select Play or Next to see the example tool calls and the assistant response.' : example.steps[step][2];
    byId('demo-result').textContent = step === example.steps.length - 1 ? example.summary : step < 0 ? 'No account data is being fetched. This is an illustration, not a live MCP session.' : 'Illustrative sequence only. In LunaBot, tool access is limited by the permissions you granted.';
    demo.querySelectorAll('[data-stage]').forEach((row, index) => {
      const item = example.steps[index];
      row.removeAttribute('aria-current');
      row.querySelector('[data-stage-title]').textContent = item[0];
      row.querySelector('[data-stage-tool]').textContent = item[1];
      const state = row.querySelector('.stage-state');
      const result = row.querySelector('[data-stage-result]');
      row.classList.toggle('is-current', index === step);
      row.classList.toggle('is-complete', index < step);
      if (index < step) { state.textContent = 'Returned'; result.textContent = item[2]; }
      else if (index === step) { state.textContent = 'Returned'; result.textContent = item[2]; row.setAttribute('aria-current', 'step'); }
      else { state.textContent = 'Waiting'; result.textContent = 'Waiting for this example step.'; row.removeAttribute('aria-current'); }
    });
    byId('demo-play').textContent = timer ? 'Pause walkthrough' : 'Play walkthrough';
    byId('demo-next').textContent = step === example.steps.length - 1 ? 'Restart walkthrough' : 'Next step';
    if (status) status.textContent = step < 0 ? 'Ready to demonstrate' : step === example.steps.length - 1 ? 'Walkthrough complete - no action was taken' : 'Step ' + (step + 1) + ' of ' + example.steps.length + (timer ? ' - playing' : '');
  };
  const advance = () => { step = step >= examples[scenario].steps.length - 1 ? -1 : step + 1; draw(); };
  tabs.forEach((button) => button.addEventListener('click', () => {
    stop(); scenario = button.dataset.scenario; step = -1;
    tabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab === button)));
    draw();
  }));
  byId('demo-next')?.addEventListener('click', () => { stop(); if (step >= examples[scenario].steps.length - 1) { step = 0; draw(); } else advance(); });
  byId('demo-reset')?.addEventListener('click', () => { stop(); step = -1; draw(); });
  byId('demo-play')?.addEventListener('click', () => {
    if (timer) { stop(); draw(); return; }
    if (reducedMotion.matches) {
      advance();
      if (status) status.textContent = 'Reduced motion is enabled. Use Next step to continue manually.';
      return;
    }
    if (step >= examples[scenario].steps.length - 1) step = -1;
    advance();
    timer = window.setInterval(() => {
      if (step >= examples[scenario].steps.length - 1) { stop(); draw(); return; }
      advance();
    }, 1700);
    draw();
  });
  draw();
}

document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
  const target = document.getElementById(button.dataset.copy);
  const status = document.querySelector('#copy-status');
  if (!target || !status) return;
  try { await navigator.clipboard.writeText(target.textContent); status.textContent = 'Prompt copied. Paste it into your connected assistant.'; }
  catch { const range = document.createRange(); range.selectNodeContents(target); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Prompt selected. Use Copy on your device.'; }
}));

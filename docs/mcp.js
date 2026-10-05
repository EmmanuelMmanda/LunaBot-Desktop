const examples = {
  health: {
    title: 'XAUUSD · Demo health',
    request: 'Can I trade XAUUSD on my Demo account right now?',
    steps: [
      ['Confirm account', 'list_accounts', 'Sample Demo · login ••8042 · connected'],
      ['Count exposure', 'account_summary', '2 open positions · 1 pending order'],
      ['Check XAUUSD', 'runtime_health', 'Last quote 94 s ago · stale'],
      ['Review restrictions', 'connection_capabilities', 'New entry needs a fresh quote'],
      ['Give next step', 'assistant response', 'Refresh the feed and check again. No order sent.']
    ],
    decision: 'WAIT FOR A FRESH QUOTE', metrics: [['2','open positions'],['1','pending order'],['94 s','quote age']],
    reply: ['I found two positions and one pending order. XAUUSD has not updated for ', '94 seconds', ', so I would wait.'],
    summary: 'The account is connected, but the example XAUUSD quote is stale. New entry stays blocked until a fresh price and risk check are available.',
    next: 'Refresh the feed, then ask LunaBot to check again.'
  },
  strategy: {
    title: 'XAUUSD · strategy decision',
    request: 'Why did my XAUUSD strategy skip its last setup?',
    steps: [
      ['Find deployment', 'strategy_deployments', 'XAUUSD · M5 · observing'],
      ['Read saved rule', 'strategy_details', 'Maximum spread 25 pt'],
      ['Find decision', 'strategy_activity', 'Signal at 14:35 UTC'],
      ['Explain rejection', 'explain_strategy', 'Observed spread 38 pt · limit exceeded'],
      ['Give next step', 'assistant response', 'Review conditions before changing the rule.']
    ],
    decision: 'NO TRADE · SPREAD LIMIT', metrics: [['38 pt','observed spread'],['25 pt','saved limit'],['0','orders sent']],
    reply: ['The M5 candle rule passed. Spread was ', '38 points against a 25-point limit', ', so LunaBot skipped the trade.'],
    summary: 'The candle rule passed. The observed spread exceeded the saved limit by 13 points, so LunaBot recorded a skip.',
    next: 'Inspect the saved limit and the market before changing any rule.'
  },
  anomaly: {
    title: 'EURUSD · order trace',
    request: 'Did my EURUSD order go through after the reconnect?',
    steps: [
      ['Locate request', 'investigation_context', 'EURUSD · request 4F2'],
      ['Inspect response', 'runtime_health', 'Worker reconnected · response uncertain'],
      ['Check broker records', 'reconciliation_report', 'Outcome not yet confirmed'],
      ['Check duplicate guard', 'list_pending_orders', 'No automatic repeat request'],
      ['Give next step', 'assistant response', 'Reconcile before deciding whether to retry.']
    ],
    decision: 'VERIFY BEFORE RETRY', metrics: [['1','uncertain request'],['0','automatic retries'],['?','broker outcome']],
    reply: ['The broker response is ', 'still uncertain', '. I cannot confirm a fill or safely repeat the request yet.'],
    summary: 'A reconnect interrupted the response. Broker orders and positions must be reconciled before the outcome can be stated.',
    next: 'Review reconciliation in Operations. Do not resubmit the same request yet.'
  },
  trade: {
    title: 'XAUUSD · trade idea',
    request: 'Explore an XAUUSD setup and show the risk.',
    steps: [
      ['Check market', 'account_summary', 'XAUUSD · M5 · closed candles'],
      ['Review setup', 'strategy_details', 'Example entry 4,168.20'],
      ['Outline risk', 'account_summary', 'Stop 4,164.20 · 4.00 price distance'],
      ['Prepare Scout', 'connection_capabilities', 'Illustrative 0.01 lot · review required'],
      ['Give next step', 'assistant response', 'Review exact costs and broker checks in LunaBot.']
    ],
    decision: 'REVIEW A PROPOSAL', metrics: [['4.00','price stop distance'],['0.01','illustrative lots'],['0','orders sent']],
    reply: ['Here is a setup to review: ', 'entry 4,168.20 · stop 4,164.20', '. It is a proposal; no order was sent.'],
    summary: 'This sample proposal has an entry and stop. Actual size, cost, broker limits and permissions depend on the selected account.',
    next: 'Open the proposal in LunaBot and approve or reject it there.'
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
  document.querySelector('#connect')?.replaceWith(setup);

  const tabs = [...demo.querySelectorAll('[data-scenario]')];
  ['Account health', 'Strategy review', 'Trade idea', 'Trade activity'].forEach((label, i) => {
    tabs[i]?.setAttribute('data-scenario', ['health', 'strategy', 'trade', 'anomaly'][i]);
    if (tabs[i]) tabs[i].textContent = label;
  });

  const grid = demo.querySelector('.demo-grid');
  if (grid) {
    grid.innerHTML = '<section class="demo-chat" aria-label="Example assistant conversation"><span class="eyebrow">Example conversation</span><div class="chat-message user-message"><span>You</span><blockquote id="demo-request"></blockquote></div><div class="chat-message assistant-message"><span>Assistant · through LunaBot</span><div class="assistant-answer" aria-live="polite" aria-atomic="true"><span class="live-dot" aria-hidden="true"></span><p id="demo-answer">Select Play or Next to inspect the example.</p></div></div><div class="demo-controls"><button class="button" id="demo-play">Play conversation</button><button class="copy-prompt" id="demo-next">Next</button><button class="copy-prompt" id="demo-reset">Reset</button><span id="demo-status" role="status" aria-live="polite">Ready to demonstrate</span></div><p class="mock-disclaimer">Illustrative figures · no broker or account data was read</p></section><section class="demo-desk" aria-label="Illustrative account evidence and decision"><div class="demo-market"><strong id="demo-title"></strong><span id="demo-badge">SAMPLE DATA</span></div><ol class="demo-timeline">' + Array.from({ length: 5 }, (_, i) => '<li data-stage="' + i + '"><span class="timeline-node">0' + (i + 1) + '</span><div><strong data-stage-title></strong><small data-stage-tool></small><p data-stage-result>Waiting</p></div><span class="stage-state">Waiting</span></li>').join('') + '</ol><div id="demo-result" class="demo-result"><span class="result-kicker">EXAMPLE DECISION</span><strong id="demo-decision"></strong><div id="demo-metrics" class="demo-metrics"></div><p id="demo-insight"></p><div class="demo-next"><b>NEXT</b><span id="demo-followup"></span></div></div></section>';
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
    const answer = byId('demo-answer');
    if (step === example.steps.length - 1) {
      const emphasis = document.createElement('strong'); emphasis.textContent = example.reply[1];
      answer.replaceChildren(document.createTextNode(example.reply[0]), emphasis, document.createTextNode(example.reply[2]));
    } else answer.textContent = step < 0 ? 'I’ll check the shared account and show the evidence behind the next step.' : example.steps[step][2];
    byId('demo-decision').textContent = step === example.steps.length - 1 ? example.decision : 'Building the picture…';
    byId('demo-metrics').replaceChildren();
    if (step === example.steps.length - 1) example.metrics.forEach(([value,label]) => {
      const metric = document.createElement('div');
      const number = document.createElement('strong'); number.textContent = value;
      const caption = document.createElement('span'); caption.textContent = label;
      metric.append(number, caption); byId('demo-metrics').append(metric);
    });
    byId('demo-insight').textContent = step === example.steps.length - 1 ? example.summary : 'Follow the returned evidence above. Sample figures appear with the decision.';
    byId('demo-followup').textContent = step === example.steps.length - 1 ? example.next : 'Continue the conversation.';
    demo.querySelectorAll('[data-stage]').forEach((row, index) => {
      const item = example.steps[index];
      row.removeAttribute('aria-current');
      row.querySelector('[data-stage-title]').textContent = item[0];
      row.querySelector('[data-stage-tool]').textContent = item[1];
      const state = row.querySelector('.stage-state');
      const result = row.querySelector('[data-stage-result]');
      row.classList.toggle('is-current', index === step);
      row.classList.toggle('is-complete', index < step);
      if (index < step) { state.textContent = 'Seen'; result.textContent = item[2]; }
      else if (index === step) { state.textContent = 'Seen'; result.textContent = item[2]; row.setAttribute('aria-current', 'step'); }
      else { state.textContent = 'Next'; result.textContent = 'Reveals as the example continues.'; row.removeAttribute('aria-current'); }
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

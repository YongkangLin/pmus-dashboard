'use strict';
async function loadConnection() {
  const message = document.getElementById('connection-message');
  try {
    const response = await fetch('./connection.json', {cache: 'no-store', credentials: 'omit'});
    if (!response.ok) throw new Error('Connection configuration unavailable');
    const config = await response.json();
    const target = new URL(config.dashboardUrl);
    if (target.protocol !== 'https:' || target.username || target.password || target.port ||
        target.search || target.hash || target.pathname !== '/' ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)+\.trycloudflare\.com$/.test(target.hostname)) {
      throw new Error('No verified HTTPS destination is available');
    }
    const link = document.getElementById('open-dashboard');
    link.href = target.href;
    link.hidden = false;
    document.getElementById('destination').textContent = target.hostname;
    document.getElementById('endpoint-detail').hidden = false;
    message.textContent = 'Sign-in required. Opening this link does not submit any trading action.';
  } catch (_) {
    message.textContent = 'The secure dashboard connection is being prepared. Refresh this page shortly.';
  }
}
loadConnection();

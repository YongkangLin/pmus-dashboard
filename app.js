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
    message.textContent = 'Opening PMUS Trader…';
    window.location.replace(target.href);
  } catch (_) {
    message.textContent = 'The dashboard connection is unavailable. Refresh this page shortly.';
  }
}
loadConnection();

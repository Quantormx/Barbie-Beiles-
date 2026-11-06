(() => {
  'use strict';

  // Fixed Mexico City window. Never stored per visitor or reset on reload.
  const START_AT = Date.parse('2026-11-18T21:00:00-06:00');
  const END_AT = Date.parse('2026-11-20T21:00:00-06:00');

  function countdownAt(now) {
    const phase = now < START_AT ? 'scheduled' : now < END_AT ? 'active' : 'ended';
    const totalSeconds = phase === 'active' ? Math.ceil((END_AT - now) / 1000) : 0;
    return {
      phase,
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor(totalSeconds % 3600 / 60),
      seconds: totalSeconds % 60
    };
  }

  // Allow deterministic date-boundary tests without a browser or public clock override.
  if (typeof module === 'object' && module.exports) {
    module.exports = { START_AT, END_AT, countdownAt };
    return;
  }

  const root = document.getElementById('tgm-countdown');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  const title = root.querySelector('.tgm-countdown-title');
  const note = root.querySelector('.tgm-countdown-note');
  const clock = root.querySelector('.tgm-countdown-clock');
  const status = root.querySelector('.tgm-countdown-status');
  const digits = ['hours', 'minutes', 'seconds'].map(unit => root.querySelector(`[data-tgm-${unit}]`));
  let serverOffset = 0;
  let tick;
  let lastPhase;
  let lastSync = 0;
  let syncing = false;

  function render() {
    window.clearTimeout(tick);
    const now = Date.now() + serverOffset;
    const state = countdownAt(now);
    root.hidden = false;
    root.dataset.state = state.phase;
    clock.hidden = state.phase !== 'active';

    if (state.phase !== lastPhase) {
      title.textContent = state.phase === 'scheduled'
        ? 'Comienza el 18 de noviembre a las 9:00 p. m.'
        : state.phase === 'active'
          ? 'Este es tu momento. El tiempo cuenta.'
          : 'La cuenta regresiva ha finalizado.';
      note.textContent = state.phase === 'scheduled'
        ? 'Hora de Ciudad de México · Finaliza el 20 de noviembre, 9:00 p. m.'
        : state.phase === 'active'
          ? 'Finaliza el 20 de noviembre a las 9:00 p. m. · Hora CDMX'
          : '20 de noviembre de 2026 · 9:00 p. m. · Hora CDMX';
      status.textContent = state.phase === 'active'
        ? 'La cuenta regresiva de 48 horas ha comenzado.'
        : state.phase === 'ended' ? 'La cuenta regresiva ha finalizado.' : '';
      lastPhase = state.phase;
    }

    if (state.phase === 'active') {
      [state.hours, state.minutes, state.seconds].forEach((value, index) => {
        const text = String(value).padStart(2, '0');
        if (digits[index].textContent !== text) digits[index].textContent = text;
      });
      clock.setAttribute('aria-label', `${state.hours} horas, ${state.minutes} minutos y ${state.seconds} segundos restantes`);
    }
    // Recompute against absolute dates after tab suspension; never decrement a counter.
    if (state.phase !== 'ended' && !document.hidden) {
      const delay = state.phase === 'active' ? 1000 : Math.min(60000, Math.max(1, START_AT - now));
      tick = window.setTimeout(render, delay);
    }
  }

  async function synchronizeClock() {
    if (syncing) return;
    syncing = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);
    const sent = Date.now();
    try {
      const response = await fetch(`/theguidemethod/index.html?tgm-clock=${sent}`, {
        method: 'HEAD', cache: 'no-store', credentials: 'same-origin', signal: controller.signal
      });
      const received = Date.now();
      const serverDate = Date.parse(response.headers.get('date') || '');
      if (response.ok && Number.isFinite(serverDate)) {
        serverOffset = serverDate + (received - sent) / 2 - received;
      }
    } catch (_) {
      // The fixed deadline still works with the device clock when offline.
    } finally {
      window.clearTimeout(timeout);
      lastSync = Date.now();
      syncing = false;
      render();
    }
  }

  document.addEventListener('visibilitychange', () => {
    render();
    if (!document.hidden && Date.now() - lastSync > 300000) void synchronizeClock();
  });
  window.addEventListener('pageshow', render);
  window.addEventListener('online', () => void synchronizeClock());
  render();
  void synchronizeClock();
})();

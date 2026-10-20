/* Progressive enhancement of the existing MP3; no dependencies or autoplay. */
(() => {
  'use strict';
  const root = document.getElementById('escucha-muestra');
  if (!root || root.dataset.playerReady) return;
  const audio = root.querySelector('.ap-media');
  const controls = root.querySelector('.ap-controls');
  const play = root.querySelector('.ap-play');
  const progress = root.querySelector('.ap-progress');
  const elapsed = root.querySelector('.ap-elapsed');
  const duration = root.querySelector('.ap-duration');
  const feedback = root.querySelector('.ap-feedback');
  const favorite = root.querySelector('.ap-favorite');
  const skips = root.querySelectorAll('[data-seek]');
  if (!audio || !controls || !play || !progress || !elapsed || !duration || !feedback) return;
  let starting = false;
  const favoriteKey = 'alquimista_sample_favorite_v1';
  const format = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
    const value = Math.floor(seconds);
    return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  };
  const hasDuration = () => Number.isFinite(audio.duration) && audio.duration > 0;
  const message = (text, error = false) => {
    feedback.textContent = text;
    feedback.classList.toggle('is-error', error);
  };
  const syncState = () => {
    const playing = !audio.paused && !audio.ended;
    play.dataset.state = playing ? 'playing' : 'paused';
    play.setAttribute('aria-label', playing ? 'Pausar muestra' : 'Reproducir muestra');
  };
  const syncTime = () => {
    elapsed.textContent = format(audio.currentTime);
    duration.textContent = format(audio.duration);
    const ready = hasDuration() && !audio.error;
    progress.disabled = !ready;
    skips.forEach((button) => { button.disabled = !ready; });
    if (!ready) return;
    progress.max = String(audio.duration);
    progress.value = String(audio.currentTime);
    progress.style.setProperty('--progress', `${Math.min(100, audio.currentTime / audio.duration * 100)}%`);
    progress.setAttribute('aria-valuetext', `${format(audio.currentTime)} de ${format(audio.duration)}`);
  };
  const showError = () => {
    starting = false;
    syncState();
    syncTime();
    message('No se pudo cargar el audio. Revisa tu conexi\u00f3n y vuelve a pulsar play.', true);
  };
  const seek = (seconds) => {
    if (!hasDuration()) return;
    try {
      audio.currentTime = Math.max(0, Math.min(audio.duration, seconds));
      syncTime();
    } catch (_) {
      message('El audio a\u00fan est\u00e1 cargando. Int\u00e9ntalo en un momento.', true);
    }
  };
  play.addEventListener('click', async () => {
    if (!audio.paused || starting) {
      starting = false;
      audio.pause();
      return;
    }
    starting = true;
    message('');
    try {
      if (audio.error) audio.load();
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      if (error.name !== 'AbortError') showError();
    } finally {
      starting = false;
      syncState();
    }
  });
  progress.addEventListener('input', () => seek(Number(progress.value)));
  skips.forEach((button) => button.addEventListener('click', () => seek(audio.currentTime + Number(button.dataset.seek))));
  ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked', 'emptied'].forEach((event) => audio.addEventListener(event, syncTime));
  ['play', 'pause', 'ended'].forEach((event) => audio.addEventListener(event, syncState));
  audio.addEventListener('waiting', () => message('Cargando audio\u2026'));
  audio.addEventListener('playing', () => message(''));
  audio.addEventListener('canplay', () => { if (!audio.error) message(''); });
  audio.addEventListener('error', showError);
  const source = audio.querySelector('source');
  if (source) source.addEventListener('error', showError);
  if (favorite) {
    const setFavorite = (saved) => {
      favorite.setAttribute('aria-pressed', String(saved));
      favorite.setAttribute('aria-label', saved ? 'Quitar muestra de favoritos de este dispositivo' : 'Guardar muestra en este dispositivo');
    };
    try { setFavorite(localStorage.getItem(favoriteKey) === 'true'); } catch (_) { /* Private browsing. */ }
    favorite.addEventListener('click', () => {
      const saved = favorite.getAttribute('aria-pressed') !== 'true';
      setFavorite(saved);
      let stored = false;
      try { localStorage.setItem(favoriteKey, String(saved)); stored = true; } catch (_) { /* Session-only favorite. */ }
      message(saved ? (stored ? 'Muestra guardada en este dispositivo.' : 'Muestra marcada como favorita en esta sesi\u00f3n.') : 'Muestra retirada de favoritos.');
    });
    favorite.hidden = false;
  }
  controls.hidden = false;
  audio.controls = false;
  audio.hidden = true;
  root.dataset.playerReady = 'true';
  syncState();
  syncTime();
  if (audio.error) showError();
})();

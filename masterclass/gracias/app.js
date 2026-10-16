(() => {
  'use strict';
  const dialog = document.getElementById('video-dialog');
  const video = document.getElementById('welcome-video');
  const opener = document.getElementById('open-video');
  const skip = document.getElementById('skip-video');
  const sound = document.getElementById('enable-sound');
  const playFallback = document.getElementById('play-fallback');
  const error = document.getElementById('video-error');
  let previousOverflow = '';

  async function play() {
    try {
      await video.play();
      playFallback.hidden = true;
    } catch {
      // Low-power mode and browser settings can also block muted autoplay.
      if (dialog.open && !video.error) playFallback.hidden = false;
    }
  }

  function openVideo(automatic = false) {
    if (dialog.open) return;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    video.muted = automatic;
    video.preload = 'auto';
    if (video.ended) video.currentTime = 0;
    sound.hidden = !video.muted;
    playFallback.hidden = true;
    play();
  }

  function closeVideo() {
    video.pause();
    if (dialog.open) dialog.close();
  }
  opener.addEventListener('click', () => openVideo(false));
  skip.addEventListener('click', closeVideo);
  dialog.addEventListener('cancel', () => video.pause());
  dialog.addEventListener('close', () => {
    video.pause();
    document.body.style.overflow = previousOverflow;
    opener.focus({preventScroll: true});
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeVideo();
  });
  sound.addEventListener('click', () => { video.muted = false; play(); });
  video.addEventListener('volumechange', () => { sound.hidden = !video.muted && video.volume > 0; });
  playFallback.addEventListener('click', () => { video.muted = false; play(); });
  video.addEventListener('error', () => { error.hidden = false; playFallback.hidden = true; sound.hidden = true; });
  video.querySelector('source').addEventListener('error', () => { error.hidden = false; playFallback.hidden = true; sound.hidden = true; });
  video.addEventListener('ended', () => { skip.firstChild.textContent = 'Continuar '; });
  window.addEventListener('pagehide', closeVideo);

  // No conversion is counted on a direct visit or a reload of this page.
  // Registration is measured only after Tally confirms a successful submission.
  openVideo(true);
})();

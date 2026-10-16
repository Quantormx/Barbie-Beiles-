(() => {
  'use strict';
  const video = document.getElementById('welcome-video');
  const sound = document.getElementById('enable-sound');
  const playFallback = document.getElementById('play-fallback');
  const error = document.getElementById('video-error');

  async function play() {
    try {
      await video.play();
      playFallback.hidden = true;
    } catch (reason) {
      // Low-power mode and browser settings can also block muted autoplay.
      if (reason.name !== 'AbortError' && !video.error) playFallback.hidden = false;
    }
  }

  function activateSound() {
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    play();
  }
  function updateSoundButton() {
    sound.hidden = !!video.error || (!video.muted && video.volume > 0);
  }
  function showError() {
    error.hidden = false;
    playFallback.hidden = true;
    sound.hidden = true;
  }
  sound.addEventListener('click', activateSound);
  playFallback.addEventListener('click', activateSound);
  video.addEventListener('volumechange', updateSoundButton);
  video.addEventListener('playing', () => { playFallback.hidden = true; });
  video.addEventListener('error', showError);
  video.querySelector('source').addEventListener('error', showError);
  window.addEventListener('pagehide', () => video.pause());

  // No conversion is counted on a direct visit or a reload of this page.
  // Registration is measured only after Tally confirms a successful submission.
  updateSoundButton();
  play();
})();

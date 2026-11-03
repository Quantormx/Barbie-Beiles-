(() => {
  const videos = [...document.querySelectorAll('.tgm-video-card video')];
  if (!videos.length || document.documentElement.dataset.tgmVideosReady) return;
  document.documentElement.dataset.tgmVideosReady = 'true';
  let activeVideo = null;
  let libraryPromise;
  const states = [];

  // Load the player only when the visitor chooses to watch a testimonial.
  const loadHls = () => {
    if (window.Hls) return Promise.resolve(window.Hls);
    if (!libraryPromise) {
      libraryPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/assets/vendor/hls-1.7.3.light.min.js';
        script.async = true;
        script.onload = () => window.Hls ? resolve(window.Hls) : reject(new Error('Player unavailable'));
        script.onerror = () => { script.remove(); reject(new Error('Player unavailable')); };
        document.head.append(script);
      }).catch((error) => { libraryPromise = null; throw error; });
    }
    return libraryPromise;
  };

  const selectVideo = (video) => {
    activeVideo = video;
    states.forEach((state) => {
      if (state.video !== video) {
        state.video.pause();
        if (state.initialized) state.hls?.stopLoad();
      }
    });
  };

  videos.forEach((video) => {
    const card = video.closest('.tgm-video-card');
    const button = card.querySelector('.tgm-video-start');
    const label = button.lastElementChild;
    const defaultLabel = label.textContent;
    const error = card.querySelector('.tgm-video-error');
    const state = { video, button, hls: null, initialized: false, loading: false, failed: false };
    states.push(state);

    const showError = () => {
      state.failed = true;
      error.hidden = false;
      button.hidden = false;
      button.disabled = false;
      label.textContent = 'Reintentar';
      video.pause();
      state.hls?.stopLoad();
    };

    button.addEventListener('click', async () => {
      if (state.loading) return;
      const hadFocus = document.activeElement === button;
      state.loading = true;
      selectVideo(video);
      error.hidden = true;
      button.disabled = true;
      label.textContent = 'Cargando…';
      try {
        if (state.failed) {
          state.hls?.destroy();
          state.hls = null;
          video.removeAttribute('src');
          video.load();
          state.initialized = false;
          state.failed = false;
        }
        if (!state.initialized) {
          const source = video.dataset.stream;
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = source;
            state.initialized = true;
          } else {
            const Hls = await loadHls();
            if (activeVideo !== video) return;
            if (!Hls.isSupported()) throw new Error('Streaming unavailable');
            const hls = new Hls({ autoStartLoad: false, maxBufferLength: 15, maxMaxBufferLength: 30, backBufferLength: 15 });
            state.hls = hls;
            await new Promise((resolve, reject) => {
              hls.on(Hls.Events.MANIFEST_PARSED, resolve);
              hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) { showError(); reject(new Error(data.details)); }
              });
              hls.loadSource(source);
              hls.attachMedia(video);
            });
            state.initialized = true;
          }
        }
        if (activeVideo !== video) { state.hls?.stopLoad(); return; }
        state.hls?.startLoad();
        await video.play();
        button.hidden = true;
        if (hadFocus && activeVideo === video &&
            (document.activeElement === button || document.activeElement === document.body)) {
          video.focus({ preventScroll: true });
        }
      } catch (_error) {
        if (activeVideo === video) showError();
      } finally {
        state.loading = false;
        button.disabled = false;
        if (!state.failed) label.textContent = defaultLabel;
        else if (hadFocus && activeVideo === video && document.activeElement === document.body) {
          button.focus({ preventScroll: true });
        }
      }
    });

    video.addEventListener('play', () => {
      if (video.paused) return; // Ignore a queued event from a superseded selection.
      selectVideo(video);
      state.hls?.startLoad();
      button.hidden = true;
      error.hidden = true;
    });
    video.addEventListener('pause', () => { if (state.initialized) state.hls?.stopLoad(); });
    video.addEventListener('error', () => { if (state.initialized) showError(); });
  });

  window.addEventListener('pagehide', () => {
    activeVideo = null;
    states.forEach((state) => { state.video.pause(); state.hls?.stopLoad(); });
  });
})();

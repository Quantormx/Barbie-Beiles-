(() => {
  if (document.documentElement.dataset.tgmCanvaIcons === 'true') return;
  document.documentElement.dataset.tgmCanvaIcons = 'true';

  const iconArt = {
    modules: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".45" stroke-width="1.5">
        <path d="M24 73 64 53l40 20-40 20Z"/>
        <path d="M24 58 64 38l40 20-40 20Z"/>
        <path d="M24 43 64 23l40 20-40 20Z"/>
      </g>
      <path d="M33 39 64 25l31 15" fill="none" stroke="rgba(255,255,255,.88)" stroke-width="3" stroke-linecap="round"/>`,
    workbook: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.6">
        <path d="M18 33c17-8 31-6 46 4v59c-15-10-29-12-46-4Z"/>
        <path d="M110 33c-17-8-31-6-46 4v59c15-10 29-12 46-4Z"/>
      </g>
      <path d="M64 37v59M26 47c11-3 21-2 30 3M102 47c-11-3-21-2-30 3" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2.5" stroke-linecap="round"/>`,
    coaching: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".48" stroke-width="1.5">
        <circle cx="45" cy="44" r="15"/><circle cx="83" cy="44" r="15"/>
        <path d="M19 94c2-23 13-34 29-34s27 11 29 34Z"/>
        <path d="M51 94c2-23 13-34 29-34s27 11 29 34Z"/>
      </g>
      <path d="M39 36c4-3 9-4 13-1M77 36c4-3 9-4 13-1" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>`,
    breath: (id) => `
      <g class="object" fill="none" stroke="url(#stroke-${id})" stroke-width="9" stroke-linecap="round">
        <path d="M14 42c14-20 26 20 40 0s26 20 40 0 20 4 20 4"/>
        <path d="M14 72c14-20 26 20 40 0s26 20 40 0 20 4 20 4" opacity=".78"/>
        <path d="M26 100c13-16 24 16 37 0s24 16 37 0" opacity=".56"/>
      </g>`,
    audio: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.7">
        <path d="M24 68V53c0-24 17-41 40-41s40 17 40 41v15H92V53c0-17-11-29-28-29S36 36 36 53v15Z"/>
        <rect x="17" y="61" width="25" height="43" rx="11"/>
        <rect x="86" y="61" width="25" height="43" rx="11"/>
      </g>
      <path d="M51 64v18M60 56v34M69 61v24M78 67v12" stroke="rgba(255,255,255,.92)" stroke-width="3" stroke-linecap="round"/>`,
    hypnosis: (id) => `
      <g class="object" fill="none" stroke="url(#stroke-${id})" stroke-width="6" stroke-linecap="round">
        <path d="M64 18c26 0 46 19 46 44 0 27-21 48-48 48-29 0-50-22-50-50 0-25 19-44 43-44 22 0 39 16 39 37 0 22-17 39-39 39-20 0-35-15-35-34 0-17 13-30 30-30 15 0 26 11 26 25 0 12-9 22-21 22-10 0-18-8-18-17 0-8 6-14 14-14"/>
      </g>
      <circle cx="52" cy="58" r="7" fill="rgba(255,255,255,.9)"/>`,
    meditation: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".45" stroke-width="1.5">
        <path d="M64 104C39 87 25 69 30 49c18 3 29 12 34 27 5-15 16-24 34-27 5 20-9 38-34 55Z"/>
        <path d="M64 100C49 75 50 49 64 25c14 24 15 50 0 75Z"/>
        <path d="M64 102C43 99 26 92 14 78c18-7 35-5 50 8 15-13 32-15 50-8-12 14-29 21-50 24Z"/>
      </g>`,
    writing: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".48" stroke-width="1.5">
        <rect x="22" y="20" width="68" height="86" rx="10" transform="rotate(-6 56 63)"/>
        <path d="m75 94 31-55 10 6-31 55-15 8Z"/>
      </g>
      <path d="M34 42h38M32 56h32M30 70h27" stroke="rgba(255,255,255,.88)" stroke-width="3" stroke-linecap="round"/>`,
    ritual: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".48" stroke-width="1.5">
        <path d="M38 48h52l-6 60H44Z"/>
        <path d="M64 49c-16-11-5-23 0-35 14 10 16 23 0 35Z"/>
      </g>
      <path d="M47 66h34" stroke="rgba(255,255,255,.9)" stroke-width="3" stroke-linecap="round"/>`,
    playlist: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.5">
        <path d="M43 21v61c-7-5-20-3-25 5-6 10 3 21 16 18 11-3 18-12 18-23V40l49-10v43c-7-5-20-3-25 5-6 10 3 21 16 18 11-3 18-12 18-23V14Z"/>
      </g>
      <path d="m52 39 49-10" stroke="rgba(255,255,255,.9)" stroke-width="3"/>`,
    toolbox: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.5">
        <rect x="16" y="42" width="96" height="65" rx="14"/>
        <path d="M43 43V28h42v15M17 66h94M53 62h22v15H53Z"/>
      </g>
      <path d="M27 51h25" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linecap="round"/>`,
    community: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".45" stroke-width="1.5">
        <circle cx="64" cy="39" r="17"/>
        <circle cx="31" cy="49" r="13"/><circle cx="97" cy="49" r="13"/>
        <path d="M30 105c2-27 14-41 34-41s32 14 34 41Z"/>
        <path d="M4 105c1-21 10-32 27-32 10 0 18 5 23 14M124 105c-1-21-10-32-27-32-10 0-18 5-23 14"/>
      </g>`,
    phone: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.6">
        <rect x="33" y="10" width="62" height="108" rx="15"/>
        <circle cx="64" cy="95" r="10"/>
        <path d="m60 90 10 5-10 6Z" fill="rgba(255,255,255,.95)" stroke="none"/>
      </g>
      <path d="M49 26h30" stroke="rgba(255,255,255,.9)" stroke-width="3" stroke-linecap="round"/>`,
    wealth: (id) => `
      <g class="object" fill="url(#glass-${id})" stroke="#a92055" stroke-opacity=".5" stroke-width="1.5">
        <circle cx="64" cy="64" r="46"/>
        <path d="M82 43c-9-10-34-8-34 7 0 20 38 8 38 29 0 17-29 20-42 7M64 29v70" fill="none" stroke="rgba(255,255,255,.94)" stroke-width="7" stroke-linecap="round"/>
      </g>`,
  };

  const svg = (type, index) => {
    const id = `${type}-${index}`;
    const art = (iconArt[type] || iconArt.modules)(id);
    return `<svg class="tgm-canva-object-svg" viewBox="0 0 128 128" aria-hidden="true">
      <defs>
        <linearGradient id="glass-${id}" x1=".14" y1=".04" x2=".84" y2=".96">
          <stop offset="0" stop-color="#fff" stop-opacity=".98"/>
          <stop offset=".23" stop-color="#ffd8e7" stop-opacity=".94"/>
          <stop offset=".58" stop-color="#ef8db4" stop-opacity=".88"/>
          <stop offset="1" stop-color="#a61750" stop-opacity=".9"/>
        </linearGradient>
        <linearGradient id="stroke-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".34" stop-color="#ffbad4"/>
          <stop offset="1" stop-color="#9a1649"/>
        </linearGradient>
        <filter id="shadow-${id}" x="-40%" y="-40%" width="180%" height="190%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#6f1738" flood-opacity=".25"/>
        </filter>
      </defs>
      <g filter="url(#shadow-${id})">${art}</g>
    </svg>`;
  };

  const includes = [
    'modules','workbook','coaching','breath','audio','hypnosis',
    'meditation','writing','ritual','playlist','toolbox','community'
  ];

  document.querySelectorAll('.tgm-final-includes .tgm-final-include-card').forEach((card, index) => {
    const old = card.querySelector('.tgm-final-sticker');
    if (!old) return;
    old.className = 'tgm-canva-icon tgm-canva-icon--deliverable';
    old.innerHTML = svg(includes[index] || 'modules', index);
  });

  const bonusIcons = ['phone','wealth','community','workbook'];
  document.querySelectorAll('.tgm-final-bonuses .tgm-final-bonus-card').forEach((card, index) => {
    const old = card.querySelector('.tgm-final-bonus-icon');
    if (!old) return;
    old.className = 'tgm-canva-icon tgm-canva-icon--bonus';
    old.innerHTML = svg(bonusIcons[index] || 'star', 100 + index);
  });
})();

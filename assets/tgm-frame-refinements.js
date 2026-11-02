(() => {
  if (document.documentElement.dataset.tgmFrameRefinements === 'true') return;
  document.documentElement.dataset.tgmFrameRefinements = 'true';

  const heroCta = document.querySelector('.tgm-final-hero-cta');
  if (heroCta) {
    const raw = heroCta.textContent.replace(/\s*→\s*$/, '').trim();
    heroCta.innerHTML = `<span class="tgm-cta-label">${raw}</span><span class="tgm-cta-arrow" aria-hidden="true">→</span>`;
  }

  const glassIcons = [...document.querySelectorAll('.tgm-final-sticker svg, .tgm-final-bonus-icon svg')];
  glassIcons.forEach((svg, index) => {
    const ns = 'http://www.w3.org/2000/svg';
    const id = `tgmGlassGradient${index}`;
    const filterId = `tgmGlassGlow${index}`;

    const defs = document.createElementNS(ns, 'defs');
    const gradient = document.createElementNS(ns, 'linearGradient');
    gradient.setAttribute('id', id);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    [
      ['0%', '#fff7fb', '1'],
      ['34%', '#f58eb9', '1'],
      ['72%', '#c72c68', '1'],
      ['100%', '#761638', '1']
    ].forEach(([offset, color, opacity]) => {
      const stop = document.createElementNS(ns, 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', opacity);
      gradient.appendChild(stop);
    });

    const filter = document.createElementNS(ns, 'filter');
    filter.setAttribute('id', filterId);
    filter.setAttribute('x', '-45%');
    filter.setAttribute('y', '-45%');
    filter.setAttribute('width', '190%');
    filter.setAttribute('height', '190%');
    const shadow = document.createElementNS(ns, 'feDropShadow');
    shadow.setAttribute('dx', '0');
    shadow.setAttribute('dy', '2.4');
    shadow.setAttribute('stdDeviation', '1.35');
    shadow.setAttribute('flood-color', '#6f1738');
    shadow.setAttribute('flood-opacity', '.34');
    filter.appendChild(shadow);

    defs.append(gradient, filter);
    svg.prepend(defs);
    svg.setAttribute('stroke', `url(#${id})`);
    svg.setAttribute('filter', `url(#${filterId})`);
  });
})();

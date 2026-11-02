(() => {
  if (document.documentElement.dataset.tgmLastTwoFrames === 'true') return;
  document.documentElement.dataset.tgmLastTwoFrames = 'true';

  const discoveryStatement = document.querySelector('.tgm-final-discovery-core');
  if (discoveryStatement) {
    discoveryStatement.classList.add('tgm-last-mixed-statement');
    discoveryStatement.innerHTML = [
      '<span class="tgm-last-mixed-impact">',
      '  <span>PUEDES QUERER UNA</span>',
      '  <span>VIDA NUEVA Y SEGUIR</span>',
      '</span>',
      '<span class="tgm-last-mixed-editorial">',
      '  <span>TOMANDO DECISIONES</span>',
      '  <span>DESDE LAS CREENCIAS</span>',
      '  <span>DE TU VIDA ACTUAL.</span>',
      '</span>'
    ].join('');
  }

  const closingStatement = document.querySelector('.tgm-final-good-enough');
  if (closingStatement) {
    closingStatement.classList.add('tgm-last-close-good');
    closingStatement.innerHTML = [
      '<span>NO TIENES QUE ELEGIR UNA VIDA</span>',
      '<span>“SUFICIENTEMENTE BUENA”.</span>'
    ].join('');
  }

  const discover = document.querySelector('.tgm-final-discover');
  if (discover) {
    discover.classList.add('tgm-last-close-discover');
    discover.innerHTML = [
      '<strong class="tgm-last-close-impact">',
      '  <span>PUEDES</span>',
      '  <span>DESCUBRIR</span>',
      '</strong>',
      '<span class="tgm-last-close-editorial">',
      '  <span>QUÉ TAN EXTRAORDINARIA</span>',
      '  <span>PUEDE LLEGAR A SER.</span>',
      '</span>'
    ].join('');
  }
})();

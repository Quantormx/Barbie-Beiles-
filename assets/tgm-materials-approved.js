(() => {
  if (document.documentElement.dataset.tgmApprovedMaterials === 'true') return;
  document.documentElement.dataset.tgmApprovedMaterials = 'true';

  const image = document.querySelector('.tgm-final-includes .tgm-final-materials-visual img');
  if (!image) return;

  const wrapper = image.closest('.tgm-final-materials-visual');
  const fallback = '/assets/tgm-materials-mockup.svg?v=2';

  image.removeAttribute('srcset');
  image.removeAttribute('sizes');
  image.alt = 'The Guide Method: libro, workbook, módulos digitales, meditación guiada y herramientas';
  image.loading = 'eager';
  image.decoding = 'async';
  image.width = 1254;
  image.height = 1254;

  image.addEventListener('load', () => {
    wrapper?.classList.add('tgm-materials-loaded');
  });

  image.addEventListener('error', () => {
    if (image.dataset.fallbackApplied === 'true') return;
    image.dataset.fallbackApplied = 'true';
    image.src = fallback;
  });

  image.src = '/assets/tgm-materials-20261103.webp';
})();

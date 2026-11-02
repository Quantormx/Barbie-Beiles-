(() => {
  if (document.documentElement.dataset.tgmApprovedMaterials === 'true') return;
  document.documentElement.dataset.tgmApprovedMaterials = 'true';

  const image = document.querySelector('.tgm-final-includes .tgm-final-materials-visual img');
  if (!image) return;

  image.src = '/assets/tgm-materials-approved.jpg';
  image.alt = 'The Guide Method: libro, workbook, módulos digitales, meditación guiada y herramientas';
  image.loading = 'eager';
  image.decoding = 'async';
})();

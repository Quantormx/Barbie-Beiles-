(() => {
  if (document.documentElement.dataset.tgmApprovedMaterials === 'true') return;
  document.documentElement.dataset.tgmApprovedMaterials = 'true';

  const image = document.querySelector('.tgm-final-includes .tgm-final-materials-visual img');
  if (!image) return;

  const wrapper = image.closest('.tgm-final-materials-visual');
  const fallback = '/assets/tgm-materials-mockup.svg?v=5';
  const parts = Array.from({ length: 6 }, (_, index) =>
    `/assets/tgm-materials-v5/part-${String(index + 1).padStart(2, '0')}.txt?v=5`
  );

  image.removeAttribute('srcset');
  image.removeAttribute('sizes');
  image.alt = 'The Guide Method: libro, workbook, módulos digitales, meditación guiada y herramientas';
  image.loading = 'eager';
  image.decoding = 'async';
  wrapper?.classList.add('tgm-materials-loading');

  const showFallback = () => {
    if (image.dataset.fallbackApplied === 'true') return;
    image.dataset.fallbackApplied = 'true';
    wrapper?.classList.remove('tgm-materials-loading');
    wrapper?.classList.add('tgm-materials-fallback');
    image.src = fallback;
  };

  Promise.all(
    parts.map(async (url) => {
      const response = await fetch(url, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`No se pudo cargar ${url}: ${response.status}`);
      return (await response.text()).trim();
    })
  )
    .then((chunks) => {
      const encoded = chunks.join('').replace(/\s+/g, '');
      if (!encoded.startsWith('UklGR') || encoded.length < 40000) {
        throw new Error('El recurso TGM reconstruido está incompleto.');
      }

      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }

      const objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));
      image.addEventListener('load', () => {
        wrapper?.classList.remove('tgm-materials-loading');
        wrapper?.classList.add('tgm-materials-loaded');
        URL.revokeObjectURL(objectUrl);
      }, { once: true });
      image.addEventListener('error', showFallback, { once: true });
      image.src = objectUrl;
    })
    .catch((error) => {
      console.error('TGM materials asset:', error);
      showFallback();
    });
})();

(() => {
  const HOTMART_URL = 'https://pay.hotmart.com/C99222275C?off=415iu72d&checkoutMode=10';
  const bar = document.createElement('div');
  bar.className = 'tgm-mobile-action';
  bar.innerHTML = `
    <div class="tgm-mobile-action__label" aria-hidden="true">
      <strong>The Guide Method</strong>
      <span>8 semanas · acceso de por vida</span>
    </div>
    <a class="cta" href="${HOTMART_URL}" aria-label="Quiero entrar a The Guide Method">Quiero entrar</a>
  `;
  document.body.appendChild(bar);

  const priceSection = document.getElementById('inversion');
  const closingSection = document.querySelector('.close');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const shouldHide = entries.some((entry) => entry.isIntersecting);
      bar.style.transform = shouldHide ? 'translateY(110%)' : 'translateY(0)';
      bar.style.opacity = shouldHide ? '0' : '1';
      bar.style.pointerEvents = shouldHide ? 'none' : 'auto';
    }, { threshold: 0.18 });

    if (priceSection) observer.observe(priceSection);
    if (closingSection) observer.observe(closingSection);
  }

  bar.style.transition = 'transform .28s ease, opacity .28s ease';
})();

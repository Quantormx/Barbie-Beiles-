(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const nodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    nodes.forEach((node) => observer.observe(node));
  } else {
    nodes.forEach((node) => node.classList.add('in'));
  }

  const carousel = document.querySelector('.testimonial-carousel');
  const slides = [...document.querySelectorAll('.phone-slide')];
  const dots = [...document.querySelectorAll('.carousel-dots button')];
  const current = document.querySelector('.carousel-current');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let autoplay;
  let pointerStart = null;

  const normalize = (index) => (index + slides.length) % slides.length;

  const renderCarousel = () => {
    if (!carousel || !slides.length) return;
    const previous = normalize(activeIndex - 1);
    const next = normalize(activeIndex + 1);
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
      slide.classList.toggle('is-prev', index === previous);
      slide.classList.toggle('is-next', index === next);
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeIndex));
    if (current) current.textContent = String(activeIndex + 1).padStart(2, '0');
  };

  const restartProgress = () => {
    if (!carousel || reducedMotion) return;
    carousel.classList.remove('is-playing');
    void carousel.offsetWidth;
    carousel.classList.add('is-playing');
  };

  const showSlide = (index, restart = true) => {
    activeIndex = normalize(index);
    renderCarousel();
    window.gtag?.('event', 'testimonial_interaction', { testimonial_number: activeIndex + 1 });
    if (restart) startAutoplay();
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplay);
    carousel?.classList.remove('is-playing');
  };

  function startAutoplay() {
    stopAutoplay();
    if (!carousel || reducedMotion || document.hidden) return;
    restartProgress();
    autoplay = window.setInterval(() => {
      activeIndex = normalize(activeIndex + 1);
      renderCarousel();
      restartProgress();
    }, 6500);
  }

  document.querySelector('.carousel-prev')?.addEventListener('click', () => showSlide(activeIndex - 1));
  document.querySelector('.carousel-next')?.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  carousel?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  carousel?.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
  carousel?.addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) > 45) showSlide(activeIndex + (distance < 0 ? 1 : -1));
  });
  carousel?.addEventListener('pointercancel', () => { pointerStart = null; });
  carousel?.addEventListener('mouseenter', stopAutoplay);
  carousel?.addEventListener('mouseleave', startAutoplay);
  carousel?.addEventListener('focusin', stopAutoplay);
  carousel?.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
  renderCarousel();
  startAutoplay();

  const measurementId = document.querySelector('meta[name="ga4-measurement-id"]')?.content.trim();
  if (/^G-[A-Z0-9]+$/i.test(measurementId || '')) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(analyticsScript);

    document.querySelectorAll('.buy-link').forEach((link) => {
      link.addEventListener('click', () => {
        window.gtag('event', 'hotmart_click', {
          cta_location: link.closest('section')?.id || (link.closest('.hero') ? 'hero' : link.closest('header') ? 'header' : 'other'),
          link_text: link.textContent.trim(),
          link_url: link.href
        });
      });
    });
  }
})();

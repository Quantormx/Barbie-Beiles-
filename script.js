(() => {
  const checkoutUrl = 'https://pay.hotmart.com/T95794906V?checkoutMode=2';

  const showCheckoutError = () => {
    if (document.querySelector('.checkout-error')) return;
    const notice = document.createElement('div');
    notice.className = 'checkout-error';
    notice.setAttribute('role', 'alert');
    const message = document.createElement('p');
    message.textContent = 'No pudimos cargar el pago dentro de la página.';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Reintentar';
    retry.addEventListener('click', () => window.location.reload());
    const alternative = document.createElement('a');
    alternative.href = checkoutUrl;
    alternative.target = '_blank';
    alternative.rel = 'noopener';
    alternative.textContent = 'Abrir pago seguro en Hotmart';
    notice.append(message, retry, alternative);
    document.body.appendChild(notice);
  };

  const loadAlternateCheckout = () => {
    // Checkout Elements uses another official Hotmart script host.
    const alternateScript = document.createElement('script');
    alternateScript.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
    alternateScript.onload = () => {
      try {
        if (typeof window.checkoutElements?.init !== 'function') throw new Error('Checkout Elements unavailable');
        document.querySelectorAll('.buy-link').forEach((link, index) => {
          link.id ||= `hotmart-checkout-${index + 1}`;
          const overlay = window.checkoutElements.init('overlayCheckout', { offer: 'jloebrwk' });
          overlay.attach(`#${link.id}`);
        });
      } catch (error) {
        showCheckoutError();
      }
    };
    alternateScript.onerror = showCheckoutError;
    document.head.appendChild(alternateScript);
  };

  // The widget supplied by Hotmart opens checkout over the current page.
  const checkoutScript = document.createElement('script');
  checkoutScript.src = 'https://static.hotmart.com/checkout/widget.min.js';
  checkoutScript.onerror = loadAlternateCheckout;
  document.head.appendChild(checkoutScript);

  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const countdown = document.getElementById('offer-countdown');
  if (countdown) {
    const storageKey = 'el_alquimista_offer_deadline_v1';
    const duration = 59 * 60 * 1000;
    let deadline;
    try {
      deadline = Number(localStorage.getItem(storageKey));
      if (!Number.isFinite(deadline) || deadline <= 0) {
        deadline = Date.now() + duration;
        localStorage.setItem(storageKey, String(deadline));
      }
    } catch (_) {
      deadline = Date.now() + duration;
    }
    const twoDigits = value => String(value).padStart(2, '0');
    const updateCountdown = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      countdown.textContent = `${twoDigits(Math.floor(seconds / 3600))}:${twoDigits(Math.floor(seconds % 3600 / 60))}:${twoDigits(seconds % 60)}`;
      if (seconds === 0) document.getElementById('countdown-label').textContent = 'EL TIEMPO DE ESTA OFERTA TERMINÓ';
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  const dayTrack = document.getElementById('timeline-track');
  if (dayTrack) {
    for (let day = 1; day <= 21; day += 1) {
      const dot = document.createElement('span');
      dot.className = `day-dot${day === 9 ? ' is-now' : ''}`;
      dayTrack.appendChild(dot);
    }
  }

  const whatsapp = document.querySelector('.whatsapp-contact');
  const heroBuyLink = document.querySelector('.hero--offer .buy-link');
  if (whatsapp && heroBuyLink) {
    let pending = false;
    const keepWhatsAppClear = () => {
      pending = false;
      whatsapp.style.bottom = '';
      const a = heroBuyLink.getBoundingClientRect();
      const b = whatsapp.getBoundingClientRect();
      const overlaps = a.left < b.right + 8 && a.right > b.left - 8 && a.top < b.bottom + 8 && a.bottom > b.top - 8;
      if (!overlaps) return;
      const above = a.top - b.height - 14;
      const below = a.bottom + 14;
      const top = above >= 76 ? above : below + b.height <= window.innerHeight - 14 ? below : 76;
      whatsapp.style.bottom = `${Math.round(window.innerHeight - top - b.height)}px`;
    };
    const scheduleWhatsAppCheck = () => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(keepWhatsAppClear);
    };
    window.addEventListener('scroll', scheduleWhatsAppCheck, { passive: true });
    window.addEventListener('resize', scheduleWhatsAppCheck);
    scheduleWhatsAppCheck();
  }

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
  // Meta Pixel: track clicks that start the Hotmart purchase journey.
  document.querySelectorAll('.buy-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          content_name: 'El Alquimista',
          value: 37,
          currency: 'USD'
        });
      }
    });
  });

})();

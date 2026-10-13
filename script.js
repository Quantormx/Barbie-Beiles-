(() => {
  const checkoutUrl = 'https://pay.hotmart.com/T95794906V?checkoutMode=2';

  const showCheckoutError = () => {
    if (document.querySelector('.checkout-error')) return;
    const notice = document.createElement('div');
    notice.className = 'checkout-error';
    notice.setAttribute('role', 'alert');
    const message = document.createElement('p');
    message.textContent = 'No pudimos cargar el pago dentro de la página.';
    const close = document.createElement('button');
    close.textContent = '×';
    close.className = 'checkout-error-close';
    close.setAttribute('aria-label', 'Cerrar aviso');
    close.addEventListener('click', () => notice.remove());
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Reintentar';
    retry.addEventListener('click', () => window.location.reload());
    const alternative = document.createElement('a');
    alternative.href = checkoutUrl;
    alternative.target = '_blank';
    alternative.rel = 'noopener';
    alternative.textContent = 'Abrir pago seguro en Hotmart';
    notice.append(close, message, retry, alternative);
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



const testimonials=[{"sender": "Alumna de El Alquimista", "text": "El Alquimista rebasó por mucho mis expectativas. Me ayudó a ponerle nombre a mis emociones, me siento mucho más ligera, empoderada. Mi meta es manifestar sentirme bien todos los días y lo estoy logrando. ¡Qué poderoso reto! Gracias Barbie.", "time": "10:24"}, {"sender": "Edith", "text": "Amo el reto del Alquimista en mi vida ❤️\nGracias por todo.", "time": "9:17"}, {"sender": "Belén", "text": "Gracias Barbie. Te mando mi video de cómo ha cambiado mi vida. Amo los audios, los escucho en todo momento. Amé El Alquimista.\n\n¡Quiero más!", "time": "11:03"}, {"sender": "Alumna de El Alquimista", "text": "Hola Bárbara, solo quería darte las gracias por todo lo que aprendí en el reto. Me cambió por completo mi forma de ver todo. Ahora siento que estoy atrayendo otro tipo de hombres y hasta mi jefe cambió conmigo. ¡Es impresionante!", "time": "8:46"}, {"sender": "Alumna de El Alquimista", "text": "¡Hola Barbie! Quería contarte que me siento muy bien y ha sucedido lo que he escrito en cuanto a cómo me quiero sentir. Sigo mejorando, pero ya vi más arriba de lo que había experimentado; cada día tengo experiencias nuevas.", "time": "7:52"}, {"sender": "Alumna de El Alquimista", "text": "Personas que tenía que ver, a quienes antes les había escrito, llegaron. Incluso tuve oportunidad de conocer al dueño de una cadena grande que vendemos. Fue un día muy productivo y alineado a mi deseo manifestado.", "time": "6:38"}, {"sender": "Alumna de El Alquimista", "text": "En enero hice este mapa de los sueños con Bárbara. Durante este tiempo se manifestó mi viaje con mi hermana, tengo el cuerpo de mis sueños, logré agendar tres citas por día de microblading y mi camioneta. Todo se ha ido dando.", "time": "9:32"}];
let current=1;
const dots=document.getElementById('dots');
testimonials.forEach((_,i)=>{const b=document.createElement('button');b.className='dot';b.setAttribute('aria-label','Ver testimonio '+(i+1));b.addEventListener('click',()=>showTestimonial(i));dots.appendChild(b)});
function showTestimonial(n){current=(n+testimonials.length)%testimonials.length;const t=testimonials[current];document.getElementById('testimonial-sender').textContent=t.sender;document.getElementById('testimonial-text').textContent=t.text;document.getElementById('testimonial-time').textContent=t.time;document.querySelector('.chat-body').scrollTop=0;[...dots.children].forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-current',i===current?'true':'false')});window.gtag?.('event','testimonial_interaction',{testimonial_number:current+1});}
document.getElementById('prev').addEventListener('click',()=>showTestimonial(current-1));document.getElementById('next').addEventListener('click',()=>showTestimonial(current+1));
const carousel=document.querySelector('.testimonial-carousel');carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showTestimonial(current-1)}if(e.key==='ArrowRight'){e.preventDefault();showTestimonial(current+1)}});
let swipeX=0;carousel.addEventListener('touchstart',e=>{swipeX=e.changedTouches[0].clientX},{passive:true});carousel.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-swipeX;if(Math.abs(dx)>55)showTestimonial(current+(dx<0?1:-1))},{passive:true});showTestimonial(current);
const menuButton=document.querySelector('.menu-toggle'),menu=document.getElementById('mobile-menu');menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú')}));
document.querySelectorAll('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==d)other.open=false})}));



// Preserve the live site's 59-minute per-visitor deadline and storage key.
// Never extend an existing (including expired) deadline on page reload.
const storageKey = 'el_alquimista_offer_deadline_v1';
const duration = 59 * 60 * 1000;
let deadline;
try {
  deadline = Number(localStorage.getItem(storageKey));
  if (!Number.isFinite(deadline) || deadline <= 0) {
    deadline = Date.now() + duration;
    localStorage.setItem(storageKey, String(deadline));
  }
} catch (_) { deadline = Date.now() + duration; }
const clockCells = ['days','hours','minutes','seconds'].map(id => document.getElementById(id));
clockCells.forEach(cell => cell.addEventListener('animationend', () => cell.classList.remove('is-ticking')));
function updateCountdown(animate = true) {
  const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  const values = [Math.floor(remaining / 86400), Math.floor(remaining % 86400 / 3600), Math.floor(remaining % 3600 / 60), remaining % 60];
  clockCells.forEach((cell, i) => {
    const value = String(values[i]).padStart(2, '0');
    if (cell.textContent === value) return;
    cell.textContent = value;
    cell.classList.remove('is-ticking');
    if (animate) { void cell.offsetWidth; cell.classList.add('is-ticking'); }
  });
  if (remaining === 0) {
    document.getElementById('countdown-label').textContent = 'El tiempo de esta oferta terminó';
    document.querySelector('.countdown').classList.add('is-expired');
  }
  return remaining;
}
updateCountdown(false);
const clockInterval = window.setInterval(() => { if (updateCountdown() === 0) window.clearInterval(clockInterval); }, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(false); });

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



document.querySelectorAll('a[href="#inversion"]').forEach(link => link.addEventListener('click', () => {
  window.gtag?.('event', 'cta_click', {cta_location:link.closest('section')?.id || 'header',link_text:link.textContent.trim(),destination:'inversion'});
}));
document.querySelectorAll('.whatsapp-link').forEach(link => link.addEventListener('click', () => {
  window.gtag?.('event', 'whatsapp_click', {cta_location:link.closest('section')?.id || 'floating'});
}));
// Keep WhatsApp away from the hero purchase CTA while scrolling on mobile.
const whatsapp = document.querySelector('.whatsapp-contact');
const heroCta = document.querySelector('.hero-cta');
let pendingWhatsApp = false;
function keepWhatsAppClear() {
  pendingWhatsApp = false;
  whatsapp.style.bottom = '';
  const a = heroCta.getBoundingClientRect(), b = whatsapp.getBoundingClientRect();
  const overlaps = a.left < b.right + 8 && a.right > b.left - 8 && a.top < b.bottom + 8 && a.bottom > b.top - 8;
  if (!overlaps) return;
  const top = Math.max(76, a.top - b.height - 14);
  whatsapp.style.bottom = `${Math.max(16, Math.round(window.innerHeight - top - b.height))}px`;
}
function scheduleWhatsAppCheck() { if (!pendingWhatsApp) { pendingWhatsApp = true; window.requestAnimationFrame(keepWhatsAppClear); } }
window.addEventListener('scroll', scheduleWhatsAppCheck, { passive: true });
window.addEventListener('resize', scheduleWhatsAppCheck);
window.addEventListener('load', scheduleWhatsAppCheck);
scheduleWhatsAppCheck();

})();

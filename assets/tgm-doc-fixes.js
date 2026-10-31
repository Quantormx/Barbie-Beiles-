(() => {
  const hero = document.querySelector('.tgm-hero');
  hero?.querySelector('.hero-copy > .eyebrow')?.remove();

  const navLinks = [...document.querySelectorAll('.navlinks a')];
  const navLabels = ['El método', 'Qué incluye', 'Tu inversión'];
  navLinks.forEach((link, index) => {
    if (navLabels[index]) link.textContent = navLabels[index];
  });

  const main = document.querySelector('main');
  const closings = [...document.querySelectorAll('.tgm-close')];
  if (closings.length > 1) closings.slice(0, -1).forEach((node) => node.remove());
  const closing = closings[closings.length - 1];
  if (main && closing && closing !== main.lastElementChild) main.appendChild(closing);

  document.querySelectorAll('.tgm-testimonials article span').forEach((label) => {
    label.textContent = 'Testimonio autorizado por integrar';
  });
})();

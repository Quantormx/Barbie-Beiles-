(() => {
  if (document.documentElement.dataset.tgmDocAdjusted === 'true') return;
  document.documentElement.dataset.tgmDocAdjusted = 'true';

  const HOTMART_URL = 'https://pay.hotmart.com/C99222275C?off=415iu72d&checkoutMode=10';
  const sections = [...document.querySelectorAll('main > section')];
  const section = (index, className) => {
    const node = sections[index];
    if (node && className) node.classList.add(className);
    return node;
  };
  const makeCTA = (label) => {
    const link = document.createElement('a');
    link.className = 'cta tgm-section-cta';
    link.href = HOTMART_URL;
    link.textContent = label;
    return link;
  };
  const makeBulletList = (items, className = '') => {
    const list = document.createElement('ul');
    list.className = `tgm-bullet-list ${className}`.trim();
    items.forEach((item) => {
      const li = document.createElement('li');
      if (typeof item === 'string') li.textContent = item;
      else li.innerHTML = item;
      list.appendChild(li);
    });
    return list;
  };
  const splitHeading = (node, first, second, className = '') => {
    if (!node) return;
    node.classList.add(className);
    node.innerHTML = `<span class="tgm-heading-editorial">${first}</span><span class="tgm-heading-impact">${second}</span>`;
  };

  /* 01 — HERO */
  const hero = section(0, 'tgm-hero');
  if (hero) {
    const title = hero.querySelector('.hero-title');
    if (title) {
      title.classList.add('tgm-hero-split');
      title.innerHTML = '<span class="tgm-impact-part">ES HORA DE VIVIR A LA ALTURA DE TODO</span><span class="tgm-editorial-part">LO QUE SABES QUE ES POSIBLE PARA TI.</span>';
    }
    hero.querySelector('.hero-sub')?.classList.add('tgm-hero-sub');
    hero.querySelector('.hero-copy > p')?.classList.add('tgm-hero-body');
  }

  /* 02 — EL DESEO */
  const desire = section(1, 'tgm-desire');
  if (desire) {
    splitHeading(
      desire.querySelector('h2.impact'),
      'HAY UNA PARTE DE TI QUE SABE QUE…',
      'ESTÁS HECHA PARA MÁS.',
      'tgm-desire-title'
    );
    [...desire.querySelectorAll('.stack p')].forEach((item) => {
      if (item.textContent.trim().toLowerCase() === 'más experiencias.') item.remove();
    });
    const copy = desire.querySelector('.prose.body-lg');
    if (copy) {
      copy.classList.add('tgm-desire-copy');
      copy.innerHTML = `
        <p class="tgm-desire-opening">Una vida que no solamente se vea bien.</p>
        <p class="tgm-desire-opening">Una vida que se sienta genuinamente tuya.</p>
        <p>Y probablemente ya puedes verla.</p>
        <p>Has pensado en ella.</p>
        <p>Has trabajado por ella.</p>
        <p>Has intentado convertirte en esa mujer.</p>
        <p class="tgm-desire-signal">Hay algo dentro de ti que sigue diciendo:</p>
        <p class="tgm-desire-quote">“Mi vida puede ser mucho más que esto.”</p>
        <p class="tgm-desire-truth">Y tiene razón.</p>
      `;
    }
  }

  /* 03 — LA BRECHA */
  const gap = section(2, 'tgm-gap');
  if (gap) {
    splitHeading(
      gap.querySelector('h2.impact'),
      'Y AUN ASÍ, HAY UNA DISTANCIA ENTRE',
      'LO QUE SABES QUE PUEDES VIVIR Y LO QUE HOY ESTÁS VIVIENDO.',
      'tgm-gap-title'
    );
    const cards = [...gap.querySelectorAll('.four article')];
    const cardData = [
      {
        title: 'HAS INTENTADO',
        intro: '',
        items: ['Has hecho terapia', 'Has tomado cursos', 'Has meditado', 'Has escrito', 'Has visualizado', 'Has trabajado en ti'],
        closing: 'Y tienes muchísimo más conocimiento que hace unos años. Pero sigues preguntándote por qué saber tanto todavía no se traduce en vivir diferente.'
      },
      {
        title: 'VES',
        intro: 'Ves a otras mujeres crear cosas que tú también quieres.',
        items: ['El negocio', 'El dinero', 'La relación', 'La seguridad', 'La libertad'],
        closing: 'Y aunque te inspires, a veces aparece esa pregunta incómoda:',
        question: '“¿Qué tienen ellas que yo todavía no?”'
      },
      {
        title: 'TE ESFUERZAS',
        intro: '',
        items: ['Intentas ser más disciplinada', 'Más constante', 'Más positiva', 'Hacer más', 'Entender más', 'Encontrar qué te falta'],
        closing: 'Y terminas agotada de sentir que siempre existe una cosa más que tienes que arreglar antes de poder avanzar.'
      },
      {
        title: 'TEMES',
        intro: '',
        items: ['Que pase otro año', 'Que sigas sabiendo muchísimo y viviendo prácticamente lo mismo', 'Que esa vida que imaginas siga siendo algo que “algún día” vas a tener'],
        closing: 'Y quizá la pregunta que más pesa es:',
        question: '“¿Y si realmente nunca llego hasta donde sé que podría llegar?”'
      }
    ];
    cards.forEach((card, index) => {
      const data = cardData[index];
      if (!data) return;
      card.classList.add('tgm-four-card');
      card.innerHTML = `
        <h3>${data.title}</h3>
        ${data.intro ? `<p class="tgm-card-intro">${data.intro}</p>` : ''}
        <ul>${data.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        <p class="tgm-card-closing">${data.closing}</p>
        ${data.question ? `<p class="tgm-card-question">${data.question}</p>` : ''}
      `;
    });
  }

  /* 04 — MECANISMO */
  const mechanism = section(3, 'tgm-mechanism');
  if (mechanism) {
    const prose = mechanism.querySelector('.prose');
    const bullets = makeBulletList([
      'Puedes desear una vida extraordinaria conscientemente y seguir tomando decisiones desde creencias que aprendiste hace años.',
      'Puedes querer más dinero y asociarlo con sacrificio.',
      'Puedes querer crecer y asociar el éxito con más presión.',
      'Puedes querer una relación extraordinaria y seguir creyendo que “todos son iguales”.',
      'Puedes querer mostrarte completamente y tener miedo de lo que ocurrirá si dejas de complacer.',
      '<strong>Puedes decir: “Sé que soy capaz.”</strong> Y descubrir en tus decisiones que todavía existe una parte de ti que pregunta: <strong>“¿Pero será posible para mí?”</strong>'
    ]);
    if (prose) prose.insertAdjacentElement('afterend', bullets);
    bullets.insertAdjacentElement('afterend', makeCTA('SÍ, QUIERO ROMPER MI TECHO MENTAL'));
  }

  /* 05 — BIG IDEA */
  const bigIdea = section(4, 'tgm-big-idea');
  if (bigIdea) {
    const subtitle = bigIdea.querySelector('.shell > .serif');
    if (subtitle) subtitle.innerHTML = 'Ese límite invisible es tu <span class="tgm-ceiling">TECHO MENTAL.</span>';
    const prose = bigIdea.querySelector('.prose');
    if (prose) {
      const block = document.createElement('div');
      block.className = 'tgm-evidence-block';
      block.innerHTML = '<p class="tgm-evidence-kicker">LA EVIDENCIA QUE CREAS TERMINA REFORZANDO LO QUE YA CREÍAS.</p>';
      block.appendChild(makeBulletList([
        'Por eso puedes trabajar muchísimo y seguir regresando al mismo punto.',
        'Por eso puedes saber exactamente qué hacer y postergarlo.',
        'Por eso puedes acercarte a algo que deseas y retroceder justo cuando empieza a sentirse real.',
        'Por eso puedes recibir más y después volver al nivel que te resulta familiar.'
      ]));
      prose.insertAdjacentElement('afterend', block);
    }
  }

  /* 06 — EL CAMBIO COMIENZA AQUÍ */
  const change = section(5, 'tgm-change');
  if (change) {
    const prose = change.querySelector('.prose');
    if (prose) {
      prose.innerHTML = `
        <div class="tgm-change-list">
          <p>Empiezas a tomar decisiones que antes te daban miedo.</p>
          <p>Dejas de aceptar lo que en realidad nunca quisiste.</p>
          <p>Te atreves a pedir más.</p>
          <p>A cobrar más.</p>
          <p>A mostrarte más.</p>
          <p>A dejar relaciones, trabajos, hábitos y versiones de ti que ya te quedaron pequeñas.</p>
          <p>Dejas de necesitar garantías para dar cada paso.</p>
        </div>
        <p class="tgm-change-bridge">Y empiezas a construir una cosa que ninguna afirmación puede fabricar por ti:</p>
        <p class="tgm-change-evidence">EVIDENCIA DE QUE ERES CAPAZ DE MÁS.</p>
        <p class="impact tgm-rose-wide">LA VIDA QUE QUIERES EMPIEZA A SENTIRSE POSIBLE ANTES DE EMPEZAR A SENTIRSE NORMAL.</p>
      `;
    }
  }

  /* 07 — HISTORIA */
  const story = section(6, 'tgm-story');
  if (story) {
    const paragraphs = [...story.querySelectorAll('.body-lg p')];
    paragraphs[0]?.classList.add('tgm-story-opening');
    paragraphs[paragraphs.length - 1]?.classList.add('tgm-story-turn');
  }

  /* 09 — DESCUBRIMIENTO */
  const discovery = section(8, 'tgm-discovery');
  if (discovery) {
    splitHeading(
      discovery.querySelector('h2.impact'),
      'EL DÍA QUE ENTENDÍ QUE MI SUBCONSCIENTE ESTABA DIRIGIENDO MUCHO MÁS DE MI VIDA',
      'DE LO QUE YO CREÍA, TODO CAMBIÓ.',
      'tgm-discovery-title'
    );
    const prose = discovery.querySelector('.prose');
    if (prose) {
      const ps = [...prose.querySelectorAll('p')];
      ps.find((p) => p.textContent.includes('Puedes querer una vida nueva'))?.classList.add('tgm-discovery-core');
      ps.find((p) => p.textContent.includes('Tenía que aprender a reconocer'))?.classList.add('tgm-discovery-action');
    }
  }

  /* 10 — LO QUE SÉ AHORA */
  const know = section(9, 'tgm-know');
  if (know) {
    const prose = know.querySelector('.prose');
    if (prose) {
      const list = makeBulletList([
        'Cuando cambia lo que consideras posible, empiezas a ver opciones que antes descartabas.',
        'Cuando cambia lo que consideras merecido, cambian tus estándares.',
        'Cuando cambia lo que consideras seguro, puedes dejar de retroceder frente a lo desconocido.',
        'Cuando cambia quién crees que eres, cambian las decisiones que estás dispuesta a tomar.',
        'Y esas decisiones empiezan a crear evidencia nueva.'
      ]);
      prose.insertAdjacentElement('afterend', list);
      const closing = document.createElement('p');
      closing.className = 'tgm-know-closing';
      closing.textContent = 'Y ESA ES LA CLASE DE CAMBIO QUE QUIERO ENSEÑARTE A CREAR.';
      list.insertAdjacentElement('afterend', closing);
    }
  }

  /* 12 — ABOUT THE METHOD */
  const about = section(11, 'tgm-about');
  if (about) {
    const prose = about.querySelector('.prose');
    if (prose) {
      const ps = [...prose.querySelectorAll('p')];
      ps[0]?.classList.add('tgm-about-lead');
      ps[ps.length - 1]?.classList.add('tgm-about-final');
    }
    const flow = about.querySelector('.method + p.serif');
    if (flow) {
      flow.classList.add('tgm-method-flow');
      flow.nextElementSibling?.classList.add('tgm-method-proof');
    }
  }

  /* 13 — TODO LO QUE RECIBIRÁS */
  const includes = section(12, 'tgm-includes');
  if (includes) {
    const grid = includes.querySelector('.includes');
    if (grid) {
      const showcase = document.createElement('div');
      showcase.className = 'tgm-materials-showcase';
      showcase.innerHTML = `
        <article class="tgm-mockup tgm-mockup--hero"><span class="tgm-mockup__label">THE GUIDE METHOD</span><strong>7 MÓDULOS</strong><small>Manifestación Nivel Experta</small></article>
        <article class="tgm-mockup"><span class="tgm-mockup__label">WORKBOOKS</span><strong>7 GUÍAS</strong><small>Ejercicios de transformación</small></article>
        <article class="tgm-mockup"><span class="tgm-mockup__label">COACHING</span><strong>8 LLAMADAS</strong><small>En vivo y grupales</small></article>
        <article class="tgm-mockup"><span class="tgm-mockup__label">PRÁCTICAS</span><strong>AUDIO + HIPNOSIS</strong><small>Breathwork, meditaciones y visualizaciones</small></article>
        <article class="tgm-mockup"><span class="tgm-mockup__label">COMUNIDAD</span><strong>TGM COLLECTIVE</strong><small>Acompañamiento privado</small></article>
      `;
      grid.insertAdjacentElement('beforebegin', showcase);
      [...grid.querySelectorAll('.include h3')].forEach((heading, index) => {
        heading.innerHTML = `<span class="tgm-deliverable-index">${String(index + 1).padStart(2, '0')}</span>${heading.textContent.replace(/^\s*[^\p{L}\p{N}]*/u, '')}`;
      });
    }
    const lifetime = includes.querySelector('.center[style*="margin-top"]');
    if (lifetime) {
      lifetime.querySelector('h3')?.classList.add('tgm-lifetime-title');
      const ps = [...lifetime.querySelectorAll('p')];
      ps[ps.length - 1]?.classList.add('tgm-lifetime-final');
    }
  }

  /* 14 — BONOS */
  const bonuses = section(13, 'tgm-bonuses');
  if (bonuses) {
    splitHeading(
      bonuses.querySelector('h2.impact'),
      'ENTRA AHORA Y RECIBE MÁS DE',
      '$1,000 USD EN BONOS.',
      'tgm-bonuses-title'
    );
    bonuses.querySelector('.prose p')?.classList.add('tgm-bonus-intro');
    [...bonuses.querySelectorAll('.bonus')].forEach((card, index) => {
      const heading = card.querySelector('h3');
      if (heading) {
        const clean = heading.textContent.replace(/^\s*[^\p{L}\p{N}]*/u, '').replace(/^BONUS\s*\d+\s*[·.-]?\s*/i, '');
        heading.innerHTML = `<span class="tgm-bonus-badge">BONUS ${String(index + 1).padStart(2, '0')}</span>${clean}`;
      }
    });
  }

  /* 15 — PRUEBA SOCIAL */
  const social = section(14, 'tgm-social-proof');
  if (social) {
    const shell = social.querySelector('.shell');
    if (shell) {
      const intro = document.createElement('p');
      intro.className = 'tgm-social-intro';
      intro.textContent = 'No son promesas mías. Son mujeres que, igual que tú, un día dudaron.';
      const grid = document.createElement('div');
      grid.className = 'tgm-testimonials';
      ['“Yo ya había trabajado muchísimo en mí.”', '“Me costaba ser constante.”', '“Sabía qué hacer pero no accionaba.”', '“No confiaba en mí.”'].forEach((objection) => {
        const card = document.createElement('article');
        card.innerHTML = `<strong>${objection}</strong><span>Testimonio real pendiente de integrar</span>`;
        grid.appendChild(card);
      });
      const closing = document.createElement('p');
      closing.className = 'tgm-social-closing';
      closing.textContent = 'Ninguna empezó “lista”. Todas tenían miedo, dudas y mil razones para posponerlo. Pero decidieron creer.';
      const heading = shell.querySelector('h2');
      heading?.insertAdjacentElement('afterend', intro);
      shell.append(grid, closing, makeCTA('YO TAMBIÉN QUIERO ESTAR DEL OTRO LADO'));
    }
  }

  /* 16 — FAQ */
  const faq = section(15, 'tgm-faq');
  if (faq) {
    const container = faq.querySelector('.faq');
    if (container) {
      const note = document.createElement('p');
      note.className = 'tgm-faq-note';
      note.textContent = 'Preguntas honestas antes de decidir.';
      container.querySelector('h2')?.insertAdjacentElement('afterend', note);
      const extraItems = [
        ['Ya lo intenté todo.', 'Este no es otro gasto en la pila: es un proceso pensado para ordenar, integrar y convertir en decisiones todo lo que ya has trabajado.'],
        ['¿Necesito experiencia previa en manifestación o espiritualidad?', 'No. El programa te guía paso a paso, desde lo básico hasta lo avanzado. Tu ambición y tus ganas de cambio son lo único que necesitas.'],
        ['¿Qué pasa si no veo resultados?', 'Tienes una garantía de satisfacción de 21 días, sujeta a las condiciones de participación y a la política de garantía del programa.'],
        ['¿Qué pasa después de los 2 meses?', 'Mantienes el acceso de por vida al contenido y a la comunidad TGM Collective, para seguir aplicando y profundizando.'],
        ['¿Y si no tengo tiempo?', 'Cada módulo está diseñado para evitar que sigas dando vueltas en círculos y puedas avanzar con una ruta clara.'],
        ['¿Y si no tengo el dinero ahora?', 'Existe un plan de pago flexible. Puedes elegir la opción que mejor se adapte a tu momento.']
      ];
      extraItems.forEach(([question, answer]) => {
        if ([...container.querySelectorAll('summary')].some((summary) => summary.textContent.trim() === question)) return;
        const details = document.createElement('details');
        details.innerHTML = `<summary>${question}</summary><p>${answer}</p>`;
        container.appendChild(details);
      });
    }
  }

  /* 17 — PRECIO + COMPARACIÓN */
  const investment = section(16, 'tgm-investment');
  if (investment) {
    const guarantee = investment.querySelector('.guarantee');
    if (guarantee) {
      const comparison = document.createElement('div');
      comparison.className = 'tgm-comparison';
      comparison.innerHTML = `
        <h3>Lo que obtienes, comparado con lo demás:</h3>
        <div class="tgm-comparison-grid">
          <div class="tgm-comparison-row"><strong>Coach 1:1</strong><span>Acompañamiento, sin sistema ni comunidad.</span><em>$30,000–90,000 MXN por proceso</em></div>
          <div class="tgm-comparison-row"><strong>Otro curso más barato</strong><span>Información. Ya tienes la pila; ninguno aterrizó todo.</span><em>$300–3,000 MXN cada uno</em></div>
          <div class="tgm-comparison-row"><strong>Terapia</strong><span>Trabaja el pasado; no está diseñada para construir hacia adelante.</span><em>$3,500–8,000 MXN al mes</em></div>
          <div class="tgm-comparison-row"><strong>Hacer nada</strong><span>Otro año en modo lucha.</span><em>Impagable</em></div>
          <div class="tgm-comparison-row tgm-comparison-row--featured"><strong>The Guide Method</strong><span>Sistema + coaching grupal + acompañamiento + 8 semanas.</span><em>$997 USD</em></div>
        </div>
      `;
      guarantee.insertAdjacentElement('beforebegin', comparison);
    }
  }

  /* 18 — CIERRE */
  const close = section(17, 'tgm-close');
  if (close) {
    const eyebrow = close.querySelector('.shell > .eyebrow');
    if (eyebrow) eyebrow.textContent = 'UNA SOLA DECISIÓN';
    splitHeading(
      close.querySelector('h2.impact'),
      'IMAGINA DÓNDE PODRÍAS ESTAR DENTRO DE UN AÑO',
      'SI HOY DEJARAS DE ASUMIR QUE TUS LÍMITES ACTUALES SON PERMANENTES.',
      'tgm-close-title'
    );
    const extraordinary = close.querySelector('.shell > p.serif');
    if (extraordinary) extraordinary.classList.add('tgm-extraordinary');
    const prose = close.querySelector('.prose');
    if (prose) {
      prose.classList.add('tgm-close-copy');
      const first = prose.querySelector('p');
      if (first) {
        const life = document.createElement('div');
        life.className = 'tgm-life-list';
        ['Dinero', 'Amor', 'Libertad', 'Experiencias', 'Un trabajo que te emocione', 'Relaciones que estén a la altura de lo que deseas', 'Tiempo para disfrutar lo que construyes'].forEach((item) => {
          const span = document.createElement('span');
          span.textContent = item;
          life.appendChild(span);
        });
        first.replaceWith(life);
      }
    }
    const headings = [...close.querySelectorAll('.shell > .impact')];
    headings[1]?.classList.add('tgm-good-enough');
    close.querySelector('.shell > p.serif:not(.tgm-extraordinary)')?.classList.add('tgm-discover');
    const finalStatement = headings[2];
    if (finalStatement) {
      finalStatement.classList.add('tgm-final-statement');
      finalStatement.innerHTML = '<span class="tgm-final-brand">THE GUIDE METHOD</span>TODO CAMBIA CUANDO CAMBIA LO QUE CREES POSIBLE PARA TI.';
    }
    const signoff = close.querySelector('.signoff');
    if (signoff) {
      const postscript = document.createElement('p');
      postscript.className = 'tgm-postscript';
      postscript.textContent = 'P.D. Si estás esperando una señal, es esta. Este puede ser el momento en que tu historia cambia. Y tu futuro yo está mirando este instante, susurrándote: hazlo.';
      signoff.insertAdjacentElement('afterend', postscript);
    }
  }
})();

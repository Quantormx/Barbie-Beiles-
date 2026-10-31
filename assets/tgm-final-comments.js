(() => {
  if (document.documentElement.dataset.tgmFinalComments === 'true') return;
  document.documentElement.dataset.tgmFinalComments = 'true';

  const sections = [...document.querySelectorAll('main > section')];
  const getSection = (index, className) => {
    const node = sections[index];
    if (node && className) node.classList.add(className);
    return node;
  };
  const splitHeading = (node, first, second, className = '') => {
    if (!node) return;
    node.classList.add(className);
    node.innerHTML = `<span class="tgm-final-editorial">${first}</span><span class="tgm-final-impact">${second}</span>`;
  };
  const createList = (items, className = '') => {
    const list = document.createElement('ul');
    list.className = `tgm-final-list ${className}`.trim();
    items.forEach((item) => {
      const li = document.createElement('li');
      if (item instanceof Node) li.append(item);
      else li.textContent = item;
      list.append(li);
    });
    return list;
  };
  const svgIcon = (type) => {
    const icons = {
      modules: '<path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
      workbook: '<path d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M9 4v16M12 9h4M12 13h4"/>',
      coaching: '<path d="M5 18a7 7 0 0 1 14 0"/><circle cx="12" cy="8" r="3"/><path d="M4 11h2v5H4zM18 11h2v5h-2z"/>',
      breath: '<path d="M3 9c4-4 6 4 10 0s6 4 8 0M3 15c4-4 6 4 10 0s6 4 8 0"/>',
      audio: '<path d="M4 14v-4a8 8 0 0 1 16 0v4"/><path d="M4 13h4v6H5a1 1 0 0 1-1-1v-5ZM20 13h-4v6h3a1 1 0 0 0 1-1v-5Z"/>',
      hypnosis: '<path d="M12 3a9 9 0 1 1-6.4 2.7"/><path d="M12 7a5 5 0 1 1-3.5 1.5"/><circle cx="12" cy="12" r="1.2"/>',
      meditation: '<circle cx="12" cy="6" r="2.5"/><path d="M8 20c1-4 7-4 8 0M6 16c4-2 8-2 12 0M9 10l3 4 3-4"/>',
      writing: '<path d="M4 20h5l11-11-5-5L4 15v5Z"/><path d="m13 6 5 5"/>',
      ritual: '<path d="M8 20h8l-1-10H9L8 20Z"/><path d="M12 10c-2-2 1-4 0-7 3 2 4 5 0 7Z"/>',
      playlist: '<path d="M5 6h10M5 10h10M5 14h7"/><path d="M17 14v5M17 14l4-1v5"/><circle cx="15.5" cy="19" r="1.5"/><circle cx="19.5" cy="18" r="1.5"/>',
      toolbox: '<path d="M4 9h16v11H4zM8 9V6h8v3M4 13h16"/><path d="M10 13v2h4v-2"/>',
      community: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-4 3-7 7-7M21 20c0-4-3-7-7-7M8 20c0-4 2-6 4-6s4 2 4 6"/>',
      affirmations: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h5M8 16h7"/>',
      wealth: '<circle cx="12" cy="12" r="8"/><path d="M15 9c-1-2-6-2-6 1 0 4 7 1 7 5 0 3-5 3-7 1M12 6v12"/>',
      collective: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 20c.5-4 3-6 6-6M21 20c-.5-4-3-6-6-6M9 20c.5-3 1.5-5 3-5s2.5 2 3 5"/>',
      millionaire: '<path d="M4 18 8 9l4 6 4-11 4 14"/><path d="M3 20h18"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[type] || icons.modules}</svg>`;
  };

  const hero = getSection(0, 'tgm-final-hero');
  if (hero) {
    hero.querySelector('.hero-copy > .eyebrow')?.remove();
    const title = hero.querySelector('.hero-title');
    if (title) {
      title.classList.add('tgm-final-hero-title');
      title.innerHTML = '<span class="tgm-final-impact">ES HORA DE VIVIR A LA ALTURA DE TODO</span><span class="tgm-final-editorial">LO QUE SABES QUE ES POSIBLE PARA TI.</span>';
    }
    hero.querySelector('.hero-sub')?.classList.add('tgm-final-hero-sub');
    hero.querySelector('.hero-copy > p')?.classList.add('tgm-final-hero-body');
    hero.querySelector('.hero-copy > .cta')?.classList.add('tgm-final-hero-cta');
  }

  const desire = getSection(1, 'tgm-final-desire');
  if (desire) {
    desire.querySelector('.shell > .eyebrow')?.remove();
    splitHeading(desire.querySelector('h2.impact'),'HAY UNA PARTE DE TI QUE SABE QUE…','ESTÁS HECHA PARA MÁS.','tgm-final-desire-title');
    [...desire.querySelectorAll('.stack p')].forEach((item) => {
      if (item.textContent.trim().toLowerCase() === 'más experiencias.') item.remove();
    });
    desire.querySelector('.stack')?.classList.add('tgm-final-desire-list');
    const copy = desire.querySelector('.prose.body-lg');
    if (copy) {
      copy.classList.add('tgm-final-desire-copy');
      [...copy.querySelectorAll('p')].forEach((p) => {
        const text = p.textContent.trim();
        if (text === 'Una vida que no solamente se vea bien. Una vida que se sienta genuinamente tuya.') {
          p.innerHTML = '<span>Una vida que no solamente se vea bien.</span><span>Una vida que se sienta genuinamente tuya.</span>';
          p.classList.add('tgm-final-desire-opening');
        }
        if (text === 'Hay algo dentro de ti que sigue diciendo:') p.classList.add('tgm-final-desire-signal');
        if (text.includes('Mi vida puede ser mucho más')) p.classList.add('tgm-final-desire-quote');
        if (text === 'Y tiene razón.') p.classList.add('tgm-final-desire-truth');
      });
    }
  }

  const gap = getSection(2, 'tgm-final-gap');
  if (gap) {
    gap.querySelector('.shell > .eyebrow')?.remove();
    splitHeading(gap.querySelector('h2.impact'),'Y AUN ASÍ, HAY UNA DISTANCIA ENTRE','LO QUE SABES QUE PUEDES VIVIR Y LO QUE HOY ESTÁS VIVIENDO.','tgm-final-gap-title');
    gap.querySelector('.split')?.classList.add('tgm-final-gap-columns');
    [...gap.querySelectorAll('.split .panel')].forEach((panel) => panel.classList.add('tgm-final-gap-panel'));
    const cards = [...gap.querySelectorAll('.four article')];
    const data = [
      {title:'HAS INTENTADO',items:['Has hecho terapia','Has tomado cursos','Has meditado','Has escrito','Has visualizado','Has trabajado en ti'],closing:'Y tienes muchísimo más conocimiento que hace unos años. Pero sigues preguntándote por qué saber tanto todavía no se traduce en vivir diferente.'},
      {title:'VES',intro:'Ves a otras mujeres crear cosas que tú también quieres.',items:['El negocio','El dinero','La relación','La seguridad','La libertad'],closing:'Y aunque te inspires, a veces aparece esa pregunta incómoda:',question:'“¿Qué tienen ellas que yo todavía no?”'},
      {title:'TE ESFUERZAS',items:['Intentas ser más disciplinada','Más constante','Más positiva','Hacer más','Entender más','Encontrar qué te falta'],closing:'Y terminas agotada de sentir que siempre existe una cosa más que tienes que arreglar antes de poder avanzar.'},
      {title:'TEMES',items:['Que pase otro año','Que sigas sabiendo muchísimo y viviendo prácticamente lo mismo','Que esa vida que imaginas siga siendo algo que “algún día” vas a tener'],closing:'Y quizá la pregunta que más pesa es:',question:'“¿Y si realmente nunca llego hasta donde sé que podría llegar?”'}
    ];
    cards.forEach((card,index)=>{
      const item=data[index]; if(!item)return;
      card.classList.add('tgm-final-gap-card');
      card.innerHTML=`<h3>${item.title}</h3>${item.intro?`<p class="tgm-final-card-intro">${item.intro}</p>`:''}<ul>${item.items.map((text)=>`<li>${text}</li>`).join('')}</ul><p class="tgm-final-card-closing">${item.closing}</p>${item.question?`<p class="tgm-final-card-question">${item.question}</p>`:''}`;
    });
  }

  const mechanism = getSection(3, 'tgm-final-mechanism');
  if (mechanism) {
    mechanism.querySelector('.shell > .eyebrow')?.remove();
    mechanism.querySelector('h2.impact')?.classList.add('tgm-final-mechanism-title');
    mechanism.querySelector('h3.serif')?.classList.add('tgm-final-mechanism-subtitle');
    const prose=mechanism.querySelector('.prose');
    if(prose){
      const paragraphs=[...prose.querySelectorAll('p')].map((p)=>p.textContent.trim());
      const items=paragraphs.slice(0,5);
      if(paragraphs[5]||paragraphs[6])items.push([paragraphs[5],paragraphs[6]].filter(Boolean).join(' '));
      prose.replaceWith(createList(items,'tgm-final-mechanism-list'));
    }
  }

  const bigIdea = getSection(4, 'tgm-final-big-idea');
  if (bigIdea) {
    bigIdea.querySelector('.shell > .eyebrow')?.remove();
    bigIdea.querySelector('h2.impact')?.classList.add('tgm-final-big-title');
    const subtitle=bigIdea.querySelector('.shell > .serif');
    if(subtitle){subtitle.classList.add('tgm-final-ceiling');subtitle.innerHTML='<span>Ese límite invisible es tu</span><strong>TECHO MENTAL.</strong>';}
    bigIdea.querySelector('.cycle')?.classList.add('tgm-final-cycle');
    const prose=bigIdea.querySelector('.prose');
    if(prose){
      const paragraphs=[...prose.querySelectorAll('p')].map((p)=>p.textContent.trim());
      const block=document.createElement('div');block.className='tgm-final-evidence';
      const kicker=document.createElement('p');kicker.className='tgm-final-evidence-kicker';kicker.textContent=paragraphs.shift()||'';
      block.append(kicker,createList(paragraphs,'tgm-final-evidence-list'));prose.replaceWith(block);
    }
    bigIdea.querySelector('.shell > h3.impact')?.classList.add('tgm-final-big-closing');
  }

  const change = getSection(5, 'tgm-final-change');
  if(change){
    change.querySelector('.shell > .eyebrow')?.classList.add('tgm-final-kicker');
    change.querySelector('h2.impact')?.classList.add('tgm-final-change-title');
    const prose=change.querySelector('.prose');
    if(prose){
      const paragraphs=[...prose.querySelectorAll('p')];
      const listItems=[paragraphs[0]?.textContent.trim(),paragraphs[1]?.textContent.trim(),'Te atreves a pedir más.','A cobrar más.','A mostrarte más.',paragraphs[3]?.textContent.trim(),paragraphs[4]?.textContent.trim()].filter(Boolean);
      const list=document.createElement('div');list.className='tgm-final-change-list';
      listItems.forEach((text)=>{const p=document.createElement('p');p.textContent=text;list.append(p);});
      const bridge=paragraphs[5],evidence=paragraphs[6],normal=paragraphs[7];
      if(bridge)bridge.className='tgm-final-change-bridge';if(evidence)evidence.className='tgm-final-change-evidence';if(normal)normal.className='tgm-final-change-normal';
      prose.replaceChildren(list);if(bridge)prose.append(bridge);if(evidence)prose.append(evidence);if(normal)prose.append(normal);
    }
  }

  const story=getSection(6,'tgm-final-story');
  if(story){const paragraphs=[...story.querySelectorAll('.body-lg p')];paragraphs[0]?.classList.add('tgm-final-story-emphasis');paragraphs[paragraphs.length-1]?.classList.add('tgm-final-story-emphasis','tgm-final-story-turn');}
  getSection(7,'tgm-final-beliefs');

  const discovery=getSection(8,'tgm-final-discovery');
  if(discovery){
    discovery.querySelector('.shell > .eyebrow')?.remove();
    splitHeading(discovery.querySelector('h2.impact'),'EL DÍA QUE ENTENDÍ QUE MI SUBCONSCIENTE ESTABA DIRIGIENDO MUCHO MÁS DE MI VIDA','DE LO QUE YO CREÍA, TODO CAMBIÓ.','tgm-final-discovery-title');
    const paragraphs=[...discovery.querySelectorAll('.prose p')];
    paragraphs.find((p)=>p.textContent.includes('Puedes querer una vida nueva'))?.classList.add('tgm-final-discovery-core');
    paragraphs.find((p)=>p.textContent.includes('Tenía que aprender a reconocer'))?.classList.add('tgm-final-discovery-action');
  }

  const know=getSection(9,'tgm-final-know');
  if(know){
    know.querySelector('.shell > .eyebrow')?.remove();
    const heading=know.querySelector('h2.impact');
    if(heading){heading.classList.add('tgm-final-know-title');heading.innerHTML='<span class="tgm-final-know-kicker">TUS CREENCIAS CREAN EL TECHO.</span><span>TUS DECISIONES DECIDEN SI VIVES DEBAJO DE ÉL.</span>';}
    const prose=know.querySelector('.prose');
    if(prose){const paragraphs=[...prose.querySelectorAll('p')];const closing=paragraphs.pop();const list=createList(paragraphs.map((p)=>p.textContent.trim()),'tgm-final-know-list');prose.replaceWith(list);if(closing){closing.className='tgm-final-know-closing';list.insertAdjacentElement('afterend',closing);}}
  }

  getSection(10,'tgm-final-intro');
  const about=getSection(11,'tgm-final-about');
  if(about){
    const paragraphs=[...about.querySelectorAll('.prose p')];paragraphs[0]?.classList.add('tgm-final-about-lead');paragraphs[paragraphs.length-1]?.classList.add('tgm-final-about-closing');
    const flow=about.querySelector('.method + p.serif');
    if(flow){flow.classList.add('tgm-final-method-flow');const steps=flow.textContent.split('→').map((part)=>part.trim()).filter(Boolean);flow.innerHTML=steps.map((step,index)=>`<span class="tgm-final-flow-step"><b>${String(index+1).padStart(2,'0')}</b>${step}</span>`).join('');flow.nextElementSibling?.classList.add('tgm-final-method-proof');}
  }

  const includes=getSection(12,'tgm-final-includes');
  if(includes){
    includes.querySelector('.shell > .eyebrow')?.classList.add('tgm-final-includes-kicker');
    includes.querySelector('.shell > h2.impact')?.classList.add('tgm-final-remove');
    includes.querySelector('.shell > p.serif')?.classList.add('tgm-final-remove');
    includes.querySelector('.shell > .prose')?.classList.add('tgm-final-remove');
    const grid=includes.querySelector('.includes');
    if(grid){
      grid.classList.add('tgm-final-includes-grid');
      const visual=document.createElement('figure');visual.className='tgm-final-materials-visual';visual.innerHTML='<img src="/assets/tgm-materials-mockup.svg" alt="Mockups de módulos, workbooks, coaching, audios, prácticas y comunidad de The Guide Method">';grid.insertAdjacentElement('beforebegin',visual);
      const iconTypes=['modules','workbook','coaching','breath','audio','hypnosis','meditation','writing','ritual','playlist','toolbox','community'];
      [...grid.querySelectorAll('.include')].forEach((card,index)=>{card.classList.add('tgm-final-include-card');const heading=card.querySelector('h3');if(!heading)return;const text=heading.textContent.replace(/^\s*[^\p{L}\p{N}]*/u,'').trim();heading.innerHTML=`<span class="tgm-final-sticker">${svgIcon(iconTypes[index])}</span><span>${text}</span>`;});
    }
    const lifetime=includes.querySelector('.center[style*="margin-top"]');
    if(lifetime){lifetime.classList.add('tgm-final-lifetime');lifetime.querySelector('h3')?.classList.add('tgm-final-lifetime-title');const ps=[...lifetime.querySelectorAll('p')];ps[ps.length-1]?.classList.add('tgm-final-lifetime-proof');}
  }

  const bonuses=getSection(13,'tgm-final-bonuses');
  if(bonuses){
    splitHeading(bonuses.querySelector('h2.impact'),'ENTRA AHORA Y RECIBE MÁS DE','$1,000 USD EN BONOS.','tgm-final-bonuses-title');
    bonuses.querySelector('.prose p')?.classList.add('tgm-final-bonus-intro');
    const iconTypes=['affirmations','wealth','collective','millionaire'];
    [...bonuses.querySelectorAll('.bonus')].forEach((card,index)=>{card.classList.add('tgm-final-bonus-card');const heading=card.querySelector('h3');if(heading){const text=heading.textContent.replace(/^\s*[^\p{L}\p{N}]*/u,'').replace(/^BONUS\s*\d+\s*[·.-]?\s*/i,'').trim();heading.innerHTML=`<span class="tgm-final-bonus-icon">${svgIcon(iconTypes[index])}</span><span class="tgm-final-bonus-number">BONUS ${String(index+1).padStart(2,'0')}</span><span class="tgm-final-bonus-name">${text}</span>`;}card.querySelector('.value')?.classList.add('tgm-final-bonus-value');});
  }

  getSection(14,'tgm-final-social');
  getSection(15,'tgm-final-faq');
  getSection(16,'tgm-final-investment');

  const close=getSection(17,'tgm-final-close');
  if(close){
    const eyebrow=close.querySelector('.shell > .eyebrow');if(eyebrow)eyebrow.textContent='UNA SOLA DECISIÓN';
    splitHeading(close.querySelector('h2.impact'),'IMAGINA DÓNDE PODRÍAS ESTAR DENTRO DE UN AÑO','SI HOY DEJARAS DE ASUMIR QUE TUS LÍMITES ACTUALES SON PERMANENTES.','tgm-final-close-title');
    close.querySelector('.shell > p.serif')?.classList.add('tgm-final-extraordinary');
    const prose=close.querySelector('.prose');
    if(prose){
      const paragraphs=[...prose.querySelectorAll('p')];const first=paragraphs[0];
      if(first){const list=document.createElement('div');list.className='tgm-final-life-list';const intro=document.createElement('p');intro.className='tgm-final-life-intro';intro.textContent='Quiero que tengas';list.append(intro);['Dinero','Amor','Libertad','Experiencias','Un trabajo que te emocione','Relaciones que estén a la altura de lo que deseas','Tiempo para disfrutar lo que construyes'].forEach((item)=>{const span=document.createElement('span');span.textContent=item;list.append(span);});first.replaceWith(list);}
      paragraphs[1]?.classList.add('tgm-final-close-emphasis');paragraphs[2]?.classList.add('tgm-final-close-copy');paragraphs[3]?.classList.add('tgm-final-close-copy');
      const last=paragraphs[4];if(last){last.classList.add('tgm-final-close-desires');last.innerHTML='<span>Puede querer paz y ambición.</span><span>Dinero y propósito.</span><span>Amor y libertad.</span><span>Éxito y una vida que tenga tiempo de disfrutar.</span>';}
    }
    const directImpacts=[...close.querySelectorAll('.shell > .impact')];directImpacts[1]?.classList.add('tgm-final-good-enough');
    const discover=close.querySelector('.shell > p.serif:not(.tgm-final-extraordinary)');if(discover){discover.classList.add('tgm-final-discover');discover.innerHTML='<strong>PUEDES DESCUBRIR</strong><span>QUÉ TAN EXTRAORDINARIA PUEDE LLEGAR A SER.</span>';}
    const finalStatement=directImpacts[2];if(finalStatement){const original=finalStatement.textContent;finalStatement.classList.add('tgm-final-statement');finalStatement.innerHTML=`<span class="tgm-final-brand">THE GUIDE METHOD</span>${original}`;}
  }
})();
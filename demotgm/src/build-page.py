from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
sections=re.findall(r'<section\b[\s\S]*?</section>', (ROOT/'src/content.html').read_text())
hero=sections[0]
heading=re.search(r'<h1[^>]*>(.*?)</h1>',hero,re.S).group(1)
heading=heading.replace('posible para ti.', '<em>posible para ti.</em>')
sub=re.search(r'<h2[^>]*>(.*?)</h2>',hero,re.S).group(1)
paragraph=re.search(r'<p>(.*?)</p>',hero,re.S).group(1)
cta=re.search(r'<a class="cta".*?</a>',hero,re.S).group(0)
photo=re.search(r'<figure.*?</figure>',hero,re.S).group(0)
sections[0]=f'''<section class="hero" id="top">
  <div class="hero-frame">
    <div class="hero-media" aria-hidden="true"><picture><source media="(max-width:700px)" srcset="/demotgm/assets/hero-mobile.webp"><img src="/demotgm/assets/hero.webp" alt="" fetchpriority="high"></picture><video id="hero-film" muted playsinline loop preload="none" poster="/demotgm/assets/hero.webp"></video></div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-copy shell"><div class="eyebrow">The Guide Method <span>by Barbie Beiles</span></div><h1>{heading}</h1>{cta}</div>
    <a class="scroll-cue" href="#el-deseo"><span class="scroll-line" aria-hidden="true"></span>Desliza. Tu siguiente nivel comienza aquí.<span aria-hidden="true">↓</span></a>
    <div class="hero-note" aria-hidden="true">Un nuevo comienzo.<br>Una nueva forma de elegir.</div>
  </div>
  <div class="hero-after shell"><div><span class="eyebrow">El punto de partida</span><h2 class="serif">{sub}</h2><p>{paragraph}</p><a class="text-link" href="#metodo">Explora el método <span aria-hidden="true">↗</span></a></div>{photo}</div>
</section>'''
sections[1]=sections[1].replace('<section ', '<section id="el-deseo" ',1)
groups=[(0,1),(1,3),(3,10),(10,12),(12,14),(14,18)]
names=['El despertar','La brecha','El techo mental','El método','Tu expansión','Tu decisión']
intro=['','Hay una parte de ti que sabe.','Todo cambia desde adentro.','Cinco pasos. Una nueva dirección.','El espacio para sostener tu cambio.','Nos vemos al otro lado.']
ids=['despertar','brecha','techo-mental','el-metodo','tu-expansion','tu-decision']
chapters=[]
for i,(a,b) in enumerate(groups):
    threshold='' if i==0 else f'<div class="chapter-threshold"><span class="chapter-index">0{i+1}</span><div><span class="eyebrow">{names[i]}</span><p>{intro[i]}</p></div><span class="threshold-rule" aria-hidden="true"></span></div>'
    chapters.append(f'<div class="chapter" id="{ids[i]}" data-scene="{i}">{threshold}<div class="chapter-content">'+''.join(sections[a:b])+'</div></div>')
nav=''.join(f'<a href="#{id}" aria-label="Capítulo {i+1}: {names[i]}" data-chapter="{i}"><span>0{i+1}</span><i></i><b>{names[i]}</b></a>' for i,id in enumerate(ids))
checkout='https://pay.hotmart.com/C99222275C?off=415iu72d&checkoutMode=10'
html=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#180b14"><meta name="description" content="The Guide Method de Barbie Beiles. Un proceso guiado para transformar tus creencias, patrones, identidad y decisiones."><meta name="robots" content="noindex,nofollow"><title>The Guide Method — Una nueva posibilidad</title><link rel="preload" href="/demotgm/assets/inter-tight.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/demotgm/assets/hero.webp" as="image"><link rel="stylesheet" href="/demotgm/experience.css?v=20261022"><script defer src="/demotgm/experience.js?v=20261022"></script></head><body>
<a class="skip-link" href="#contenido">Ir al contenido</a>
<div class="ambient" aria-hidden="true"></div><canvas id="world" aria-hidden="true"></canvas><div class="reading-shade" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
<header class="navigation"><a class="brand" href="#top" aria-label="The Guide Method, inicio"><span class="brand-mark">tgm<span>®</span></span><span class="brand-name">THE GUIDE METHOD<small>BY BARBIE BEILES</small></span></a><nav class="desktop-nav" aria-label="Navegación principal"><a href="#metodo">El método</a><a href="#incluye">Qué incluye</a><a href="#inversion">Tu inversión</a></nav><a class="nav-cta" href="{checkout}">Quiero entrar <span aria-hidden="true">↗</span></a><button class="menu-toggle" aria-label="Abrir menú" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span></button></header>
<nav id="mobile-menu" class="mobile-menu" aria-label="Navegación móvil" hidden><a href="#metodo">El método</a><a href="#incluye">Qué incluye</a><a href="#inversion">Tu inversión</a><a href="#top">Volver al inicio</a></nav>
<main id="contenido">{''.join(chapters)}</main>
<footer class="footer shell"><a class="footer-wordmark" href="#top">The Guide Method<span>by Barbie Beiles</span></a><span>Tu siguiente nivel empieza contigo.</span><a class="text-link" href="#top">Volver al inicio ↗</a></footer>
<nav class="chapter-nav" aria-label="Capítulos de la experiencia">{nav}</nav>
<div class="journey-status"><span id="scene-number">01</span><span class="status-divider"></span><span id="scene-name">El despertar</span><span class="loading-state" role="status">Preparando el recorrido</span></div>
<button id="motion-toggle" class="motion-toggle" aria-label="Pausar movimiento" aria-pressed="false"><svg class="pause-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg><svg class="play-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z"/></svg><span>Movimiento</span></button>
<noscript><style>.loading-state,#motion-toggle{{display:none}}.hero-media img{{opacity:1}}</style></noscript>
</body></html>'''
# The brand has no verified registered trademark in the brief.
html=html.replace('tgm<span>®</span>','tgm<span>·</span>')
(ROOT/'index.html').write_text(html)
print(f'Built {len(sections)} content sections in {len(chapters)} scenes.')

"use client";

import {
  ArrowDown,
  ArrowRight,
  Brain,
  Check,
  CircleDot,
  Compass,
  Headphones,
  HeartPulse,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";

const pillars = [
  {
    icon: Compass,
    image: "/pillar-identidad.webp",
    alt: "Mujer observando su reflejo con serenidad",
    number: "01",
    title: "Identidad",
    text: "Dejas de preguntar qué debes hacer y comienzas a elegir desde la mujer que quieres ser.",
  },
  {
    icon: Brain,
    image: "/pillar-reprogramacion.webp",
    alt: "Mujer escuchando una práctica auditiva mientras escribe en su diario",
    number: "02",
    title: "Reprogramación",
    text: "Reconoces las historias y creencias que sostienen tu realidad actual para construir una narrativa más consciente.",
  },
  {
    icon: HeartPulse,
    image: "/pillar-sistema-nervioso.webp",
    alt: "Mujer haciendo una pausa consciente junto al agua",
    number: "03",
    title: "Sistema nervioso",
    text: "Aprendes a relacionarte con la incertidumbre sin volver automáticamente al control, la urgencia o el autosabotaje.",
  },
  {
    icon: Target,
    image: "/pillar-accion-estrategica.webp",
    alt: "Mujer avanzando con determinación a través de un umbral",
    number: "04",
    title: "Acción estratégica",
    text: "Traducimos intención en hábitos, límites y decisiones concretas que sí dependen de ti.",
  },
];

const phases = [
  { days: "Días 1—4", title: "Claridad", text: "Nombras lo que deseas, distingues deseo de presión externa y defines la realidad que quieres construir." },
  { days: "Días 5—8", title: "Identidad", text: "Observas quién estás siendo hoy y comienzas a elegir desde una versión más congruente de ti." },
  { days: "Días 9—12", title: "Regulación", text: "Trabajas la urgencia, el control y la resistencia para crear sin abandonarte durante el proceso." },
  { days: "Días 13—16", title: "Expansión", text: "Elevas tus estándares, entrenas tu atención y conviertes tu visión en decisiones observables." },
  { days: "Días 17—21", title: "Integración", text: "Instalas límites, hábitos y acciones que te permiten sostener la identidad que estás construyendo." },
];

const includes = [
  ["21 lecciones principales", "Un recorrido diario, progresivo y fácil de seguir."],
  ["36 experiencias auditivas", "Cápsulas, meditaciones y audios complementarios."],
  ["Workbook de 21 días", "Escritura guiada para convertir ideas en decisiones."],
  ["Tracker de progreso", "Una forma visual de sostener consistencia y celebrar avance."],
  ["Práctica de acción diaria", "Un paso concreto para llevar cada lección a tu vida."],
  ["Biblioteca de integración", "Herramientas para repetir las prácticas que más necesites."],
];

const fitYes = [
  "Sabes lo que quieres, pero te cuesta sostenerlo sin ansiedad.",
  "Has probado afirmaciones o visualización y necesitas más estructura.",
  "Quieres comprender tus patrones sin quedarte atrapada analizándolos.",
  "Buscas una práctica espiritual que también te lleve a actuar.",
  "Estás lista para dedicarte unos minutos al día durante 21 días.",
];

const fitNo = [
  "Buscas resultados garantizados sin cambiar decisiones o hábitos.",
  "Quieres una fórmula para controlar todo lo que ocurre a tu alrededor.",
  "Necesitas atención médica o psicológica en lugar de un programa educativo.",
];

const faqs = [
  { question: "¿Qué es exactamente El Alquimista?", answer: "Es una experiencia digital de 21 días para trabajar claridad, identidad, regulación emocional básica y acción consciente mediante audios, meditaciones y escritura guiada." },
  { question: "¿Necesito saber de manifestación?", answer: "No. El método parte de experiencias cotidianas y te guía paso a paso. No necesitas conocimientos ni prácticas previas." },
  { question: "¿Cuánto tiempo necesito cada día?", answer: "La experiencia está diseñada como un ritual breve y sostenible. La duración puede variar según el audio y el ejercicio, pero puedes avanzar a tu propio ritmo." },
  { question: "¿Puedo repetir los audios?", answer: "Sí. Las prácticas están pensadas para volver a ellas cuando necesites claridad, regulación o dirección." },
  { question: "¿El programa garantiza dinero, pareja o resultados específicos?", answer: "No. El Alquimista es una experiencia educativa y de desarrollo personal. Trabaja variables que puedes entrenar —atención, narrativa, hábitos y decisiones—, pero los resultados dependen de cada persona, su contexto y sus acciones." },
  { question: "¿Sustituye terapia o atención médica?", answer: "No. El programa no diagnostica, trata ni sustituye atención médica, psicológica o psiquiátrica. Si necesitas apoyo clínico, busca acompañamiento profesional." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="El Alquimista, inicio">
          <span className="brand-monogram">BB</span>
          <span className="brand-lockup"><strong>El Alquimista</strong><small>por Bárbara Beiles</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#diferencia">El enfoque</a><a href="#metodo">El método</a><a href="#barbara">Bárbara</a><a href="#incluye">Qué incluye</a>
        </nav>
        <a className="button button-small button-ivory" href="#oferta">Comenzar <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="inicio">
        <picture className="hero-media">
          <source media="(max-width: 700px)" srcSet="/el-alquimista-editorial-hero-mobile.webp" />
          <img src="/el-alquimista-editorial-hero.webp" alt="Mujer sosteniendo una edición de El Alquimista bajo un cielo luminoso" />
        </picture>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">Manifestación basada en identidad para mujeres latinoamericanas</p>
          <h1>No persigas tu próxima realidad. Conviértete en la mujer capaz de sostenerla.</h1>
          <p className="hero-lead">Una experiencia auditiva de 21 días para transformar un deseo difuso en una visión clara, una práctica diaria y acciones congruentes con la mujer que estás eligiendo ser.</p>
          <div className="hero-actions">
            <a className="button button-rose hero-primary-cta" href="#oferta">
              <span className="cta-label">Comenzar mi transformación</span>
              <span className="cta-orbit" aria-hidden="true"><ArrowRight size={18} /></span>
            </a>
            <a className="listen-link" href="#metodo"><span><Play size={13} fill="currentColor" /></span> Descubrir el método</a>
          </div>
          <div className="hero-proof" aria-label="Resumen del programa">
            <div><strong>21</strong><span>días de práctica</span></div><div><strong>36</strong><span>experiencias auditivas</span></div><div><strong>5</strong><span>fases de transformación</span></div>
          </div>
        </div>
        <div className="hero-edition">Identidad · regulación · hábitos · acción</div>
        <a className="scroll-cue" href="#manifiesto" aria-label="Continuar">Explora el enfoque <ArrowDown size={15} /></a>
      </section>

      <section className="method-ribbon" aria-label="Fundamentos de El Alquimista">
        <span>Identidad</span><CircleDot size={9} /><span>Reprogramación</span><CircleDot size={9} /><span>Sistema nervioso</span><CircleDot size={9} /><span>Hábitos</span><CircleDot size={9} /><span>Acción estratégica</span>
      </section>

      <section className="manifesto-section" id="manifiesto">
        <div className="manifesto-copy">
          <p className="eyebrow">Una definición diferente</p>
          <h2>Manifestar no es esperar. Es entrenar quién eres frente a lo que deseas.</h2>
          <div className="manifesto-columns">
            <p>Tal vez no te falta intención. Te sobra esfuerzo, información y presión por hacerlo perfecto. Pero sigues tomando decisiones desde la urgencia, el miedo o la sensación de no ser suficiente.</p>
            <p>El Alquimista trabaja donde ocurre el cambio sostenible: en la identidad que practicas, la historia que repites, la capacidad de regularte y las acciones que eliges cuando nadie está mirando.</p>
          </div>
          <blockquote>“Tu realidad no cambia sólo porque la visualizas. Empieza a cambiar cuando tú puedes pensar, sentir y actuar de una forma nueva.”</blockquote>
        </div>
      </section>

      <section className="difference-section" id="diferencia">
        <div className="section-heading">
          <div><p className="eyebrow">El enfoque de Bárbara</p><h2>Espiritualidad con estructura. Visión con acción.</h2></div>
          <p>No necesitas elegir entre intuición y estrategia. El método integra ambas para que tu práctica interior se traduzca en una manera distinta de vivir y decidir.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, image, alt, number, title, text }) => (
            <article className="pillar-card" key={title}>
              <div className="pillar-media">
                <img src={image} alt={alt} loading="lazy" />
                <div className="pillar-image-shade" aria-hidden="true" />
                <div className="pillar-top"><span>{number}</span><Icon size={22} /></div>
              </div>
              <div className="pillar-body"><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="method-intro">
          <p className="eyebrow">El método de 21 días</p><h2>Una transformación que puedes comprender, practicar y sostener.</h2>
          <p>Cada fase prepara la siguiente. No acumulas contenido: avanzas con una intención, una práctica y una acción concreta.</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase-card" key={phase.title}><span className="phase-number">0{index + 1}</span><div><small>{phase.days}</small><h3>{phase.title}</h3><p>{phase.text}</p></div></article>
          ))}
        </div>
        <a className="button button-rose phase-cta" href="#oferta">Ver las modalidades <ArrowRight size={16} /></a>
      </section>

      <section className="authority-section" id="barbara">
        <div className="authority-mark" aria-hidden="true"><span>B</span><span>B</span></div>
        <div className="authority-copy">
          <p className="eyebrow">Tu guía</p><h2>Bárbara Beiles</h2><h3>Entrenadora de Identidad y Mindset</h3>
          <p>Bárbara traduce el lenguaje de la manifestación en un proceso cercano para mujeres latinoamericanas: observar quién estás siendo, regular la forma en que respondes y actuar desde una identidad más consciente.</p>
          <p>Su enfoque reúne práctica espiritual, reprogramación, sistema nervioso, hábitos y acción estratégica. No para prometerte una vida sin incertidumbre, sino para enseñarte a construir dirección dentro de ella.</p>
          <div className="authority-principle"><Sparkles size={18} /><span>Manifestación basada en identidad: lo que deseas, la mujer que eliges ser y las acciones que pueden unir ambas.</span></div>
        </div>
      </section>

      <section className="experience-section" id="incluye">
        <div className="experience-copy">
          <p className="eyebrow">La experiencia completa</p><h2>No compras información. Construyes un ritual.</h2>
          <p>La voz de Bárbara te acompaña durante un recorrido íntimo y progresivo. Cada día combina una idea central con reflexión y movimiento para que el método llegue a tu vida, no sólo a tus notas.</p>
          <div className="audio-experience" aria-label="Muestra conceptual de una cápsula de audio">
            <div className="audio-meta"><span>DÍA 01 · IDENTIDAD</span><span>11:42</span></div>
            <h3>La mujer que decide antes de tener evidencia</h3>
            <div className="audio-controls"><button className="main-play" aria-label="Reproducir muestra conceptual"><Play size={20} fill="currentColor" /></button><div className="audio-track"><i /></div><Headphones size={18} /></div>
            <p>Mockup del reproductor · La muestra de audio se integrará en el ecommerce final.</p>
          </div>
        </div>
        <div className="include-list">
          {includes.map(([title, text], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className="fit-section">
        <article className="fit-card fit-yes"><p className="eyebrow">Es para ti si…</p><h2>Quieres dejar de consumir respuestas y empezar a practicar una nueva identidad.</h2><ul>{fitYes.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul></article>
        <article className="fit-card fit-no"><p className="eyebrow">No es para ti si…</p><h2>Buscas una promesa que elimine tu participación en el proceso.</h2><ul>{fitNo.map(item => <li key={item}><X size={17} />{item}</li>)}</ul></article>
      </section>

      <section className="offer-section" id="oferta">
        <div className="offer-heading"><p className="eyebrow">Elige cómo quieres vivirlo</p><h2>El mismo método. Dos niveles de acompañamiento.</h2><p>Empieza con la experiencia que se ajuste mejor a tu forma de avanzar.</p></div>
        <div className="pricing-grid">
          <article className="price-card basic-price-card">
            <div className="price-card-head"><span>EXPERIENCIA AUTOGUIADA</span><h3>El Alquimista</h3><p>Para avanzar de forma íntima, flexible y a tu propio ritmo.</p></div>
            <div className="price-line"><del>$147</del><strong>$97</strong><span>USD</span></div>
            <ul><li><Check size={15} /> 21 lecciones principales</li><li><Check size={15} /> Cápsulas, meditaciones y audios complementarios</li><li><Check size={15} /> Prácticas de escritura guiada</li><li><Check size={15} /> Biblioteca de integración</li><li><Check size={15} /> Acceso personal por definir</li></ul>
            <a className="button button-outline" href="#checkout">Elegir experiencia autoguiada <ArrowRight size={16} /></a>
          </article>
          <article className="price-card featured-price-card">
            <span className="recommended">EXPERIENCIA RECOMENDADA</span>
            <div className="price-card-head"><span>EXPERIENCIA GUIADA</span><h3>El Alquimista Completo</h3><p>Para integrar el método con materiales y acompañamiento grupal.</p></div>
            <div className="price-line"><del>$181</del><strong>$147</strong><span>USD</span></div>
            <ul><li><Check size={15} /> Todo lo incluido en El Alquimista</li><li><Check size={15} /> Workbook de 21 días</li><li><Check size={15} /> Tracker visual de progreso</li><li><Check size={15} /> Calendario de manifestación</li><li><Check size={15} /> Dos sesiones grupales en vivo</li></ul>
            <a className="button button-rose" href="#checkout">Elegir experiencia completa <ArrowRight size={16} /></a>
          </article>
        </div>
        <p className="offer-note">Precios y condiciones ilustrativos para el mockup. La oferta final se confirmará antes del lanzamiento.</p>
      </section>

      <section className="guarantee-section">
        <div className="guarantee-icon"><ShieldCheck size={30} /></div>
        <div><p className="eyebrow">Compra con claridad</p><h2>21 días para vivir el método, no sólo para mirarlo.</h2><p>La propuesta contempla una garantía alineada con la duración de la experiencia. Sus condiciones, proceso de solicitud y restricciones se publicarán de forma transparente antes del lanzamiento.</p></div>
      </section>

      <section className="checkout-section" id="checkout">
        <div className="checkout-copy"><span>TU SIGUIENTE DECISIÓN</span><h2>No necesitas sentirte completamente lista. Necesitas comenzar de forma consciente.</h2><p>En el ecommerce final, esta sección conectará con la pasarela de pago, la creación de tu acceso y la entrega automática del programa.</p><div className="trust-row"><ShieldCheck size={18} /> Pago seguro <LockKeyhole size={17} /> Acceso personal</div></div>
        <div className="checkout-card"><div className="checkout-card-top"><span>Tu experiencia</span><small>RECOMENDADA</small></div><h3>El Alquimista Completo</h3><p>21 días · 36 audios · Workbook · Tracker · Sesiones grupales</p><div className="checkout-total"><span>Total</span><strong>$147 USD</strong></div><button className="button button-rose button-full">Comenzar mis 21 días <ArrowRight size={16} /></button><small>Mockup conceptual: este botón todavía no procesa pagos.</small></div>
      </section>

      <section className="faq-section" id="preguntas">
        <div className="faq-title"><p className="eyebrow">Antes de comenzar</p><h2>Preguntas frecuentes</h2></div>
        <div className="faq-list">{faqs.map((faq, index) => (<details key={faq.question} open={index === 0}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>))}</div>
      </section>

      <section className="final-cta"><p className="eyebrow">El Alquimista</p><h2>Tu próxima realidad comienza con la identidad que practicas hoy.</h2><a className="button button-rose" href="#oferta">Elegir mi experiencia <ArrowRight size={16} /></a></section>

      <footer><div className="footer-brand"><span className="brand-monogram">BB</span><span>EL ALQUIMISTA</span></div><p>Una experiencia de manifestación basada en identidad, regulación y acción consciente por Bárbara Beiles.</p><div className="footer-bottom"><span>© 2026 Bárbara Beiles</span><span>Mockup conceptual · Oferta y condiciones por validar</span></div></footer>
    </main>
  );
}

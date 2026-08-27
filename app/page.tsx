"use client";

import {
  ArrowDown,
  ArrowRight,
  Check,
  Headphones,
  LockKeyhole,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const phases = [
  {
    number: "01",
    days: "Días 1—6",
    title: "Claridad",
    text: "Ordena el ruido, reconoce tu deseo real y convierte lo difuso en una visión que puedas sostener.",
  },
  {
    number: "02",
    days: "Días 7—11",
    title: "Transmutación",
    text: "Observa las creencias y patrones que ya no acompañan a la mujer que estás eligiendo ser.",
  },
  {
    number: "03",
    days: "Días 12—18",
    title: "Expansión",
    text: "Ensaya una identidad más amplia y empieza a tomar decisiones desde ella, hoy.",
  },
  {
    number: "04",
    days: "Días 19—21",
    title: "Integración",
    text: "Aterriza tu visión en prácticas y acciones congruentes que puedan continuar después del programa.",
  },
];

const includes = [
  "21 lecciones de identidad, claridad y acción consciente",
  "10 meditaciones y prácticas guiadas",
  "5 audios de preparación, bienvenida y cierre",
  "Workbook digital para integrar cada etapa",
  "Tracker de 21 días para acompañar tu avance",
  "Acceso durante 12 meses desde cualquier dispositivo",
];

const faqs = [
  {
    question: "¿Necesito saber de manifestación?",
    answer:
      "No. La experiencia parte de situaciones cotidianas y traduce la intención en observación, práctica y acción. No necesitas conocimientos previos.",
  },
  {
    question: "¿Cuánto tiempo necesito al día?",
    answer:
      "La propuesta está diseñada como un ritual breve: un audio y una práctica de integración. Puedes reservar entre 15 y 25 minutos diarios.",
  },
  {
    question: "¿Puedo hacerlo a mi ritmo?",
    answer:
      "Sí. La modalidad autoguiada te permite avanzar a tu ritmo durante 12 meses. La modalidad acompañada suma fechas y encuentros en vivo.",
  },
  {
    question: "¿Esto reemplaza terapia o atención profesional?",
    answer:
      "No. El Alquimista es una experiencia educativa y de desarrollo personal; no sustituye terapia, diagnóstico ni tratamiento médico o psicológico.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Bárbara Beiles, inicio">
          <span className="brand-monogram">BB</span>
          <span className="brand-title">El Alquimista</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#metodo">El método</a>
          <a href="#incluye">Qué incluye</a>
          <a href="#preguntas">Preguntas</a>
        </nav>
        <a className="button button-small button-dark" href="#oferta">
          Comenzar <ArrowRight size={15} />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={14} /> Una experiencia auditiva de 21 días</p>
          <h1>No persigas tu nueva vida. Empieza a construirla desde dentro.</h1>
          <p className="hero-lead">
            Transforma un deseo difuso en una visión clara, una práctica diaria y acciones congruentes con la mujer que estás eligiendo ser.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#oferta">
              Quiero comenzar <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#ritual">
              <span className="play-icon"><Play size={13} fill="currentColor" /></span>
              Escuchar muestra
            </a>
          </div>
          <div className="hero-specs" aria-label="Características del programa">
            <div><strong>36</strong><span>audios</span></div>
            <div><strong>21</strong><span>prácticas</span></div>
            <div><strong>12</strong><span>meses de acceso</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/el-alquimista-hero.png" alt="Composición editorial en tonos ciruela y dorado que representa transformación" />
          <div className="hero-card glass-card">
            <span>Día 01 · Claridad</span>
            <strong>El deseo debajo del deseo</strong>
            <div className="mini-player"><Play size={13} fill="currentColor" /><i /><small>12:48</small></div>
          </div>
          <span className="vertical-label">Bárbara Beiles · 2026</span>
        </div>
        <a className="scroll-cue" href="#manifiesto" aria-label="Continuar">
          Descubre la experiencia <ArrowDown size={15} />
        </a>
      </section>

      <section className="manifesto" id="manifiesto">
        <p className="eyebrow dark-eyebrow">Una forma distinta de manifestar</p>
        <div className="manifesto-grid">
          <h2>Manifestar no es esperar.</h2>
          <div>
            <p className="manifesto-lead">
              Es aprender a verte con honestidad, elegir con intención y actuar en coherencia con aquello que dices querer.
            </p>
            <p>
              El Alquimista no promete que el universo hará el trabajo por ti. Te acompaña a crear las condiciones internas y prácticas para reconocer oportunidades, tomar mejores decisiones y sostener una nueva dirección.
            </p>
          </div>
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="section-heading">
          <div>
            <p className="eyebrow">El recorrido</p>
            <h2>21 días. Cuatro movimientos.</h2>
          </div>
          <p>Una progresión diseñada para pasar de la intención a una identidad que se practica.</p>
        </div>
        <div className="phase-grid">
          {phases.map((phase) => (
            <article className="phase-card" key={phase.number}>
              <div className="phase-top"><span>{phase.number}</span><small>{phase.days}</small></div>
              <div>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-copy">
          <p className="eyebrow dark-eyebrow">Tu ritual diario</p>
          <h2>Escucha. Escribe. Elige. Actúa.</h2>
          <p>
            Cada día combina una pieza de audio con una pregunta o práctica concreta. No se trata de consumir más contenido, sino de crear un espacio para escucharte y responder distinto.
          </p>
          <ul className="tick-list">
            <li><Check size={15} /> Audios breves y profundos</li>
            <li><Check size={15} /> Prácticas aplicables a tu vida real</li>
            <li><Check size={15} /> Un ritmo que puedes sostener</li>
          </ul>
        </div>
        <div className="audio-experience">
          <div className="audio-header">
            <span className="brand-monogram light-monogram">BB</span>
            <span>EL ALQUIMISTA</span>
            <Headphones size={19} />
          </div>
          <div className="audio-body">
            <span className="track-number">DÍA 08 · TRANSMUTACIÓN</span>
            <h3>La identidad que ya no necesitas</h3>
            <p>Observa sin juicio. Elige con intención.</p>
            <button className="main-play" aria-label="Reproducir muestra"><Play size={23} fill="currentColor" /></button>
            <div className="progress"><i /></div>
            <div className="timestamps"><span>04:16</span><span>16:32</span></div>
          </div>
          <div className="daily-prompt">
            <span>Práctica de hoy</span>
            <p>¿Qué versión de ti sigues protegiendo aunque ya no te lleve a donde quieres ir?</p>
          </div>
        </div>
      </section>

      <section className="include-section" id="incluye">
        <div className="include-number">36</div>
        <div className="include-heading">
          <p className="eyebrow">Todo lo que recibes</p>
          <h2>Una experiencia completa, no otra carpeta de audios.</h2>
        </div>
        <div className="include-list">
          {includes.map((item, index) => (
            <div className="include-item" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
              <Check size={16} />
            </div>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <Quote size={32} />
        <blockquote>
          “No buscas convertirte en alguien más. Buscas dejar de traicionar a la mujer que ya sabes que puedes ser.”
        </blockquote>
        <p>— Una idea central de El Alquimista</p>
      </section>

      <section className="offer-section" id="oferta">
        <div className="offer-intro">
          <p className="eyebrow">Elige tu experiencia</p>
          <h2>Tu transformación. Tu ritmo.</h2>
          <p>Comienza de forma autoguiada o suma el acompañamiento de Bárbara y una comunidad privada.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card light-price-card">
            <div>
              <span className="price-tag">AUTOGUIADA</span>
              <h3>El Alquimista</h3>
              <p>La experiencia completa para avanzar a tu ritmo.</p>
            </div>
            <div className="price"><span>$</span>1,290 <small>MXN</small></div>
            <ul>
              <li><Check size={15} /> 36 audios</li>
              <li><Check size={15} /> Workbook + tracker</li>
              <li><Check size={15} /> Acceso por 12 meses</li>
            </ul>
            <a className="button button-outline-dark" href="#checkout">Elegir autoguiada <ArrowRight size={16} /></a>
          </article>
          <article className="price-card featured-price-card">
            <span className="recommended">EXPERIENCIA RECOMENDADA</span>
            <div>
              <span className="price-tag">ACOMPAÑADA</span>
              <h3>El Alquimista · Círculo</h3>
              <p>La experiencia completa con contención y encuentros en vivo.</p>
            </div>
            <div className="price"><span>$</span>2,990 <small>MXN</small></div>
            <ul>
              <li><Check size={15} /> Todo lo de Autoguiada</li>
              <li><Check size={15} /> 2 sesiones en vivo con Bárbara</li>
              <li><Check size={15} /> Comunidad privada por 30 días</li>
            </ul>
            <a className="button button-gold" href="#checkout">Reservar mi lugar <ArrowRight size={16} /></a>
          </article>
        </div>
        <p className="offer-note">Precios y condiciones ilustrativos para este mockup; deberán validarse antes del lanzamiento.</p>
      </section>

      <section className="checkout-section" id="checkout">
        <div className="checkout-copy">
          <span className="checkout-step">ÚLTIMO PASO</span>
          <h2>Estás a una decisión de comenzar.</h2>
          <p>En el ecommerce final, esta sección conectaría con la pasarela de pago y la entrega automática del programa.</p>
          <div className="trust-row"><ShieldCheck size={18} /> Pago seguro <LockKeyhole size={17} /> Acceso personal</div>
        </div>
        <div className="checkout-card">
          <div><span>Tu selección</span><button>Editar</button></div>
          <h3>El Alquimista · Círculo</h3>
          <p>21 días · 36 audios · 2 encuentros</p>
          <div className="checkout-total"><span>Total</span><strong>$2,990 MXN</strong></div>
          <button className="button button-gold button-full">Continuar al pago <ArrowRight size={16} /></button>
          <small>Mockup conceptual: este botón aún no procesa pagos.</small>
        </div>
      </section>

      <section className="faq-section" id="preguntas">
        <div className="faq-title">
          <p className="eyebrow dark-eyebrow">Antes de comenzar</p>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-monogram light-monogram">BB</span><span>EL ALQUIMISTA</span></div>
        <p>Una experiencia de identidad, claridad y acción consciente por Bárbara Beiles.</p>
        <div className="footer-bottom">
          <span>© 2026 Bárbara Beiles</span>
          <span>Mockup conceptual · Contenido, precios y condiciones por validar</span>
        </div>
      </footer>
    </main>
  );
}

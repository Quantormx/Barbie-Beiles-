"use client";

import {
  ArrowDown,
  ArrowRight,
  Brain,
  Check,
  Clock3,
  DollarSign,
  Headphones,
  Heart,
  LockKeyhole,
  Moon,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const truths = [
  ["¿Qué me falta?", "No te falta más esfuerzo. Te falta certeza."],
  ["¿Qué estoy haciendo mal?", "Nada de lo que haces está mal. Estás actuando desde la carencia."],
  ["¿Cómo suelto el control?", "No se suelta con fuerza. Se suelta al actuar desde la certeza."],
  ["¿Por qué le doy tantas vueltas?", "Porque no hay certeza detrás. Con certeza, las vueltas se callan."],
  ["¿En serio tengo lo suficiente?", "No se trata sólo de tener. Se trata de saberlo, y eso se entrena."],
];

const fitYes = [
  "Te pasas noches preguntándote qué te falta.",
  "Ya afirmaste, reprogramaste y leíste, pero algo no se desbloquea.",
  "Quieres soltar el control sin perder el enfoque.",
  "Quieres materializar tus metas sin ansiedad ni agotarte.",
  "Estás lista para pasar de “confiar y ya” a actuar desde la certeza.",
];

const fitNo = [
  "Buscas un truco mágico de una noche, sin trabajo interno.",
  "No estás dispuesta a observar y cambiar tu estado.",
  "Prefieres afirmaciones superficiales sin práctica diaria.",
];

const outcomes = [
  { icon: Sparkles, title: "Desbloquea", text: "tu poder natural para manifestar." },
  { icon: Zap, title: "Conviértete", text: "en un imán de clientes, dinero y oportunidades." },
  { icon: Heart, title: "Recibe", text: "desde la abundancia, no desde la fuerza." },
  { icon: RefreshCw, title: "Suelta", text: "el control y abre espacio para recibir." },
  { icon: Brain, title: "Limpia", text: "resistencias y bloqueos que frenan lo que quieres." },
  { icon: Moon, title: "Calla", text: "las vueltas mentales y recupera la calma." },
  { icon: Sparkles, title: "Alinea", text: "tu energía con las metas que elegiste." },
  { icon: Heart, title: "Encarna", text: "la versión de ti que ya lo tiene todo." },
];

const phases = [
  { days: "Días 1—4", title: "Despierta tu poder manifestador", text: "Cierras la puerta del “¿qué hago mal?”. La certeza empieza." },
  { days: "Días 5—8", title: "Conviértete en un imán", text: "Sueltas el control y te abres a recibir. La certeza se instala." },
  { days: "Días 9—12", title: "Limpia las resistencias", text: "Retiras lo que te bloquea. La mente comienza a callarse." },
  { days: "Días 13—16", title: "Descifra tu poder creador", text: "Te alineas con tu energía. La certeza madura." },
  { days: "Días 17—21", title: "Encarna a la que ya lo tiene todo", text: "Lo vives, no sólo lo entiendes. El método se vuelve tuyo." },
];

const faqs = [
  {
    question: "¿Qué es exactamente El Alquimista?",
    answer: "Es un ritual digital de 21 días compuesto por cápsulas auditivas, meditaciones y ejercicios de escritura para entrenar el estado interno desde el que persigues tus metas.",
  },
  {
    question: "¿Necesito saber de manifestación?",
    answer: "No. El programa parte de situaciones cotidianas y te guía paso a paso. No necesitas conocimientos ni prácticas previas.",
  },
  {
    question: "¿Puedo hacerlo a mi ritmo?",
    answer: "Sí. Recibes una estructura diaria, pero puedes escuchar y repetir las cápsulas conforme a tu propio proceso.",
  },
  {
    question: "¿El programa garantiza resultados económicos?",
    answer: "No. El Alquimista es una experiencia educativa y de desarrollo personal. Los resultados dependen de cada persona, su contexto y las acciones que decida tomar.",
  },
  {
    question: "¿Cómo funciona la garantía?",
    answer: "La propuesta contempla 21 días para recorrer el programa completo. La aplicación final de la garantía estará sujeta a los términos y condiciones publicados en el lanzamiento.",
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
          <a href="#certeza">La certeza</a>
          <a href="#metodo">El método</a>
          <a href="#incluye">Qué incluye</a>
          <a href="#preguntas">Preguntas</a>
        </nav>
        <a className="button button-small button-ivory" href="#oferta">
          Comenzar <ArrowRight size={15} />
        </a>
      </header>

      <section className="hero" id="inicio">
        <picture className="hero-media">
          <source media="(max-width: 700px)" srcSet="/el-alquimista-cenote-mobile.webp" />
          <img src="/el-alquimista-cenote.webp" alt="Cenote rodeado de selva iluminado por el sol" />
        </picture>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">El ritual de 21 días que convierte tu esfuerzo en resultados, empezando por tu certeza interior.</p>
          <h1>Actúa desde la certeza, no desde la carencia.</h1>
          <p className="hero-lead">
            No te falta esfuerzo, ya estás llena de él. Te falta el estado interno que hace que todo ese esfuerzo finalmente se materialice en la vida que sí quieres.
          </p>
          <p className="hero-method">El Alquimista instala esa certeza en ti, en 21 días.</p>
          <div className="hero-actions">
            <a className="button button-pink" href="#oferta">
              Empieza a actuar desde la certeza <ArrowRight size={17} />
            </a>
            <a className="listen-link" href="#producto">
              <span><Play size={13} fill="currentColor" /></span> Conoce el ritual
            </a>
          </div>
          <div className="hero-stats" aria-label="Contenido del ritual">
            <div><strong>21</strong><span>días</span></div>
            <div><strong>21</strong><span>cápsulas</span></div>
            <div><strong>2</strong><span>bonos</span></div>
          </div>
        </div>
        <div className="hero-edition">Ritual de manifestación · Edición 2026</div>
        <a className="scroll-cue" href="#certeza" aria-label="Continuar">
          Descubre el método <ArrowDown size={15} />
        </a>
      </section>

      <section className="night-section" id="certeza">
        <div className="night-marker"><span>02</span><i>:</i><span>00</span><small>A.M.</small></div>
        <div className="night-copy">
          <p className="eyebrow">La escena que conoces demasiado bien</p>
          <h2>Estás despierta otra vez, mirando el techo.</h2>
          <p className="night-question">“¿Qué me falta? ¿Qué estoy haciendo mal? ¿Por qué cuanto más hago, más lejos parece estar?”</p>
          <p>Hoy afirmaste. Pusiste toda tu intención. Hiciste todo lo que te dijeron. Y aun así, antes de dormir, vuelve la misma sensación: “¿De verdad tengo lo suficiente? ¿Y si nunca se materializa?”</p>
          <p>No es falta de técnica. No es falta de esfuerzo. Es que nadie te ha enseñado cómo se siente actuar desde la certeza.</p>
          <div className="certainty-callout">
            <Sparkles size={18} />
            <p><strong>La certeza</strong> es el estado interno de saber que lo que haces sí puede materializarse. De saber que ya tienes lo suficiente.</p>
          </div>
        </div>
      </section>

      <section className="truth-section">
        <div className="section-heading dark-heading">
          <div><p className="eyebrow">Cambia la pregunta</p><h2>Lo que te preguntas vs. la verdad.</h2></div>
          <p>La certeza no aparece porque te obligues a confiar. Se construye cuando aprendes a leer de otra manera lo que ya está pasando dentro de ti.</p>
        </div>
        <div className="truth-list">
          {truths.map(([question, answer], index) => (
            <div className="truth-row" key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{question}</h3>
              <ArrowRight size={18} />
              <p>{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fit-section">
        <article className="fit-card fit-yes">
          <p className="eyebrow">Sí es para ti si…</p>
          <h2>Estás lista para dejar de forzar.</h2>
          <ul>{fitYes.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul>
        </article>
        <article className="fit-card fit-no">
          <p className="eyebrow">No es para ti si…</p>
          <h2>Buscas una solución sin proceso.</h2>
          <ul>{fitNo.map(item => <li key={item}><X size={17} />{item}</li>)}</ul>
        </article>
      </section>

      <section className="product-section" id="producto">
        <div className="product-copy">
          <p className="eyebrow">El Alquimista</p>
          <h2>No es otro “haz más”. Es el entrenamiento de tu estado.</h2>
          <p>Si la certeza es el ingrediente que te falta, El Alquimista es cómo la entrenas durante 21 días.</p>
          <p>Te acompaño con cápsulas auditivas, meditaciones y escritura guiada para pasar de actuar desde la carencia a responder desde la certeza.</p>
          <a className="button button-cacao" href="#metodo">Conocer las 5 fases <ArrowRight size={16} /></a>
        </div>
        <div className="audio-experience" aria-label="Muestra visual de una cápsula de audio">
          <div className="audio-top">
            <span className="brand-monogram dark-monogram">BB</span>
            <span>EL ALQUIMISTA</span>
            <Headphones size={19} />
          </div>
          <div className="audio-art">
            <span>CÁPSULA 01 · LA CERTEZA EMPIEZA</span>
            <h3>El switch que estabas buscando</h3>
            <button className="main-play" aria-label="Reproducir muestra"><Play size={22} fill="currentColor" /></button>
            <div className="progress"><i /></div>
            <div className="timestamps"><span>03:14</span><span>11:42</span></div>
          </div>
          <div className="audio-prompt"><span>Tu práctica</span><p>¿Cómo actuarías hoy si ya supieras que eres suficiente?</p></div>
        </div>
      </section>

      <section className="outcome-section">
        <div className="outcome-title">
          <p className="eyebrow">Lo que experimentarás</p>
          <h2>De la tensión de perseguir a la capacidad de recibir.</h2>
        </div>
        <div className="outcome-grid">
          {outcomes.map(({ icon: Icon, title, text }) => (
            <article key={title}><Icon size={19} /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="method-intro">
          <p className="eyebrow">Tu recorrido</p>
          <h2>21 días. Cinco fases. Un método que se queda contigo.</h2>
          <p>No se trata sólo de entenderlo, sino de practicarlo hasta que la certeza se convierta en una manera nueva de elegir.</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase-card" key={phase.title}>
              <span className="phase-number">0{index + 1}</span>
              <div><small>{phase.days}</small><h3>{phase.title}</h3><p>{phase.text}</p></div>
            </article>
          ))}
        </div>
        <a className="button button-pink phase-cta" href="#oferta">Quiero mi ritual de 21 días <ArrowRight size={16} /></a>
      </section>

      <section className="cost-section">
        <div className="cost-heading">
          <p className="eyebrow">La pregunta incómoda</p>
          <h2>¿Cuánto te ha costado la carencia?</h2>
        </div>
        <div className="cost-grid">
          <article><Clock3 size={22} /><strong>Tiempo</strong><p>Años de “¿qué me falta?” sin una respuesta que cambie tu estado.</p></article>
          <article><DollarSign size={22} /><strong>Dinero</strong><p>Métodos para hacer más que nunca trabajaron el lugar desde el que actúas.</p></article>
          <article><Moon size={22} /><strong>La noche</strong><p>Calma, confianza y seguridad consumidas por las mismas dudas.</p></article>
        </div>
      </section>

      <section className="offer-section" id="oferta">
        <div className="offer-heading">
          <p className="eyebrow">Elige tu experiencia</p>
          <h2>Dos caminos. El mismo punto de partida: tu certeza.</h2>
        </div>
        <div className="pricing-grid" id="incluye">
          <article className="price-card basic-price-card">
            <div className="price-card-head"><span>ENTRENAMIENTO ESENCIAL</span><h3>El Alquimista</h3><p>Para instalar la certeza con una práctica íntima y autoguiada.</p></div>
            <div className="price-line"><del>$147</del><strong>$97</strong><span>USD</span></div>
            <ul>
              <li><Check size={15} /> 21 cápsulas auditivas de manifestación</li>
              <li><Check size={15} /> Meditaciones para cambiar tu mente</li>
              <li><Check size={15} /> Meditaciones de alta frecuencia</li>
              <li><Check size={15} /> Ejercicios de escritura para manifestar</li>
              <li><Sparkles size={15} /> Bono: La Alquimia de tu Poder de Manifestación</li>
              <li><Sparkles size={15} /> Bono: Meditación de la Energía de la Atracción</li>
            </ul>
            <a className="button button-outline" href="#checkout">Empieza con El Alquimista <ArrowRight size={16} /></a>
          </article>

          <article className="price-card featured-price-card">
            <span className="recommended">RECOMENDADO</span>
            <div className="price-card-head"><span>EXPERIENCIA COMPLETA</span><h3>El Alquimista Completo</h3><p>Para recorrer el método con acompañamiento y materiales de integración.</p></div>
            <div className="price-line"><del>$181</del><strong>$147</strong><span>USD</span></div>
            <ul>
              <li><Check size={15} /> Todo lo incluido en El Alquimista</li>
              <li><Check size={15} /> Zoom grupal de integración y preguntas en vivo</li>
              <li><Check size={15} /> Calendario de manifestación descargable</li>
              <li><Check size={15} /> Workbook con ejercicios guiados</li>
            </ul>
            <a className="button button-pink" href="#checkout">Quiero El Alquimista Completo <ArrowRight size={16} /></a>
          </article>
        </div>
        <p className="offer-note">Precios expresados en USD. La oferta, vigencia y condiciones se confirmarán antes del lanzamiento.</p>
      </section>

      <section className="guarantee-section">
        <div className="guarantee-icon"><ShieldCheck size={30} /></div>
        <div>
          <p className="eyebrow">Garantía de 21 días</p>
          <h2>El riesgo es mío. La certeza es tuya.</h2>
          <p>Tienes 21 días completos, los mismos del ritual, para vivirlo de principio a fin. Si al terminar no hubo un cambio real en tu estado, la propuesta contempla la devolución del 100% de tu inversión, conforme a los términos del lanzamiento.</p>
        </div>
      </section>

      <section className="checkout-section" id="checkout">
        <div className="checkout-copy">
          <span>ÚLTIMO PASO</span>
          <h2>Tu esfuerzo nunca fue el problema. Sólo te faltaba la certeza.</h2>
          <p>En el ecommerce final, esta sección conectará con la pasarela de pago y la entrega automática del programa.</p>
          <div className="trust-row"><ShieldCheck size={18} /> Pago seguro <LockKeyhole size={17} /> Acceso personal</div>
        </div>
        <div className="checkout-card">
          <div className="checkout-card-top"><span>Tu selección</span><small>RECOMENDADA</small></div>
          <h3>El Alquimista Completo</h3>
          <p>21 días · Zoom grupal · Calendario · Workbook</p>
          <div className="checkout-total"><span>Total</span><strong>$147 USD</strong></div>
          <button className="button button-pink button-full">Empiezo mi ritual hoy <ArrowRight size={16} /></button>
          <small>Mockup conceptual: este botón todavía no procesa pagos.</small>
        </div>
      </section>

      <section className="faq-section" id="preguntas">
        <div className="faq-title"><p className="eyebrow">Antes de comenzar</p><h2>Preguntas frecuentes</h2></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">El momento es ahora</p>
        <h2>Activa tu poder manifestador desde la certeza.</h2>
        <a className="button button-pink" href="#oferta">Comenzar mis 21 días <ArrowRight size={16} /></a>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-monogram">BB</span><span>EL ALQUIMISTA</span></div>
        <p>Una experiencia de manifestación, certeza y acción consciente por Bárbara Beiles.</p>
        <div className="footer-bottom"><span>© 2026 Bárbara Beiles</span><span>Mockup conceptual · Contenido, testimonios y condiciones por validar</span></div>
      </footer>
    </main>
  );
}

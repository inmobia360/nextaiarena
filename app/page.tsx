import Image from "next/image";

const categories = [
  {
    title: "Productividad y conocimiento",
    description: "Documentos, investigación, reuniones, notas y escritura que convierten tiempo en avance.",
    tags: ["Documentos", "Investigación", "Reuniones"],
    useCase: "Trabajar mejor",
  },
  {
    title: "Contenido, marketing y creatividad",
    description: "Texto, imagen, vídeo, audio y diseño para comunicar mejor y crear con más ritmo.",
    tags: ["Imagen", "Vídeo", "Redes sociales"],
    useCase: "Crear y comunicar",
  },
  {
    title: "Automatización, agentes e integraciones",
    description: "Workflows, agentes y conexiones que hacen que las tareas repetitivas se resuelvan solas.",
    tags: ["Agentes", "Make", "n8n"],
    useCase: "Ahorrar tiempo",
  },
  {
    title: "Ventas, atención al cliente y operaciones",
    description: "Soluciones para captar, responder, organizar y cuidar cada conversación con clientes.",
    tags: ["CRM", "Soporte", "Captación"],
    useCase: "Hacer crecer",
  },
  {
    title: "Desarrollo, datos y tecnología",
    description: "Programación, análisis, bases de datos y construcción de productos para equipos digitales.",
    tags: ["Código", "Datos", "APIs"],
    useCase: "Construir",
  },
];

const signals = [
  ["Descubre", "Encuentra herramientas por el problema que quieres resolver."],
  ["Compara", "Contrasta precio, idioma, integraciones, dificultad y experiencia real."],
  ["Decide", "Participa en temporadas y descubre qué soluciones merecen quedarse."],
];

export default function Home() {
  return (
    <main id="top">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Descubrimiento con criterio · España primero</p>
          <h1>Encuentra la IA<br /><span>que sí te sirve.</span></h1>
          <p className="hero-lead">
            Una arena para descubrir, comparar y probar herramientas de IA con problemas reales, datos claros y la experiencia de una comunidad que las pone a prueba.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#categorias">Explorar categorías <span>↗</span></a>
            <a className="text-link" href="#participa">Quiero presentar una herramienta <span>→</span></a>
          </div>
          <div className="hero-note"><span className="pulse" /> Para equipos, profesionales y personas curiosas</div>
        </div>
        <div className="hero-mark">
          <div className="arena-preview" aria-label="Ejemplo de comparación de herramientas">
            <div className="arena-preview-head"><span className="status-dot" /> Arena de prueba <span className="preview-index">01 / 05</span></div>
            <div className="arena-question">¿Qué herramienta encaja mejor con tu forma de trabajar?</div>
            <div className="tool-row tool-row-winner"><span className="tool-symbol">N</span><span><strong>Notion AI</strong><small>Conocimiento · Equipos</small></span><b>4,8</b></div>
            <div className="tool-row"><span className="tool-symbol tool-symbol-alt">C</span><span><strong>Claude</strong><small>Investigación · Individual</small></span><b>4,6</b></div>
            <div className="preview-footer"><span>Precio</span><span>Privacidad</span><span>Integraciones</span><span>Votos verificados</span></div>
          </div>
          <Image className="hero-mark-icon" src="/brand/Favicon_NextAI_Arena_web.png" alt="" width={150} height={127} priority />
        </div>
      </section>

      <section className="signal-strip" id="como-funciona">
        <div className="shell signal-grid">
          {signals.map(([title, description]) => (
            <div className="signal" key={title}>
              <span className="signal-marker" aria-hidden="true" />
              <div><h2>{title}</h2><p>{description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell" id="categorias">
        <div className="section-heading">
          <div><p className="eyebrow">El mapa inicial</p><h2>Empieza por lo que<br /><em>necesitas hacer.</em></h2></div>
          <p className="section-intro">Cinco categorías para comenzar con foco. Casos de uso, sectores y tecnologías se conectan por debajo para que puedas llegar a la solución desde cualquier ángulo.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.title}>
              <span className="category-kicker">{category.useCase}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="tag-row">{category.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <a href="#participa" className="card-link" aria-label={`Explorar ${category.title}`}>Explorar <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="audience-section section shell" aria-labelledby="audiencia-title">
        <div className="audience-heading"><p className="eyebrow">Una plataforma, dos formas de entrar</p><h2 id="audiencia-title">Elige tu<br /><em>punto de partida.</em></h2></div>
        <div className="audience-grid">
          <article className="audience-card audience-card-business"><span className="audience-label">B2B</span><h3>Para equipos que necesitan decidir mejor.</h3><p>Compara soluciones por impacto, seguridad, integraciones y coste antes de incorporarlas a tu organización.</p><a className="card-link" href="#temporada">Explorar para equipos <span>↗</span></a></article>
          <article className="audience-card audience-card-person"><span className="audience-label">B2C</span><h3>Para personas que quieren avanzar.</h3><p>Encuentra herramientas útiles para aprender, crear, organizarte o construir algo propio, sin perderte entre promesas.</p><a className="card-link" href="#categorias">Explorar para mí <span>↗</span></a></article>
        </div>
      </section>

      <section className="season-section" id="temporada">
        <div className="shell season-layout">
          <div><p className="eyebrow eyebrow-light">Primera edición · 6 semanas</p><h2>La comunidad<br /><span>elige al campeón.</span></h2></div>
          <div className="season-copy"><p>La Founding Season reúne herramientas, especialistas y usuarios alrededor de tres categorías prioritarias. El ranking comunitario se calcula con actividad verificada. La publicidad siempre se muestra como publicidad.</p><a className="button button-light" href="#participa">Conoce la temporada <span>↗</span></a></div>
        </div>
      </section>

      <section className="participate shell" id="participa">
        <div className="participate-inner"><p className="eyebrow">El siguiente movimiento</p><h2>¿Qué quieres<br /><em>descubrir?</em></h2><p>Estamos preparando el primer catálogo. Únete para recibir acceso a la Founding Season y ayudar a decidir qué herramientas merecen estar aquí.</p><div className="participate-actions"><a className="button button-primary" href="mailto:hola@nextaiarena.com">Quiero estar al tanto <span>↗</span></a><a className="text-link" href="mailto:marcas@nextaiarena.com">Soy una marca o especialista <span>→</span></a></div></div>
      </section>
    </main>
  );
}

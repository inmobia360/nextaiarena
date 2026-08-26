import Image from "next/image";

const categories = [
  {
    number: "01",
    title: "Productividad y conocimiento",
    description: "Documentos, investigación, reuniones, notas y escritura que convierten tiempo en avance.",
    tags: ["Documentos", "Investigación", "Reuniones"],
  },
  {
    number: "02",
    title: "Contenido, marketing y creatividad",
    description: "Texto, imagen, vídeo, audio y diseño para comunicar mejor y crear con más ritmo.",
    tags: ["Imagen", "Vídeo", "Redes sociales"],
  },
  {
    number: "03",
    title: "Automatización, agentes e integraciones",
    description: "Workflows, agentes y conexiones que hacen que las tareas repetitivas se resuelvan solas.",
    tags: ["Agentes", "Make", "n8n"],
  },
  {
    number: "04",
    title: "Ventas, atención al cliente y operaciones",
    description: "Soluciones para captar, responder, organizar y cuidar cada conversación con clientes.",
    tags: ["CRM", "Soporte", "Captación"],
  },
  {
    number: "05",
    title: "Desarrollo, datos y tecnología",
    description: "Programación, análisis, bases de datos y construcción de productos para equipos digitales.",
    tags: ["Código", "Datos", "APIs"],
  },
];

const signals = [
  ["01", "Descubre", "Encuentra herramientas por el problema que quieres resolver."],
  ["02", "Compara", "Contrasta precio, idioma, integraciones, dificultad y experiencia real."],
  ["03", "Decide", "Participa en temporadas y descubre qué soluciones merecen quedarse."],
];

export default function Home() {
  return (
    <main id="top">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">La arena de las herramientas que mueven el trabajo</p>
          <h1>La IA avanza.<br /><span>Tu criterio también.</span></h1>
          <p className="hero-lead">
            Descubre, compara y prueba herramientas de IA y automatización que resuelven problemas reales. La comunidad las pone a prueba. Tú decides cuál merece quedarse.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#categorias">Explorar categorías <span>↗</span></a>
            <a className="text-link" href="#participa">Quiero presentar una herramienta <span>→</span></a>
          </div>
          <div className="hero-note"><span className="pulse" /> España como punto de partida · Comunidad B2B y B2C</div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <Image src="/brand/Favicon_NextAI_Arena_web.png" alt="" width={420} height={340} priority />
        </div>
      </section>

      <section className="signal-strip" id="como-funciona">
        <div className="shell signal-grid">
          {signals.map(([number, title, description]) => (
            <div className="signal" key={number}>
              <span className="signal-number">{number}</span>
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
            <article className="category-card" key={category.number}>
              <span className="category-number">{category.number}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="tag-row">{category.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <a href="#participa" className="card-link" aria-label={`Explorar ${category.title}`}>Explorar <span>↗</span></a>
            </article>
          ))}
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

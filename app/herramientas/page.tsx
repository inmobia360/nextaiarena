import ToolsBrowser from "./tools-browser";

export const metadata = {
  title: "Explorar herramientas",
  description: "Encuentra herramientas de IA por necesidad, audiencia y categoría.",
};

export default function ToolsPage() {
  return (
    <main className="catalog-page">
      <section className="catalog-intro shell">
        <p className="eyebrow">El catálogo de la arena</p>
        <h1>Encuentra una herramienta<br /><span>para tu próximo avance.</span></h1>
        <p className="hero-lead">Busca por lo que quieres conseguir, no por la tecnología que todavía no conoces.</p>
      </section>
      <ToolsBrowser />
    </main>
  );
}

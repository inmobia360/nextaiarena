"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Category = { id: string; slug: string; name: string };
type Tool = { id: string; slug: string; name: string; vendorName: string; description: string; officialUrl: string; category: string | null; difficulty: string | null };

export default function ToolsBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");

  const loadTools = useCallback(async (nextQuery: string, nextCategory: string, nextAudience: string) => {
    setStatus("loading");
    const params = new URLSearchParams({ pageSize: "12" });
    if (nextQuery) params.set("query", nextQuery);
    if (nextCategory) params.set("category", nextCategory);
    if (nextAudience) params.set("audience", nextAudience);
    try {
      const response = await fetch(`/api/tools?${params}`);
      if (!response.ok) throw new Error("catalog-unavailable");
      const result = await response.json() as { data: Tool[] };
      setTools(result.data);
      setStatus(result.data.length ? "ready" : "empty");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetch("/api/categories").then((response) => response.ok ? response.json() : Promise.reject()).then((result: { data: Category[] }) => setCategories(result.data)).catch(() => setCategories([]));
    const timer = window.setTimeout(() => void loadTools("", "", ""), 0);
    return () => window.clearTimeout(timer);
  }, [loadTools]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadTools(query, category, audience);
  }

  return (
    <section className="catalog-browser shell" aria-label="Explorar herramientas">
      <form className="catalog-filters" onSubmit={submit}>
        <label className="search-field">Buscar por necesidad<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. automatizar seguimiento de clientes" /></label>
        <label>Categoría<select value={category} onChange={(event) => { setCategory(event.target.value); loadTools(query, event.target.value, audience); }}><option value="">Todas</option>{categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
        <label>Para quién<select value={audience} onChange={(event) => { setAudience(event.target.value); loadTools(query, category, event.target.value); }}><option value="">Todos</option><option value="b2b">Equipos y empresas</option><option value="b2c">Personas y profesionales</option></select></label>
        <button className="button button-primary" type="submit">Buscar <span>↗</span></button>
      </form>

      {status === "loading" && <p className="catalog-message" role="status">Preparando la arena…</p>}
      {status === "error" && <div className="catalog-message catalog-message-highlight"><p className="eyebrow">Catálogo en preparación</p><h2>Estamos conectando las primeras herramientas.</h2><p>La búsqueda estará disponible en cuanto se active el catálogo del MVP.</p><a className="text-link" href="#participa">Avísame cuando esté listo <span>→</span></a></div>}
      {status === "empty" && <div className="catalog-message"><h2>No hemos encontrado coincidencias.</h2><p>Prueba otra necesidad, categoría o audiencia.</p></div>}
      {status === "ready" && <div className="tool-results">{tools.map((tool) => <article className="tool-card" key={tool.id}><p className="category-kicker">{tool.category ?? "Sin categoría"}</p><h2>{tool.name}</h2><p className="tool-vendor">{tool.vendorName}</p><p>{tool.description}</p><a className="card-link" href={`/herramientas/${tool.slug}`}>Ver ficha <span>↗</span></a></article>)}</div>}
    </section>
  );
}

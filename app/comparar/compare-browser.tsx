"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";

type Tool = { slug: string; name: string; vendorName: string; description: string; officialUrl: string; category: string | null; audiences: string[]; difficulty: string | null; languages: string[]; plans: { name: string; amount: string | null; currency: string; billingPeriod: string | null }[] };

export default function CompareBrowser() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slugs = JSON.parse(window.localStorage.getItem("nextai-compare") ?? "[]") as string[];
    if (!slugs.length) { const timer = window.setTimeout(() => setLoading(false), 0); return () => window.clearTimeout(timer); }
    Promise.all(slugs.map((slug) => fetch(`/api/tools/${encodeURIComponent(slug)}`).then((response) => response.ok ? response.json() : Promise.reject()).then((result: { data: Tool }) => result.data)))
      .then(setTools).catch(() => setTools([])).finally(() => setLoading(false));
  }, []);

  function clear() { window.localStorage.removeItem("nextai-compare"); setTools([]); }
  if (loading) return <p className="catalog-message shell" role="status">Preparando la comparación…</p>;
  if (!tools.length) return <div className="catalog-message shell"><h2>Aún no tienes herramientas para comparar.</h2><p>Explora el catálogo y añade hasta cuatro opciones para ver sus diferencias.</p><Link className="button button-primary" href="/herramientas">Explorar herramientas <span>↗</span></Link></div>;

  return <section className="compare-browser shell"><div className="compare-toolbar"><p className="eyebrow">{tools.length} de 4 seleccionadas</p><button className="text-link" type="button" onClick={clear}>Limpiar comparación</button></div><div className="compare-table" style={{ "--compare-columns": tools.length } as CSSProperties}><div className="compare-row compare-row-label"><span>Criterio</span>{tools.map((tool) => <h2 key={tool.slug}>{tool.name}<small>{tool.vendorName}</small></h2>)}</div><div className="compare-row"><span>Categoría</span>{tools.map((tool) => <p key={tool.slug}>{tool.category ?? "Sin información"}</p>)}</div><div className="compare-row"><span>Audiencia</span>{tools.map((tool) => <p key={tool.slug}>{tool.audiences.join(" · ") || "Sin información"}</p>)}</div><div className="compare-row"><span>Dificultad</span>{tools.map((tool) => <p key={tool.slug}>{tool.difficulty ?? "Sin información"}</p>)}</div><div className="compare-row"><span>Idiomas</span>{tools.map((tool) => <p key={tool.slug}>{tool.languages.join(" · ") || "Sin información"}</p>)}</div><div className="compare-row"><span>Planes</span>{tools.map((tool) => <p key={tool.slug}>{tool.plans.length ? tool.plans.map((plan) => `${plan.name}: ${plan.amount ? `${plan.amount} ${plan.currency}` : "Consultar"}`).join(" · ") : "Sin información verificada"}</p>)}</div><div className="compare-row compare-row-action"><span>Acción</span>{tools.map((tool) => <a key={tool.slug} className="card-link" href={tool.officialUrl} target="_blank" rel="noreferrer">Visitar <span>↗</span></a>)}</div></div></section>;
}

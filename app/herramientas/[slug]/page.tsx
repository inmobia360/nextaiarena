import { notFound } from "next/navigation";
import Link from "next/link";
import CompareButton from "@/app/components/compare-button";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categories, toolPlans, tools } from "@/lib/db/schema";

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!db) notFound();
  const { slug } = await params;
  const [tool] = await db.select({ id: tools.id, name: tools.name, vendorName: tools.vendorName, description: tools.description, officialUrl: tools.officialUrl, category: categories.name, audiences: tools.audiences, difficulty: tools.difficulty, languages: tools.languages, lastVerifiedAt: tools.lastVerifiedAt }).from(tools).leftJoin(categories, eq(tools.primaryCategoryId, categories.id)).where(eq(tools.slug, slug)).limit(1);
  if (!tool) notFound();
  const plans = await db.select({ name: toolPlans.name, pricingType: toolPlans.pricingType, amount: toolPlans.amount, currency: toolPlans.currency, billingPeriod: toolPlans.billingPeriod, hasFreeTrial: toolPlans.hasFreeTrial }).from(toolPlans).where(eq(toolPlans.toolId, tool.id));

  return (
    <main className="tool-detail-page">
      <section className="tool-detail shell">
        <Link className="back-link" href="/herramientas">← Volver al catálogo</Link>
        <p className="eyebrow">{tool.category ?? "Herramienta de IA"}</p>
        <h1>{tool.name}</h1>
        <p className="tool-detail-vendor">{tool.vendorName}</p>
        <p className="tool-detail-description">{tool.description}</p>
        <div className="tool-detail-actions"><a className="button button-primary" href={tool.officialUrl} target="_blank" rel="noreferrer">Visitar herramienta <span>↗</span></a><CompareButton slug={slug} /><Link className="text-link" href="/comparar">Ver comparación <span>→</span></Link></div>
        <div className="tool-facts"><div><span>Audiencia</span><strong>{tool.audiences.join(" · ") || "Sin clasificar"}</strong></div><div><span>Dificultad</span><strong>{tool.difficulty ?? "Sin información"}</strong></div><div><span>Idiomas</span><strong>{tool.languages.join(" · ") || "Sin información"}</strong></div><div><span>Verificado</span><strong>{tool.lastVerifiedAt ? new Date(tool.lastVerifiedAt).toLocaleDateString("es-ES") : "Pendiente"}</strong></div></div>
        <section className="tool-plans" aria-labelledby="planes-title"><p className="eyebrow">Información comercial</p><h2 id="planes-title">Planes y prueba</h2>{plans.length ? <div className="plan-grid">{plans.map((plan) => <article className="plan-card" key={plan.name}><h3>{plan.name}</h3><p>{plan.amount ? `${plan.amount} ${plan.currency}` : "Consultar precio"}</p><span>{plan.hasFreeTrial ? "Incluye prueba" : plan.billingPeriod ?? "Sin periodicidad indicada"}</span></article>)}</div> : <p className="tool-empty">Todavía no hay información de planes verificada.</p>}</section>
      </section>
    </main>
  );
}

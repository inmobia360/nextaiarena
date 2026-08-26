import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categories, toolPlans, tools } from "@/lib/db/schema";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!db) return NextResponse.json({ error: "Catálogo no configurado todavía." }, { status: 503 });
  const { slug } = await params;
  try {
    const [tool] = await db.select({ id: tools.id, slug: tools.slug, name: tools.name, vendorName: tools.vendorName, description: tools.description, officialUrl: tools.officialUrl, logoUrl: tools.logoUrl, category: categories.name, audiences: tools.audiences, difficulty: tools.difficulty, languages: tools.languages, lastVerifiedAt: tools.lastVerifiedAt })
      .from(tools).leftJoin(categories, eq(tools.primaryCategoryId, categories.id)).where(eq(tools.slug, slug)).limit(1);
    if (!tool) return NextResponse.json({ error: "Herramienta no encontrada." }, { status: 404 });
    const plans = await db.select({ name: toolPlans.name, pricingType: toolPlans.pricingType, amount: toolPlans.amount, currency: toolPlans.currency, billingPeriod: toolPlans.billingPeriod, hasFreeTrial: toolPlans.hasFreeTrial }).from(toolPlans).where(eq(toolPlans.toolId, tool.id));
    return NextResponse.json({ data: { ...tool, plans } });
  } catch {
    return NextResponse.json({ error: "No se ha podido cargar la herramienta." }, { status: 500 });
  }
}

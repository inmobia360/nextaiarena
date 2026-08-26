import { NextResponse } from "next/server";
import { and, arrayContains, eq, ilike, or } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categories, tools } from "@/lib/db/schema";
import { toolsQuerySchema } from "@/lib/validation/tools";

export async function GET(request: Request) {
  const parsed = toolsQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Los filtros no son válidos.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  if (!db) {
    return NextResponse.json({ error: "Catálogo no configurado todavía." }, { status: 503 });
  }

  const { query, category, audience, page, pageSize } = parsed.data;
  const filters = [eq(tools.status, "published")];
  if (category) filters.push(eq(categories.slug, category));
  if (audience) filters.push(or(arrayContains(tools.audiences, [audience]), arrayContains(tools.audiences, ["both"]))!);
  if (query) filters.push(or(ilike(tools.name, `%${query}%`), ilike(tools.description, `%${query}%`))!);

  try {
    const data = await db.select({ id: tools.id, slug: tools.slug, name: tools.name, vendorName: tools.vendorName, description: tools.description, officialUrl: tools.officialUrl, logoUrl: tools.logoUrl, category: categories.name, audiences: tools.audiences, difficulty: tools.difficulty })
      .from(tools).leftJoin(categories, eq(tools.primaryCategoryId, categories.id)).where(and(...filters)).limit(pageSize).offset((page - 1) * pageSize);
    return NextResponse.json({ data, pagination: { page, pageSize, hasNextPage: data.length === pageSize } });
  } catch {
    return NextResponse.json({ error: "No se han podido cargar las herramientas." }, { status: 500 });
  }
}

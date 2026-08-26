import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categories } from "@/lib/db/schema";

export async function GET() {
  if (!db) {
    return NextResponse.json({ error: "Catálogo no configurado todavía." }, { status: 503 });
  }

  try {
    const data = await db.select({ id: categories.id, slug: categories.slug, name: categories.name, description: categories.description })
      .from(categories).where(eq(categories.active, true)).orderBy(asc(categories.displayOrder));
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "No se han podido cargar las categorías." }, { status: 500 });
  }
}

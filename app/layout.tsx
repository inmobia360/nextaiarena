import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "NextAI Arena | Descubre la IA que merece quedarse",
    template: "%s | NextAI Arena",
  },
  description:
    "Descubre, compara y prueba herramientas de IA y automatización para tu trabajo, tu negocio y tus proyectos.",
  applicationName: "NextAI Arena",
  keywords: ["herramientas de IA", "automatización", "agentes de IA", "productividad"],
  openGraph: {
    title: "NextAI Arena",
    description: "La comunidad para descubrir qué herramientas de IA merecen quedarse.",
    siteName: "NextAI Arena",
    locale: "es_ES",
    type: "website",
    images: ["/brand/Logo_NextAI_Arena_light.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextAI Arena",
    description: "Descubre, compara y prueba herramientas de IA.",
    images: ["/brand/Logo_NextAI_Arena_light.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <a className="brand" href="#top" aria-label="NextAI Arena, inicio">
              <Image
                className="brand-logo brand-logo-light"
                src="/brand/Logo_NextAI_Arena_light.png"
                alt="NextAI Arena"
                width={420}
                height={150}
                priority
              />
              <Image
                className="brand-logo brand-logo-dark"
                src="/brand/Logo_NextAI_Arena_dark.png"
                alt="NextAI Arena"
                width={420}
                height={150}
                priority
              />
            </a>
            <nav className="main-nav" aria-label="Navegación principal">
              <a href="#categorias">Categorías</a>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#temporada">Founding Season</a>
            </nav>
            <a className="button button-small button-outline" href="#participa">
              Participa
            </a>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>© 2026 NextAI Arena</span>
            <span>España primero. Diseñado para crecer.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

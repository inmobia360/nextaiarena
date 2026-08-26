import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextAI Arena",
    short_name: "NextAI Arena",
    description: "Descubre, compara y prueba herramientas de IA.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fe",
    theme_color: "#0e1637",
    icons: [{ src: "/brand/Favicon_NextAI_Arena_web.png", sizes: "558x473", type: "image/png" }],
  };
}

import CompareBrowser from "./compare-browser";

export const metadata = { title: "Comparar herramientas", description: "Compara herramientas de IA con criterios claros." };

export default function ComparePage() {
  return <main className="compare-page"><section className="catalog-intro shell"><p className="eyebrow">Decide con contexto</p><h1>Compara antes<br /><span>de elegir.</span></h1><p className="hero-lead">Pon lado a lado hasta cuatro herramientas y revisa la información que importa para tu caso.</p></section><CompareBrowser /></main>;
}

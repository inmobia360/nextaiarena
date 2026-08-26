"use client";

import { useState } from "react";

export default function CompareButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  function addToCompare() {
    const current = JSON.parse(window.localStorage.getItem("nextai-compare") ?? "[]") as string[];
    if (!current.includes(slug) && current.length < 4) current.push(slug);
    window.localStorage.setItem("nextai-compare", JSON.stringify(current));
    setAdded(true);
  }

  return <button className="button button-outline" type="button" onClick={addToCompare} disabled={added}>{added ? "Añadida a comparar" : "Añadir a comparar"}</button>;
}

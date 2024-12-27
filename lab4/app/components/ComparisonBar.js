"use client";
import { getComparisonList } from "../utils/comparison";
import { useState, useEffect } from "react";

export default function ComparisonBar() {
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    setComparisonList(getComparisonList());
  }, []);

  if (comparisonList.length === 0) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, background: "#f1f1f1", width: "100%", padding: "10px", textAlign: "center" }}>
      {comparisonList.map((pokemon) => (
        <span key={pokemon.name}>
          {pokemon.name}{" "}
        </span>
      ))}
      <a href="/compare">Przejdź do porównania</a>
    </div>
  );
}

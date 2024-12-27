"use client";
import { getComparisonList, clearComparisonList } from "../../utils/comparison";
import { useState, useEffect } from "react";

export default function ComparePage() {
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    setComparisonList(getComparisonList());
  }, []);

  if (comparisonList.length === 0) {
    return <p>Dodaj Pokemony do porównania!</p>;
  }

  function handleClearComparison() {
    clearComparisonList();
    setComparisonList([]);
  }

  return (
    <div>
      <h1>Porównanie Pokemonów</h1>
      <button onClick={handleClearComparison}>Wyczyść porównanie</button>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {comparisonList.map((pokemon) => (
          <div key={pokemon.name}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Typy: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
            <p>Wzrost: {pokemon.height}</p>
            <p>Waga: {pokemon.weight}</p>
            <ul>
              Statystyki:{" "}
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { getComparisonList, clearComparisonList, removeFromComparisonList } from "../../utils/comparison";
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

  const handleRemove = (name) => {
    removeFromComparisonList(name);
    setComparisonList(getComparisonList());
  };

  return (
    <div>
      <h1>Porównanie Pokemonów</h1>
      <div>
        {comparisonList.map((pokemon) => (
          <div key={pokemon.name}>
            <h2><a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a></h2>
            <div>
              <div>
                <p>ID: {pokemon.id}</p>
                <p>Typy: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
                <p>Wzrost: {pokemon.height}</p>
                <p>Waga: {pokemon.weight}</p>
              </div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <ul>
                <p>Statystyki:{" "}</p>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => handleRemove(pokemon.name)}>Usuń z porównania</button>
          </div>
        ))}
      </div>
      <button onClick={handleClearComparison}>Wyczyść porównanie</button>
    </div>
  );
}

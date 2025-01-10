"use client";
import { getComparisonList, removeFromComparisonList } from "../../utils/comparison";
import { useState, useEffect } from "react";

export default function PokemonCompare() {
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    setComparisonList(getComparisonList());
  }, [])

  if (comparisonList.length === 0) return null;
  
  const handleRemove = (name) => {
    removeFromComparisonList(name);
    setComparisonList(getComparisonList());
  };

  return (
    <section>
      {comparisonList.map((pokemon) => (
        <span key={pokemon.name}>
          <div>
            <a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a>
            <button onClick={() => handleRemove(pokemon.name)}>X</button>
          </div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </span>
      ))}
      <div onClick={() => window.location.href='/compare'}> 
        <a>Przejdź</a>
        <a>do</a>
        <a>porównania</a>
      </div>
    </section>
  );
}

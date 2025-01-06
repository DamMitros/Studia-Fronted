"use client";
import { getComparisonList, addToComparisonList, removeFromComparisonList } from "../../utils/comparison";
import { getFavorites, addFavorite, removeFavorite } from "../../utils/favorites";
import { useState, useEffect } from "react";

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);
  const [comparisonList, setComparisonList] = useState([]);
  const [comparisonMessage, setComparisonMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getFavorites());
      setComparisonList(getComparisonList());
    }
  }, []);

  function handleClick(event) {
    const details = event.currentTarget.nextElementSibling;
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  }

  function handleFavoritesChange() {
    if (favorites.includes(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
    window.location.reload();
  }

  function handleComparisonChange() {
    if (comparisonList.some((p) => p.name === pokemon.name)) {
      removeFromComparisonList(pokemon.name);
      window.location.reload();
    } else {
      const result = addToComparisonList(pokemon);
      if (result.success) {
        setComparisonMessage("");
        setComparisonList(getComparisonList());
        window.location.reload();
      } else {
        setComparisonMessage(result.message);
      }
    }
  }

  return (
    <main>
      <div>
        <div onClick={handleClick}>
          <h2>{pokemon.name}</h2>
          <a>ID: {pokemon.id}</a>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <button onClick={handleComparisonChange}>
            {comparisonList.some((p) => p.name === pokemon.name) ? "Usuń z porównania" : "Porównaj"}
          </button>
          <button onClick={handleFavoritesChange}>
            {favorites.includes(pokemon.name) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          </button>
        </div>
        <div style={{ display: 'none' }}>
          <p>Typ: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>Wzrost: {pokemon.height}</p>
          <p>Waga: {pokemon.weight}</p>
          <p>Zdolności: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
        </div>
      </div>
      {comparisonMessage && <a>{comparisonMessage}</a>}
    </main>
  );
}

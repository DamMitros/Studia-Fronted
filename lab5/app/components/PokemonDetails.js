"use client";
import { getComparisonList, addToComparisonList, removeFromComparisonList } from "../../utils/comparison";
import { getFavorites, addFavorite, removeFavorite } from "../../utils/favorites";
import { useState, useEffect } from "react";

import NoteList from "./NoteList";

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);
  const [comparisonList, setComparisonList] = useState([]);
  const [refreshNotes, setRefreshNotes] = useState(false);
  const handleRefreshNotes = () => setRefreshNotes((prev) => !prev);

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
      setFavorites(favorites.filter(fav => fav !== pokemon.name));
    } else {
      addFavorite(pokemon.name);
      setFavorites([...favorites, pokemon.name]);
    }
  }

  function handleComparisonChange() {
    if (comparisonList.some((p) => p.name === pokemon.name)) {
      removeFromComparisonList(pokemon.name);
      setComparisonList(comparisonList.filter(comp => comp.name !== pokemon.name));
    } else {
      addToComparisonList(pokemon);
      setComparisonList([...comparisonList, pokemon]);
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
      <NoteList pokemonId={pokemon.id} refreshNotes={refreshNotes} onEditNote={handleRefreshNotes} />
    </main>
  );
}
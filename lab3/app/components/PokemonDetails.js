// "use client"
// import { getFavorites, removeFavorite, addFavorite } from "../../utils/favorites";

// export default function PokemonDetails({ pokemon }) {
//   let favorites = [];
//   if (typeof window !== "undefined") {
//     favorites = getFavorites();
//   }

//   function handleClick(event) {
//     const details = event.currentTarget.nextElementSibling;
//     details.style.display = details.style.display === 'none' ? 'block' : 'none';
//   }

//   function handleFavoritesChange() {
//     if (favorites.includes(pokemon.name)) {
//       removeFavorite(pokemon.name);
//     } else {
//       addFavorite(pokemon.name);
//     }
//     window.location.reload();
//   }

//   return (
//     <main>
//       <div>
//         <div>
//           <h2>{pokemon.name}</h2>
//           <img src={pokemon.sprites.front_default} alt={pokemon.name} onClick={handleClick} />
//         </div>
//         <div style={{ display: 'none' }}>
//           <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
//           <p>Height: {pokemon.height}</p>
//           <p>Weight: {pokemon.weight}</p>
//         </div>
//       </div>
//       <p>Number: {pokemon.id}</p>
//       <button onClick={handleFavoritesChange}>
//         {favorites.includes(pokemon.name) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
//       </button>
//     </main>
//   );
// }

"use client"
import { useState, useEffect } from "react";
import { getFavorites, removeFavorite, addFavorite } from "../../utils/favorites";

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getFavorites());
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

  return (
    <main>
      <div>
        <div onClick={handleClick}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <a>ID: {pokemon.id}</a>
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
    </main>
  );
}
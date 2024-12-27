"use client";
import { getFavorites, removeFavorite } from "../../utils/favorites";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length > 0) {
    return (
      <ul>
        {favorites.map((pokemon) => (
          <li key={pokemon}>
            <a href={`/pokemon/${pokemon}`}>{pokemon}</a>
            <button onClick={() => removeFavorite(pokemon)}>Usuń z ulubionych</button>
          </li>
        ))}
      </ul>
    );
  }else{
    return <p>Nie masz jeszcze ulubionych Pokemonów. Dodaj kilka!</p>;
  };
};

// "use client";
// import { getFavorites, removeFavorite } from "../../utils/favorites";

// export default function FavoritesPage() {
//   let favorites = [];
//   if (typeof window !== "undefined") {
//     favorites = getFavorites();
//   }

//   if (favorites.length > 0) {
//     return (
//       <ul>
//         {favorites.map((pokemon) => (
//           <li key={pokemon}>
//             <a href={`/pokemon/${pokemon}`}>{pokemon}</a>
//             <button onClick={() => removeFavorite(pokemon)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     );
//   }else{
//     return <p>No favorites yet. Go add some!</p>;
//   };
// };
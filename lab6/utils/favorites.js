export function getFavorites() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }
  return [];
}

export function addFavorite(pokemon) {
  const favorites = getFavorites();
  favorites.push(pokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload()
}

export function removeFavorite(pokemon) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav !== pokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload()
}
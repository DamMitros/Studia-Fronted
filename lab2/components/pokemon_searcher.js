function PokemonSearcher({ search, onSearch }) {
  function handleInputChange(event) {
    const value = event.target.value;
    onSearch(value);
  }

  return (
    <input
      type="text"
      className="search"
      placeholder="Wyszukaj swojego Pokemona"
      value={search}
      onChange={handleInputChange}
    />
  );
}

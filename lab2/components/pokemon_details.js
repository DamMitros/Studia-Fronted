function PokemonDetails({ pokemon }) {
  if (!pokemon) {
    return <div id="pokemonDetails">No Pokemon selected.</div>;
  }

  return (
    <div id="pokemonDetails" onMouseLeave={() => {
      const infoDiv = document.getElementById('pokemon-info');
      infoDiv.style.display = 'none';
    }}>
      <div id="pokemonDetailsContent">
        <h2>{pokemon.name}</h2>
        <img id="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} onClick={() => {
          const infoDiv = document.getElementById('pokemon-info');
          infoDiv.style.display = 'block';
        }}/>
        <p>Number: {pokemon.id}</p>
      </div>
      <div id="pokemon-info" style={{ display: "none" }}>
        <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Stats: {pokemon.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ")}</p>
      </div>
    </div>
  );
}
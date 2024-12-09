function PokemonList({ pokemons, onPokemonDetails }) {
  return (
    <div id="pokemonList">
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} onClick={() => {
            onPokemonDetails(pokemon);
            const divId = document.getElementById('pokemonDetailsContent');
            divId.style.display = 'block'}} >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
function PokemonList({ pokemons, onPokemonDetails }) {
  return (
    <div id="pokemonList">
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} onClick={() => onPokemonDetails(pokemon)} >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
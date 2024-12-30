export default function PokemonList({ pokemons }) {
  return (
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name}>
          <a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a>
        </li>
      ))}
    </ul>
  );
}
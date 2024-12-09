function App() {
  let allPokemons = [];
  let pokemons = [];
  let selectedPokemon = null;
  let search = "";
  let isLoading = false;

  async function getPokemonList() {
    try {
      isLoading = true;
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      if (!response.ok) throw new Error("Doszło do błędu podczas pobierania listy!");
      const data = await response.json();
      allPokemons = data.results;
      pokemons = allPokemons;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
      renderApp();
    }
  };

  async function getPokemonDetails(pokemon) {
    try {
      isLoading = true;
      const response = await fetch(pokemon.url);
      if (!response.ok) throw new Error("Doszło do błędu podczas pobierania szczegółów!");
      selectedPokemon = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
      renderApp();
    }
  };

  function onSearch(searchValue) {
    selectedPokemon = null;
    search = searchValue;
    pokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    renderApp();
  };

  function renderApp() {
    ReactDOM.render(
      <div>
        <PokemonSearcher search={search} onSearch={onSearch} />
        <div id="boxy">
          {isLoading ? <div id="pokemonDetails"><p>Ładowanie...</p></div> : <PokemonList pokemons={pokemons} onPokemonDetails={getPokemonDetails} />}
          {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
        </div>
      </div>, 
      document.getElementById('app')
    );
  }

  React.useEffect(() => {
    getPokemonList();
  }, []);

  return null;
}

ReactDOM.render(<App />, document.getElementById('app'));

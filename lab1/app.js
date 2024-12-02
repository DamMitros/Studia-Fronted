const pokemonlist = document.querySelector(".pokemonList");
const search = document.querySelector(".search");
const detailsContainer = document.querySelector(".pokemonDetails");

async function pokemonList(){
  try{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) throw new Error("Wystąpił błąd w trakcie pobierania listy!");
    const data = await response.json();
    return data.results;
  } catch (error){
    console.error(error);
    alert(error.message);
  }
}

async function pokemonDetails(url){
  try{
    const response = await fetch(url);
    if (!response.ok) throw new Error("Wystąpił błąd w trakcie pobierania szczegółów!");
    const data = await response.json();
    return data;
  } catch (error){
    console.error(error);
    alert(error.message);
  }
}

async function showPokemonList(){
  try{
    const pokemons = await pokemonList();
    if (!pokemons) return;
    pokemons.forEach((pokemon) => { 
      const itemlist = document.createElement("li");
      itemlist.textContent = pokemon.name;

      itemlist.addEventListener("click", async () => {
        const details = await pokemonDetails(pokemon.url);
        if (details) showPokemonDisplay(details);
      });

      pokemonlist.appendChild(itemlist);
    });
  } catch (error){
    console.error(error);
    alert(error.message);
  }
};

function showPokemonDisplay(details){
  try{
    detailsContainer.innerHTML= `
    <h2>${details.name}</h2>
    <img id="pokemon-image" src="${details.sprites.front_default}" alt="${details.name}">
    <p>Number: ${details.id}</p>
    </div>
    <div id="pokemon-info" style="display: none;">
      <p>Types: ${details.types.map((type) => type.type.name).join(", ")}</p>
      <p>Height: ${details.height}</p>
      <p>Weight: ${details.weight}</p>
      <p>Stats: ${details.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ")}</p>`
  
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonInfo = document.getElementById("pokemon-info");
  
    pokemonImage.addEventListener("click", () => {
      pokemonInfo.style.display =
        pokemonInfo.style.display === "none" ? "block" : "none";
    });
  } catch (error){
    console.error(error);
    alert(error.message);
  }
}

search.addEventListener("input", (pokemon) => {
  const searchValue = pokemon.target.value.toLowerCase();
  const pokemons = pokemonlist.getElementsByTagName("li");
  Array.from(pokemons).forEach((pokemon) => {
    const pokemonName = pokemon.textContent;
    if (pokemonName.toLowerCase().indexOf(searchValue) !== -1) {
      pokemon.style.display = "block";
    } else {
      pokemon.style.display = "none";
    }
  });
});

showPokemonList();
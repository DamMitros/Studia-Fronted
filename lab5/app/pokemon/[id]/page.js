import PokemonDetails from "../../components/PokemonDetails";
import Compare from "../../components/Compare";

export default async function PokemonDetailsPage({ params }) {
  const { id } = await params;
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
  
    return (
      <>
        <PokemonDetails pokemon={pokemon} />
        <nav>
          <a href="/pokemon">← Powrót do listy Pokemonów</a>
          <Compare />
        </nav>
      </>
    );
  }catch(error){
    console.error("Błąd podczas pobierania Pokemona:", error);
    return <div>Coś poszło nie tak...</div>;
  }

}

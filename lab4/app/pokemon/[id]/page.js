import PokemonDetails from "../../components/PokemonDetails";

export default async function PokemonDetailsPage({ params }) {
  try{
    const { id } = await params;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
  
    return <PokemonDetails pokemon={pokemon} />;
  }catch(error){
    console.error("Błąd podczas pobierania Pokemona:", error);
    return <div>Coś poszło nie tak...</div>;
  }
}

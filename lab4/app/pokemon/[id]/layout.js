import Compare from "../../components/Compare";

export default function PokemonDetailsLayout({ children }) {
  return (
    <div>
      {children}
      <nav>
        <a href="/pokemon">← Powrót do listy Pokemonów</a>
        <Compare />
      </nav>
    </div>
  );
}

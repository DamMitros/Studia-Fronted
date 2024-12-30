import Compare from "../components/Compare";

export default function FavoritesLayout({ children }) {
  return (
    <div>
      <h1>Twoje ulubione Pokémony!</h1>
      <section>{children}</section>
      <div><nav> <Compare /> </nav></div>
    </div>
  );
}

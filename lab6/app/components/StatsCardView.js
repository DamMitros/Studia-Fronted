const CardView = ({ data, stats, formatNumber }) => (
  <main>
    {data.map((pokemon) => (
      <div key={pokemon.id}>
        <h3><a href={`/pokemon/${pokemon.id}`}>{pokemon.name}</a></h3>
        <p>Typy: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>HP: {pokemon.stats[0].base_stat}</p>
        <p>Atak: {pokemon.stats[1].base_stat}</p>
        <p>Obrona: {pokemon.stats[2].base_stat}</p>
        <p>Szybkość: {pokemon.stats[5].base_stat}</p>
        <h4>Średnia skuteczność taktyk:</h4>
        {stats.notesByPokemon && stats.notesByPokemon[pokemon.id] ? (
          <div>
            <ul>
              {Object.entries(
                stats.notesByPokemon[pokemon.id].reduce(
                  (acc, note) => {
                    if (!acc[note.tacticName]) {
                      acc[note.tacticName] = {
                        totalEffectiveness: 0,
                        count: 0,
                      };
                    }
                    const normalizedEffectiveness = Number(note.effectiveness);
                    acc[note.tacticName].totalEffectiveness += normalizedEffectiveness;
                    acc[note.tacticName].count += 1;
                    return acc;
                  },
                  {}
                )
              ).map(([tacticName, stat]) => {
                const averageEffectiveness = formatNumber(
                  stat.totalEffectiveness / stat.count
                );
                return (
                  <li key={tacticName}>
                    {tacticName}: {averageEffectiveness}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <a>Nie masz jeszcze taktyk do tego Pokemona</a>
          </div>
        )}
        <a href={`/pokemon/${pokemon.id}/note`}>Dodaj taktykę</a>
      </div>
    ))}
  </main>
);

export default CardView;

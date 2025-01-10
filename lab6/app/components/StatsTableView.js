const TableView = ({ data, stats, formatNumber }) => (
  <table>
    <thead>
      <tr>
        <th>Nazwa</th>
        <th>Typy</th>
        <th>HP</th>
        <th>Atak</th>
        <th>Obrona</th>
        <th>Szybkość</th>
        <th>Średnia skuteczność taktyk:</th>
      </tr>
    </thead>
    <tbody>
      {data.map((pokemon) => (
        <tr key={pokemon.id}>
          <td><a href={`/pokemon/${pokemon.id}`}>{pokemon.name}</a></td>
          <td>{pokemon.types.map((type) => type.type.name).join(", ")}</td>
          <td>{pokemon.stats[0].base_stat}</td>
          <td>{pokemon.stats[1].base_stat}</td>
          <td>{pokemon.stats[2].base_stat}</td>
          <td>{pokemon.stats[5].base_stat}</td>
          <td>
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
                <p>Nie masz jeszcze taktyk do tego Pokemona</p>
              </div>
            )}
            <a href={`/pokemon/${pokemon.id}/note`}>Dodaj taktykę</a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableView;

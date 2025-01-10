const statsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {...state, originalData: action.payload, data: action.payload}; 
    case 'FILTER_DATA':
      return {...state, data: filterData(state.originalData, action.payload.type)};
    case 'SORT_DATA':
      return {...state, data: sortData(state.data, action.payload.sortBy)};
    case 'CALCULATE_STATS':
      return {...state, stats: calculateStats(state.data, action.payload.statsType)};
    default:
      return state;
  }
};

const calculateStats = (data, statsType) => {
  const typeCounts = data.reduce((acc, pokemon) => {
    if (pokemon.types) {
      pokemon.types.forEach(type => {
        acc[type.type.name] = (acc[type.type.name] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const mostCommonType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, '');
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const notesByPokemon = notes.reduce((acc, note) => {
    if (!acc[note.pokemonId]) {
      acc[note.pokemonId] = [];
    }
    acc[note.pokemonId].push(note);
    return acc;
  }, {});
  const top3Pokemons = Object.keys(notesByPokemon)
    .sort((a, b) => notesByPokemon[b].length - notesByPokemon[a].length).slice(0, 3)
    .map(pokemonId => {
      const pokemon = data.find(pokemon => pokemon.id === parseInt(pokemonId));
      return pokemon ? pokemon.name : 'Unknown';
    });
    
  return {
    favoritesCount: data.length,
    mostCommonType,
    top3Pokemons,
    typeDistribution: typeCounts,
    notesByPokemon
  };
};

const sortData = (data, sortBy) => {
  switch (sortBy) {
    case 'name':
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    case 'type':
      return [...data].sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name));
    case 'date':
      return [...data].sort((a, b) => {
        const notesA = JSON.parse(localStorage.getItem("notes"))?.filter(note => note.pokemonId == a.id) || [];
        const notesB = JSON.parse(localStorage.getItem("notes"))?.filter(note => note.pokemonId == b.id) || [];
        if (notesA.length === 0) return 1;
        if (notesB.length === 0) return -1;
        const latestNoteA = new Date(notesA[notesA.length - 1].updatedAt);
        const latestNoteB = new Date(notesB[notesB.length - 1].updatedAt);
        return latestNoteB - latestNoteA;
      });
    default:
      return [...data].sort((a, b) => {
        const notesA = JSON.parse(localStorage.getItem("notes"))?.filter(note => note.pokemonId == a.id) || [];
        const notesB = JSON.parse(localStorage.getItem("notes"))?.filter(note => note.pokemonId == b.id) || [];
        if (notesA.length === 0) return 1;
        if (notesB.length === 0) return -1;
        const latestNoteA = new Date(notesA[notesA.length - 1].updatedAt);
        const latestNoteB = new Date(notesB[notesB.length - 1].updatedAt);
        return latestNoteB - latestNoteA;
      });
  }
};

const filterData = (data, type=null) => {
  return data.filter(pokemon => type ? pokemon.types.some(t => t.type.name === type) : true);
};

export default statsReducer;
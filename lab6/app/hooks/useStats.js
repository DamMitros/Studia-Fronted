import { useEffect, useReducer, useState } from 'react';
import statsReducer from '../reducers/statsReducer';
import { getFavorites } from '../../utils/favorites';

// const useStats = () => {
//   const [state, dispatch] = useReducer(statsReducer, { data: [], stats: {} });
//   const [dispatched, setDispatched] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const favorites = getFavorites();
//         const detailedPokemons = await Promise.all(
//           favorites.map(async (pokemonName) => {
//             const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//             return response.json();
//           })
//         );
//         dispatch({ type: 'LOAD_DATA', payload: detailedPokemons });
//       } catch (error) {
//         console.error("Błąd podczas pobierania danych:", error);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     if (state.data.length > 0 && !dispatched) {
//       dispatch({ type: 'CALCULATE_STATS', payload: { statsType: 'favorites' } });
//       setDispatched(true);
//     }
//   }, [state.data, dispatched]);

//   return [state, dispatch];
// };

export default function useStats(){
  const [state, dispatch] = useReducer(statsReducer, { data: [], stats: {} });
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const favorites = getFavorites();
        const detailedPokemons = await Promise.all(
          favorites.map(async (pokemonName) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            return response.json();
          })
        );
        dispatch({ type: 'LOAD_DATA', payload: detailedPokemons });
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (state.data.length > 0 && !dispatched) {
      dispatch({ type: 'CALCULATE_STATS', payload: { statsType: 'favorites' } });
      setDispatched(true);
    }
  }, [state.data, dispatched]);

  return [state, dispatch];
};

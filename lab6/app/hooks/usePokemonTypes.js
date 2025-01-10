import { useState, useEffect } from "react";

export function usePokemonTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTypes = async () => {
    setLoading(true);
    try {
      const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
      const typeData = await typeResponse.json();
      setTypes(typeData.results);
    } catch (error) {
      console.error("Błąd podczas pobierania typów:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  
  return { types, loading };
}

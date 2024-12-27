import { useEffect, useState } from "react";

export default function Filter({ types, onFiltersChange }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState("20");

  const localStorageKey = "pokemonFilters";

  useEffect(() => {
    // Inicjalizacja filtrów z LocalStorage
    const storedFilters = localStorage.getItem(localStorageKey);
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setSearch(parsedFilters.search || "");
      setType(parsedFilters.type || "");
      setLimit(parsedFilters.limit || "20");
      onFiltersChange(parsedFilters);
    }
  }, []);

  const saveFiltersToLocalStorage = (filters) => {
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { search, type, limit, [name]: value };
    setSearch(newFilters.search);
    setType(newFilters.type);
    setLimit(newFilters.limit);

    saveFiltersToLocalStorage(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <nav>
      <input
        type="text"
        name="search"
        placeholder="Szukaj Pokemonów"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={(e) => handleFilterChange("search", e.target.value)}
      />
      <select
        name="type"
        value={type}
        onChange={(e) => handleFilterChange("type", e.target.value)}
      >
        <option value="">Wszystkie typy</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="limit"
        min="1"
        placeholder="Ilość Pokemonów"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        onBlur={(e) => handleFilterChange("limit", e.target.value)}
      />
    </nav>
  );
}

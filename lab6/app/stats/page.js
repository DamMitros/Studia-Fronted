"use client";

import { useContext, useEffect, useState } from "react";
import StatsContext from "../context/StatsContext";
import useStats from "../hooks/useStats";
import useLocalStorage from "../hooks/useLocalStorage";
import TableView from "../components/StatsTableView";
import CardView from "../components/StatsCardView";

export default function StatsPanel(){
  const { numberFormat, sortBy, viewType, updatePreferences } = useContext(StatsContext);
  const [state, dispatch] = useStats();
  const [types, setTypes] = useLocalStorage("pokemonTypes", []);
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedPreferences = {
      numberFormat: localStorage.getItem("numberFormat"),
      sortBy: localStorage.getItem("sortBy"),
      viewType: localStorage.getItem("viewType"),
    };

    updatePreferences({
      numberFormat: savedPreferences.numberFormat || 'percentage',
      sortBy: savedPreferences.sortBy || 'date',
      viewType: savedPreferences.viewType || 'table',
    });

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("numberFormat", numberFormat);
      localStorage.setItem("sortBy", sortBy);
      localStorage.setItem("viewType", viewType);
    }
  }, [numberFormat, sortBy, viewType, isClient]);

  useEffect(() => {
    if (isInitialized && state.data.length > 0 && !dispatched) {
      dispatch({ type: "SORT_DATA", payload: { sortBy } });
      setDispatched(true); 
    }
  }, [isInitialized, sortBy, state.data, dispatch, dispatched]);

  useEffect(() => {
    if (dispatched && sortBy !== state.sortBy) {
      setDispatched(false); 
    }
  }, [sortBy, state.sortBy]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
        const typeData = await typeResponse.json();
        setTypes(typeData.results.map((type) => type.name));
      } catch (error) {
        console.error("Błąd podczas pobierania typów:", error);
      }
    };
    
    if (types.length === 0) {
      fetchTypes();
    }
  }, [types, setTypes]);

  if (!isClient) {
    return null;
  }

  const formatNumber = (number) => {
    switch (numberFormat) {
      case "percentage":
        return `${(((number - 1) / 5) * 100).toFixed(2)}%`;
      case "decimal":
        return number.toFixed(2);
      case "rounded":
        return Math.round(number);
      default:
        return number;
    }
  };

  const renderView = () => {
    switch (viewType) {
      case "table":
        return <TableView data={state.data} stats={state.stats} formatNumber={formatNumber} />;
      case "cards":
        return <CardView data={state.data} stats={state.stats} formatNumber={formatNumber} />;
      default:
        return <TableView data={state.data} stats={state.stats} formatNumber={formatNumber} />;
    }
  };

  return (
    <div>
      <h1>Panel Statystyk</h1>
      <section>
        <label>
          Format liczb:
          <select
            value={numberFormat}
            onChange={(e) => updatePreferences({ numberFormat: e.target.value })}
          >
            <option value="percentage">%</option>
            <option value="decimal">Dziesiętny</option>
            <option value="rounded">Zaokrąglony</option>
          </select>
        </label>
        <label>
          Sortuj według:
          <select
            value={sortBy}
            onChange={(e) => updatePreferences({ sortBy: e.target.value })}
          >
            <option value="date">Data</option>
            <option value="name">Nazwa</option>
            <option value="type">Typ</option>
          </select>
        </label>
        <label>
          Widok:
          <select
            value={viewType}
            onChange={(e) => updatePreferences({ viewType: e.target.value })}
          >
            <option value="table">Tabela</option>
            <option value="cards">Karty</option>
          </select>
        </label>
        <label>
          Filtruj według typu:
          <select
            onChange={(e) =>
              dispatch({
                type: "FILTER_DATA",
                payload: { type: e.target.value },
              })
            }
          >
            <option value="">Wszystkie</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </section>
      <div>
        <nav>
          <p>Liczba ulubionych Pokemonów: {state.stats.favoritesCount}</p>
          <p>Najczęstszy typ: {state.stats.mostCommonType}</p>
          <p>Top 3 Pokemony: {state.stats.top3Pokemons?.join(", ")}</p>
          <p>Proporcje typów: {JSON.stringify(state.stats.typeDistribution)}</p>
        </nav>
      </div>
      <main>
        <h2>Szczegółowe informacje o aktualnej kolekcji</h2>
        {renderView()}
      </main>
    </div>
  );
};
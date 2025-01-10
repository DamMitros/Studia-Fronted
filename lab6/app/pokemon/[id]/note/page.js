"use client";

import NoteForm from "../../../components/NoteForm";
import EditNoteForm from "../../../components/NoteEditForm";
import { useState, useEffect } from "react";

export default function NotePage({ params }) {
  const [pokemonId, setPokemonId] = useState(null);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      setNoteId(queryParams.get("noteid"));
    }
  }, []); 

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setPokemonId(resolvedParams.id);
    }
    resolveParams();
  }, [params]);

  if (!pokemonId) {
    return <p>Ładowanie...</p>;
  }

  const handleAddNote = () => {
    window.location.reload();
  };

  if (noteId != null) {
    return (
      <div>
        <h2>Edytuj notatkę dla Pokemona</h2>
        <EditNoteForm pokemonId={pokemonId} noteId={noteId} onAddNote={handleAddNote} />
      </div>
    );
  }
  return (
    <div>
      <h2>Dodaj notatkę dla Pokemona</h2>
      <NoteForm pokemonId={pokemonId} onAddNote={handleAddNote} />
    </div>
  );
}
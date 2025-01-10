"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { usePokemonTypes } from "../hooks/usePokemonTypes"; 
import * as Yup from "yup";

export default function EditNoteForm({ pokemonId, noteId }) {
  const { types, loading } = usePokemonTypes();
  const [note, setNote] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (noteId) {
      const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const noteToEdit = allNotes.find((note) => note.id === noteId);
      setNote(noteToEdit);
    }
    setIsLoading(false);
  }, [noteId]);


  const onSave = (updatedNote) => {
    console.log("Zapisuję notatkę: ", updatedNote);
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = allNotes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    window.location.href = `/pokemon/${pokemonId}`;
  };

  const onCancel = () => {
    window.location.href = `/pokemon/${pokemonId}`;
  };
  const initialValues = note || {
    tacticName: "",
    strategy: "",
    effectiveness: 3,
    conditions: "",
    trainingDate: "",
    opponents: [],
  };

  const validationSchema = Yup.object().shape({
    tacticName: Yup.string().required("Wymagane").min(5, "Minimum 5 znaków").max(50, "Maksimum 50 znaków"),
    strategy: Yup.string().required("Wymagane").min(10, "Minimum 10 znaków"),
    effectiveness: Yup.number().required("Wymagane").min(1).max(5),
    conditions: Yup.string().min(10, "Minimum 10 znaków"),
    trainingDate: Yup.date().required("Wymagane"),
    opponents: Yup.array().min(1, "Wybierz przynajmniej jeden typ przeciwnika").required("Wymagane"),
  });

  const handleSubmit = (values) => {
    const noteData = {
      ...values,
      pokemonId,
      id: noteId, 
      updatedAt: new Date().toISOString(),
    };

    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = noteId ? allNotes.map((n) => (n.id === noteId ? noteData : n)) : [...allNotes, noteData]; 
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    onSave(noteData);
  };

  if (isLoading || loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <label>
            Nazwa taktyki:
            <Field name="tacticName" />
            <ErrorMessage name="tacticName" />
          </label>
          <label>
            Opis strategii:
            <Field name="strategy" as="textarea" />
            <ErrorMessage name="strategy" />
          </label>
          <label>
            Skuteczność:
            <Field name="effectiveness" as="select">
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="effectiveness" />
          </label>
          <label>
            Warunki użycia:
            <Field name="conditions" />
            <ErrorMessage name="conditions" />
          </label>
          <label>
            Data treningu:
            <Field name="trainingDate" type="date" />
            <ErrorMessage name="trainingDate" />
          </label>
          <label>
            Przeciwnicy:
            <div role="group" aria-labelledby="checkbox-group">
              {types.map((type) => (
                <label key={type.name}>
                  <Field
                    type="checkbox"
                    name="opponents"
                    value={type.name}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      const updatedOpponents = checked
                        ? [...values.opponents, value]
                        : values.opponents.filter((opponent) => opponent !== value);
                      setFieldValue("opponents", updatedOpponents);
                    }}
                  />
                  {type.name}
                </label>
              ))}
            </div>
            <ErrorMessage name="opponents" />
          </label>
          <button type="submit">{noteId ? "Zapisz zmiany" : "Dodaj notatkę"}</button>
          <button type="button" onClick={onCancel}>
            Anuluj
          </button>
        </Form>
      )}
    </Formik>
  );
}

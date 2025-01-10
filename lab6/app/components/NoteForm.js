"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePokemonTypes } from "../hooks/usePokemonTypes"; 
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

export default function NoteForm({ pokemonId, onAddNote }) {
  const { types, loading } = usePokemonTypes();

  const initialValues = {
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
    const note = {
      id: uuidv4(),
      pokemonId: pokemonId,
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    localStorage.setItem("notes", JSON.stringify([...existingNotes, note]));
    onAddNote();
    window.location.href = `/pokemon/${pokemonId}`;
  };

  if (loading) {
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
          <button type="submit">Dodaj notatkę</button>
        </Form>
      )}
    </Formik>
  );
}

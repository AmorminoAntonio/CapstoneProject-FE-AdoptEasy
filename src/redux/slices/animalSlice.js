import { createSlice } from "@reduxjs/toolkit";

// Costante per l'URL del backend
const URL_BE = "http://localhost:8080"; // Modifica questo URL con quello del tuo backend

// Inizializza lo stato
const initialState = {
  animals: [],
  loading: false,
  error: null,
};

// Funzione per ottenere il token dal localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken"); // Otteniamo il token dal localStorage
  if (token) {
    return {
      Authorization: `Bearer ${token}`, // Se il token esiste, lo includiamo nell'intestazione Authorization
    };
  }
  return {}; // Se non c'è il token, ritorniamo un oggetto vuoto
};

// Crea il slice
const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.animals = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAnimal: (state, action) => {
      state.animals.push(action.payload);
    },
    updateAnimal: (state, action) => {
      const updatedAnimal = action.payload;
      const index = state.animals.findIndex((animal) => animal.id === updatedAnimal.id);
      if (index !== -1) {
        state.animals[index] = updatedAnimal;
      }
    },
    deleteAnimal: (state, action) => {
      state.animals = state.animals.filter((animal) => animal.id !== action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, addAnimal, updateAnimal, deleteAnimal } = animalSlice.actions;

// Async actions (thunks)
export const fetchAnimals = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await fetch(`${URL_BE}/admin/animal/all`, {
      headers: getAuthHeaders(), // Usando la funzione centralizzata per ottenere l'intestazione Authorization
    });
    if (!response.ok) {
      throw new Error("Errore durante il recupero degli animali");
    }
    const data = await response.json();
    dispatch(fetchSuccess(data.content)); // Popola gli animali nel redux store
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const createAnimal = (animal) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/animal/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // Usando la funzione centralizzata per ottenere l'intestazione Authorization
      },
      body: JSON.stringify(animal),
    });
    if (!response.ok) {
      throw new Error("Errore durante la creazione dell'animale");
    }
    const data = await response.json();
    dispatch(addAnimal(data.content));
  } catch (error) {
    console.error("Error creating animal:", error);
  }
};

export const updateAnimalAsync = (animal) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/animal/update/${animal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // Usando la funzione centralizzata per ottenere l'intestazione Authorization
      },
      body: JSON.stringify(animal),
    });
    if (!response.ok) {
      throw new Error("Errore durante l'aggiornamento dell'animale");
    }
    const data = await response.json();
    dispatch(updateAnimal(data.content));
  } catch (error) {
    console.error("Error updating animal:", error);
  }
};

export const deleteAnimalAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/animal/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // Usando la funzione centralizzata per ottenere l'intestazione Authorization
    });
    if (!response.ok) {
      throw new Error("Errore durante la cancellazione dell'animale");
    }
    dispatch(deleteAnimal(id)); // Elimina l'animale dal Redux store
  } catch (error) {
    console.error("Error deleting animal:", error);
  }
};

export default animalSlice.reducer;

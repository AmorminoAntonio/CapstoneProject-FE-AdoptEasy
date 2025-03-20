import { createSlice } from "@reduxjs/toolkit";

// Costante per l'URL del backend
const URL_BE = "http://localhost:8080"; // Modifica questo URL con quello del tuo backend

// Inizializza lo stato
const initialState = {
  adoptions: [],
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

// Crea il slice per le adozioni
const adoptionSlice = createSlice({
  name: "adoptions",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.adoptions = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAdoption: (state, action) => {
      state.adoptions.push(action.payload);
    },
    updateAdoption: (state, action) => {
      const updatedAdoption = action.payload;
      const index = state.adoptions.findIndex((adoption) => adoption.id === updatedAdoption.id);
      if (index !== -1) {
        state.adoptions[index] = updatedAdoption;
      }
    },
    deleteAdoption: (state, action) => {
      state.adoptions = state.adoptions.filter((adoption) => adoption.id !== action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, addAdoption, updateAdoption, deleteAdoption } = adoptionSlice.actions;

// Async actions (thunks)

// Funzione per recuperare tutte le adozioni
export const fetchAdoptions = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await fetch(`${URL_BE}/admin/adozioni/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Errore durante il recupero delle adozioni");
    }
    const data = await response.json();
    dispatch(fetchSuccess(data.content)); // Popola le adozioni nel redux store
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

// Funzione per creare una richiesta di adozione
export const createAdoption = (adoption) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/adozioni/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(adoption),
    });
    if (!response.ok) {
      throw new Error("Errore durante la creazione della richiesta di adozione");
    }
    const data = await response.json();
    dispatch(addAdoption(data.content)); // Aggiungi la richiesta di adozione al Redux store
  } catch (error) {
    console.error("Error creating adoption:", error);
  }
};

// Funzione per approvare una richiesta di adozione
export const updateAdoptionStatusAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/adozioni/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(id),
    });
    if (!response.ok) {
      throw new Error("Errore durante l'approvazione della richiesta di adozione");
    }
    const data = await response.json();
    dispatch(updateAdoption(data.content)); // Aggiorna la richiesta di adozione con lo stato APPROVED
  } catch (error) {
    console.error("Error approving adoption:", error);
  }
};

// Funzione per rifiutare una richiesta di adozione
export const deleteAdoptionAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/admin/adozione/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Errore durante il rifiuto della richiesta di adozione");
    }
    dispatch(deleteAdoption(id)); // Elimina la richiesta di adozione dal Redux store
  } catch (error) {
    console.error("Error rejecting adoption:", error);
  }
};

export default adoptionSlice.reducer;

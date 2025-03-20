// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Costante per l'URL del backend
const URL_BE = "http://localhost:8080"; // Modifica questo URL con quello del tuo backend

// Inizializza lo stato
const initialState = {
  users: [],
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

// Crea il slice per gli utenti
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, addUser, updateUser, deleteUser } = userSlice.actions;

// Async actions (thunks)

// Funzione per recuperare tutti gli utenti
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const response = await fetch(`${URL_BE}/utente/admin/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Errore durante il recupero degli utenti");
    }
    const data = await response.json();
    dispatch(fetchSuccess(data.content)); // Popola gli utenti nel redux store
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

// Funzione per creare un nuovo utente
export const createUser = (user) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/utente/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Errore durante la creazione dell'utente");
    }
    const data = await response.json();
    dispatch(addUser(data.content)); // Aggiungi l'utente al Redux store
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Funzione per aggiornare un utente
export const updateUserAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/utente/admin/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(id),
    });
    if (!response.ok) {
      throw new Error("Errore durante l'aggiornamento dell'utente");
    }
    const data = await response.json();
    dispatch(updateUser(data.content)); // Aggiorna l'utente nel Redux store
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Funzione per eliminare un utente
export const deleteUserAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BE}/utente/admin/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione dell'utente");
    }
    dispatch(deleteUser(id)); // Elimina l'utente dal Redux store
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export default userSlice.reducer;

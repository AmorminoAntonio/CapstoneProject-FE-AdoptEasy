// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client"; // Importa ReactDOM dalla versione corretta
import { Provider } from "react-redux";
import App from "./App"; // Il componente principale dell'applicazione
import store from "./redux/store/Store";

// Crea il root e renderizza l'app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router-dom'

import { store, persistor } from "./store";
import App from "./components/App";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";


const rootElement = document.getElementById("root");
ReactDOM.render(
  // on encapsule l'application dans le Provider redux qui va faire le lien entre le store et nos composants
  // puis dans la PersistGate, qui va récupérer les données au premier chargement de l'application
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);

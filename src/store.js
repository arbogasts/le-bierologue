import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";

import reducers from "./reducers";

// déclaration de la méthode de persistance
const persistConfig = {
  key: "myReactUserListApp",
  storage
};

// on créé un store de données
const store = createStore(
  // on enregistre les reducers "persistables"
  persistCombineReducers(persistConfig, reducers),
  undefined,
  // on applique le middleware de logging
  applyMiddleware(logger)
);
const persistor = persistStore(store);

export { store, persistor };

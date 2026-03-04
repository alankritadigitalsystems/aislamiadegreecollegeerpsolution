// src/store/store.js
import { createStore, applyMiddleware, compose } from "redux";
import {thunk}  from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Session storage
import rootReducer from "./reducers/rootReducer"; // Your root reducer

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticationReducer"], 
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  // Check if running in browser (Next.js SSR safe)
  const isClient = typeof window !== "undefined";

  const composeEnhancers =
    isClient && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  const persistor = isClient ? persistStore(store) : null;

  return { store, persistor };
}

"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store";

const { store, persistor } = configureStore();

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {persistor ? <PersistGate loading={null} persistor={persistor}>{children}</PersistGate> : children}
    </Provider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import MaterialProvider from "./MaterialProvider";
import AlertProvider from "./AlertProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MaterialProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </MaterialProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

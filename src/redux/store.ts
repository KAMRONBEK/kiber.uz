import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { espKeyReducer } from "./slices/esp.slice";
import { loaderReducer } from "./slices/loader.slice";
import authSlice from "./slices/auth.slice";
import { settingsReducer } from "./slices/settings.slice";
import { filterReducer } from "./slices/filter.slice";
import { alertReducer } from "./slices/alert.slice";
// import { docsReducer } from "./slices/docs.slice"
import { measuresReducer } from "./slices/measures.slice";
import { productsReducer } from "./slices/products.slice";

const authPersistConfig = {
  key: "auth",
  storage,
};


const measuresPersistConfig = {
  key: "measures",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  loader: loaderReducer,
  espKey: espKeyReducer,
  settings: settingsReducer,
  alert: alertReducer,
  filter: filterReducer,
  measures: persistReducer(measuresPersistConfig, measuresReducer),
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

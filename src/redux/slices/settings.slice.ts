import { createSlice } from "@reduxjs/toolkit";

export const { actions: settingsActions, reducer: settingsReducer } =
  createSlice({
    name: "settings",
    initialState: {
      theme: "light",
      lang: {
        name: "Ру",
        title: "ru",
      },
    },
    reducers: {
      switchTheme(state) {
        state.theme = state.theme === "light" ? "dark" : "light";
      },
      changeLanguage(state, { payload }) {
        // @ts-ignore
        state.lang = payload;
      },
    },
  });

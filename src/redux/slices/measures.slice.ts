import { createSlice } from "@reduxjs/toolkit";

export const { actions: measuresActions, reducer: measuresReducer } =
  createSlice({
    name: "alert",
    initialState: {
      measureList: [],
      catalogList: [],
    },
    reducers: {
      setMeasureList(state, { payload }) {
        state.measureList = payload;
      },
      setCatalogList(state, { payload }) {
        state.catalogList = payload;
      },
    },
  });

import { createSlice } from "@reduxjs/toolkit";

export const { actions: espKeyActions, reducer: espKeyReducer } = createSlice({
  name: "espKey",
  initialState: {
    selectedKey: null,
    keysList: [],
  },
  reducers: {
    setSelectedKey(state, action) {
      state.selectedKey = action.payload;
    },
    setKeys(state, { payload }) {
      state.keysList = payload;
    },
  },
});

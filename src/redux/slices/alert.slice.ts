import { createSlice } from "@reduxjs/toolkit";

export const { actions: alertActions, reducer: alertReducer } = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    addAlert(state, { payload }) {
      //@ts-ignore
      state.alerts.push(payload);
    },
    deleteAlert(state, { payload }) {
      //@ts-ignore
      state.alerts = state.alerts.filter((alert) => alert.id !== payload);
    },
  },
});

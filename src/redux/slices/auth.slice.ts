import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authReducer;

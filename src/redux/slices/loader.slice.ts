import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginLoader: false,
  fullPageLoader: false,
};

interface loaderI {
  loginLoader: boolean;
  fullPageLoader: boolean;
}

enum loaderKey {
  loginLoader,
  fullPageLoader,
}

export const { actions: loaderAction, reducer: loaderReducer } = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loaderON: (state: loaderI, { payload }) => {
      //@ts-ignore
      state[payload] = true;
    },
    loaderOFF: (state: loaderI, { payload }) => {
      //@ts-ignore
      state[payload] = false;
    },
  },
});

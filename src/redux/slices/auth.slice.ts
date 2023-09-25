import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isRegistered: true,
  key: null,
  userName: null,
  userTin: null,
  userData: null,
  token: null,
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //@ts-ignore
    login(state, { payload }) {
      const { key, userData, token, tin } = payload;
      localStorage.setItem("token", JSON.stringify(token));
      return {
        isAuth: true,
        key,
        token,
        userName: key.CN,
        userTin: tin ? tin : key.TIN,
        userData,
      };
    },

    logout: (_) => {
      localStorage.removeItem("token");
      return initialState;
    },
    //@ts-ignore
    updateRegistration(state, { payload }) {
      return { state, isRegistered: payload };
    },
  },
});

export default authReducer;

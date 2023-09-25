import { createSlice } from "@reduxjs/toolkit";

export const { actions: productsAction, reducer: productsReducer } =
  createSlice({
    name: "products",
    initialState: {
      productsWithoutVat: [],
      productsWithZeroVat: [],
      companiesSellerPriviliged: [],
      companiesBuyerPriviliged: [],
      productsNotIncluded: [],
      compensation: [],
    },
    reducers: {
      // @ts-ignore
      addWithoutVat(state, { payload }) {
        //@ts-ignore
        state.productsWithoutVat = [...payload];
      },
      addWithZeroVat(state, { payload }) {
        //@ts-ignore
        state.productsWithZeroVat = [...payload];
      },
      addCompaniesSeller(state, { payload }) {
        //@ts-ignore
        state.companiesSellerPriviliged = [...payload];
      },
      addCompaniesBuyer(state, { payload }) {
        //@ts-ignore
        state.companiesBuyerPriviliged = [...payload];
      },
      addNotIncluded(state, { payload }) {
        //@ts-ignore
        state.productsNotIncluded = [...payload];
      },
      addCompensation(state, { payload }) {
        //@ts-ignore
        state.compensation = [...payload];
      },
    },
  });

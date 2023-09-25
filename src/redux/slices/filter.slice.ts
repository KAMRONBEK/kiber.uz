import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  fromDate: "",
  toDate: "",
  documentNumber: "",
  documentSum: "",
  documentFromDate: "",
  documentToDate: "",
  contractNumber: "",
  contractFromDate: "",
  contractToDate: "",
}

export const { actions: filterAction, reducer: filterReducer } = createSlice({
  name: "filter",
  initialState,
  reducers: {
    fromDate(state, { payload }) {
      state.fromDate = payload
    },
    toDate(state, { payload }) {
      state.toDate = payload
    },
    documentNumber(state, { payload }) {
      state.documentNumber = payload
    },
    documentSum(state, { payload }) {
      state.documentSum = payload
    },
    documentFromDate(state, { payload }) {
      state.documentFromDate = payload
    },
    documentToDate(state, { payload }) {
      state.documentToDate = payload
    },
    contractNumber(state, { payload }) {
      state.contractNumber = payload
    },
    contractFromDate(state, { payload }) {
      state.contractFromDate = payload
    },
    contractToDate(state, { payload }) {
      state.contractToDate = payload
    },
  },
})

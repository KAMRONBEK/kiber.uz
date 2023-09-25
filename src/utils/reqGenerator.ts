import axios from "axios";
import { store } from "../redux/store";
import { authActions } from "../redux/slices/auth.slice";
import { showAlert } from "../redux/thunks/alert.thunk";
// export const baseURL = "http://80.80.218.145:9000/api"
export const baseURL = "https://kiber.uz/api";

const reqGenerator = axios.create({
  baseURL,
  timeout: 100000,
});

export const reqBlob = axios.create({
  baseURL,
  timeout: 100000,
});

//@ts-ignore
const errorHandler = (error, hooks) => {
  if (error?.response) {
    if (error.response?.data?.errorMessage) {
      store.dispatch(
        showAlert(error.response.data.errorMessage, "error", 6000)
      );
    }

    if (error?.response?.status === 403) {
    } else if (error?.response?.status === 401) {
      //@ts-ignore
      store.dispatch(authActions.logout());
    }
  } else {
    store.dispatch(showAlert("_______Error________", "error"));
  }

  return Promise.reject(error.response);
};

reqGenerator.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth.token /// accessToken
    const storageToken = localStorage.getItem("token");

    if (typeof storageToken !== "undefined" && storageToken !== null) {
      //@ts-ignore
      config.headers.Authorization = `Bearer ${JSON.parse(storageToken)}`;
    }
    return config;
  },
  //@ts-ignore
  (error) => errorHandler(error)
);

reqGenerator.interceptors.response.use(
  (response) => response.data,
  //@ts-ignore
  errorHandler
);

export default reqGenerator;

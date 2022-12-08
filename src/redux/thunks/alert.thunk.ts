import { alertActions } from "../slices/alert.slice";

let _id = 1;

export const showAlert =
  (title = "", type = "error", time = 4000) =>
  //@ts-ignore
  (dispatch) => {
    let id = _id;
    dispatch(alertActions.addAlert({ title, type, id }));
    setTimeout(() => {
      dispatch(alertActions.deleteAlert(id));
    }, time);
    _id++;
  };

import { useEffect } from "react";
import { COMPANY_INN } from "../../consts";
import userService from "../../services/userService";
import putSignature from "../../utils/putSignature";
import reqGenerator from "../../utils/reqGenerator";
import { authActions } from "../slices/auth.slice";
import { loaderAction } from "../slices/loader.slice";
import { store } from "../store";
import { showAlert } from "./alert.thunk";
const { loaderOFF, loaderON } = loaderAction;

//@ts-ignore
export const loginAction = (key) => async (dispatch) => {
  dispatch(loaderON("loginLoader"));
  const guid = await reqGenerator.get("/info/guid");

  putSignature(guid, key)
    .then((pkcs7) =>
      reqGenerator.post("/auth/sign-in", {
        type: 2,
        key: {
          tin: key.TIN,
          key: pkcs7,
        },
      })
    )
    //@ts-ignore
    .then(({ token, status }) => {
      if (status) {
        dispatch(saveUserData(key, token));
      } else {
        dispatch(showAlert("Siz sistemada ro'yxatdan o'tmagansiz"));
        //@ts-ignore
        dispatch(authActions.updateRegistration(false));
      }
    })
    .finally(() => dispatch(loaderOFF("loginLoader")));
};

//@ts-ignore
export const signAction = (tin, password, key) => (dispatch) => {
  dispatch(loaderON("loginLoader"));
  reqGenerator
    .post("/auth/sign-in", {
      type: 1,
      login: {
        tin: tin,
        password: password,
      },
    })
    //@ts-ignore

    .then(({ token }) => {
      userService.searchUser(tin, token).then((res) => {
        //@ts-ignore
        dispatch(authActions.login({ key, userData: res, token }));
      });
    })
    .finally(() => dispatch(loaderOFF("loginLoader")))
    .catch((error) => {
      console.log(error);
      dispatch(showAlert("Вы ввели неправильный пароль ключа"));
    });
};

//@ts-ignore
export const registerAction = (key) => async (dispatch) => {
  dispatch(loaderON("loginLoader"));
  const { TIN } = key;
  const operatorsList = await reqGenerator.get(`/auth/operator/list/${TIN}`);
  let operatorsTinsList = operatorsList
    //@ts-ignore
    .filter((operator) => operator.enabled)
    //@ts-ignore
    ?.map((operator) => operator.providerTin);

  if (!operatorsTinsList?.includes(COMPANY_INN))
    operatorsTinsList.push(COMPANY_INN);
  const data = {
    ClientTin: TIN,
    ProviderTins: operatorsTinsList,
  };

  putSignature(JSON.stringify(data), key)
    .then((pkcs7) =>
      reqGenerator.post("/auth/sign-up", {
        sign: pkcs7,
        tin: TIN,
      })
    )
    //@ts-ignore
    .then(({ token }) => {
      dispatch(saveUserData(key, token));
    })
    .finally(() => dispatch(loaderOFF("loginLoader")));
};

//@ts-ignore
const saveUserData = (key, token) => (dispatch) => {
  userService
    .searchUser(key.TIN, token)
    //@ts-ignore
    .then((res) => dispatch(authActions.login({ key, userData: res, token })))
    .finally(() => dispatch(loaderOFF("loginLoader")));
};

import { useEffect } from "react";
import { COMPANY_INN } from "../../consts";
import userService from "../../services/userService";
import putSignature from "../../utils/putSignature";
import reqGenerator from "../../utils/reqGenerator";
import { authActions } from "../slices/auth.slice";
import { loaderAction } from "../slices/loader.slice";
import { showAlert } from "./alert.thunk";
const { loaderOFF, loaderON } = loaderAction;

//@ts-ignore
export const loginAction = (key) => async (dispatch) => {
  dispatch(loaderON("loginLoader"));
  const guid = await reqGenerator.get("/utils/guid");

  putSignature(guid, key)
    .then((pkcs7) =>
      reqGenerator
        .post("/auth/login-with-key", {
          tin: key.TIN,
          sign: pkcs7,
        })
        .then((res) => {
          //@ts-ignore
          if (res.token) {
            // @ts-ignore
            dispatch(saveUserData(key, res.token));
          } else {
            dispatch(showAlert("Siz sistemada ro'yxatdan o'tmagansiz"));
            //@ts-ignore
            dispatch(authActions.updateRegistration(false));
          }
        })
        .catch((error) => {
          dispatch(showAlert("Siz sistemada ro'yxatdan o'tmagansiz"));
          //@ts-ignore
          dispatch(authActions.updateRegistration(false));
        })
    )

    .finally(() => dispatch(loaderOFF("loginLoader")));
};

//@ts-ignore
export const signAction = (tin, password, key) => (dispatch) => {
  dispatch(loaderON("loginLoader"));
  reqGenerator
    .post("/auth/login", {
      tin: tin,
      password: password,
    })
    //@ts-ignore
    .then(({ token }) => {
      userService.searchUser(tin, token).then((res) => {
        //@ts-ignore
        dispatch(authActions.login({ key, userData: res, token, tin }));
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
  const { TIN, PINFL } = key;

  const operatorsList = await reqGenerator.get(`/auth/operator/list/${TIN}`);
  console.log({ operatorsList });
  let operatorsTinsList = operatorsList
    //@ts-ignore
    .filter((operator) => operator.enabled)
    //@ts-ignore
    ?.map((operator) => operator.providerTin);

  if (!operatorsTinsList?.includes(COMPANY_INN))
    operatorsTinsList.push(COMPANY_INN);

  const data = {
    ClientTin: TIN[0] === "3" || TIN[0] === "2" ? TIN : PINFL,
    ProviderTins: operatorsTinsList,
  };

  console.log("hi");
  putSignature(JSON.stringify(data), key)
    .then((pkcs7) =>
      reqGenerator
        .post("/auth/register", {
          sign: pkcs7,
          tin: TIN,
        })
        .then((resp) => {
          console.log({ resp });
          dispatch(authActions.updateRegistration(true));
          reqGenerator
            .post("/auth/login-with-key", {
              sign: pkcs7,
              tin: TIN,
            })
            .then((res) => {
              console.log({ res });
              // @ts-ignore
              dispatch(saveUserData(res.user, res.token));
            });
        })
    )
    //@ts-ignore

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

import { COMPANY_INN } from "../../consts";
import userService from "../../services/userService";
import putSignature from "../../utils/putSignature";
import reqGenerator from "../../utils/reqGenerator";
import { authActions } from "../slices/auth.slice";
import { loaderAction } from "../slices/loader.slice";
import { showAlert } from "./alert.thunk";
const { loaderOFF, loaderON } = loaderAction;

export const loginAction =
  (key: null | undefined | any) => async (dispatch: any) => {
    dispatch(loaderON("loginLoader"));
    const guid = await reqGenerator.get("/utils/guid");
    putSignature(guid, key)
      .then((pkcs7) =>
        reqGenerator
          .post("/auth/login-with-key", {
            tin: key.TIN,
            sign: pkcs7,
          })
          .then((res: any) => {
            if (res?.token) {
              dispatch(saveUserData(key, res?.token));
            } else {
              dispatch(showAlert("Siz sistemada ro'yxatdan o'tmagansiz"));

              dispatch(authActions?.updateRegistration(false));
            }
          })
          .catch((error) => {
            dispatch(showAlert("Siz sistemada ro'yxatdan o'tmagansiz"));

            dispatch(authActions?.updateRegistration(false));
          })
      )

      .finally(() => dispatch(loaderOFF("loginLoader")));
  };

export const signAction =
  (tin: string, password: string, key: string) => (dispatch: any) => {
    dispatch(loaderON("loginLoader"));
    reqGenerator
      .post("/auth/login", {
        tin: tin,
        password: password,
      })
      .then(({ token }: any) => {
        userService.searchUser(tin, token).then((res) => {
          dispatch(authActions.login({ key, userData: res, token, tin }));
        });
      })
      .finally(() => dispatch(loaderOFF("loginLoader")))
      .catch((error) => {
        console.log(error);
        dispatch(showAlert("Вы ввели неправильный пароль ключа"));
      });
  };

export const registerAction =
  (key: null | undefined | any) => async (dispatch: any) => {
    dispatch(loaderON("loginLoader"));
    const { TIN, PINFL } = key;

    const operatorsList: any = await reqGenerator.get(
      `/auth/operator/list/${TIN}`
    );
    console.log({ operatorsList });
    let operatorsTinsList = operatorsList
      ?.filter((operator: { enabled: any }) => operator?.enabled)

      ?.map((operator: { providerTin: any }) => operator?.providerTin);

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
              .then((res: any) => {
                console.log({ res });
                dispatch(saveUserData(res.user, res.token));
              });
          })
      )

      .finally(() => dispatch(loaderOFF("loginLoader")));
  };

const saveUserData = (key: { TIN: any }, token: any) => (dispatch: any) => {
  userService
    .searchUser(key.TIN, token)
    .then((res) => dispatch(authActions.login({ key, userData: res, token })))
    .catch((err) => console.log("err", err))
    .finally(() => dispatch(loaderOFF("loginLoader")));
};

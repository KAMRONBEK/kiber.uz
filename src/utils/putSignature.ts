import { AxiosResponse } from "axios";
import { store } from "../redux/store";
import { showAlert } from "../redux/thunks/alert.thunk";
import { timestamper } from "./timestamper";

const putSignature = (
  data: string | AxiosResponse<any, any>,
  key: null | undefined
) => {
  store.dispatch(showAlert("Введите пароль для ключа", "info"));

  if (!key) key = store.getState().auth.key;
  return new Promise((resolve, reject) => {
    //@ts-ignore
    window?.EIMZOClient.loadKey(
      key,

      (keyId: any) => {
        //@ts-ignore
        window.EIMZOClient.createPkcs7(
          keyId,
          data,
          timestamper,

          (pkcs7: unknown) => {
            resolve(pkcs7);
          },
          () => {
            store.dispatch(showAlert("Вы ввели неправильный пароль ключа"));
            reject("error");
          }
        );
      },
      () => {
        store.dispatch(showAlert("Error"));
        reject("error");
      }
    );
  });
};

export default putSignature;

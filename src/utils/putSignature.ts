import { store } from "../redux/store";
import { showAlert } from "../redux/thunks/alert.thunk";
import { timestamper } from "./timestamper";

//@ts-ignore
const putSignature = (data, key) => {
  store.dispatch(showAlert("Введите пароль для ключа", "info"));
  //@ts-ignore
  if (!key) key = store.getState().auth.key;
  return new Promise((resolve, reject) => {
    //@ts-ignore
    window.EIMZOClient.loadKey(
      key,
      //@ts-ignore
      (keyId) => {
        //@ts-ignore
        window.EIMZOClient.createPkcs7(
          keyId,
          data,
          timestamper,
          //@ts-ignore
          (pkcs7) => {
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

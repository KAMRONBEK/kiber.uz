import { store } from "../redux/store";
import { showAlert } from "../redux/thunks/alert.thunk";
import { timestamper } from "./timestamper";
//@ts-ignore
const putAttachedSignature = (signHash) => {
  store.dispatch(showAlert("Введите пароль для ключа", "info"));

  const key = store.getState().auth.key;
  return new Promise((resolve, reject) => {
    //@ts-ignore
    window.EIMZOClient.loadKey(
      key,
      //@ts-ignore
      (keyId) => {
        //@ts-ignore
        window.EIMZOClient.appendPkcs7Attached(
          keyId,
          signHash,
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

export default putAttachedSignature;

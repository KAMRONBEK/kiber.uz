import reqGenerator from "./reqGenerator";

//@ts-ignore
export const timestamper = (signature_hex, callback, fail) => {
  reqGenerator.get(`/utils/timestamp/${signature_hex}`).then((res) => {
    callback(res);
  });
};

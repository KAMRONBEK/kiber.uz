import moment from "moment";

//@ts-ignore
export const computeVerificationActJSON = (
  //@ts-ignore
  values,
  //@ts-ignore
  productList,
  //@ts-ignore
  guid
  //@ts-ignore
) => {
  //@ts-ignore

  const computedData = {
    ...values,
    verificationActId: guid,
    verificationActDoc: {
      ...values.verificationActDoc,
      verificationActDate:
        typeof values.verificationActDoc.verificationActDate === "object"
          ? moment(values.verificationActDoc.verificationActDate.$d).format(
              "YYYY-MM-DD"
            )
          : values.verificationActDoc.verificationActDate,
    },
    verificationActContracts: productList,
  };

  console.log({ computedData });

  return computedData;
};

export default computeVerificationActJSON;

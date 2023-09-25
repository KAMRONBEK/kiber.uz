import moment from "moment";

//@ts-ignore
export const computePlaneDocJson = (values, guid) => {
  const computedData = {
    ...values,
    documentId: guid,
    docDate:
      typeof values.docDate === "object"
        ? moment(values.docDate.$d).format("YYYY-MM-DD")
        : values.docDate,
    contractDate:
      typeof values.contractDate === "object"
        ? moment(values.contractDate.$d).format("YYYY-MM-DD")
        : values.contractDate,

    /// -----------------------
  };

  console.log({ computedData });

  return computedData;
};

export default computePlaneDocJson;

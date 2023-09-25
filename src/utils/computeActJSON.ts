import moment from "moment";

//@ts-ignore
export const computeActJSON = (values, productList, guid, catalogList) => {
  //@ts-ignore
  const computedProducts = productList.map((product) => {
    const selectedCatalog = catalogList.find(
      //@ts-ignore
      (catalog) => catalog.mxikCode === product.catalogCode
    );

    const catalogName = `${
      selectedCatalog?.subPositionName ? selectedCatalog.subPositionName : ""
    } ${selectedCatalog?.brandName ? selectedCatalog.brandName : ""} ${
      selectedCatalog?.attributeName ? selectedCatalog.attributeName : ""
    }`;

    const selectedPackageName = selectedCatalog.packageNames.find(
      // @ts-ignore
      (packageName) => packageName.mxikCode === product.catalogCode
    );

    return {
      ...product,
      catalogName,
      summa: Number(product.summa.toFixed(2)),
      packageName: selectedPackageName.nameRu,
      packageCode: product.measureId ? null : selectedPackageName.code,
    };
  });

  const computedProductList = {
    actProductId: guid,
    tin: values.sellerTin,
    products: computedProducts,
  };

  const computedData = {
    ...values,
    actId: guid,
    productList: computedProductList,
    actDoc: {
      ...values.actDoc,
      actDate:
        typeof values.actDoc.actDate === "object"
          ? moment(values.actDoc.actDate.$d).format("YYYY-MM-DD")
          : values.actDoc.actDate,

      /// --------------------------
      actText: values.actDoc.actText,
      actNo: values.actDoc.actNo,
    },
    contractDoc: {
      ...values.contractDoc,
      contractDate:
        typeof values.contractDoc.contractDate === "object"
          ? moment(values.contractDoc.contractDate.$d).format("YYYY-MM-DD")
          : values.contractDoc.contractDate,

      /// -----------------------
      contractNo: values.contractDoc.contractNo,
    },
  };

  console.log({ computedData });

  return computedData;
};

export default computeActJSON;

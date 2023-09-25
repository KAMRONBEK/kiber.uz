//@ts-ignore
export const computeWaybill = (values, productList, guid, tin, catalogList) => {
  //@ts-ignore
  const computedData = {
    //@ts-ignore

    waybillId: guid,
    ...values,
    sellerTin: values.carrierTin,
    buyerTin: values.customerTin,
    stationDocs: [],
    carriageDoc: {
      carriageRegNo: "",
      carriageModel: "",
    },
    departuresCount: values.isShiftOverall ? values.departuresCount : 0,
    productList: {
      waybillProductId: guid,
      tin: tin,
    },
  };

  //@ts-ignore
  const computedProductList = productList.map((product, index) => {
    const selectedCatalog = catalogList.find(
      //@ts-ignore
      (catalog) => catalog.mxikCode === product.catalogCode
    );
    console.log({ productList });

    const catalogName = `${
      selectedCatalog?.subPositionName ? selectedCatalog.subPositionName : ""
    } ${selectedCatalog?.brandName ? selectedCatalog.brandName : ""} ${
      selectedCatalog?.attributeName ? selectedCatalog.attributeName : ""
    }`.trim();
    const selectedPackageName = selectedCatalog.packageNames.find(
      // @ts-ignore
      (packageName) => packageName.mxikCode === product.catalogCode
    );

    console.log({ selectedPackageName });

    const totalSum = Number(product.summa) * Number(product.count);
    return {
      ...product,
      ordNo: index + 1,
      count: `${product.count}`,
      summa: `${product.summa}`,
      catalogName,
      packageName: selectedPackageName.nameRu,
      packageCode: selectedPackageName.code,
      totalSum,
    };
  });
  console.log({ computedData });
  computedData.productList.products = computedProductList;
  return computedData;
};

export default computeWaybill;

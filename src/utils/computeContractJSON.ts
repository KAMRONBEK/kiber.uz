import moment from "moment";
//@ts-ignore
const computeContractJSON = (values, productList, guid, catalogList) => {
  const computedValues = {
    ...values,
    contractId: guid,
    hasVat: values.hasVat,
    contractDoc: {
      contractName: values.contractDoc.contractName,
      contractNo: values.contractDoc.contractNo,
      contractDate: "2023-02-15",
      contractExpireDate: "2023-02-15",
      contractPlace: values.contractDoc.contractPlace,
    },
    owner: {
      tin: values.owner.tin,
      name: values.owner.name,
      address: values.owner.address,
      workPhone: values.owner.workPhone,
      mobile: values.owner.mobile,
      fax: values.owner.fax,
      oked: values.owner.oked,
      account: values.owner.account,
      bankId: values.owner.bankId,
      fizTin: values.owner.fizTin,
      fio: values.owner.fio,
      branchCode: values.owner.branchCode,
      branchName: values.owner.branchName,
    },
    parts: [
      {
        ...values.parts,

        ordNo: values.parts.ordNo,
        title: values.parts.title,
        body: values.parts.body,
      },
    ],
    products: [
      {
        ...values.products,

        ordNo: values.products.ordNo,
        barCode: values.products.barCode,
        catalogCode: values.products.catalogCode,
        catalogName: values.products.catalogName,
        name: values.products.name,
        measureId: `${values.products.measureId}`,
        count: values.products.count,
        summa: values.products.summa,
        deliverySum: values.products.deliverySum,
        vatRate: values.products.vatRate,
        vatSum: values.products.vatSum,
        deliverySumWithVat: values.products.deliverySumWithVat,
        withoutVat: values.products.withoutVat,
      },
    ],
  };

  let hasVat = false;
  //@ts-ignore
  const computedProductList = productList.map((product, index) => {
    const selectedCatalog = catalogList.find(
      //@ts-ignore
      (catalog) => catalog.mxikCode === product.catalogCode
    );

    const catalogName = `${
      selectedCatalog?.subPositionName ? selectedCatalog.subPositionName : ""
    }${selectedCatalog?.brandName ? selectedCatalog.brandName : ""}${
      selectedCatalog?.attributeName ? selectedCatalog.attributeName : ""
    }`;

    if (!product.withoutVat) hasVat = true;

    return {
      ...product,
      ordNo: index + 1,
      catalogName,
      hasVat,
      measureId: `${product.measureId}`,
    };
  });
  //@ts-ignore
  const computedParts = values.parts.map((part, index) => ({
    ...part,
    ordNo: index + 1,
  }));

  computedValues.products = computedProductList;
  computedValues.parts = computedParts;

  console.log({ computedValues });

  return computedValues;
};

export default computeContractJSON;

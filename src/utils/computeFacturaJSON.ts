import moment from "moment";
const computeFacturaJSON = (
  //@ts-ignore
  values,
  //@ts-ignore
  productList,
  //@ts-ignore
  guid,
  //@ts-ignore
  catalogList
) => {
  console.log(typeof values.facturaDoc.facturaDate === "object");
  const computedValues = {
    ...values,
    facturaId: guid,
    facturaType: values.facturaType,
    facturaDoc: {
      facturaNo: values.facturaDoc.facturaNo,
      facturaDate:
        typeof values.facturaDoc.facturaDate === "object"
          ? moment(values.facturaDoc.facturaDate.$d).format("YYYY-MM-DD")
          : values.facturaDoc.facturaDate,
    },

    oldFacturaDoc: {
      oldFacturaNo: values.oldFacturaDoc.oldFacturaNo,
      oldFacturaDate:
        typeof values.oldFacturaDoc.oldFacturaDate === "object"
          ? moment(values.oldFacturaDoc.oldFacturaDate.$d).format("YYYY-MM-DD")
          : values.oldFacturaDoc.oldFacturaDate,
      oldFacturaId: values.oldFacturaDoc.oldFacturaId,
    },

    contractDoc: {
      contractNo: values.contractDoc.contractNo,
      contractDate:
        typeof values.contractDoc.contractDate === "object"
          ? moment(values.contractDoc.contractDate.$d).format("YYYY-MM-DD")
          : values.contractDoc.contractDate,
    },
    facturaEmpowermentDoc: {
      agentFacturaId: values.facturaEmpowermentDoc.agentFacturaId,
      empowermentNo: values.facturaEmpowermentDoc.empowermentNo,
      empowermentDateOfIssue:
        values.facturaEmpowermentDoc.empowermentDateOfIssue,
      agentFio: values.facturaEmpowermentDoc.agentFio,
      agentTin: values.facturaEmpowermentDoc.agentTin,
      agentPinfl: values.facturaEmpowermentDoc.agentPinfl,
    },

    itemReleasedDoc: {
      itemReleasedTin: "",
      itemReleasedFio: "",
      itemReleasedPinfl: "",
    },

    sellerTin: values.sellerTin,
    buyerTin: values.buyerTin,
    // realizationPurpose: values.realizationPurpose,
    seller: {
      name: values.seller.name,
      account: values.seller.account,
      // category: values.seller.category,
      bankId: values.seller.bankId,
      address: values.seller.address,
      mobile: values.seller.mobile,
      workPhone: values.seller.workPhone,
      oked: values.seller.oked,
      districtId: values.seller.districtId,
      director: values.seller.director,
      accountant: values.seller.accountant,
      vatRegCode: values.seller.vatRegCode,
      branchCode: values.seller.branchCode,
      branchName: values.seller.branchName,
      taxGap: values.seller.taxGap,
      vatRegStatus: values.seller.vatRegStatus,
    },

    buyer: {
      name: values.buyer.name,
      account: values.buyer.account,
      bankId: values.buyer.bankId,
      address: values.buyer.address,
      mobile: values.buyer.mobile,
      workPhone: values.buyer.workPhone,
      oked: values.buyer.oked,
      districtId: values.buyer.districtId,
      director: values.buyer.director,
      accountant: values.buyer.accountant,
      vatRegCode: values.buyer.vatRegCode,
      branchCode: values.buyer.branchCode,
      branchName: values.buyer.branchName,
      taxGap: values.buyer.taxGap,
      vatRegStatus: values.buyer.vatRegStatus,
    },

    foreignCompany: {
      countryId: values.foreignCompany.countryId,
      name: values.foreignCompany.name,
      address: values.foreignCompany.address,
      bank: values.foreignCompany.bank,
      account: values.foreignCompany.account,
    },
  };

  if (values.facturaEmpowermentDoc?.empowermentNo) {
    computedValues.facturaEmpowermentDoc.agentFacturaId = guid;
  }

  computedValues.productList.facturaProductId = guid;
  computedValues.productList.tin = values.sellerTin;
  //@ts-ignore

  const computedProductList = productList.map((product, index) => {
    const deliverySum = Number(product.summa) * Number(product.count);

    const vatSum = (deliverySum * Number(product.vatRate)) / 100;

    const exciseSum = (deliverySum * Number(product.exciseRate)) / 100;

    const deliverySumWithVat = deliverySum + vatSum + exciseSum;

    const selectedCatalog = catalogList.find(
      //@ts-ignore
      (catalog) => catalog.mxikCode === product.catalogCode
    );

    const catalogName = `${
      selectedCatalog?.subPositionName ? selectedCatalog.subPositionName : ""
    } ${selectedCatalog?.brandName ? selectedCatalog.brandName : ""} ${
      selectedCatalog?.attributeName ? selectedCatalog.attributeName : ""
    }`.trim();

    const selectedPackageName = selectedCatalog.packageNames.find(
      // @ts-ignore
      (packageName) => packageName.mxikCode === product.catalogCode
    );

    const lgotaVatSum =
      product.vatRate <= 0 || !product.vatRate ? deliverySum * 0.12 : 0;

    return {
      ...product,
      ordNo: index + 1,
      catalogName,
      deliverySum: deliverySum.toFixed(2),
      vatSum: isNaN(Number(vatSum.toFixed(2))) ? 0 : vatSum.toFixed(2),
      deliverySumWithVat: isNaN(Math.round(deliverySumWithVat))
        ? deliverySum
        : Math.round(deliverySumWithVat),
      exciseSum: exciseSum.toFixed(2),
      lgotaType: "1",
      lgotaVatSum,
      packageName: selectedPackageName.nameRu,
      packageCode: selectedPackageName.code,
    };
  });
  computedValues.productList.products = computedProductList;
  const isExtended = [1, 2, 4, 5].includes(computedValues.facturaType);

  if (!isExtended && computedValues.oldFacturaDoc) {
    delete computedValues.oldFacturaDoc;
  }
  if (computedValues.singleSidedType === 1) {
    delete computedValues.buyer;
    delete computedValues.buyerTin;
  }

  let countLgota = 0;
  // @ts-ignore
  computedValues.productList.products.map((product) => {
    if (product.lgotaId) {
      countLgota++;
    } else {
      product.lgotaId = "";
      product.lgotaType = "";
    }
  });

  if (countLgota > 0) {
    computedValues.productList.hasLgota = true;
  } else {
    computedValues.productList.hasLgota = false;
  }

  console.log({ computedValues });
  return computedValues;
};

export default computeFacturaJSON;

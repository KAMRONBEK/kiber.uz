//@ts-ignore
const computeEmpowermentJSON = (values, productList, guid, catalogList) => {
  // @ts-ignore
  const countedProducts = productList.map((product) => {
    const floatedCount = parseInt(product.count, 10).toFixed(2);
    const selectedCatalog = catalogList.find(
      //@ts-ignore
      (catalog) => catalog.mxikCode === product.catalogCode
    );
    const catalogName = `${
      selectedCatalog?.subPositionName ? selectedCatalog.subPositionName : ""
    } ${selectedCatalog?.brandName ? selectedCatalog.brandName : ""} ${
      selectedCatalog?.attributeName ? selectedCatalog.attributeName : ""
    }`;
    return {
      ...product,
      count: Number(floatedCount),
      measureId: `${product.measureId}`,
      catalogName,
    };
  });
  return {
    ...values,
    empowermentId: guid,
    empowermentDoc: {
      empowermentNo: values.empowermentDoc.empowermentNo,
      empowermentDateOfIssue: "2023-02-15",
      empowermentDateOfExpire: "2023-03-25",
    },
    contractDoc: {
      contractNo: values.contractDoc.contractNo,
      contractDate: "2023-02-15",
    },
    agent: {
      ...values.agent,
      agentEmpowermentId: guid,
      /// ---------------------

      jobTitle: values.agent.jobTitle,
      passport: {
        dateOfIssue: "",
        issuedBy: "",
        number: "",
      },
      agentTin: values.agent.agentTin,
      fio: values.agent.fio,
    },

    seller: {
      name: values.seller.name,
      account: values.seller.account,
      bankId: values.seller.bankId,
      address: values.seller.address,
      mobile: values.seller.mobile,
      workPhone: values.seller.workPhone,
      oked: values.seller.oked,
      districtId: values.seller.districtId,
      director: values.seller.director,
      accountant: values.seller.accountant,
      branchCode: values.seller.branchCode,
      branchName: values.seller.branchName,
      // taxGap: values.seller.taxGap,
      // vatRegStatus: values.seller.vatRegStatus,
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
      branchCode: values.buyer.branchCode,
      branchName: values.buyer.branchName,
      // taxGap: values.buyer.taxGap,
      vatRegStatus: values.buyer.vatRegStatus,
    },

    productList: {
      empowermentProductId: guid,
      tin: values.buyerTin,
      products: countedProducts,
    },
  };
};

export default computeEmpowermentJSON;

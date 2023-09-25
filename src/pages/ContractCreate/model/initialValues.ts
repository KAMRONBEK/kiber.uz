export const initialValues = {
  contractId: "",
  hasVat: "true",
  contractDoc: {
    contractName: "",
    contractNo: "",
    contractDate: "",
    contractExpireDate: "",
    contractPlace: "",
  },
  owner: {
    tin: "",
    name: "",
    address: "",
    workPhone: "",
    mobile: "",
    fax: "",
    oked: "",
    account: "",
    bankId: "",
    fizTin: "",
    fio: "",
    branchCode: "",
    branchName: "",
  },
  clients: [
    {
      id: 1,
      tin: "",
      name: "",
      address: "",
      workPhone: "",
      mobile: "",
      fax: "",
      oked: "",
      account: "",
      bankId: "",
      fizTin: "",
      fio: "",
      branchCode: "",
      branchName: "",
    },
  ],
  products: [
    {
      ordNo: "",
      barCode: "",
      catalogCode: "",
      catalogName: "",
      name: "",
      measureId: 1,
      count: "",
      summa: "",
      deliverySum: "",
      vatRate: "",
      vatSum: "",
      deliverySumWithVat: "",
      withoutVat: false,
    },
  ],
  parts: [
    {
      ordNo: "",
      title: "",
      body: "",
    },
  ],
};

export const initialState = [
  {
    contractNo: 1,
    contractDate: "",
    verificationActContractItems: [
      {
        ownerOperationDate: "",
        ownerOperationName: "",
        ownerDebit: "",
        ownerCredit: "",
        partnerOperationDate: "",
        partnerOperationName: "",
        partnerDebit: "",
        partnerCredit: "",
      },
    ],
    openBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
    closeBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
    totalBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
  },
];

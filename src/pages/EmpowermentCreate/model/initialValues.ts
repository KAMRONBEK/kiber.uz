import moment from "moment";

export const initialValues = {
  empowermentDoc: {
    empowermentNo: "",
    empowermentDateOfIssue: "",
    empowermentDateOfExpire: "",
  },
  contractDoc: { contractNo: "", contractDate: "" },
  agent: {
    agentTin: "",
    jobTitle: "",
    fio: "",

    number: "",
    dateOfIssue: "",
    issuedBy: "",
  },
  sellerTin: "",
  buyerTin: "",
  buyer: {
    name: "",
    account: "",
    bankId: "",
    address: "",
    mobile: "",
    workPhone: "",
    oked: "",
    districtId: "",
    director: "",
    accountant: "",
    branchCode: "",
    branchName: "",
  },
  seller: {
    name: "",
    account: "",
    bankId: "",
    address: "",
    mobile: "",
    workPhone: "",
    oked: "",
    districtId: "",
    director: "",
    accountant: "",
    branchCode: "",
    branchName: "",
  },
};

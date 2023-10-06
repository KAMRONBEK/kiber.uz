import reqGenerator from "../utils/reqGenerator";

const docService = {
  // @ts-ignore
  getDocList: (params) => reqGenerator.get("/doc/list", { params }),
  // @ts-ignore
  getActDocList: (params) => reqGenerator.get("/act/list", { params }),
  // @ts-ignore
  getPlaneDocList: (params) => reqGenerator.get("/document/list", { params }),
  // @ts-ignore
  getVerificationActDocList: (params) =>
    reqGenerator.get("/verification-act/list", { params }),
  // @ts-ignore
  getInvoiceDocList: (params) => reqGenerator.get("/factura/list", { params }),
  // @ts-ignore
  getContractDocList: (params) =>
    reqGenerator.get("/contract/list", { params }),
  // @ts-ignore
  getEmpowermentDocList: (params) =>
    reqGenerator.get("/empowerment/list", { params }),
  // @ts-ignore
  getActData: (id) => reqGenerator.get(`/act/detail/${id}`),
  // @ts-ignore
  getPlaneDocData: (id) => reqGenerator.get(`/document/detail/${id}`),
  // @ts-ignore
  getVerificationActData: (id) =>
    reqGenerator.get(`/verification-act/detail/${id}`),
  // @ts-ignore
  getWaybillData: (id) => reqGenerator.get(`/waybill/detail/${id}`),
  // @ts-ignore
  getInvoiceData: (id, tin?: any) =>
    reqGenerator.get(`/factura/detail/${id}?tin=${tin}`),
  // @ts-ignore
  getContractData: (id) => reqGenerator.get(`/contract/detail/${id}`),
  // @ts-ignore
  getEmpowermentData: (id) => reqGenerator.get(`/empowerment/detail/${id}`),
  // @ts-ignore
  getDocData: (id) => reqGenerator.get(`/doc/list/${id}`),
};

export default docService;

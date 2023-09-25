import reqGenerator from "../utils/reqGenerator";

const lgotaService = {
  fetchVatProduct: (
    lang = "ru",
    page = 0,
    tasnifName = "",
    lgotaName = "",
    tasnifCode = ""
  ) =>
    reqGenerator.get(
      `lgota/products-without-vat?lang=${lang}&page=${page}&size=10${
        tasnifName && `&tasnifName=${tasnifName}`
      }${lgotaName && `&lgotaName=${lgotaName}`}${
        tasnifCode && `&tasnifCode=${tasnifCode}`
      }`
    ),
  fetchZeroVatProduct: (
    lang = "ru",
    page = 0,
    tasnifName = "",
    lgotaName = "",
    tasnifCode = ""
  ) =>
    reqGenerator.get(
      `/lgota/products-with-zero-vat?lang=${lang}&page=${page}&size=10${
        tasnifName && `&tasnifName=${tasnifName}`
      }${lgotaName && `&lgotaName=${lgotaName}`}${
        tasnifCode && `&tasnifCode=${tasnifCode}`
      }`
    ),
  fetchCompaniesSeller: (lang = "ru", page = 0, tin = "", lgotaName = "") =>
    reqGenerator.get(
      `/lgota/companies-seller-with-privileged?lang=${lang}&page=${page}&size=10${
        tin && `&tin=${tin}`
      }${lgotaName && `&lgotaName=${lgotaName}`}
      `
    ),
  fetchCompaniesBuyer: (lang = "ru", page = 0, tin = "", lgotaName = "") =>
    reqGenerator.get(
      `/lgota/companies-buyer-with-privileged?lang=${lang}&page=${page}&size=10${
        tin && `&tin=${tin}`
      }${lgotaName && `&lgotaName=${lgotaName}`}`
    ),
  fetchProductNotIncluded: (lang = "ru", page = 0, catalogCode = "") =>
    reqGenerator.get(
      `/lgota/products-not-included?lang=${lang}&page=${page}&size=10${
        catalogCode && `&searchText=${catalogCode}`
      }`
    ),
  fetchCompensation: (lang = "ru", page = 0, catalogCode = "") =>
    reqGenerator.get(
      `/lgota/compensation-work?lang=${lang}&page=${page}&size=10${
        catalogCode && `&searchText=${catalogCode}`
      }`
    ),
  fetchLgota: (body = {}) =>
    reqGenerator.post(`/lgota/check-product-lgota`, body),
  fetchLgotaNew: (body = {}) => reqGenerator.post(`/lgota/list`, body),
  fetchLgotaList: () => reqGenerator.get(`/admin/tariff/list`),
};

export default lgotaService;

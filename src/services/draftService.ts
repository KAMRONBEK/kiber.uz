import reqGenerator from "../utils/reqGenerator";

const draftService = {
  // @ts-ignore
  getDraftsList: (type, tin) =>
    reqGenerator.get(`${type}/list?draft=true&type=sender&tin=${tin}`),
  // @ts-ignore
  getDraftData: (id) => reqGenerator.get(`/draft/detail/${id}`),
  // @ts-ignore
  createDraft: (data, type) => reqGenerator.post(`/${type}/create`, data),
  // @ts-ignore
  updateDraftData: (data, type) => reqGenerator.put(`/${type}/update`, data),
  // @ts-ignore
  deleteDraft: (id, type) => reqGenerator.delete(`/${type}/delete/${id}`),
  // @ts-ignore
  createDocDraft: (data, type) => reqGenerator.post(`/${type}/create`, data),
};

export default draftService;

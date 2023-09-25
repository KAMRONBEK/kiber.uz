import reqGenerator from "../utils/reqGenerator";

const productService = {
  // @ts-ignore
  searchProduct: (text) =>
    reqGenerator.get("/product/search", { params: { text } }),
  // @ts-ignore
  addProduct: (data) => reqGenerator.post("/product/add", data),
};

export default productService;

import reqGenerator from "../utils/reqGenerator";

const userService = {
  //@ts-ignore
  searchUser: (tin, token) => {
    localStorage.setItem("token", JSON.stringify(token));
    return reqGenerator.get(`/user/get-info/${tin}`);
  },
  //@ts-ignore
  getUserDocument: (tin) => reqGenerator.get(`admin/document/stat/${tin}`),
};

export default userService;

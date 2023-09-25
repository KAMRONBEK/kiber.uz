import reqGenerator, { reqBlob } from "../utils/reqGenerator";

const userInfo = {
  // @ts-ignore
  userInfo: (tin) => reqGenerator.get(`/user/info/${tin}`),
  // @ts-ignore
  userUpdate: (tin) =>
    reqGenerator.put("/user/update", tin, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  // @ts-ignore
  userUpdateImage: (id, img) => {
    const data = new FormData();

    data.append("action", "ADD");
    // @ts-ignore
    data.append("param", 0);
    // @ts-ignore
    data.append("secondParam", 0);
    data.append("avatar", img);

    reqBlob.put(`/user/update-avatar/${id}`, data);
  },
  // @ts-ignore
  userPassword: (id, password) =>
    reqGenerator.put(`/user/update-password/${id}`, {
      password,
    }),
};

export default userInfo;

import reqGenerator from "../utils/reqGenerator";

const landingServive = {
  //@ts-ignore
  getTariffsList: (params) =>
    reqGenerator.get("/admin/tariffs", {
      params,
      auth: {
        username: "admin",
        password: "qwerty!zxc!shadowF1end?",
      },
    }),
  //@ts-ignore
  getTutorialsList: (params) =>
    reqGenerator.get("/admin/how-to", {
      params,
      auth: {
        username: "admin",
        password: "qwerty!zxc!shadowF1end?",
      },
    }),
};

export default landingServive;

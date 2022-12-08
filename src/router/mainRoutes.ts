// import ActCreate from "../pages/ActCreate"
// import ContractCreate from "../pages/ContractCreate"
// import DocListPage from "../pages/DocList"
// import Drafts from "../pages/DocList/Drafts"
// import DraftsPage from "../pages/Drafts"
// import EmpowermentCreate from "../pages/EmpowermentCreate"
// import FacturaCreate from "../pages/FacturaCreate"
// import MyProducts from "../pages/MyProducts"
// import PersonalArea from "../pages/PersonalArea"
// import Statistic from "../pages/PersonalArea/Statistic"
// import ActPreview from "../pages/Previews/ActPreview"
// import ContractPreview from "../pages/Previews/ContractPreview"
// import EmpowermentPreview from "../pages/Previews/EmpowermentPreview"
// import FacturaPreview from "../pages/Previews/FacturaPreview"

// const mainRoutes = [
//   {
//     component: DocListPage,
//     path: "/docs/:type",
//     exact: true,
//     title: "DocList",
//   },
//   {
//     component: ActCreate,
//     path: "/act/create",
//     exact: true,
//     title: "ActCreate",
//   },
//   {
//     component: FacturaCreate,
//     path: "/factura/create",
//     exact: true,
//     title: "FacturaCreate",
//   },
//   {
//     component: EmpowermentCreate,
//     path: "/empowerment/create",
//     exact: true,
//     title: "EmpowermentCreate",
//   },
//   {
//     component: ContractCreate,
//     path: "/contract/create",
//     exact: true,
//     title: "ContractCreate",
//   },
//   {
//     component: DraftsPage,
//     path: "/drafts",
//     exact: true,
//     title: "DraftEdit",
//   },
//   {
//     component: ActPreview,
//     path: "/act/:id",
//     exact: true,
//     title: "ActPreview",
//   },
//   {
//     component: EmpowermentPreview,
//     path: "/empowerment/:id",
//     exact: true,
//     title: "EmpowermentPreview",
//   },
//   {
//     component: FacturaPreview,
//     path: "/invoice/:id",
//     exact: true,
//     title: "FacturaPreview",
//   },
//   {
//     component: ContractPreview,
//     path: "/contract/:id",
//     exact: true,
//     title: "ContractPreview",
//   },
//   {
//     component: MyProducts,
//     path: "/settings/my-products",
//     exact: true,
//     title: "MyProducts",
//   },
//   {
//     component: PersonalArea,
//     path: "/personal-area",
//     exact: true,
//     title: "PersonalArea",
//   },
//   {
//     component: Statistic,
//     path: "/statistic",
//     exact: true,
//     title: "Statistic",
//   },
// ].map((route) => ({
//   ...route,
//   path: `/main${route.path}`,
//   id: Math.random() + new Date().getTime(),
// }))

export default {};

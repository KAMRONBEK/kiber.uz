import ActCreate from "../pages/ActCreate";
import ContractCreate from "../pages/ContractCreate";
import DocListPage from "../pages/DocList";
import EmpowermentCreate from "../pages/EmpowermentCreate";
import FacturaCreate from "../pages/FacturaCreate";
import PersonalArea from "../pages/PersonalArea";
import DraftsPage from "../pages/Drafts";
// // import Drafts from "../pages/DocList/Drafts"
import MyProducts from "../pages/MyProducts";
import Documents from "../pages/Documents";
import WaybillCreate from "../pages/WaybillCreate";
// import Statistic from "../pages/PersonalArea/Statistic";
import ActPreview from "../pages/Previews/ActPreview";
import ContractPreview from "../pages/Previews/ContractPreview";
import EmpowermentPreview from "../pages/Previews/EmpowermentPreview";
import FacturaPreview from "../pages/Previews/FacturaPreview";
import WaybillPreview from "../pages/Previews/WaybillPreview";
import CheckedAct from "../pages/CheckedAct";
import VerificationActPreview from "../pages/Previews/VerificationActPreview";
import FacturaDraft from "../pages/SingleDraft/FacturaDraft";
import ActDraft from "../pages/SingleDraft/ActDraft";
import EmpowermentDraft from "../pages/SingleDraft/EmpowermentDraft";
import WaybillDraft from "../pages/SingleDraft/WaybillDraft";
import CheckedActDraft from "../pages/SingleDraft/CheckedActDraft";
import ContractDraft from "../pages/SingleDraft/ContractDraft";
import PlaneDoc from "../pages/PlaneDoc";
import PlaneDocPreview from "../pages/Previews/PlaneDocPreview";

const mainRoutes = [
  {
    component: DocListPage,
    path: "/docs/:type",
    exact: true,
    title: "DocList",
  },
  {
    component: ActCreate,
    path: "/act/create",
    exact: true,
    title: "ActCreate",
  },
  {
    component: CheckedAct,
    path: "/act-empowerment/create",
    exact: true,
    title: "CActCreate",
  },
  {
    component: FacturaCreate,
    path: "/factura/create",
    exact: true,
    title: "FacturaCreate",
  },
  {
    component: WaybillCreate,
    path: "/waybill/create",
    exact: true,
    title: "WaybillCreate",
  },
  {
    component: EmpowermentCreate,
    path: "/empowerment/create",
    exact: true,
    title: "EmpowermentCreate",
  },
  {
    component: ContractCreate,
    path: "/contract/create",
    exact: true,
    title: "ContractCreate",
  },
  {
    component: PlaneDoc,
    path: "/plane-doc/create",
    exact: true,
    title: "PlaneDoc",
  },

  {
    component: EmpowermentDraft,
    path: "/empowerment/draft",
    exact: true,
    title: "EmpowermentDraft",
  },
  {
    component: WaybillDraft,
    path: "/waybill/draft",
    exact: true,
    title: "WaybillDraft",
  },
  {
    component: ContractDraft,
    path: "/contract/draft",
    exact: true,
    title: "ContractDraft",
  },
  {
    component: CheckedActDraft,
    path: "/verification-act/draft",
    exact: true,
    title: "CheckedActDraft",
  },
  {
    component: DraftsPage,
    path: "/drafts",
    exact: true,
    title: "DraftEdit",
  },
  {
    component: ActPreview,
    path: "/act/:id",
    exact: true,
    title: "ActPreview",
  },
  {
    component: VerificationActPreview,
    path: "/verification-act/:id",
    exact: true,
    title: "ActPreview",
  },
  {
    component: WaybillPreview,
    path: "/waybill/:id",
    exact: true,
    title: "WaybillPreview",
  },
  {
    component: EmpowermentPreview,
    path: "/empowerment/:id",
    exact: true,
    title: "EmpowermentPreview",
  },
  {
    component: FacturaPreview,
    path: "/invoice/:id",
    exact: true,
    title: "FacturaPreview",
  },
  {
    component: ContractPreview,
    path: "/contract/:id",
    exact: true,
    title: "ContractPreview",
  },
  {
    component: PlaneDocPreview,
    path: "/plane-doc/:id",
    exact: true,
    title: "PlaneDocPreview",
  },
  {
    component: MyProducts,
    path: "/settings/my-products",
    exact: true,
    title: "MyProducts",
  },
  {
    component: PersonalArea,
    path: "/personal-area",
    exact: true,
    title: "PersonalArea",
  },
  {
    component: Documents,
    path: "/documents",
    exact: true,
    title: "IncomingDocuments",
  },
  //   {
  //     component: Statistic,
  //     path: "/statistic",
  //     exact: true,
  //     title: "Statistic",
  //   },
].map((route) => ({
  ...route,
  path: `/main${route.path}`,
  id: Math.random() + new Date().getTime(),
}));

export default mainRoutes;

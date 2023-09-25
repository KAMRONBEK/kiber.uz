import {
  Download,
  Upload,
  SupervisorAccount,
  Save,
  Settings,
} from "@mui/icons-material"

const routes = [
  {
    id: "documents",
    // title: "Список документов",
    children: [
      {
        id: "sender",
        title: "Исходящие",
        path: "/main/docs/sender",
        icon: Upload,
        isChild: true,
      },
      {
        id: "receiver",
        title: "Входящие",
        path: "/main/docs/receiver",
        icon: Download,
        isChild: true,
      },
      {
        id: "agent",
        title: "Доверенное лицо",
        path: "/main/docs/agent",
        icon: SupervisorAccount,
        isChild: true,
      },
      {
        id: "drafts",
        title: "Сохранённые",
        path: "/main/drafts",
        icon: Save,
        isChild: true,
      },
      {
        id: "my-products",
        title: "Мои товары (услуги)",
        path: "/main/settings/my-products",
        icon: Settings,
        isChild: true,
      },
    ],
  },
]

export default routes

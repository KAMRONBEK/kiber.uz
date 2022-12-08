import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { translationRu } from "./languageRu"
import { translationUz } from "./languageUz"

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRu },
    uz: { translation: translationUz },
  },
  //   lng: "ru",
  fallbackLng: "ru",

  interpolation: {
    escapeValue: false,
  },
})

export default i18n

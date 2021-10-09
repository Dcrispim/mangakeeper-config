import i18next from "i18next";
import { messeges } from "./languages/messeges";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  debug: false,
  resources: messeges,
  defaultNS: "translation",
  fallbackLng: "pt",
  ns: ["translation"],
});

const i18n = (text: string) => i18next.t(text);

export default i18n;

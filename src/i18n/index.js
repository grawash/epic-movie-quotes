import { createI18n } from "vue-i18n";
import ka from "./lang/ka/index";
import en from "./lang/en/index";

const messages = {
  en,
  ka,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;

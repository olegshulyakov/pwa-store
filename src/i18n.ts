import { createI18n } from "vue-i18n";
import { messages } from "./locales/messages";

export const availableLocales = Object.keys(messages);
export const fallbackLocale = "en";

const i18n = createI18n({ locale: "en", fallbackLocale });

for (const locale of availableLocales) {
  i18n.global.setLocaleMessage(locale, messages[locale]);
}

if (availableLocales.includes(navigator.language)) {
  document.querySelector("html")?.setAttribute("lang", navigator.language);
} else {
  document.querySelector("html")?.setAttribute("lang", fallbackLocale);
}

export default i18n;

import { createI18n } from "vue-i18n";

export const SUPPORT_LOCALES = ["en"];
const options = { locale: "en", fallbackLocale: "en" };

const i18n = createI18n(options);

export default i18n;

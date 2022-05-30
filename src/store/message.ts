import { defineStore } from "pinia";
import type { MessageState } from "types";
import i18n, { fallbackLocale, SUPPORT_LOCALES } from "../i18n";

export const useMessageStore = defineStore("message", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      messages: {},
    } as MessageState),

  actions: {
    async fetchLocaleMessages(locale: string) {
      const data = await import(`../locales/${locale}.json`);
      const messages = data.default;

      // set locale and locale message
      i18n.global.setLocaleMessage(locale, messages);

      this.locale = locale;
      this.error = undefined;
      this.messages = messages;
      this.pending = false;
    },

    updateApplicationLanguage(locale = navigator.language) {
      if (SUPPORT_LOCALES.includes(locale)) {
        document.querySelector("html")?.setAttribute("lang", locale);
      } else {
        document.querySelector("html")?.setAttribute("lang", fallbackLocale);
      }
    },
  },
});

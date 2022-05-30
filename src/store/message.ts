import { defineStore } from "pinia";
import type { MessageState } from "types";
import i18n from "../i18n";

export const useMessageStore = defineStore("message", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      messages: {},
    } as MessageState),

  actions: {
    async fetchLocaleMessages(locale = navigator.language) {
      const data = await import(`../locales/${locale}.json`);
      const messages = data.default;

      // set locale and locale message
      i18n.global.setLocaleMessage(locale, messages);

      document.querySelector("html")?.setAttribute("lang", locale);

      this.locale = locale;
      this.error = undefined;
      this.messages = messages;
      this.pending = false;
    },
  },
});

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
      const messages = (await import(/* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`)).default;

      // set locale and locale message
      i18n.global.setLocaleMessage(locale, messages);

      this.locale = locale;
      this.error = undefined;
      this.messages = messages;
      this.pending = false;
    },
  },
});

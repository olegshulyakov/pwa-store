import { defineStore } from "pinia";
import type { MessageState } from "types";
import i18n, { fallbackLocale } from "../i18n";

export const useMessageStore = defineStore("message", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      messages: {},
    } as MessageState),

  actions: {
    async fetchLocaleMessages(locale = navigator.language) {
      try {
        const messages = (await import(/* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`)).default;

        this.locale = locale;
        this.error = undefined;
        this.messages = messages;

        // set locale and locale message
        i18n.global.setLocaleMessage(locale, messages);

        this.pending = false;
      } catch (err) {
        this.error = JSON.stringify(err);
        console.error(`Cannot load localization ${locale}\n${err}`);

        await this.fetchLocaleMessages(fallbackLocale);
      }
    },
  },
});

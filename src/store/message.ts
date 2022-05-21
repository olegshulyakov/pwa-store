import i18n from "../i18n";
import type { MessageState } from "types";
import { debug } from "../utils";

const initialState: MessageState = {
  locale: undefined,
  pending: true,
  messages: {},
};

const name = "message";
const state = Object.assign({}, initialState);

export default {
  name,
  state,

  mutations: {},

  actions: {
    reset() {
      this.mutate(initialState);
    },
    mutate(next: object) {
      debug.store.state(name, state, next);
      Object.assign(state, next);
    },

    async fetchLocaleMessages(locale = navigator.language) {
      debug.store.message.fetch(locale);

      try {
        const messages = (await import(/* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`)).default;

        this.mutate({
          locale,
          pending: false,
          error: undefined,
          messages,
        });

        // set locale and locale message
        i18n.global.setLocaleMessage(locale, messages);
      } catch (err) {
        state.error = JSON.stringify(err);
        console.error(`Cannot load localization ${locale}\n${err}`);

        await this.fetchLocaleMessages(i18n.global.fallbackLocale as string);
      }
    },
  },
};

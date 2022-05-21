import i18n from "../i18n";
import { debug } from "../utils";
import type { ApplicationState } from "../../types";

const initialState: ApplicationState = {
  locale: undefined,
  pending: true,
  applications: [],
};

const name = "application";
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

    async fetchApplications(locale = navigator.language) {
      debug.store.application.fetch(locale);
      try {
        const data = await fetch(`./data/${locale}.json`, { mode: "no-cors" });

        this.mutate({
          locale,
          pending: false,
          error: undefined,
          applications: await data.json(),
        });
      } catch (err) {
        state.error = JSON.stringify(err);
        console.error(`Cannot load ${locale} applications\n${err}`);

        await this.fetchApplications(i18n.global.fallbackLocale as string);
      }
    },
  },
};

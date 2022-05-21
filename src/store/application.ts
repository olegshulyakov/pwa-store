import { defineStore } from "pinia";
import type { ApplicationState } from "../../types";
import { fallbackLocale } from "../i18n";

export const useApplicationStore = defineStore("application", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      applications: [],
    } as ApplicationState),

  actions: {
    async fetchApplications(locale = navigator.language) {
      try {
        const data = await fetch(`./data/${locale}.json`, { mode: "no-cors" });

        this.locale = locale;
        this.error = undefined;
        this.applications = await data.json();
        this.pending = false;
      } catch (err) {
        this.error = JSON.stringify(err);
        console.error(`Cannot load ${locale} applications\n${err}`);

        await this.fetchApplications(fallbackLocale);
      }
    },
  },
});

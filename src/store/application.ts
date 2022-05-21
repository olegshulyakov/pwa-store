import { defineStore } from "pinia";
import type { ApplicationState } from "../../types";

export const useApplicationStore = defineStore("application", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      applications: [],
    } as ApplicationState),

  actions: {
    async fetchApplications(locale = navigator.language) {
      const data = await fetch(`./data/${locale}.json`, { mode: "no-cors" });

      this.locale = locale;
      this.error = undefined;
      this.applications = await data.json();
      this.pending = false;
    },
  },
});

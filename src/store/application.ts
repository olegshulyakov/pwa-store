import { defineStore } from "pinia";
import type { AppInfo, ApplicationState } from "../../types";
import { useMessageStore } from "./message";

export const useApplicationStore = defineStore("application", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      applications: [],
      categories: {},
    } as ApplicationState),

  actions: {
    async fetchApplications(locale = navigator.language) {
      const data = await fetch(`/data/${locale}.json`);
      const apps = await data.json();
      this.locale = locale;
      this.error = undefined;
      this.applications = apps;

      this.sortByCategories(apps);

      this.pending = false;
    },

    sortByCategories(applications: AppInfo[]) {
      const messageStore = useMessageStore();
      for (const c of Object.keys(messageStore.messages.category)) {
        this.categories = Object.assign(this.categories, { [c]: [] });
      }

      for (const app of applications) {
        if (!app.categories) {
          this.categories["general"].push(app);
          continue;
        }

        let isFound = false;
        for (const appCategory of app.categories) {
          if (Object.keys(this.categories).includes(appCategory)) {
            this.categories[appCategory].push(app);
            isFound = true;
          }
        }

        if (!isFound) {
          this.categories["general"].push(app);
        }
      }
    },
  },
});

import { defineStore } from "pinia";
import type { AppInfo, ApplicationState } from "../../types";

export const useApplicationStore = defineStore("application", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      applications: [],
      categories: [],
    } as ApplicationState),

  actions: {
    async fetchApplications(locale = navigator.language) {
      const data = await fetch(`./data/${locale}.json`, { mode: "no-cors" });
      const apps = await data.json();
      this.locale = locale;
      this.error = undefined;
      this.applications = apps;
      this.categories = [];

      this.sortByCategories(apps);

      this.pending = false;
    },

    putApplicationIntoCategory(name: string, app: AppInfo) {
      const existing = this.categories.find((c) => c.name === name);
      if (existing) {
        existing.applications.push(app);
      } else {
        this.categories.push({ name: name, applications: [app] });
      }
    },

    sortByCategories(applications: AppInfo[]) {
      for (const app of applications) {
        if (!app.categories) {
          this.putApplicationIntoCategory("general", app);
          continue;
        }

        for (const appCategory of app.categories) {
          this.putApplicationIntoCategory(appCategory, app);
        }
      }
    },
  },
});

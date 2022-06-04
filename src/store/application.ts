import i18n from "../i18n";
import { defineStore } from "pinia";
import type { AppInfo, ApplicationState } from "../../types";

export const useApplicationStore = defineStore("application", {
  state: () =>
    ({
      locale: undefined,
      pending: true,
      applications: [],
      categories: {},
    } as ApplicationState),

  actions: {
    async fetchApplications(locale = i18n.global.locale) {
      const data = await import(`../data/${locale}.json`);
      const apps = data.default;
      this.locale = locale;
      this.error = undefined;
      this.applications = apps;

      this.sortByCategories(apps);

      this.pending = false;
    },

    sortByCategories(applications: AppInfo[]) {
      for (const c of Object.keys(i18n.global.getLocaleMessage(i18n.global.locale)["category"])) {
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

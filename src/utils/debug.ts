import type { RouteLocationNormalized } from "vue-router";

const isDebug = process.env.NODE_ENV != "production";

export default {
  isDebug,

  router: {
    route: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (!isDebug) return;

      console.groupCollapsed(`route from ${from.path} to ${to.path}`);
      console.log("from", from);
      console.log("to", to);
      console.groupEnd();
    },
  },

  store: {
    state: (name: string, prev: object, next: object) => {
      if (!isDebug) return;
      console.groupCollapsed(`change state ${name}`);
      console.log("prev", prev);
      console.log("next", next);
      console.groupEnd();
    },
    message: {
      fetch: (locale: string) => {
        if (!isDebug) return;
        console.groupCollapsed(`load localization ${locale}`);
        console.log("locale", locale);
        console.groupEnd();
      },
    },
    application: {
      fetch: (locale: string) => {
        if (!isDebug) return;
        console.groupCollapsed(`load applications ${locale}`);
        console.log("locale", locale);
        console.groupEnd();
      },
    },
  },
};

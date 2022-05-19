<script lang="ts">
import i18n from "@/i18n";
import AppCard from "@/components/AppCard.vue";
import { AppInfo } from "@/types";

export default {
  components: {
    AppCard,
  },
  data() {
    return {
      error: "",
      apps: [] as AppInfo[],
    };
  },
  mounted: async function () {
    // load locale applications with dynamic import
    const locale = i18n.global.locale;
    try {
      const json = await import(/* webpackChunkName: "data-[request]" */ `../data/${locale}.json`);
      this.apps = json.default || [];
    } catch (err) {
      this.error = err;
    }
  },
};
</script>

<template>
  <div>
    <p v-if="error">Error while fetching apps</p>

    <ul v-else-if="apps" class="grid grid-cols-4 md:grid-cols-6 gap-4">
      <li v-for="(app, index) in apps" :key="index">
        <AppCard :app="app" />
      </li>
    </ul>

    <div v-else>Loading...</div>
  </div>
</template>

<template>
  <AppGrid :applications="filteredApps" />
</template>

<script lang="ts">
import AppGrid from "@/components/AppGrid.vue";
import { computed } from "vue";
import { useApplicationStore } from "../store/application";
import { useRoute } from "vue-router";

export default {
  components: {
    AppGrid,
  },
  setup() {
    const route = useRoute();
    const text = route.query.text as string;

    const appStore = useApplicationStore();
    return {
      filteredApps: computed(() =>
        appStore.applications.filter((app) => {
          return app.title.toLowerCase().includes(text) || app.url.toLowerCase().includes(text);
        })
      ),
    };
  },
};
</script>

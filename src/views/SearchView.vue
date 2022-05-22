<template>
  <ApplicationGrid :applications="filteredApps" />
</template>

<script lang="ts">
import ApplicationGrid from "../components/ApplicationGrid.vue";
import { computed } from "vue";
import { useApplicationStore } from "../store/application";
import { useRoute } from "vue-router";

export default {
  components: {
    ApplicationGrid,
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

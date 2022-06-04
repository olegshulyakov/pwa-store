<template>
  <ApplicationGrid :applications="applications" />
</template>

<script lang="ts">
import { computed, useAttrs } from "vue";
import ApplicationGrid from "../components/ApplicationGrid.vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    ApplicationGrid,
  },
  setup() {
    const attrs = useAttrs();
    const text = computed(() => (attrs.text as string).toLowerCase());

    const appStore = useApplicationStore();
    return {
      text,
      applications: computed(() =>
        appStore.applications.filter((app) => {
          if (!app.name || !app.url) {
            console.warn("invalid app:", app);
            return false;
          }
          return app.name.toLowerCase().includes(text.value) || app.url.toLowerCase().includes(text.value);
        })
      ),
    };
  },
};
</script>

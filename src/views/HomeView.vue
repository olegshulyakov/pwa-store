<template>
  <p v-if="pending">Loading...</p>

  <p v-if="error">Error while fetching applications</p>

  <ApplicationGrid :applications="applications" />
</template>

<script lang="ts">
import ApplicationGrid from "@/components/ApplicationGrid.vue";
import { computed } from "vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    ApplicationGrid,
  },
  setup() {
    const appStore = useApplicationStore();
    return {
      pending: computed(() => appStore.pending),
      error: computed(() => appStore.error),
      applications: computed(() => appStore.applications),
    };
  },
};
</script>

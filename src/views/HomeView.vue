<template>
  <p v-if="pending">Loading...</p>

  <p v-if="error">Error while fetching applications</p>

  <AppGrid :applications="applications" />
</template>

<script lang="ts">
import AppGrid from "@/components/AppGrid.vue";
import { computed } from "vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    AppGrid,
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

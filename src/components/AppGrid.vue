<template>
  <div>
    <p v-if="pending">Loading...</p>
    <p v-if="error">Error while fetching applications</p>

    <ul v-else-if="applications" class="grid grid-cols-4 md:grid-cols-6 gap-4">
      <li v-for="(app, index) in applications" :key="index">
        <AppCard :app="app" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import AppCard from "./AppCard.vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    AppCard,
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

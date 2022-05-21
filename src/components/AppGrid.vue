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
import AppCard from "@/components/AppCard.vue";
import store from "@/store";

export default {
  components: {
    AppCard,
  },
  setup() {
    return {
      pending: computed(() => store.applicationStore.state.pending),
      error: computed(() => store.applicationStore.state.error),
      applications: computed(() => store.applicationStore.state.applications),
    };
  },
};
</script>

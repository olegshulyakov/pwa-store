<template>
  <ul v-if="applications" class="grid grid-cols-4 md:grid-cols-6 gap-4">
    <li v-for="(app, index) in applications" :key="index">
      <AppCard :app="app" />
    </li>
  </ul>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import type { PropType } from "vue";
import AppCard from "./AppCard.vue";

export default {
  components: {
    AppCard,
  },
  props: {
    applications: { type: Array as PropType<AppInfo[]>, required: true },
  },
};
</script>

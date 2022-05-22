<template>
  <ul v-if="applications" class="grid grid-cols-4 md:grid-cols-6 gap-4">
    <li v-for="(app, index) in applications" :key="index">
      <ApplicationCard :app="app" />
    </li>
  </ul>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import type { PropType } from "vue";
import ApplicationCard from "./ApplicationCard.vue";

export default {
  components: {
    ApplicationCard,
  },
  props: {
    applications: { type: Array as PropType<AppInfo[]>, required: true },
  },
};
</script>

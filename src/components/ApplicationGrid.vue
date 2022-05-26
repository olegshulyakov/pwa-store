<template>
  <ul v-if="applications" class="py-2 md:py-4 grid justify-center auto-rows-auto gap-4 md:gap-8">
    <li v-for="app in applications" class="w-full h-full">
      <ApplicationCard :key="app.name" :app="app" />
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

<style>
ul {
  grid-template-columns: repeat(auto-fit, 10rem);
}

@media (min-width: 768px) {
  ul {
    grid-template-columns: repeat(auto-fit, 12rem);
  }
}
</style>

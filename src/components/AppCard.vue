<template>
  <div class="flex flex-col items-center">
    <img :src="app.icon" width="192" height="192" />

    <h4>{{ app.title }}</h4>

    <a :href="app.url" target="_blank" class="btn btn-green">
      <span>Get</span>
    </a>
  </div>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import type { PropType } from "vue";

export default {
  props: {
    app: { type: Object as PropType<AppInfo>, required: true },
  },
};
</script>

<style lang="postcss">
.btn {
  @apply bg-transparent font-semibold inline-flex items-center py-1 px-2 rounded text-green-500 border border-green-500;
}
.btn:hover {
  @apply bg-green-500 text-white border-transparent;
}
</style>

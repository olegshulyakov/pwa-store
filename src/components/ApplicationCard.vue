<template>
  <div class="flex flex-col items-center py-4 rounded-xl shadow-md">
    <img :src="app.icon" :alt="app.title" class="w-48 h-48" />

    <h4 class="my-1">{{ app.title }}</h4>

    <a
      :href="app.url"
      target="_blank"
      :alt="$t('applicationCard.get')"
      class="bg-transparent font-semibold inline-flex items-center py-1 px-3 rounded-lg text-green-500 border border-green-500 hover:bg-green-500 hover:text-white border-transparent"
    >
      {{ $t("applicationCard.get") }}
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

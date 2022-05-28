<template>
  <div class="h-full w-40 md:w-48 flex flex-col items-center pb-4 rounded-xl shadow-md">
    <img
      v-if="app.icon"
      :src="getApplicationImage(app)"
      :alt="app.name"
      class="w-40 h-40 md:w-48 md:h-48 aspect-square"
    />

    <h4 class="my-1 px-2 text-center flex-grow">
      {{ app.name }}
    </h4>

    <a
      class="bg-transparent font-semibold inline-flex items-center uppercase py-1 px-3 border rounded-lg bg-green-500 text-white border-transparent hover:bg-transparent hover:text-green-500 hover:border-green-500"
      :href="app.url"
      target="_blank"
    >
      <template v-if="app.isActive">
        <span class="material-icons">download</span>&nbsp;{{ $t("applicationCard.get") }}
      </template>
      <template v-else>
        <span class="material-icons">open_in_new</span>&nbsp;{{ $t("applicationCard.open") }}
      </template>
    </a>
  </div>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import type { PropType } from "vue";
import { getApplicationImage } from "../utils/application";

export default {
  props: {
    app: { type: Object as PropType<AppInfo>, required: true },
  },
  methods: {
    getApplicationImage,
  },
};
</script>

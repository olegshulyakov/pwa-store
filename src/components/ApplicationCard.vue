<template>
  <div class="h-full flex flex-col items-center py-4 rounded-xl shadow-md">
    <img
      v-if="app.icon"
      :src="app.icon.startsWith('http') ? app.icon : app.url + app.icon"
      :alt="app.title"
      class="w-48 h-48 cursor-pointer"
      v-on:click="openApp"
    />

    <h4 class="my-1 px-2 text-center flex-grow">
      {{ app.title }}
    </h4>

    <button
      class="bg-transparent font-semibold inline-flex items-center uppercase py-1 px-3 border rounded-lg bg-green-500 text-white border-transparent hover:bg-transparent hover:text-green-500 hover:border-green-500"
      v-on:click="openApp"
    >
      {{ $t("applicationCard.get") }}
    </button>
  </div>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import type { PropType } from "vue";

export default {
  props: {
    app: { type: Object as PropType<AppInfo>, required: true },
  },
  methods: {
    openApp(event: Event) {
      event?.preventDefault();
      window.open(this.app.url, "_blank").focus();
    },
  },
};
</script>

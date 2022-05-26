<template>
  <h2 class="text-xl font-bold uppercase">
    {{ $t(`category.${name.toLowerCase()}`) }}
  </h2>

  <ul
    ref="applicationList"
    class="py-2 md:py-4 flex overflow-y-hidden overflow-x-auto overscroll-y-none overscroll-x-auto list-none gap-4 md:gap-8"
    v-on:wheel="scrollX"
  >
    <li v-for="app in applications">
      <ApplicationCard :key="app.name" :app="app" />
    </li>
  </ul>
</template>

<script lang="ts">
import type { AppInfo } from "types";
import { ref, type PropType } from "vue";
import ApplicationCard from "./ApplicationCard.vue";

export default {
  components: {
    ApplicationCard,
  },
  setup() {
    return {
      applicationList: ref(null),
    };
  },
  props: {
    name: { type: String, required: true },
    applications: { type: Array as PropType<AppInfo[]>, required: true },
  },
  methods: {
    scrollX(e) {
      this.applicationList.scrollLeft += e.deltaY;
    },
  },
};
</script>

<style>
ul {
  scrollbar-width: none;
}
</style>

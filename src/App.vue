<template>
  <LayoutDefaultDesktop v-if="!pending">
    <RouterView />
  </LayoutDefaultDesktop>
</template>

<script lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import LayoutDefaultDesktop from "./layouts/LayoutDefaultDesktop.vue";
import { initStore } from "./store";
import { useApplicationStore } from "./store/application";

export default {
  components: {
    RouterView,
    LayoutDefaultDesktop,
  },
  setup() {
    initStore();
    const appStore = useApplicationStore();
    return { pending: computed(() => appStore.pending) };
  },
};
</script>

<style>
@import "@/assets/base.css";

main {
  min-height: calc(100vh - 56px - 49px);
}
</style>

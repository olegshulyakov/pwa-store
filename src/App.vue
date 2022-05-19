<script lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    RouterView,
    TheHeader,
    TheFooter,
  },
};
</script>

<template>
  <TheHeader />

  <main class="container mx-auto px-4">
    <RouterView />
  </main>

  <TheFooter />
</template>

<style>
@import "@/assets/base.css";

main {
  min-height: calc(100vh - 56px - 49px);
}
</style>

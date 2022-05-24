<template>
  <TheHeader />

  <main class="container mx-auto px-1 md:px-2 lg:px-4">
    <slot />
  </main>

  <TheFooter />
</template>

<script lang="ts">
import TheFooter from "../components/TheFooter.vue";
import TheHeader from "../components/TheHeader.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
main {
  min-height: calc(100vh - 56px - 49px);
}
</style>

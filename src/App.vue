<template>
  <TheHeader />

  <main v-if="!pending" class="container mx-auto px-4">
    <RouterView />
  </main>

  <TheFooter />
</template>

<script lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import store from "./store";

export default {
  components: {
    RouterView,
    TheHeader,
    TheFooter,
  },
  setup() {
    store.actions.reset();
    store.messageStore.actions.fetchLocaleMessages();
    store.applicationStore.actions.fetchApplications();

    return { pending: computed(() => store.getters.pending()), store };
  },
};
</script>

<style>
@import "@/assets/base.css";

main {
  min-height: calc(100vh - 56px - 49px);
}
</style>

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
import { useMessageStore } from "./store/message";
import { useApplicationStore } from "./store/application";

export default {
  components: {
    RouterView,
    TheHeader,
    TheFooter,
  },
  setup() {
    const messageStore = useMessageStore();
    messageStore.$reset();
    messageStore.fetchLocaleMessages();

    const appStore = useApplicationStore();
    appStore.$reset();
    appStore.fetchApplications();

    return { pending: computed(() => messageStore.pending) };
  },
};
</script>

<style>
@import "@/assets/base.css";

main {
  min-height: calc(100vh - 56px - 49px);
}
</style>

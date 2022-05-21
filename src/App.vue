<template>
  <TheHeader v-if="!pending" />

  <main v-if="!pending" class="container mx-auto px-4">
    <RouterView />
  </main>

  <TheFooter v-if="!pending" />
</template>

<script lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import { useMessageStore } from "./store/message";
import { useApplicationStore } from "./store/application";
import { fallbackLocale } from "./i18n";

export default {
  components: {
    RouterView,
    TheHeader,
    TheFooter,
  },
  setup() {
    const messageStore = useMessageStore();
    messageStore.$reset();
    messageStore.fetchLocaleMessages().catch(() => messageStore.fetchLocaleMessages(fallbackLocale));

    const appStore = useApplicationStore();
    appStore.$reset();
    appStore.fetchApplications().catch(() => appStore.fetchApplications(fallbackLocale));

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

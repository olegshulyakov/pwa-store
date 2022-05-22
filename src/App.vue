<template>
  <LayoutDefaultDesktop v-if="!pending">
    <RouterView />
  </LayoutDefaultDesktop>
</template>

<script lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import LayoutDefaultDesktop from "./layouts/LayoutDefaultDesktop.vue";
import { useMessageStore } from "./store/message";
import { useApplicationStore } from "./store/application";
import { fallbackLocale } from "./i18n";

export default {
  components: {
    RouterView,
    LayoutDefaultDesktop,
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

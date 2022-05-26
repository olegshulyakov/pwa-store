<template>
  <p v-if="pending" class="capitalize">{{ $t("home.pending") }}</p>

  <p v-else-if="error" class="capitalize">{{ $t("home.error") }}</p>

  <template v-else-if="categories">
    <template v-for="(category, index) of Object.keys(categories)" :key="index">
      <ApplicationCategoryCarousel :name="category" :applications="categories[category]" />
    </template>
  </template>

  <p v-else class="capitalize">{{ $t("home.empty") }}</p>
</template>

<script lang="ts">
import ApplicationCategoryCarousel from "@/components/ApplicationCategoryCarousel.vue";
import { computed } from "vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    ApplicationCategoryCarousel,
  },
  setup() {
    const appStore = useApplicationStore();
    return {
      pending: computed(() => appStore.pending),
      error: computed(() => appStore.error),
      categories: computed(() => appStore.categories),
    };
  },
};
</script>

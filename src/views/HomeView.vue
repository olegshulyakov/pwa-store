<template>
  <p v-if="pending">Loading...</p>

  <p v-if="error">Error while fetching applications</p>

  <template v-if="categories">
    <template v-for="(category, index) in categories" :key="index">
      <ApplicationCategoryCarousel :name="category.name" :applications="category.applications" />
    </template>
  </template>
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

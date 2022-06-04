<template>
  <p v-if="pending" class="capitalize">{{ $t("view.home.pending") }}</p>

  <p v-else-if="error" class="capitalize">{{ $t("view.home.error") }}</p>

  <template v-else-if="categories">
    <template v-for="category of Object.keys(categories)">
      <ApplicationCategoryCarousel
        :key="category"
        v-if="categories[category].length > 0"
        :name="category"
        :applications="categories[category]"
      />
    </template>
  </template>

  <p v-else class="capitalize">{{ $t("view.home.empty") }}</p>
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

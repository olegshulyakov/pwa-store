<template>
  <h2 class="text-xl font-bold uppercase">
    {{ $t(`category.${name.toLowerCase()}`) }}
  </h2>

  <ApplicationGrid :applications="applications" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ApplicationGrid from "../components/ApplicationGrid.vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    ApplicationGrid,
  },
  setup() {
    const route = useRoute();
    const name = computed(() => (route.params.name as string).toLowerCase());
    const appStore = useApplicationStore();
    return {
      name,
      applications: computed(() => appStore.categories[name.value]),
    };
  },
};
</script>

<template>
  <h2 class="text-xl font-bold uppercase">
    {{ $t(`category.${name.toLowerCase()}`) }}
  </h2>

  <ApplicationGrid :applications="applications" />
</template>

<script lang="ts">
import { computed, useAttrs } from "vue";
import ApplicationGrid from "../components/ApplicationGrid.vue";
import { useApplicationStore } from "../store/application";

export default {
  components: {
    ApplicationGrid,
  },
  setup() {
    const attrs = useAttrs();
    const name = computed(() => (attrs.name as string).toLowerCase());
    const appStore = useApplicationStore();
    return {
      name,
      applications: computed(() => appStore.categories[name.value]),
    };
  },
};
</script>

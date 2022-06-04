<template>
  <header
    class="container mx-auto mt-auto flex flex-row items-center justify-center md:justify-between px-4 py-1 md:py-4"
  >
    <SearchBar />

    <nav class="hidden md:block w-full mx-auto">
      <ul class="flex flex-wrap justify-center md:justify-end">
        <li>
          <RouterLink class="text-gray-700 text-sm font-medium hover:underline py-1 mr-4 lg:mr-6" to="/">
            {{ $t("component.header.home") }}
          </RouterLink>

          <RouterLink class="text-gray-700 text-sm font-medium hover:underline py-1 mr-4 lg:mr-6" to="/instructions">
            {{ $t("component.header.instructions") }}
          </RouterLink>

          <RouterLink class="text-gray-700 text-sm font-medium hover:underline py-1 mr-4 lg:mr-6" to="/about">
            {{ $t("component.header.about") }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
};
</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="app.image" width="192" height="192" />

    <h4>{{ app.title }}</h4>

    <a :href="app.url" target="_blank" class="btn btn-green">
      <span>Get</span>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    app: Object,
  },
};
</script>

<style lang="postcss">
.btn {
  @apply bg-transparent font-semibold inline-flex items-center py-1 px-2 rounded text-green-500 border border-green-500;
}
.btn:hover {
  @apply bg-green-500 text-white border-transparent;
}
</style>

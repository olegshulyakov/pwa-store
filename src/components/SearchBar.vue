<template>
  <form
    class="w-full md:w-96 p-1 flex flex-auto items-center content-center border rounded-lg border-gray-300 shadow-sm"
    v-on:submit="goSearch"
  >
    <button type="submit" class="material-icons" :alt="$t('component.search.search')" v-on:click="goSearch">
      search
    </button>

    <input
      type="search"
      class="w-full mx-1 px-1 rounded"
      :value="text"
      :placeholder="$t('component.search.placeholder')"
      v-on:keyup="onTextChange"
    />

    <button v-if="text" class="material-icons" :alt="$t('component.search.cancel')" v-on:click="goHome">close</button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import router from "../router";

export default {
  data() {
    return {
      text: ref(""),
    };
  },
  methods: {
    onTextChange(event: Event) {
      this.text = event.target.value;

      if (!this.text) {
        this.goHome(event);
      } else {
        this.goSearch(event);
      }
    },

    goSearch(event: Event) {
      event?.preventDefault();
      router.push({ name: "search", query: { text: this.text } });
    },

    goHome(event: Event) {
      event?.preventDefault();
      router.push({ name: "home" });
      this.text = "";
    },
  },
};
</script>

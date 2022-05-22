<template>
  <button
    class="bg-transparent inline-flex items-center py-1 px-3 border rounded-lg text-sm whitespace-nowrap bg-blue-500 text-white border-transparent hover:bg-transparent hover:text-blue-500 hover:border-blue-500"
    v-on:click="showModal = true"
  >
    {{ $t("websiteChecker.check") }}
  </button>

  <div v-if="showModal" class="top-0 bottom-0 left-0 right-0 fixed outline-hidden">
    <div
      v-if="showModal"
      class="relative z-[9999] mt-52 mx-auto rounded-xl w-96 border-none shadow-lg flex flex-col bg-white pointer-events-none"
    >
      <div class="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h4 class="text-xl font-medium leading-normal text-gray-800">
          {{ $t("websiteChecker.modalTitle") }}
        </h4>
        <button class="material-icons cursor-pointer" v-on:click="showModal = false">close</button>
      </div>

      <div class="relative p-4">
        <form class="w-full p-1 flex flex-auto items-center content-center" v-on:submit="doCheck">
          <label class="mr-2">URL:</label>

          <input
            type="search"
            class="w-full px-2 py-1 border rounded-lg border-gray-300 shadow-sm"
            :value="text"
            :placeholder="$t('websiteChecker.placeholder')"
            v-on:keyup="onTextChange"
          />

          <button v-if="url" class="material-icons" :alt="$t('websiteChecker.clear')" v-on:click="url = ''">
            close
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showModal: false,
      url: "",
    };
  },
  methods: {
    onTextChange(event: Event) {
      this.url = event.target.value;
      this.doCheck(event);
    },
    doCheck(event: Event) {
      event?.preventDefault();
    },
  },
};
</script>

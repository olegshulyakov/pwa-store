import applicationStore from "./application";
import messageStore from "./message";

export default {
  name: "globalStore",

  getters: {
    pending() {
      return messageStore.state.pending;
    },
  },

  actions: {
    reset() {
      applicationStore.actions.reset();
      messageStore.actions.reset();
    },
  },

  applicationStore,
  messageStore,
};

export default {
  mutate: (state: object, next: object) => {
    Object.assign(state, next);
  },
};

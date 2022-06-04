import { useApplicationStore } from "./application";

export async function initStore() {
  const appStore = useApplicationStore();
  await appStore.$reset();
  try {
    await appStore.fetchApplications();
  } catch (err) {
    console.warn(`fail to load local apps: ${err}`);
  }
}

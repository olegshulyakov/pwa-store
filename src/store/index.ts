import { fallbackLocale } from "@/i18n";
import { useApplicationStore } from "./application";
import { useMessageStore } from "./message";

export async function initStore() {
  const messageStore = useMessageStore();
  await messageStore.$reset();

  try {
    await messageStore.fetchLocaleMessages();
  } catch (err) {
    console.warn(`fail to load current locale: ${err}`);
    try {
      await messageStore.fetchLocaleMessages(fallbackLocale);
    } catch (err) {
      console.warn(`fail to load default locale: ${err}`);
    }
  }

  const appStore = useApplicationStore();
  await appStore.$reset();
  try {
    await appStore.fetchApplications();
  } catch (err) {
    console.warn(`fail to load local apps: ${err}`);
    try {
      await appStore.fetchApplications(fallbackLocale);
    } catch (err) {
      console.warn(`fail to load default apps: ${err}`);
    }
  }
}

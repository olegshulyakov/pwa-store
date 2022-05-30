import { fallbackLocale, SUPPORT_LOCALES } from "@/i18n";
import { useApplicationStore } from "./application";
import { useMessageStore } from "./message";

export async function initStore() {
  const messageStore = useMessageStore();
  await messageStore.$reset();

  for (const locale of SUPPORT_LOCALES) {
    try {
      await messageStore.fetchLocaleMessages(locale);
    } catch (err) {
      console.warn(`fail to load current locale: ${err}`);
    }
  }
  messageStore.updateApplicationLanguage();

  const appStore = useApplicationStore();
  await appStore.$reset();
  try {
    await appStore.fetchApplications(fallbackLocale);
  } catch (err) {
    console.warn(`fail to load local apps: ${err}`);
  }
}

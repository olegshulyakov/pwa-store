// Fallback locale should always be first one in the following list
export const messages = {
  en: await import("./en.json"),
  "en-GB": await import("./en.json"),
  "en-US": await import("./en.json"),
};

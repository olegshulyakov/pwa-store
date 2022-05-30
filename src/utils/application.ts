import type { AppInfo } from "types";

export const getAbsoluteUrl = (host: string, pathname: string) => {
  return new URL(pathname, host).href;
};

export const getApplicationImage = (app: AppInfo) => {
  const { icon, url } = app;
  if (!icon) return ""; // TODO: use placeholder
  if (icon.startsWith("http")) return icon;

  return getAbsoluteUrl(url, icon);
};

import type { AppInfo } from "types";

export const getApplicationImage = (app: AppInfo) => {
  const { icon, url } = app;
  if (!icon) return ""; // TODO: use placeholder
  if (icon.startsWith("http")) return icon;

  const res = "https://" + (url.replace(/https?:\/\//, "") + icon).replace(/\/{2,}/, "/");
  return res;
};

/** State types */
export type MessageState = {
  locale?: string;
  pending: boolean;
  error?: string;
  messages: object;
};

export type ApplicationState = {
  locale?: string;
  pending: boolean;
  error?: string;
  applications: AppInfo[];
  categories: CategoryInfo;
};

/** Data types */
export type AppInfo = {
  url: string;
  isActive: boolean;
  name: string;
  description?: string;
  icon: string;
  icons: string[];
  categories: string[];
  screenshots?: string[];
  lang?: string;
  background_color?: string;
  theme_color?: string;
};

export type CategoryInfo = {
  [key]: AppInfo[];
};

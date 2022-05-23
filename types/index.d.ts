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
};

/** Data types */
export type AppInfo = {
  url: string;
  active: boolean;
  title: string;
  description?: string;
  icon?: string;
  images?: string[];
  categories: string[];
  tags: string[];
};

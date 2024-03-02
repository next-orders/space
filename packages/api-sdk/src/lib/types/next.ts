export type NextFetchRequestConfig = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

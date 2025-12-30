export {};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params?: {
        description?: string;
        fatal?: boolean;
        [key: string]: any;
      }
    ) => void;
  }
}

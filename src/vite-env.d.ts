/// <reference types="vite/client" />

interface Window {
  showToast: (message: string, type?: string) => void;
  [key: string]: any;
}

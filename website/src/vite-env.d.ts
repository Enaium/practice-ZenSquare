/// <reference types="vite/client" />
declare interface Window {
  $message: any
  $router: any
  $i18n: any
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
}

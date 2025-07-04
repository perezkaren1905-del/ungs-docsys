interface ImportMetaEnv {
  readonly VITE_DOCSYS_BFF_URL: string;
  // agregá otras vars si querés
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
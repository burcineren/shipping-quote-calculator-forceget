export interface ENV {
  production: boolean;
  url: Url;
  config: Config;
}

interface Url {
  app: string;
  api: string;
}

interface Config {
  secretKey: string;
  localStoragePrefix: string;
}

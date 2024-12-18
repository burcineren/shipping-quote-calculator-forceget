import { ENV } from '@beng-core/types/environment-type';

export const environment: ENV = {
  // baseUrl: 'http://localhost:4200',
  production: false,
  url: {
    app: 'http://localhost:4200',
    api: 'http://localhost:3000',
  },
  config: {
    secretKey: 'secretKey',
    localStoragePrefix: 'rm',
  },
};

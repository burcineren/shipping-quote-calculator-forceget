import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CryptoService } from './crypto.service';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private cryptoService = inject(CryptoService);
  private readonly prefix = environment.config.localStoragePrefix;

  get<T extends string>(key: LocalStorageKeysEnum): T {
    const prefixedKey = this.getPrefixedKey(key);
    const storedItem = localStorage.getItem(prefixedKey);

    if (storedItem) {
      try {
        return JSON.parse(this.cryptoService.decrypt(storedItem));
      } catch (error) {
        console.error(`Error parsing JSON for key '${key}':`, error);
        return null;
      }
    } else {
      return null;
    }
  }

  set<T>(key: LocalStorageKeysEnum, value: T): void {
    const prefixedKey = this.getPrefixedKey(key);
    localStorage.setItem(prefixedKey, this.cryptoService.encrypt(JSON.stringify(value)));
  }

  remove(key: LocalStorageKeysEnum | LocalStorageKeysEnum[]): void {
    const keys: string[] = Array.isArray(key) ? key : [key];
    keys.forEach((innerKey) => {
      const prefixedKey = this.getPrefixedKey(innerKey);
      localStorage.removeItem(prefixedKey);
    });
  }

  clear(): void {
    localStorage.clear();
  }

  private getPrefixedKey(key: string): string {
    return `${this.prefix}-${key}`;
  }
}

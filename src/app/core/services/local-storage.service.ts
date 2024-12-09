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

  get<T>(key: LocalStorageKeysEnum): T | null {
    const prefixedKey = this.getPrefixedKey(key);
    const storedItem = localStorage.getItem(prefixedKey);
  
    if (storedItem) {
      try {
        const decrypted = this.cryptoService.decrypt(storedItem);
        const parsed = JSON.parse(decrypted);
  
        if (this.isType<T>(parsed)) {
          return parsed;
        } else {
          console.error(`Type mismatch for key '${key}'. Expected type does not match.`);
          return null;
        }
      } catch (error) {
        console.error(`Error decrypting or parsing value for key '${key}':`, error);
        return null;
      }
    } else {
      return null;
    }
  }
  
  private isType<T>(value: any): value is T {
    // Tip doğrulama için ek mantık yazabilirsiniz
    return true; // Her durumda "true" döndürür. Gerekirse özel doğrulama ekleyin.
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

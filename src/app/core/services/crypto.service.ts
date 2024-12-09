import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private secretKey: string = environment.config.secretKey;

  encrypt(value: string): string {
    try {
      // Encrypt işlemi
      return btoa(value); // Örnek şifreleme
    } catch (error) {
      console.error('Error during encryption:', error);
      throw new Error('Encryption failed.');
    }
  }
  decrypt(encrypted: string): string {
    try {
      // Decrypt işlemi
      return atob(encrypted); // Örnek deşifreleme
    } catch (error) {
      console.error('Error during decryption:', error);
      throw new Error('Decryption failed.');
    }
  }
}

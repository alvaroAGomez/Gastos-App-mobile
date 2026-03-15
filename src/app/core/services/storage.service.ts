import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    if (this._storage) return;
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async ready(): Promise<void> {
    let retries = 0;
    const maxRetries = 100; // 5 seconds max
    while (!this._storage && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 50));
      retries++;
    }
    if (!this._storage) {
      console.error('StorageService: failed to initialize after 5 seconds');
    }
  }

  async set(key: string, value: any): Promise<any> {
    await this.ready();
    return await this._storage?.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    await this.ready();
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<any> {
    await this.ready();
    return await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this.ready();
    return await this._storage?.clear();
  }

  async keys(): Promise<string[]> {
    await this.ready();
    return await this._storage?.keys() || [];
  }

  async length(): Promise<number> {
    await this.ready();
    return await this._storage?.length() || 0;
  }
}

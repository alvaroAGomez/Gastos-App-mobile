import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<any> {
    return await this._storage?.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<any> {
    return await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    return await this._storage?.clear();
  }

  async keys(): Promise<string[]> {
    return await this._storage?.keys() || [];
  }

  async length(): Promise<number> {
    return await this._storage?.length() || 0;
  }
}

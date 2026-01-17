export interface CacheEntry<T> {
  value: T;
  /** The UNIX timestamp (in milliseconds) when the entry expires. */
  expires: number;
}

export class ExpiringInMemoryCache<T> {
  private readonly cache = new Map<string, CacheEntry<T>>();

  public get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (this.isExpired(entry.expires)) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  public set(key: string, value: T, expires: number): void {
    this.cache.set(key, {value, expires});
  }

  public delete_(key: string): boolean {
    return this.cache.delete(key);
  }

  public async getOrSet(
    key: string,
    factory: () => Promise<CacheEntry<T>>,
  ): Promise<T> {
    const cachedValue = this.get(key);
    if (cachedValue !== null) {
      return cachedValue;
    }

    const newValue = await factory();
    this.set(key, newValue.value, newValue.expires);
    return newValue.value;
  }

  private isExpired(expires: number): boolean {
    return Date.now() > expires;
  }
}

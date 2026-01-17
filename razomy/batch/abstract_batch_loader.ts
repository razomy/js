export interface QueueItem<K, V> {
  key: K;
  resolve: (value: V) => void;
  reject: (reason?: any) => void;
}

export abstract class AbstractBatchLoader<K, V> {
  private readonly batchDelay: number;
  private requestQueue: QueueItem<K, V>[] = [];
  private requestTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(batchDelay: number = 10) {
    this.batchDelay = batchDelay;
  }

  public load(key: K): Promise<V> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({key, resolve, reject});

      if (this.requestTimeout) {
        clearTimeout(this.requestTimeout);
      }
      this.requestTimeout = setTimeout(() => {
        this.processQueue();
      }, this.batchDelay);
    });
  }

  public loadMany(keys: K[]): Promise<V[]> {
    const promises = keys.map((k) => this.load(k));
    return Promise.all(promises);
  }

  protected abstract performBatchRequest(keys: K[]): Promise<Map<K, V>>;

  private async processQueue(): Promise<void> {
    if (this.requestQueue.length === 0) {
      return;
    }

    const batch = [...this.requestQueue];
    this.requestQueue = [];

    const uniqueKeys = [...new Set(batch.map((item) => item.key))];

    try {
      const resultsMap = await this.performBatchRequest(uniqueKeys);

      batch.forEach(({key, resolve, reject}) => {
        const result = resultsMap.get(key);
        if (result !== undefined) {
          resolve(result);
        } else {
          reject(new Error(`Data not found for key: ${key}`));
        }
      });
    } catch (error) {
      console.error('Batch request failed:', error);
      batch.forEach(({reject}) => reject(error));
    }
  }
}

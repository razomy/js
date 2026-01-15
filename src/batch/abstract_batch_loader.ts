export interface QueueItem<K, V> {
  key: K;
  resolve: (value: V) => void;
  reject: (reason?: any) => void;
}

export abstract class AbstractBatchLoader<K, V> {
  private readonly batch_delay: number;
  private request_queue: QueueItem<K, V>[] = [];
  private request_timeout: ReturnType<typeof setTimeout> | null = null;

  protected abstract perform_batch_request(keys: K[]): Promise<Map<K, V>>;

  constructor(batchDelay: number = 10) {
    this.batch_delay = batchDelay;
  }

  public load(key: K): Promise<V> {
    return new Promise((resolve, reject) => {
      this.request_queue.push({ key, resolve, reject });

      if (this.request_timeout) {
        clearTimeout(this.request_timeout);
      }
      this.request_timeout = setTimeout(() => {
        this.process_queue();
      }, this.batch_delay);
    });
  }

  public load_many(keys: K[]): Promise<V[]> {
    const promises = keys.map((k) => this.load(k));
    return Promise.all(promises);
  }

  private async process_queue(): Promise<void> {
    if (this.request_queue.length === 0) {
      return;
    }

    const batch = [...this.request_queue];
    this.request_queue = [];

    const unique_keys = [...new Set(batch.map((item) => item.key))];

    try {
      const results_map = await this.perform_batch_request(unique_keys);

      batch.forEach(({ key, resolve, reject }) => {
        const result = results_map.get(key);
        if (result !== undefined) {
          resolve(result);
        } else {
          reject(new Error(`Data not found for key: ${key}`));
        }
      });
    } catch (error) {
      console.error("Batch request failed:", error);
      batch.forEach(({ reject }) => reject(error));
    }
  }
}

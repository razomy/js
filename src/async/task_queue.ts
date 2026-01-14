import { ConsoleLogger, Logger } from 'razomy.logging/logger';

function create_task_promise<T>(task: (() => T) | (() => Promise<T>)): () => Promise<T> {
  return () => new Promise(async (resolve, reject) => {
    try {
      if (task instanceof Promise) {
        resolve(await task());
      } else if (task instanceof Function) {
        resolve(task());
      } else {
        throw new Error('Unknown Task type');
      }
    } catch (error) {
      reject(error);
    }
  });
}

export class TaskQueue {
  private is_processing = false;
  private queue: {
    id: number;
    task: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }[] = [];
  private id = 0;

  constructor(private ctx: { logger: Logger } = { logger: new ConsoleLogger() }) {}

  /**
   * Adds a task to the queue and returns a Promise that resolves
   * when the specific task has finished executing.
   */
  enqueue<T>(task: (() => T) | (() => Promise<T>)): Promise<T> {
    const id = ++this.id;
    this.ctx.logger.debug(`Task add id=${id}.`);

    return new Promise<T>((resolve, reject) => {
      // 1. Wrap the task to ensure it is always a Promise
      const wrapped_task = async () => Promise.resolve(task());

      // 2. Push the task AND its controller (resolve/reject) to the queue
      this.queue.push({
        id,
        task: wrapped_task,
        resolve,
        reject
      });

      // 3. Trigger processing
      this.tryProcessQueue();
    });
  }

  private async tryProcessQueue() {
    // If already running or empty, do nothing
    if (this.is_processing || this.queue.length === 0) {
      return;
    }

    this.is_processing = true;

    // Process tasks until the queue is empty
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) break;

      this.ctx.logger.debug(`Task start id=${item.id}.`);

      try {
        // Execute the task
        const result = await item.task();

        this.ctx.logger.debug(`Task finish id=${item.id}.`);

        // Resolve the promise held by the 'enqueue' caller
        item.resolve(result);
      } catch (error) {
        this.ctx.logger.debug(`Task error id=${item.id}.`);

        // Reject the promise held by the 'enqueue' caller
        item.reject(error);
      }
    }

    this.is_processing = false;
  }
}

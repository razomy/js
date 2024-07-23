import { BehaviorSubject } from 'rxjs';
import { ConsoleLogger, Logger } from 'razomy.js/logging/logger';

function createTaskPromise<T>(task: (() => T) | (() => Promise<T>)): () => Promise<T> {
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
  private isProcessing: boolean;
  private queue: { id: number, task: () => Promise<any> }[];
  private id = 0;

  private complete = new BehaviorSubject<{ [id: number]: { promise: () => Promise<any>, res: any, error?: any } }>({});

  constructor(private ctx: { logger: Logger } = { logger: new ConsoleLogger() }) {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue<T>(task: (() => T) | (() => Promise<T>)): Promise<T> {
    const taskPromise = createTaskPromise<T>(task);
    const id = ++this.id;

    this.queue.push({ task: taskPromise, id });
    this.ctx.logger.debug('Task add id=' + id + '.');

    this.tryProcessQueue();

    return new Promise((r, er) => {
      const subscription = this.complete.subscribe({
        next: (i) => {
          const taskState = i[id];

          if (!taskState) {
            // Skip not waiting task
            return;
          }

          subscription.unsubscribe();
          delete this.complete.value[id];
          this.ctx.logger.debug('Task remove id=' + id + '.');

          if (taskState.error) {
            er(taskState.error);
          } else {
            r(taskState.res);
          }
        },
        error: (e) => {
          subscription.unsubscribe();
          this.ctx.logger.error(e);
          er(e);
        }, complete: () => {
          subscription.unsubscribe();
          const error = { message: 'Subject complete before task next.' };
          this.ctx.logger.error(error.message);
          er(error);
        },
      });
    });
  }

  private tryProcessQueue() {
    if (this.isProcessing) {
      return;
    }

    if (this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const factory = this.queue.shift()!;
    const task = factory.task();
    this.ctx.logger.debug('Task start id=' + factory.id + '.');

    task
      .then((res) => {
        this.ctx.logger.debug('Task finish id=' + factory.id + '.');
        this.complete.value[factory.id] = { promise: factory.task, res: res };
        this.complete.next(this.complete.value);
        this.isProcessing = false;
        this.tryProcessQueue(); // Process the next task recursively
      })
      .catch((error) => {
        this.ctx.logger.debug('Task error id=' + factory.id + '.');
        this.complete.value[factory.id] = { promise: factory.task, res: null, error };
        this.complete.next(this.complete.value);
        this.isProcessing = false;
        this.tryProcessQueue(); // Process the next task recursively
      });
  }
}

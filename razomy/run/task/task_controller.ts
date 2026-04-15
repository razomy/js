import * as run from '@razomy/run';

export type TaskStatus = 'pending' | 'processing' | 'completed' | 'error' | 'cancelled';

export interface Task {
  id: string;
  status: TaskStatus;
  type: string;
  error?: string;
  createdAt: number;
  abortController: AbortController;
}

export type TaskHandler<T extends Task = Task> = (job: T) => Promise<void>;

export class TaskController {
  constructor(public tasks = new Map<string, Task>(), public handlers = new Map<string, TaskHandler<any>>()) {}

  addHandler = <T extends Task>(type: string, handler: TaskHandler<T>) => {
    this.handlers.set(type, handler);
  };

  get = <T extends Task = Task>(id: string): T | undefined => {
    return this.tasks.get(id) as T | undefined;
  };

  create = <T extends Task>(type: T['type'], payload: Omit<T, keyof Task>): string => {
    return run.task.createMut(this.tasks, this.handlers, type, payload);
  };

  process = async (job: Task) => {
    return run.task.processJobMut(this.handlers, job);
  };

  cancel = (id: string): boolean => {
    return run.task.cancelMut(this.tasks, id);
  };
}

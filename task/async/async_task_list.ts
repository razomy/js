import {AsyncTask, Context} from 'razomy.task/async/async_task';
import {Serializable} from 'razomy.serializable';

interface AsyncTaskListState<C extends Serializable, T extends Context<C>> {
  startedTaskIndex: number;
  tasks: AsyncTask<C, T>[];
}

export class AsyncTaskList<C extends Serializable, T extends Context<C>> {
  constructor(public ctx: AsyncTaskListState<C, T>) {
  }

  public async cancel_started(): Promise<void> {
    const task = this.ctx.tasks[this.ctx.startedTaskIndex];
    await task.cancel(task.c);
  }

  public async rollback(): Promise<void> {
    for (; this.ctx.startedTaskIndex > 0; this.ctx.startedTaskIndex--) {
      const task = this.ctx.tasks[this.ctx.startedTaskIndex];
      await task.rollback(task.c);
    }
  }

  public async execute(): Promise<void> {
    for (; this.ctx.startedTaskIndex < this.ctx.tasks.length; this.ctx.startedTaskIndex++) {
      const task = this.ctx.tasks[this.ctx.startedTaskIndex];
      await task.execute(task.c);
    }
  }
}

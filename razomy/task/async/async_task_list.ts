import {AsyncTask, Context} from 'razomy.task/async/async_task';
import {Serializable} from 'razomy.serializable';

interface AsyncTaskListState<C extends Context> {
  started_task_index: number;
  tasks: AsyncTask<C>[];
}

export class AsyncTaskList<C extends  Context> {
  constructor(public ctx: AsyncTaskListState<C>) {
  }

  public async cancel_started(): Promise<void> {
    const task = this.ctx.tasks[this.ctx.started_task_index];
    await task.cancel(task.c);
  }

  public async rollback(): Promise<void> {
    for (; this.ctx.started_task_index > 0; this.ctx.started_task_index--) {
      const task = this.ctx.tasks[this.ctx.started_task_index];
      await task.rollback(task.c);
    }
  }

  public async execute(): Promise<void> {
    for (; this.ctx.started_task_index < this.ctx.tasks.length; this.ctx.started_task_index++) {
      const task = this.ctx.tasks[this.ctx.started_task_index];
      await task.execute(task.c);
    }
  }
}

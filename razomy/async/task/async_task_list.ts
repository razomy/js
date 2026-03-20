import * as taskAsync from './';

interface AsyncTaskListState<C extends taskAsync.Context> {
  startedTaskIndex: number;
  tasks: taskAsync.AsyncTask<C>[];
}

export class AsyncTaskList<C extends taskAsync.Context> {
  constructor(public ctx: AsyncTaskListState<C>) {}

  public async cancelStarted(): Promise<void> {
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

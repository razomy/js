import * as task_ from "@razomy/task";

interface AsyncTaskListState<C extends Context> {
  startedTaskIndex: number;
  tasks: task_.AsyncTask<C>[];
}

export class AsyncTaskList<C extends Context> {
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

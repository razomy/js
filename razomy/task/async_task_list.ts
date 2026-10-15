import * as abstractions from "@razomy/abstractions";

interface AsyncTaskListState<C extends abstractions.patterns.Context> {
  startedTaskIndex: number;
  tasks: any[];
}

// todo:remove
export class AsyncTaskList<C extends abstractions.patterns.Context> {
  constructor(public ctx: AsyncTaskListState<C>) {
  }

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

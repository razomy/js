// TODO:REFACTOR
// import {Context, Task} from "./task";
//
// interface TaskManagerContextState<T extends Context> {
//   lastCompletedTaskIndex: number;
//   tasks: Task<T>[];
// }
//
// export class TaskManager<T extends Context> {
//   // implements Task<TaskManagerContext>
//   constructor(public c: TaskManagerContextState<T>) {}
//   // task_id: string;
//   // history: TaskManagerContext[];
//   // execute: (c: TaskManagerContext) => Promise<TaskManagerContext>;
//   // cancel: (c: TaskManagerContext) => Promise<TaskManagerContext>;
//
//   public async execute(): Promise<void> {
//     let state = this.c;
//     // let c = this.c.get();
//
//     // If no state, initialize a fresh one
//     // if (!state) {
//     //   state = { lastCompletedTaskIndex: -1, context: {} };
//     // }
//
//     const startIndex = state.lastCompletedTaskIndex + 1;
//     const completedTasksInThisRun: Task<any>[] = [];
//
//     if (startIndex > 0) {
//       console.log(`Resuming workflow from task #${startIndex + 1}`);
//     } else {
//       console.log("Starting new workflow.");
//     }
//
//     // try {
//     for (let i = startIndex; i < this.c.tasks.length; i++) {
//       const task = this.c.tasks[i];
//       //     console.log(`\n[${i + 1}/${tasks.length}] Executing: ${task.name}`);
//       //
//       //     // Pass the context to the task
//       await task.execute(task.c);
//       //
//       //     // Update state and save
//       //     state.lastCompletedTaskIndex = i;
//       //     this.stateManager.save(state);
//       //
//       //     completedTasksInThisRun.push(task);
//       //     console.log(`- Task successful.`);
//     }
//
//     console.log("\n✅ All tasks completed successfully!");
//     // this.stateManager.clear();
//     // } catch (error) {
//     //   console.error(`\n\n❌ A task has failed: ${(error as Error).message}`);
//     //   console.error(
//     //     "--- Starting rollback of tasks completed in THIS run ---\n",
//     //   );
//     //   throw error;
//
//     // for (const task of completedTasksInThisRun.reverse()) {
//     //   try {
//     //     // Pass the context to the rollback function
//     //     // await task.rollback(state.context);
//     //     console.log(`- Rollback for '${task.name}' successful.`);
//     //   } catch (rollbackError) {
//     //     console.error(
//     //       `- Rollback for '${task.name}' failed: ${(rollbackError as Error).message}`,
//     //     );
//     //   }
//     // }
//     // } finally {
//     //   console.log("\nWorkflow execution finished.");
//     // }
//   }
// }

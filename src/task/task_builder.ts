// TODO:REFACTOR
// import { FileGate } from './file_gate';
// import { JsonCodec } from './json_codec';
// import { Context, Task } from './task';
// import { TaskManager } from './task_manager';
//
// export type TaskFunction = (c?: Context) => void | Promise<void>;
//
// export class TaskBuilder<T extends Context<T> = Context> {
//   tasks: Task<T>[];
//   taskManager: TaskManager<T>;
//   constructor(
//     public c: T,
//     tasks: TaskFunction[],
//     public fileGate = new FileGate(`./${c.name}.json`),
//     public jsonCodec = new JsonCodec(),
//   ) {
//     this.tasks = tasks.map((i) => ({
//       task_id: i.name,
//       execute: i as any,
//       cancel: (c) => {
//         throw new Error("Cancel not implementd");
//       },
//       rollback: (c) => {
//         throw new Error("rollback not implementd");
//       },
//       c: c,
//       history: [],
//     }));
//     this.taskManager = new TaskManager<T>({
//       tasks: this.tasks,
//       lastCompletedTaskIndex: -1,
//     });
//   }
//
//   async execute() {
//     await this.taskManager.execute();
//   }
//   cancel() {}
// }

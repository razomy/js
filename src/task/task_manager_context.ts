// TODO:REFACTOR
// import { Context, Contextable, Task } from './task';
// import { Gate } from './file_gate';
//
// interface TaskManagerContextState<T> {
//   lastCompletedTaskIndex: number;
//   tasks: T;
// }
//
// export class TaskManagerContext<T extends Contextable> implements Context<TaskManagerContext<T>>, TaskManagerContextState<T> {
//   gate: Gate<TaskManagerContextState<T>>;
//   lastCompletedTaskIndex: number;
//   tasks: T;
//
//   constructor(s:TaskManagerContextState<T>) {
//     this.lastCompletedTaskIndex = s.lastCompletedTaskIndex;
//     this.tasks = s.tasks;
//   }
//
//   get(): TaskManagerContext<T> {
//     const obj = this.gate.get();
//     const ctx = new TaskManagerContext(obj);
//     return ctx;
//   }
//
//   set(state: TaskManagerContext<T>): void {
//     return this.gate.set({
//       lastCompletedTaskIndex: state.lastCompletedTaskIndex,
//       tasks: state.flow.map((t) => t.c.set(t.c)),
//     });
//   }
// }

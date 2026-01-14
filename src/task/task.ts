// TODO:REFACTOR
// import {Serializable} from 'razomy.serializable/serializable';
//
// export interface Context<T = any> extends Serializable {}
//
// export interface Contextable<T extends Context<T>> {
//   c: T;
// }
//
// export interface Executable<T> {
//   execute: (c: T) => Promise<void>;
// }
//
// export interface Cancelable<T> {
//   cancel: (c: T) => Promise<void>;
// }
//
// export interface Rollbackable<T> {
//   rollback: (c: T) => Promise<void>;
// }
//
// export interface Task<T extends Context<T>>
//   extends Contextable<T>,
//     Executable<T>,
//     Cancelable<T>,
//     Rollbackable<T> {
//   task_id: string;
//   history: T[];
// }

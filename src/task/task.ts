// TODO:REFACTOR
// export interface Serialisable<T> {
// }
//
// //TODO: extend form Resource
// export interface Context<T = any> extends Serialisable<T> {
// }
//
// export interface Contextable<T extends Context<T>> {
//     c: T;
// }
//
// //TODO: extend form pipe
// export interface Executable<T> {
//     execute: (c: T) => Promise<void>;
// }
//
// export interface Cancelable<T> {
//     cancel: (c: T) => Promise<void>;
// }
//
// export interface Task<T extends Context<T>>
//     extends Contextable<T>,
//         Executable<T>,
//         Cancelable<T> {
//     task_id: string;
//     history: T[];
// }

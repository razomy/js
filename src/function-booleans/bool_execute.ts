export type BoolExecute<T extends any[]> = (...ctx: T) => boolean;
export type BoolPipe<T extends any[]> = (ctx: T, next: BoolExecute<T>) => boolean;
export type ArrayBoolPipe<T extends any[]> = (ctx: T, nexts: BoolExecute<T>[]) => boolean;

export type BoolPipeType<T extends any[]> = BoolExecute<T> | BoolPipe<T> | ArrayBoolPipe<T>;

import type {SchemaType} from './schema';

export type object_<T> = { [key: string]: SchemaType<T> };
export type array_<T> = SchemaType<T>[];
export type tuple_<T, V extends T = T> = [...V[]];
export type AllRecusive<T> = object_<T> | tuple_<T> | array_<T>;

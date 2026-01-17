import {WithSerializable} from './with_serializable';

export type SerializablePrimitive = string | number | boolean | null;

export type SerializableValue<T = SerializablePrimitive> =
  | T
  | { [key: string]: SerializableValue<T> }
  | SerializableValue<T>[];

export type Serializable = SerializableValue<SerializablePrimitive | WithSerializable>;

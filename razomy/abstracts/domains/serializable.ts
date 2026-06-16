export type SerializablePrimitive = string | number | boolean | null;

export type SerializableValue<T = SerializablePrimitive> =
  | T
  | { [key: string]: SerializableValue<T> }
  | SerializableValue<T>[];

export interface HasSerializable {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

export type Serializable = SerializableValue<SerializablePrimitive | HasSerializable>;

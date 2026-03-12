import * as serializable from '@razomy/serializable';

export interface WithSerializable {
  toSerializable(): serializable.Serializable;

  fromSerializable(data: serializable.Serializable): void;
}

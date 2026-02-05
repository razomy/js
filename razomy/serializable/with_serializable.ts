import {Serializable} from '@razomy/serializable';

export interface WithSerializable {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

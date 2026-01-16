import {Serializable} from 'razomy.serializable/serializable';

export interface WithSerializable<T extends Serializable> {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

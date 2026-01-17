import {Serializable} from 'razomy.serializable/serializable';

export interface WithSerializable {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

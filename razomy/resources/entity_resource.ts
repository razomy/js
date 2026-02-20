import {ObjectResource} from './object_resource';
import {
  type  IEntityResource,
  type IResourceMap,
  NodeAlreadyProvidedException,
  NodeProvidedException
} from './node_provided_exception';
import type {Constructor} from '@razomy/class';
import {ArgumentException} from '@razomy/exceptions';

export class EntityResource extends ObjectResource implements IEntityResource {
  protected resources: IResourceMap = {};

  public add<T extends ObjectResource>(obj: T): void {
    if (this.resources[obj.type]) {
      throw new NodeAlreadyProvidedException('Already added' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public remove<T extends ObjectResource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    delete this.resources[obj.type];
  }

  public replace<T extends ObjectResource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public getBy<T extends ObjectResource = ObjectResource>(objCtor: Constructor<T>): T {
    const ctor: T | ObjectResource = this.resources[objCtor.type];

    if (ctor === undefined) {
      throw new NodeProvidedException('Cannot get because Resource not exist' + objCtor.type);
    }

    if (ctor instanceof objCtor) {
      return ctor;
    }

    throw new ArgumentException('unknown', ctor);
  }

}
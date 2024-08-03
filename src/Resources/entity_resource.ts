import {ArgumentException} from 'razomy.js/exceptions/argument_exception';
import { Constructor } from 'razomy.js/object/constructor';
import {Resource}  from 'razomy.js/resources/resource';

export class NodeProvidedException extends Error {

}

export class NodeAlreadyProvidedException extends Error {

}

export interface IResourceMap {
  [key: string]: Resource;
}

export interface IEntityResourceMap {
  resources: IResourceMap;
}

export interface IEntityResource {

  add<T extends Resource>(obj: T): void;

  remove<T extends Resource>(obj: T): void;

  replace<T extends Resource>(obj: T): void;

  getBy<T extends Resource>(objCtor: Constructor<T>): T;
}

export class EntityResource extends Resource implements IEntityResource {
  protected resources: IResourceMap = {};

  public add<T extends Resource>(obj: T): void {
    if (this.resources[obj.type]) {
      throw new NodeAlreadyProvidedException('Already added' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public remove<T extends Resource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    delete this.resources[obj.type];
  }

  public replace<T extends Resource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public getBy<T extends Resource = Resource>(objCtor: Constructor<T>): T {
    const ctor: T | Resource = this.resources[objCtor.type];

    if (ctor === undefined) {
      throw new NodeProvidedException('Cannot get because Resource not exist' + objCtor.type);
    }

    if (ctor instanceof objCtor) {
      return ctor;
    }

    throw new ArgumentException('unknown', ctor);
  }

}

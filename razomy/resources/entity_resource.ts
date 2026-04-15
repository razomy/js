import * as object_ from '@razomy/object';
import * as exceptions from '@razomy/exceptions';
import * as resources from '@razomy/resources';

export class EntityResource extends resources.ObjectResource implements resources.IEntityResource {
  protected resources: resources.IResourceMap = {};

  public add<T extends resources.ObjectResource>(obj: T): void {
    if (this.resources[obj.type]) {
      throw new resources.NodeAlreadyProvidedException('Already added' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public remove<T extends resources.ObjectResource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new resources.NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    delete this.resources[obj.type];
  }

  public replace<T extends resources.ObjectResource>(obj: T): void {
    if (this.resources[obj.type] === undefined) {
      throw new resources.NodeProvidedException('Cannot remove because Resource not exist' + obj.type);
    }

    this.resources[obj.type] = obj;
  }

  public getBy<T extends resources.ObjectResource = resources.ObjectResource>(objCtor: object_.Constructor<T>): T {
    const ctor: T | resources.ObjectResource = this.resources[objCtor.type];

    if (ctor === undefined) {
      throw new resources.NodeProvidedException('Cannot get because Resource not exist' + objCtor.type);
    }

    if (ctor instanceof objCtor) {
      return ctor;
    }

    throw new exceptions.ArgumentException('unknown', ctor);
  }
}

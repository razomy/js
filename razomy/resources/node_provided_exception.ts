import * as object_ from '@razomy/object';
import * as resources from '@razomy/resources';

export class NodeProvidedException extends Error {}

export class NodeAlreadyProvidedException extends Error {}

export interface IResourceMap {
  [key: string]: resources.ObjectResource;
}

export interface IEntityResourceMap {
  resources: IResourceMap;
}

export interface IEntityResource {
  add<T extends resources.ObjectResource>(obj: T): void;

  remove<T extends resources.ObjectResource>(obj: T): void;

  replace<T extends resources.ObjectResource>(obj: T): void;

  getBy<T extends resources.ObjectResource>(objCtor: object_.Constructor<T>): T;
}

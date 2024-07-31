
import {NotImplementedException} from 'razomy.js/exceptions/not-implemented-exception';
import { Constructor } from 'razomy.js/interfaces/constructor';
import {Resource}  from 'razomy.js/resources/resource';
import { EntityResource }  from 'razomy.js/resources/entity-resource';

export interface INodeResourceCollection {
  nodes?: EntityResource[];
}

export interface IResourceCollection<T extends EntityResource> {

  getAll(): T[];

  add(node: T): void;

  removeAll(): void;

  removeAllBy(node: Constructor<T>): void;

}

export class ResourceCollection<T extends EntityResource> extends Resource implements IResourceCollection<T> {

  public nodes: T[];

  constructor();
  constructor(nodes: T[]);
  constructor(...nodes: T[]);
  constructor(...args: any) {
    super();

    if (args === undefined || args.length === 0) {
      this.nodes = [];
      return;
    }

    if (args.length === 1 && Array.isArray(args[0])) {
      this.nodes = args[0];
      return;
    }

    this.nodes = args;
  }

  public add(node: T): void {
    this.nodes.push(node);
  }

  public getAll(): T[] {
    return this.nodes;
  }

  public removeAll(): void {
    throw new NotImplementedException();
  }

  public removeAllBy(node: Constructor<T>): void {
    throw new NotImplementedException();
  }

}

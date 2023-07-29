import NotImplementedException from '../Exceptions/NotImplementedException';
import { Constructor } from '../Interfaces/Constructor';
import { IObject } from '../Interfaces/IObject';
import Resource from '../Resources/Resource';
import { EntityResource } from './EntityResource';

export interface INodeResourceCollection {
  nodes?: EntityResource[];
}

export interface IResourceCollection<T extends EntityResource> {

  getAll(): T[];

  add(node: T): void;

  removeAll(): void;

  removeAllBy(node: Constructor<T>): void;

}


export default class ResourceCollection<T extends EntityResource> extends Resource implements IResourceCollection<T> {

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

    if (args.length === 1 && args instanceof Array) {
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

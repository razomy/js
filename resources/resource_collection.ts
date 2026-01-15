import {NotImplementedException} from 'razomy.exceptions/not_implemented_exception';
import { Constructor } from 'razomy.class/constructor';
import {Resource}  from 'razomy.resources/resource';
import { EntityResource }  from 'razomy.resources/entity_resource';

export interface INodeResourceCollection {
  nodes?: EntityResource[];
}

export interface IResourceCollection<T extends EntityResource> {

  get_all(): T[];

  add(node: T): void;

  remove_all(): void;

  remove_all_by(node: Constructor<T>): void;

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

  public get_all(): T[] {
    return this.nodes;
  }

  public remove_all(): void {
    throw new NotImplementedException();
  }

  public remove_all_by(node: Constructor<T>): void {
    throw new NotImplementedException();
  }

}

import { Node } from 'ts-morph';

export type Produce = <T>(product: T, source: Node) => T;

export interface HasEnterLeaveProduce {
  enter: Produce;
  leave: Produce;
}

export class UnknownNodeException extends Error {
  constructor(node: Node) {
    super(`Unknown node type:${node.getKindName()}, text:${node.getText()}`);
  }
}

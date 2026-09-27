import { Node } from 'ts-morph';

export class UnknownNodeException extends Error {
  constructor(node: Node) {
    super(`Unknown node type:${node.getKindName()}, text:${node.getText()}`);
  }
}


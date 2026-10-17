import { Node } from "ts-morph";

export function getNodeId(node: Node): string {
    const filePath = node.getSourceFile().getFilePath();
    return `${filePath}:${node.getStart()}`;
}

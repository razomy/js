import { Node } from "ts-morph";

/**
 * Helper to safely extract JSDoc description
 */
export function getJsDocDescription(node: Node): string | undefined {
    if (Node.isJSDocable(node)) {
    const docs = node.getJsDocs();
    if (docs.length > 0) {
      return docs[0].getDescription().trim();
    }
    }

    return undefined;
}

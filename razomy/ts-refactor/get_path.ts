import * as abstractions from "@razomy/abstractions";

export function getPath(node: abstractions.translators.ISemanticNode) {
    const path = [] as string[];
    while (node.parent){
    path.push(node.hir['name'] || null)
    node = node.parent
    }

    return path.filter(Boolean)
}

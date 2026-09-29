import * as abstracts from "@razomy/abstracts";

export function getPath(node: abstracts.translators.ISemanticNode) {
    const path = [] as string[];
    while (node.parent){
    path.push(node.hir['name'] || null)
    node = node.parent
    }

    return path.filter(Boolean)
}

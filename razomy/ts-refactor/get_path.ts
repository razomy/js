import * as abstracts from "@razomy/abstracts";

export function getPath(node: abstracts.translators.HirType) {
    const path = [] as string[];
    while (node.parent){
    path.push(node['name'] || null)
    node = node.parent
    }

    return path.filter(Boolean)
}

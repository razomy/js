import * as tsRl from "@razomy/ts-rl";

export function findExported(root: tsRl.hir.SnType): tsRl.hir.SnType[] {
    return tsRl.hir.iterator.findHirNodes<tsRl.hir.SnType>(root, function (node) {
    return (node.kind === 'StructHirn'
      || node.kind === 'FunctionHirn'
      || node.kind === 'BindingHirn'
    ) && node.isPublic();
    });
}

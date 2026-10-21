import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export type HirnFilter<T extends abstractions.hir.HirnType = abstractions.hir.HirnType> = (
  node: T,
  parent?: T,
) => boolean;

/**
 * Recursively traverses the HIR tree and accumulates nodes matching the predicate.
 */
export function findHirNodes<T extends abstractions.hir.HirnType>(
  node: T,
  predicate: HirnFilter<T>,
  acc: T[] = [],
  parent?: T,
): T[] {
  // If the current node matches the condition, accumulate it
  if (predicate(node, parent)) {
    acc.push(node as T);
  }

  // Recurse into children, passing the current node as parent
  tsHir.hir.iterator.walkHirChildren(
    node,
    (child) => findHirNodes(child, predicate, acc, node),
    (children) => {
      for (const child of children) {
        findHirNodes(child, predicate, acc, node);
      }
    },
  );

  return acc;
}

import * as abstracts from '@razomy/abstracts';

/**
 * Semantic tree
 * Optimised for development
 */
export interface ISemanticNode<T = abstracts.translators.HirType>
  extends abstracts.domains.IEntity,
    abstracts.graphs.HasOrder<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasParent<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasChildren<abstracts.translators.ISemanticNode[] | null> {
  id: string;
  hir: T;
}

export interface ISemanticCtx {
  tsMorphToHir: Map<string, abstracts.domains.IdRef<abstracts.translators.HirType>>;
  astToHir: Map<abstracts.domains.IdRef<abstracts.translators.HirType>, abstracts.domains.IdRef<abstracts.translators.HirType>>;
}

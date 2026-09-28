import * as abstracts from '@razomy/abstracts';
import type { HirType } from './hir';

/**
 * Semantic tree
 * Optimised for development
 */
export interface ISemanticNode
  extends abstracts.domains.IEntity,
    abstracts.graphs.HasOrder<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasParent<abstracts.translators.ISemanticNode | null>,
    abstracts.graphs.HasChildren<abstracts.translators.ISemanticNode[] | null> {
  hir: abstracts.domains.IdRef<HirType>;
}

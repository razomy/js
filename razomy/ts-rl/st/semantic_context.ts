import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export class SemanticContext {
  public nodeMap = new Map<string, abstracts.translators.HirType>();
  public root : abstracts.translators.HirType = null as any;
  public semanticMap = new Map<string, tsRl.st.SemanticNode<any>>();

  constructor(nodes?: abstracts.translators.HirType[]) {
    this.root = nodes![0];
    if (nodes) {
      for (const node of nodes) this.set(node);
    }
  }

  public set(node: abstracts.translators.HirType): void {
    this.nodeMap.set(node.id, node);
  }


  /**
   * Разрешает IdRef или саму ноду в специализированный Семантический Узел
   */
  public getSemantic<T extends tsRl.st.SemanticNode<any>>(
    target: abstracts.domains.IdRef<abstracts.translators.HirType> | null,
  ): T | null {
    if (!target) return null;

    const rawNode = this.nodeMap.get(target.id);
    if (!rawNode) return null;

    if (this.semanticMap.has(rawNode.id)) {
      return this.semanticMap.get(rawNode.id) as T;
    }

    const semantic = tsRl.st.createSemanticNode(rawNode, this);
    this.semanticMap.set(rawNode.id, semantic);
    return semantic as T;
  }
}


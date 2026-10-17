import * as abstractions from '@razomy/abstractions';
import * as object_ from '@razomy/object';

export interface HirSerializeOptions {
  /** Include node UUIDs (default: true) */
  includeIds?: boolean;
  /** Include next, prev, parent as node IDs instead of omitting them (default: false) */
  includeLinksAsIds?: boolean;
  /** Include the generic `children` array (default: false, as specific fields hold them) */
  includeGenericChildren?: boolean;
  /** Pretty print indentation spaces (default: 2) */
  space?: number;
}

/**
 * Serializes a HIR node or SemanticContext's hirRoot into a JSON string.
 */
export function hirToJsonString(root: abstractions.translators.IHirNode, options: HirSerializeOptions = {}): string {
  const { includeIds = false, includeLinksAsIds = false, includeGenericChildren = false, space = 2 } = options;
  const seen = new WeakSet();
  const replacer = function (this: any, key: string, value: any) {
    // 1. Handle LATE_INIT symbol/sentinel if it hasn't been initialized
    if (value === object_.LATE_INIT) {
      return undefined;
    }

    // 2. Filter out IDs if requested
    if (!includeIds && (key === 'id' || key === 'resolvedDeclaration' || key === 'fnHashId')) {
      return undefined;
    }

    if (key === 'ctx' || key === 'tsMorph') {
      return undefined;
    }

    // 3. Handle navigation links (Circular References)
    if (key === 'parent' || key === 'next' || key === 'prev') {
      if (includeLinksAsIds) {
        return value ? value.id : null;
      }
      return undefined; // Omit completely
    }

    // 4. Omit generic `children` array to avoid duplication with `statements`, `operands`, etc.
    if (key === 'children' && !includeGenericChildren) {
      return undefined;
    }

    // 5. General circular reference safeguard (e.g., if `target` references an ancestor)
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        // If a node is referenced multiple times, output a Reference pointer instead of infinite loop
        if ('id' in value && 'kind' in value) {
          return { $refId: value.id, kind: value.kind };
        }
        return '[Circular]';
      }
      seen.add(value);
    }

    if(typeof value === 'bigint') {
      return value.toString();
    }

    return value;
  };

  return JSON.stringify(root, replacer, space);
}

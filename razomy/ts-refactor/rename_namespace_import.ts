import { NamespaceImport, SyntaxKind } from "ts-morph";
import * as stringCase from "@razomy/string-case";
import * as tsRefactor from "@razomy/ts-refactor";

/**
 * Renames NamespaceImports (import * as alias from '...')
 * based on the camelCased version of the module URL.
 */
export function renameNamespaceImport(node: NamespaceImport) {
    if (node.wasForgotten()) return;
    const importDeclaration = node.getFirstAncestorByKind(SyntaxKind.ImportDeclaration);
    if (!importDeclaration) return;
    const modulePath = importDeclaration.getModuleSpecifierValue();
    if(!modulePath.startsWith("@razomy/")) {
      return;
    }
    // Remove .ts, .js, .tsx, .jsx
    const cleanName = modulePath
      .replace("@razomy/", '')
      .replaceAll("/", '_')
      .replace(/\.[jt]sx?$/, '') ;
    const originalName = node.getName();
    let newName = tsRefactor.toSafeName(stringCase.camelCase(cleanName));
    if (originalName === newName) return;
  const allIdentifiersInFile = new Set(node.getSourceFile().getDescendantsOfKind(SyntaxKind.Identifier).map((id) => id.getText()));

  if (allIdentifiersInFile.has(newName)) {
    newName = newName + '_';
    }

    console.info(`Rename Namespace: ${originalName} -> ${newName} (from path: ${modulePath})`);
    node.rename(newName);
}

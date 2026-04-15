import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

/**
 * Recursively parses general TS Nodes (Declarations, Statements)
 */
export function parseBinding(node: Node): abstracts.translators.DeclarationType | null {
  if (Node.isVariableStatement(node)) {
    return parseBinding(node.getDeclarations()[0]);
  }

  if (Node.isVariableDeclaration(node)) {
    return tsTranslators.ast.bindings.parseVariableBinding(node);
  }

  if (Node.isTypeAliasDeclaration(node)) {
    return tsTranslators.ast.bindings.parseTypeAliasBinding(node);
  }

  if (Node.isInterfaceDeclaration(node)) {
    return tsTranslators.ast.shapeBindings.parseInterfaceDeclaration(node);
  }

  if (Node.isEnumDeclaration(node)) {
    return tsTranslators.ast.bindings.parseEnumDeclaration(node);
  }

  if (Node.isFunctionDeclaration(node)) {
    return tsTranslators.ast.bindings.parseFunctionDeclaration(node);
  }

  if (Node.isImportDeclaration(node)) {
    const allNames = node.getNamedImports().map((ni) => ni.getName());

    return {
      kind: 'DependencyBinding',
      identifier: { kind: 'Identifier', name: allNames[0] },
      version: '',
      path: node.getModuleSpecifierValue(),
    } satisfies abstracts.translators.DependencyBinding;
  }

  if (Node.isStatement(node)) {
    return null;
  }

  throw new Error(`Unknown Declaration ${node.getKindName()} '${node.getText()}'`);
}

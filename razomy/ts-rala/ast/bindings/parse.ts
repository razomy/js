import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

/**
 * Recursively parses general TS Nodes (Declarations, Statements)
 */
export function parse(node: Node): abstracts.translators.BindingType | abstracts.translators.ShapeBindingType {
  if (Node.isVariableDeclaration(node)) {
    return tsLang.ast.bindings.parseVariable(node) as abstracts.translators.VariableBinding;
  }

  if (Node.isTypeAliasDeclaration(node)) {
    return tsLang.ast.shapeBindings.parseAlias(node);
  }

  if (Node.isInterfaceDeclaration(node)) {
    return tsLang.ast.shapeBindings.parseInterface(node);
  }

  if (Node.isClassDeclaration(node)) {
    return tsLang.ast.shapeBindings.parseClass(node);
  }

  if (Node.isEnumDeclaration(node)) {
    return tsLang.ast.bindings.parseEnum(node);
  }

  if (Node.isFunctionDeclaration(node)) {
    return tsLang.ast.bindings.parseFunction(node);
  }

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isBinaryExpression(expr)) {
      return {
        kind: 'AssignBinding',
        identifier: {
          kind: 'Identifier',
          name: expr.getLeft().getText() // This gets 'x'
        },
        expression: tsLang.ast.expressions.parse(expr.getRight()), // This gets the value
      };
    }
    throw new Error(`Unknown Bindings "${expr.getKindName()}" "${expr.getText()}"`);
  }

  if (Node.isImportDeclaration(node)) {
    let name: string | undefined;

    // 1. Check for Namespace Import (import * as name)
    const namespaceImport = node.getNamespaceImport();
    if (namespaceImport) {
      name = namespaceImport.getText();
    }
    // 2. Fallback to Named Imports (import { name })
    else {
      const namedImports = node.getNamedImports();
      if (namedImports.length > 0) {
        name = namedImports[0].getName();
      }
      // 3. Fallback to Default Import (import name from "...")
      else {
        name = node.getDefaultImport()?.getText();
      }
    }

    return {
      kind: 'DependencyBinding',
      identifier: {kind: 'Identifier', name: name !},
      version: '',
      path: node.getModuleSpecifierValue(),
    } satisfies abstracts.translators.DependencyBinding;
  }

  throw new Error(`Unknown Bindings "${node.getKindName()}" "${node.getText()}"`);
}

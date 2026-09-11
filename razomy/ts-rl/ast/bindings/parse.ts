import { Node } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parse(node: Node): abstracts.translators.AstType | abstracts.translators.AstType[] {
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map(decl => tsRl.ast.bindings.parseVariable(decl));
  }

  if (Node.isVariableDeclaration(node)) return tsRl.ast.bindings.parseVariable(node);
  if (Node.isTypeAliasDeclaration(node)) return tsRl.ast.shapeBindings.parseAlias(node);
  if (Node.isInterfaceDeclaration(node)) return tsRl.ast.shapeBindings.parseInterface(node);
  if (Node.isClassDeclaration(node)) return tsRl.ast.shapeBindings.parseClass(node);
  if (Node.isEnumDeclaration(node)) return tsRl.ast.bindings.parseEnum(node);
  if (Node.isFunctionDeclaration(node)) return tsRl.ast.bindings.parseFunction(node);

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isBinaryExpression(expr)) {
      return {
        kind: 'AssignAst', syntaxLayer: 3,
        identifier: { name: expr.getLeft().getText() },
        value: tsRl.ast.expressions.parse(expr.getRight()),
      } as abstracts.translators.AssignAst;
    }
  }

  if (Node.isImportDeclaration(node)) {
    let name = node.getNamespaceImport()?.getText() || node.getNamedImports()?.[0]?.getName() || node.getDefaultImport()?.getText() || '';
    return {
      kind: 'ImportAst', syntaxLayer: 3,
      identifier: { name },
      version: '',
      path: node.getModuleSpecifierValue(),
    } as abstracts.translators.ImportAst;
  }
  throw new Error(`Unknown Bindings "${node.getKindName()}"`);
}


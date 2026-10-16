import { Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parse(node: Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType[] {
  // declarations
  if (Node.isInterfaceDeclaration(node)) return [tsRl.ast.declarations.parseInterface(node, ctx)];
  if (Node.isClassDeclaration(node)) return [tsRl.ast.declarations.parseClass(node, ctx)];
  if (Node.isEnumDeclaration(node)) return [tsRl.ast.declarations.parseEnum(node, ctx)];
  if (Node.isFunctionDeclaration(node)) return tsRl.ast.declarations.parseFunction(node, ctx);

  // bindings
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map((decl) => tsRl.ast.bindings.parseVariable(decl, ctx));
  }

  if (Node.isVariableDeclaration(node)) return [tsRl.ast.bindings.parseVariable(node, ctx)];
  if (Node.isTypeAliasDeclaration(node)) return [tsRl.ast.bindings.parseAlias(node, ctx)];
  if (Node.isExportDeclaration(node)) return tsRl.ast.bindings.parseExport(node, ctx);
  if (Node.isPropertyDeclaration(node)) return [tsRl.ast.bindings.parseProperty(node, ctx)];
  if (Node.isMethodDeclaration(node)) return tsRl.ast.bindings.parseMethod(node, ctx);
  if (Node.isExportAssignment(node)) return [tsRl.ast.bindings.parseExportAssignment(node, ctx)];

  if (Node.isImportDeclaration(node)) {
    const name =
      node.getNamespaceImport()?.getText() ||
      node.getNamedImports()?.[0]?.getName() ||
      node.getDefaultImport()?.getText() ||
      '';
    const importAsn: abstractions.translators.ImportAsn = {
      id: random.createUuid(),
      kind: 'ImportAsn',
      syntaxRole: 'statement',
      identifier: { name },
      version: '',
      path: node.getModuleSpecifierValue(),
      modifiers: [],
    };
    if (!ctx.enter(importAsn, node)) {
      return [];
    }
    return [ctx.leave(importAsn, node)];
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
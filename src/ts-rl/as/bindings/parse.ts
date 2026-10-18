import { Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parse(node: Node, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.AsnType[] {
  // declarations
  if (Node.isInterfaceDeclaration(node)) return [tsRl.as.declarations.parseInterface(node, ctx)];
  if (Node.isClassDeclaration(node)) return [tsRl.as.declarations.parseClass(node, ctx)];
  if (Node.isEnumDeclaration(node)) return [tsRl.as.declarations.parseEnum(node, ctx)];
  if (Node.isFunctionDeclaration(node)) return tsRl.as.declarations.parseFunction(node, ctx);
  if (Node.isModuleDeclaration(node)) return [tsRl.as.declarations.parseModule(node, ctx)];

  // bindings
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map((decl) => tsRl.as.bindings.parseVariable(decl, ctx));
  }

  if (Node.isVariableDeclaration(node)) return [tsRl.as.bindings.parseVariable(node, ctx)];
  if (Node.isTypeAliasDeclaration(node)) return [tsRl.as.bindings.parseAlias(node, ctx)];
  if (Node.isExportDeclaration(node)) return tsRl.as.bindings.parseExport(node, ctx);
  if (Node.isPropertyDeclaration(node)) return [tsRl.as.bindings.parseProperty(node, ctx)];
  if (Node.isMethodDeclaration(node)) return tsRl.as.bindings.parseMethod(node, ctx);
  if (Node.isExportAssignment(node)) return [tsRl.as.bindings.parseExportAssignment(node, ctx)];

  if (Node.isImportDeclaration(node)) {
    const name =
      node.getNamespaceImport()?.getText() ||
      node.getNamedImports()?.[0]?.getName() ||
      node.getDefaultImport()?.getText() ||
      '';
    const importAsn: abstractions.translator.ImportAsn = {
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
  throw new tsRl.as.UnknownNodeException(node);
}

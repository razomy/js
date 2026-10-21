import { Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parse(node: Node, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.AsnType[] {
  // declarations
  if (Node.isInterfaceDeclaration(node)) return [tsHir.as.declarations.parseInterface(node, ctx)];
  if (Node.isClassDeclaration(node)) return [tsHir.as.declarations.parseClass(node, ctx)];
  if (Node.isEnumDeclaration(node)) return [tsHir.as.declarations.parseEnum(node, ctx)];
  if (Node.isFunctionDeclaration(node)) return tsHir.as.declarations.parseFunction(node, ctx);
  if (Node.isModuleDeclaration(node)) return [tsHir.as.declarations.parseModule(node, ctx)];

  // bindings
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map((decl) => tsHir.as.bindings.parseVariable(decl, ctx));
  }

  if (Node.isVariableDeclaration(node)) return [tsHir.as.bindings.parseVariable(node, ctx)];
  if (Node.isTypeAliasDeclaration(node)) return [tsHir.as.bindings.parseAlias(node, ctx)];
  if (Node.isExportDeclaration(node)) return tsHir.as.bindings.parseExport(node, ctx);
  if (Node.isPropertyDeclaration(node)) return [tsHir.as.bindings.parseProperty(node, ctx)];
  if (Node.isMethodDeclaration(node)) return tsHir.as.bindings.parseMethod(node, ctx);
  if (Node.isExportAssignment(node)) return [tsHir.as.bindings.parseExportAssignment(node, ctx)];

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
  throw new tsHir.as.UnknownNodeException(node);
}

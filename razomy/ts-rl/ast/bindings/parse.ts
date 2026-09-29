import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.AstType[] {
  // declarations
  if (Node.isInterfaceDeclaration(node)) return [tsRl.ast.declarations.parseInterface(node, ctx)];
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
  if (Node.isExportDeclaration(node)) {return tsRl.ast.bindings.parseExport(node, ctx);}
  if (Node.isPropertyDeclaration(node)) {return [tsRl.ast.bindings.parseProperty(node, ctx)];}
  if (Node.isMethodDeclaration(node)) {return tsRl.ast.bindings.parseMethod(node, ctx);}
  if (Node.isExportAssignment(node)) {return [tsRl.ast.bindings.parseExportAssignment(node, ctx)];}

  if (Node.isImportDeclaration(node)) {
    let name =
      node.getNamespaceImport()?.getText() ||
      node.getNamedImports()?.[0]?.getName() ||
      node.getDefaultImport()?.getText() ||
      '';
    return [
      {
        kind: 'ImportAst',
        syntaxRole: 'statement',
        identifier: { name },
        version: '',
        path: node.getModuleSpecifierValue(),
        modifiers: []
      },
    ];
  }
  throw new tsRl.ast.UnknownNodeException(node);
}

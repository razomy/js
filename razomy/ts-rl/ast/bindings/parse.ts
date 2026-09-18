import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Node): abstracts.translators.AstType[] {
  // declarations
  if (Node.isInterfaceDeclaration(node)) return [tsRl.ast.declarations.parseInterface(node)];
  if (Node.isInterfaceDeclaration(node)) return [tsRl.ast.declarations.parseInterface(node)];
  if (Node.isClassDeclaration(node)) return [tsRl.ast.declarations.parseClass(node)];
  if (Node.isEnumDeclaration(node)) return [tsRl.ast.declarations.parseEnum(node)];
  if (Node.isFunctionDeclaration(node)) return tsRl.ast.declarations.parseFunction(node);

  // bindings
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map((decl) => tsRl.ast.bindings.parseVariable(decl));
  }

  if (Node.isVariableDeclaration(node)) return [tsRl.ast.bindings.parseVariable(node)];
  if (Node.isTypeAliasDeclaration(node)) return [tsRl.ast.bindings.parseAlias(node)];
  if (Node.isExportDeclaration(node)) {return tsRl.ast.bindings.parseExport(node);}
  if (Node.isPropertyDeclaration(node)) {return [tsRl.ast.bindings.parseProperty(node)];}
  if (Node.isMethodDeclaration(node)) {return tsRl.ast.bindings.parseMethod(node);}
  if (Node.isExportAssignment(node)) {return [tsRl.ast.bindings.parseExportAssignment(node)];}

  if (Node.isImportDeclaration(node)) {
    let name =
      node.getNamespaceImport()?.getText() ||
      node.getNamedImports()?.[0]?.getName() ||
      node.getDefaultImport()?.getText() ||
      '';
    return [
      {
        kind: 'ImportAst',
        syntaxLayer: 3,
        identifier: { name },
        version: '',
        path: node.getModuleSpecifierValue(),
      },
    ];
  }
  throw new tsRl.ast.UnknownNodeException(node);
}

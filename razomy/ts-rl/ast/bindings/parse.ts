import { Node } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseVariable } from './parse_variable';
import { parseFunction } from './parse_function';
import { parseEnum } from './parse_enum';
import { parse as parseExpr } from '../expressions/parse';
import { parseClass, parseInterface, parseAlias } from '../shapeBindings';

export function parse(node: Node): translators.AstType | translators.AstType[] {
  if (Node.isVariableStatement(node) || Node.isVariableDeclarationList(node)) {
    return node.getDeclarations().map(decl => parseVariable(decl));
  }

  if (Node.isVariableDeclaration(node)) return parseVariable(node);
  if (Node.isTypeAliasDeclaration(node)) return parseAlias(node);
  if (Node.isInterfaceDeclaration(node)) return parseInterface(node);
  if (Node.isClassDeclaration(node)) return parseClass(node);
  if (Node.isEnumDeclaration(node)) return parseEnum(node);
  if (Node.isFunctionDeclaration(node)) return parseFunction(node);

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isBinaryExpression(expr)) {
      return {
        kind: 'AssignAst', syntaxLayer: 3,
        identifier: { name: expr.getLeft().getText() },
        value: parseExpr(expr.getRight()),
      } as translators.AssignAst;
    }
  }

  if (Node.isImportDeclaration(node)) {
    let name = node.getNamespaceImport()?.getText() || node.getNamedImports()?.[0]?.getName() || node.getDefaultImport()?.getText() || '';
    return {
      kind: 'ImportAst', syntaxLayer: 3,
      identifier: { name },
      version: '',
      path: node.getModuleSpecifierValue(),
    } as translators.ImportAst;
  }
  throw new Error(`Unknown Bindings "${node.getKindName()}"`);
}


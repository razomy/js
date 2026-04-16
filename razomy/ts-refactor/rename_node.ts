import {
  BindingElement,
  FunctionDeclaration,
  MethodDeclaration,
  Node,
  ParameterDeclaration,
  PropertyDeclaration,
  PropertySignature,
  VariableDeclaration,
} from 'ts-morph';
import * as stringCase from '@razomy/string-case';
import * as tsRefactor from '@razomy/ts-refactor';

export function renameNode(
  v:
    | VariableDeclaration
    | PropertyDeclaration
    | FunctionDeclaration
    | PropertySignature
    | MethodDeclaration
    | ParameterDeclaration,
) {
  const nameNode = v.getNameNode();

  if (Node.isObjectBindingPattern(nameNode) || Node.isArrayBindingPattern(nameNode)) {
    nameNode.getElements().forEach((element) => {
      if (Node.isBindingElement(element)) {
        renameBindingElement(element);
      }
    });
    return;
  }

  const name = v.getName();
  if (!name) {
    throw new Error('v must have name ' + v.getSourceFile().getFilePath() + v);
  }

  performSafeRename(v, name);
}

/**
 * recursive function to handle BindingElements (which can be nested)
 * e.g. const { a: { b } } = obj;
 */
function renameBindingElement(element: BindingElement) {
  const nameNode = element.getNameNode();

  if (Node.isObjectBindingPattern(nameNode) || Node.isArrayBindingPattern(nameNode)) {
    nameNode.getElements().forEach((childEl) => {
      if (Node.isBindingElement(childEl)) {
        renameBindingElement(childEl);
      }
    });
    return;
  }

  const name = element.getName();
  const parent = element.getParent();
  if (Node.isObjectBindingPattern(parent) && !element.getPropertyNameNode()) {
    const newName = tsRefactor.toSafeName(stringCase.camelCase(name));
    if (newName !== name && (tsRefactor.isNameTaken(element as any, newName) || newName !== name)) {
      element.rename(name);
    }
  }

  performSafeRename(element as any, name);
}

/**
 * Shared logic to calculate safe name and apply rename
 */
function performSafeRename(node: Node & { rename: (text: string) => void }, originalName: string) {
  function isExportableVariable() {
    const isVariable = Node.isVariableDeclaration(node);
    if (!isVariable) return false;
    const parentStatement = node.getParent()?.getParent();
    if (!parentStatement) return false;
    return Node.isExportable(parentStatement) && parentStatement.isExported();
  }

  let newName = tsRefactor.toSafeName(
    isExportableVariable() ? stringCase.constantCase(originalName) : stringCase.camelCase(originalName),
  );

  if (originalName === newName) return;

  if (tsRefactor.isNameTaken(node as any, newName)) {
    newName = newName + '_';
  }

  console.info(`Rename ${originalName} -> ${newName}`);
  node.rename(newName);
}

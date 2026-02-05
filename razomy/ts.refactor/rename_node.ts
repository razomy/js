import {
  BindingElement,
  FunctionDeclaration,
  MethodDeclaration,
  Node,
  ParameterDeclaration,
  PropertyDeclaration,
  PropertySignature,
  VariableDeclaration
} from 'ts-morph';
import {isNameTaken} from './is_name_taken';
import {toSafeName} from './to_safe_name';

export function renameNode(v: VariableDeclaration
  | PropertyDeclaration
  | FunctionDeclaration
  | PropertySignature
  | MethodDeclaration
  | ParameterDeclaration) {

  const nameNode = v.getNameNode();

  // 1. Handle Destructuring (Object or Array binding patterns)
  // e.g. const { a, b } = obj;  or  const [x, y] = arr;
  if (Node.isObjectBindingPattern(nameNode) || Node.isArrayBindingPattern(nameNode)) {
    // Iterate over every element in the pattern ({a, b} -> rename a, rename b)
    nameNode.getElements().forEach((element) => {
      // Omitted expressions occur in arrays with holes: const [, b] = arr;
      if (Node.isBindingElement(element)) {
        renameBindingElement(element);
      }
    });
    return;
  }

  // 2. Handle Standard Declarations
  // e.g. const a = 1;
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

  // Recursively handle nested destructuring
  if (Node.isObjectBindingPattern(nameNode) || Node.isArrayBindingPattern(nameNode)) {
    nameNode.getElements().forEach((childEl) => {
      if (Node.isBindingElement(childEl)) {
        renameBindingElement(childEl);
      }
    });
    return;
  }

  // It's a leaf node variable (e.g. 'a' in { a })
  const name = element.getName();

  // Logic specifically for Object Destructuring:
  // If we rename 'a' to 'b' in `const { a } = obj`, we must ensure it becomes `const { a: b } = obj`.
  // If we don't set the property name first, ts-morph might change it to `const { b } = obj`.
  const parent = element.getParent();
  if (Node.isObjectBindingPattern(parent) && !element.getPropertyNameNode()) {
    const newName = toSafeName(name);
    // Only mess with the structure if a rename is actually going to happen
    if (newName !== name && (isNameTaken(element as any, newName) || newName !== name)) {
      // Lock the source property name to the current name
      element.rename(name);
    }
  }

  performSafeRename(element as any, name);
}

/**
 * Shared logic to calculate safe name and apply rename
 */
function performSafeRename(node: Node & { rename: (text: string) => void }, originalName: string) {
  let newName = toSafeName(originalName);

  if (originalName === newName) {
    return;
  }

  // Note: we cast to 'any' for isNameTaken because the custom guard might only accept specific types,
  // but BindingElement acts like a variable in this context.
  if (isNameTaken(node as any, newName)) {
    newName = newName + '_';
  }

  console.info(`Rename ${originalName} -> ${newName}`);
  node.rename(newName);
}
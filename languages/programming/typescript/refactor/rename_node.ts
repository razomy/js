import {
  FunctionDeclaration,
  MethodDeclaration,
  Node,
  ParameterDeclaration,
  PropertyDeclaration,
  VariableDeclaration
} from 'ts-morph';
import {is_name_taken} from 'razomy.languages/programming/typescript/refactor/is_name_taken';
import {to_safe_name} from './to_safe_name';

export function rename_node(v: VariableDeclaration
  | PropertyDeclaration
  | FunctionDeclaration
  | MethodDeclaration
  | ParameterDeclaration) {
  const name = v.getName();
  if (!name) {
    throw new Error('v must have name ' + v.getSourceFile().getFilePath() + v)
  }

  let new_name = to_safe_name(name);
  if (name === new_name) {
    return
  }

  if (is_name_taken(v, new_name)) {
    new_name = new_name + '_';
  }

  const is_object_binding_pattern = Node.isObjectBindingPattern(v.getNameNode());
  const is_array_binding_pattern = Node.isArrayBindingPattern(v.getNameNode());

  if (is_object_binding_pattern || is_array_binding_pattern) {
    console.error(`ERROR ${name} -> ${new_name}. Cannot rename isObjectBindingPattern or isArrayBindingPattern`)
    return;
  }

  console.info(`Rename ${name} -> ${new_name}`)

  v.rename(new_name);
}
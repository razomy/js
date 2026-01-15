import {
  FunctionDeclaration,
  MethodDeclaration,
  Node,
  ParameterDeclaration,
  PropertyDeclaration,
  VariableDeclaration
} from 'ts-morph';
import {to_snake_case} from 'razomy.string';
import {reserved_names_js} from 'razomy.languages/programming/fs/reserved_names_js';
import {is_name_taken} from 'razomy.languages/programming/typescript/refactor/is_name_taken';

export function to_safe_name(name: string) {
  let new_name = to_snake_case(name);
  if (reserved_names_js[new_name] || new_name == '') {
    new_name = new_name + '_';
  }
  return new_name;
}

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
import {IterateSourceFileState} from '../iterate_source_files_and_save';
import {SyntaxKind, VariableDeclaration, Node} from 'ts-morph';
import {to_safe_name} from '../to_safe_name';
import {get_name_and_ext} from './get_name_and_ext';

export async function rename_file_based_on_first_child({source_file, project}: IterateSourceFileState) {
  const declaration = source_file.getFirstDescendant((node) => {
    // 1. Check if it is the Kind we want
    const kind = node.getKind();
    const is_target_kind =
      kind === SyntaxKind.FunctionDeclaration ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.ClassDeclaration;

    if (!is_target_kind) return false;

    // 2. Check if it is Exported
    // Node.isExportable acts as a type guard so TypeScript knows .isExported() exists
    if (Node.isExportable(node)) {
      return node.isExported();
    }

    return false;
  });
  if (!declaration) {
    return
  }

  const name = to_safe_name((declaration as VariableDeclaration).getName() || '');
  if (!name) {
    return
  }
  let {base_name, ext} = get_name_and_ext(source_file);

  if (name == base_name) {
    return
  }

  const path = `${source_file.getDirectory().getPath()}/${name}${ext}`;
  console.log(`${source_file.getDirectory().getPath()} ${base_name} → ${name}`);
  source_file.move(path);
}
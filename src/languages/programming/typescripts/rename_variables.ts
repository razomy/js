import { Project, SyntaxKind, Node } from 'ts-morph';

const to_snake_case = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
};

const rename_variables_and_props = async () => {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const source_files = project.getSourceFiles();
  let count = 0;

  for (const file of source_files) {
    // 1. Rename Variables (const, let, var)
    // We use getDescendantsOfKind to find variables inside functions/loops too
    const vars = file.getDescendantsOfKind(SyntaxKind.VariableDeclaration);

    for (const v of vars) {
      const name = v.getName();
      const new_name = to_snake_case(name);

      // Skip desctructured variables (e.g. const { camelCase } = obj) to avoid breaking external refs
      const is_destructured = Node.isObjectBindingPattern(v.getParent());

      if (!is_destructured && name !== new_name) {
        try {

        console.log(`[VAR] ${name} -> ${new_name}`);
        v.rename(new_name);
        } catch (e) {

          console.log(`ERROR[VAR] ${name} -> ${new_name}`);
        }
        count++;
      }
    }

    // 2. Rename Interface & Type Literal Properties
    const prop_signatures = file.getDescendantsOfKind(SyntaxKind.PropertySignature);
    for (const prop of prop_signatures) {
      const name = prop.getName();
      const new_name = to_snake_case(name);

      if (name !== new_name) {
        prop.rename(new_name);
        console.log(`[PROP-SIG] ${name} -> ${new_name}`);
        count++;
      }
    }

    // 3. Rename Class Properties
    const class_props = file.getDescendantsOfKind(SyntaxKind.PropertyDeclaration);
    for (const prop of class_props) {
      const name = prop.getName();
      const new_name = to_snake_case(name);

      if (name !== new_name) {
        prop.rename(new_name);
        console.log(`[PROP-CLASS] ${name} -> ${new_name}`);
        count++;
      }
    }
  }

  if (count > 0) {
    console.log(`Saving ${count} renames...`);
    await project.save();
  } else {
    console.log('No variables or properties needed renaming.');
  }
};

rename_variables_and_props();
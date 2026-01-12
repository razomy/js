import { Project, SyntaxKind, Node } from 'ts-morph';

const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
};

const renameVariablesAndProps = async () => {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();
  let count = 0;

  for (const file of sourceFiles) {
    // 1. Rename Variables (const, let, var)
    // We use getDescendantsOfKind to find variables inside functions/loops too
    const vars = file.getDescendantsOfKind(SyntaxKind.VariableDeclaration);

    for (const v of vars) {
      const name = v.getName();
      const newName = toSnakeCase(name);

      // Skip desctructured variables (e.g. const { camelCase } = obj) to avoid breaking external refs
      const isDestructured = Node.isObjectBindingPattern(v.getParent());

      if (!isDestructured && name !== newName) {
        v.rename(newName);
        console.log(`[VAR] ${name} -> ${newName}`);
        count++;
      }
    }

    // 2. Rename Interface & Type Literal Properties
    const propSignatures = file.getDescendantsOfKind(SyntaxKind.PropertySignature);
    for (const prop of propSignatures) {
      const name = prop.getName();
      const newName = toSnakeCase(name);

      if (name !== newName) {
        prop.rename(newName);
        console.log(`[PROP-SIG] ${name} -> ${newName}`);
        count++;
      }
    }

    // 3. Rename Class Properties
    const classProps = file.getDescendantsOfKind(SyntaxKind.PropertyDeclaration);
    for (const prop of classProps) {
      const name = prop.getName();
      const newName = toSnakeCase(name);

      if (name !== newName) {
        prop.rename(newName);
        console.log(`[PROP-CLASS] ${name} -> ${newName}`);
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

renameVariablesAndProps();
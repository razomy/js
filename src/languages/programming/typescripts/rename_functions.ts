import { Project, SyntaxKind } from 'ts-morph';

const to_snake_case = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert _ before capitals
    .toLowerCase();
};

const rename_functions = async () => {
  const project = new Project({
    tsConfigFilePath: '../../../../tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();
  let count = 0;

  for (const file of sourceFiles) {
    // 1. Handle Function Declarations: function myFunc() {}
    for (const func of file.getFunctions()) {
      const name = func.getName();
      if (!name) continue;

      const newName = to_snake_case(name);
      if (name !== newName) {
        func.rename(newName); // Updates references globally
        console.log(`[FUNC] ${name} -> ${newName}`);
        count++;
      }
    }

    // 2. Handle Arrow Functions: const myFunc = () => {}
    for (const variable of file.getVariableDeclarations()) {
      const name = variable.getName();
      const initializer = variable.getInitializer();

      // Only rename if it's actually initialized as a function
      if (
        initializer &&
        (initializer.isKind(SyntaxKind.ArrowFunction) ||
          initializer.isKind(SyntaxKind.FunctionExpression))
      ) {
        const newName = to_snake_case(name);
        if (name !== newName) {
          variable.rename(newName); // Updates references globally
          console.log(`[VAR]  ${name} -> ${newName}`);
          count++;
        }
      }
    }
  }

  if (count > 0) {
    console.log(`Saving ${count} renames...`);
    await project.save();
  } else {
    console.log('No functions needed renaming.');
  }
};

rename_functions();
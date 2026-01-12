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

  const source_files = project.getSourceFiles();
  let count = 0;

  for (const file of source_files) {
    // 1. Handle Function Declarations: function myFunc() {}
    for (const func of file.getFunctions()) {
      const name = func.getName();
      if (!name) continue;

      const new_name = to_snake_case(name);
      if (name !== new_name) {
        func.rename(new_name); // Updates references globally
        console.log(`[FUNC] ${name} -> ${new_name}`);
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
        const new_name = to_snake_case(name);
        if (name !== new_name) {
          variable.rename(new_name); // Updates references globally
          console.log(`[VAR]  ${name} -> ${new_name}`);
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
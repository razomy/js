import {Node, Project, SyntaxKind, VariableDeclarationKind} from 'ts-morph';

export async function convertLambdasToNamedFunctions(projectPath: string) {
  const project = new Project({
    tsConfigFilePath: projectPath + 'tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles();

  for (const file of sourceFiles) {
    // 1. Get all variable declarations (e.g., const myFunc = ...)
    const variableDeclarations = file.getDescendantsOfKind(SyntaxKind.VariableDeclaration);

    // We iterate in reverse or check wasForgotten because modifying the AST
    // invalidates nodes, and we want to avoid processing a node we just removed/replaced.
    for (const variableDecl of variableDeclarations) {
      if (variableDecl.wasForgotten()) {
        continue;
      }

      // 2. Check if the variable is initialized with an Arrow Function
      const initializer = variableDecl.getInitializer();
      if (!initializer || !Node.isArrowFunction(initializer)) {
        continue;
      }

      // 3. Ensure it is a top-level or block-level variable (not inside another expression)
      // and that the parent is a VariableStatement (const x = ...)
      const variableStatement = variableDecl.getVariableStatement();
      if (!variableStatement) {
        continue;
      }

      // We generally only want to convert 'const', not 'let' or 'var' to function declarations
      if (variableStatement.getDeclarationKind() !== VariableDeclarationKind.Const) {
        continue;
      }

      // 4. Extract details
      const functionName = variableDecl.getName();
      const isAsync = initializer.isAsync();
      const isExported = variableStatement.isExported();
      const typeParams = initializer.getTypeParameters().map(t => t.getText());
      const params = initializer.getParameters().map(p => p.getText());
      const returnType = initializer.getReturnTypeNode()?.getText();

      // 5. Handle the Body
      const body = initializer.getBody();
      let newBodyText = '';

      if (Node.isBlock(body)) {
        // It already has curly braces: () => { ... }
        newBodyText = body.getText();
      } else {
        // It is an implicit return: () => 1 + 1
        // Wrap it: { return 1 + 1; }
        newBodyText = `{ return ${body.getText()}; }`;
      }

      // 6. Construct the new Function Declaration text
      const parts: string[] = [];
      if (isExported) parts.push('export');
      if (isAsync) parts.push('async');
      parts.push(`function ${functionName}`);
      if (typeParams.length > 0) parts.push(`<${typeParams.join(', ')}>`);
      parts.push(`(${params.join(', ')})`);
      if (returnType) parts.push(`: ${returnType}`);
      parts.push(newBodyText);

      const finalText = parts.join(' ');

      // 7. Replace the entire variable statement with the new function declaration
      // Note: This logic assumes one variable declaration per statement (standard practice)
      // e.g. "const a = ..., b = ..." will strictly replace the whole line with the function for 'a'
      if (variableStatement.getDeclarations().length === 1) {
        variableStatement.replaceWithText(finalText);
        console.log(`Converted: ${functionName} in ${file.getBaseName()}`);
      }
    }
  }

  await project.save();
}

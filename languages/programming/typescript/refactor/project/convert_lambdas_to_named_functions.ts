import {Node, Project, SyntaxKind, VariableDeclarationKind} from 'ts-morph';
import {if_main} from 'razomy.main';

export async function convert_lambdas_to_named_functions(project_path: string) {
  const project = new Project({
    tsConfigFilePath: project_path + 'tsconfig.json',
  });

  const source_files = project.getSourceFiles();

  for (const file of source_files) {
    // 1. Get all variable declarations (e.g., const myFunc = ...)
    const variable_declarations = file.getDescendantsOfKind(SyntaxKind.VariableDeclaration);

    // We iterate in reverse or check wasForgotten because modifying the AST
    // invalidates nodes, and we want to avoid processing a node we just removed/replaced.
    for (const variable_decl of variable_declarations) {
      if (variable_decl.wasForgotten()) {
        continue;
      }

      // 2. Check if the variable is initialized with an Arrow Function
      const initializer = variable_decl.getInitializer();
      if (!initializer || !Node.isArrowFunction(initializer)) {
        continue;
      }

      // 3. Ensure it is a top-level or block-level variable (not inside another expression)
      // and that the parent is a VariableStatement (const x = ...)
      const variable_statement = variable_decl.getVariableStatement();
      if (!variable_statement) {
        continue;
      }

      // We generally only want to convert 'const', not 'let' or 'var' to function declarations
      if (variable_statement.getDeclarationKind() !== VariableDeclarationKind.Const) {
        continue;
      }

      // 4. Extract details
      const function_name = variable_decl.getName();
      const is_async = initializer.isAsync();
      const is_exported = variable_statement.isExported();
      const type_params = initializer.getTypeParameters().map(t => t.getText());
      const params = initializer.getParameters().map(p => p.getText());
      const return_type = initializer.getReturnTypeNode()?.getText();

      // 5. Handle the Body
      const body = initializer.getBody();
      let new_body_text = '';

      if (Node.isBlock(body)) {
        // It already has curly braces: () => { ... }
        new_body_text = body.getText();
      } else {
        // It is an implicit return: () => 1 + 1
        // Wrap it: { return 1 + 1; }
        new_body_text = `{ return ${body.getText()}; }`;
      }

      // 6. Construct the new Function Declaration text
      const parts: string[] = [];
      if (is_exported) parts.push('export');
      if (is_async) parts.push('async');
      parts.push(`function ${function_name}`);
      if (type_params.length > 0) parts.push(`<${type_params.join(', ')}>`);
      parts.push(`(${params.join(', ')})`);
      if (return_type) parts.push(`: ${return_type}`);
      parts.push(new_body_text);

      const final_text = parts.join(' ');

      // 7. Replace the entire variable statement with the new function declaration
      // Note: This logic assumes one variable declaration per statement (standard practice)
      // e.g. "const a = ..., b = ..." will strictly replace the whole line with the function for 'a'
      if (variable_statement.getDeclarations().length === 1) {
        variable_statement.replaceWithText(final_text);
        console.log(`Converted: ${function_name} in ${file.getBaseName()}`);
      }
    }
  }

  await project.save();
}

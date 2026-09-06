import * as abstracts from '@razomy/abstracts';

// --- Helper to convert your Spec to Anthropic Tool Schema ---

export function specToTool([doc, fn]: abstracts.translators.FunctionDocsAstJoinFunctionAst) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const param of fn.parameters) {
    properties[param.identifier.name] = {
      type: param.shape?.kind, // Note: Anthropic expects JSON Schema types (string, number, boolean, object, array)
      description: doc[param.identifier.name].description,
    };

    // If there is no default value, we assume the parameter is required
    if (param.value === null || param.value === undefined) {
      required.push(param.identifier.name);
    }
  }

  return {
    name: fn.identifier.name,
    description: doc.description,
    input_schema: {
      type: 'object',
      properties,
      required,
    },
  };
}

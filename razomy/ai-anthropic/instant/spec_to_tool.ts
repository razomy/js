import * as abstracts from '@razomy/abstracts';

// --- Helper to convert your Spec to Anthropic Tool Schema ---

export function specToTool(spec: abstracts.translators.FunctionBinding) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const param of spec.parameters) {
    properties[param.identifier.name] = {
      type: param.shapeIdentifier?.kind, // Note: Anthropic expects JSON Schema types (string, number, boolean, object, array)
      description: param.meta.description,
    };

    // If there is no default value, we assume the parameter is required
    if (param.expression === null || param.expression === undefined) {
      required.push(param.identifier.name);
    }
  }

  return {
    name: spec.identifier.name,
    description: spec.meta.description,
    input_schema: {
      type: 'object',
      properties,
      required,
    },
  };
}

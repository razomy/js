import * as abstracts from "@razomy/abstracts";

// --- Helper to convert your Spec to Anthropic Tool Schema ---

export function specToTool(spec: abstracts.ast.PackageFunction) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const param of (spec.parameter as abstracts.ast.Object).items) {
    properties[param.name] = {
      type: param.item.kind, // Note: Anthropic expects JSON Schema types (string, number, boolean, object, array)
      description: param.description,
    };

    // If there is no default value, we assume the parameter is required
    if (param.value === null || param.value === undefined) {
      required.push(param.name);
    }
  }

  return {
    name: spec.name,
    description: spec.description,
    input_schema: {
      type: "object",
      properties,
      required,
    }
  };
}

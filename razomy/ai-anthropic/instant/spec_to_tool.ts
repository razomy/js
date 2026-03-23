import * as fns from "@razomy/fns";

// --- Helper to convert your Spec to Anthropic Tool Schema ---

export function specToTool(spec: fns.FunctionSpecification) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const param of spec.parameters) {
    properties[param.name] = {
      type: param.type, // Note: Anthropic expects JSON Schema types (string, number, boolean, object, array)
      description: param.description,
    };

    // If there is no default value, we assume the parameter is required
    if (param.defaultValue === null || param.defaultValue === undefined) {
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

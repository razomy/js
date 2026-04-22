import * as abstracts from "@razomy/abstracts";

export function specToTool(spec: abstracts.translators.FunctionBinding) {
    const properties: Record<string, any> = {};
    const required: string[] = [];
    spec.parameters.forEach((param) => {
    properties[param.identifier.name] = {
      type: param.kind.toLowerCase(),
      description: param.meta.description,
    };


    if (param.expression === null) {
      required.push(param.kind);
    }
    });
    return {
    type: 'function',
    function: {
      name: spec.identifier.name,
      description: `${spec.meta.description}.`,
      parameters: {
        type: 'object',
        properties,
        required: required.length > 0 ? required : [],
      },
    }
    };
}

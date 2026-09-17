import * as abstracts from "@razomy/abstracts";

export function specToTool(fn: abstracts.translators.FunctionHir) {
  const properties: Record<string, any> = {};
  const required: string[] = [];
  fn.parameters.forEach((param) => {
    properties[param.name!] = {
      type: param.kind.toLowerCase(),
      description: param.description!.value!.value,
    };

    if (param.value === null) {
      required.push(param.kind);
    }
  });
  return {
    type: 'function',
    function: {
      name: fn.name!,
      description: `${fn.description!.value!.value}.`,
      parameters: {
        type: 'object',
        properties,
        required: required.length > 0 ? required : [],
      },
    }
  };
}

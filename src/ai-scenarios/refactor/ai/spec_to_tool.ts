import * as abstractions from "@razomy/abstractions";

export function specToTool(fn: abstractions.translator.FunctionHirn) {
  const properties: Record<string, any> = {};
  const required: string[] = [];
  fn.parameters.forEach((param) => {
    properties[param.name!] = {
      type: param.kind.toLowerCase(),
      description: param.doc.description!,
    };

    if (param.value === null) {
      required.push(param.kind);
    }
  });
  return {
    type: 'function',
    function: {
      name: fn.name!,
      description: `${fn.doc!.description!}.`,
      parameters: {
        type: 'object',
        properties,
        required: required.length > 0 ? required : [],
      },
    }
  };
}

import * as abstracts from "@razomy/abstracts";

export function specToTool([docs, fn]: [abstracts.translators.FunctionDocsAst, abstracts.translators.FunctionHir]) {
  const properties: Record<string, any> = {};
  const required: string[] = [];
  fn.parameters.forEach((param) => {
    properties[param.identifier] = {
      type: param.kind.toLowerCase(),
      description: docs.parameters[param.identifier],
    };

    if (param.value === null) {
      required.push(param.kind);
    }
  });
  return {
    type: 'function',
    function: {
      name: fn.identifier,
      description: `${docs.description}.`,
      parameters: {
        type: 'object',
        properties,
        required: required.length > 0 ? required : [],
      },
    }
  };
}

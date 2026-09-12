import * as abstracts from "@razomy/abstracts";

export function createPackageFunction(
  f: Partial<{
    title: string;
    body: any;
    performance: any;
    examples: any;
    isAsync: boolean;
    isGenerator: boolean;
    name: string;
    description: string;
    parameter: Record<string, string>;
    returnShape: { description: string; type?: string };
  }>,
): [abstracts.translators.FunctionDocsAst, abstracts.translators.FunctionAst] {
  return [
    {
      kind: 'FunctionDocsAst',
      syntaxLayer: 1,
      title: f.title || f.name || '',
      description: f.description || '',
      timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      parameters: f.parameter || {},
      examples: f.examples || [],
    },
    {
      kind: 'FunctionAst',
      syntaxLayer: 3,
      modifiers: [
        f.isAsync ? {id:0,kind: 'LiteralHir', value: 'async'} : null,
        f.isGenerator ? {id:0,kind: 'LiteralHir', value: 'generator'} : null,
      ] satisfies abstracts.translators.LiteralHir[],
      name: f.name || '',
      parameters: Object.entries(f.parameter || {}).map(
        ([k, v]) =>
          ({
            kind: 'BindingHir',
            syntaxLayer: 3,
            semanticLayer: 3,
            modifiers: [],
            identifier: k,
            shape: {
              kind: 'ReferenceHir',
              target: 'String',
              syntaxLayer: 2,
              semanticLayer: 2,
            } as abstracts.translators.ReferenceHir,
            value: null,
            externalSource: null,
          } as abstracts.translators.BindingHir),
      ),
      semanticLayer: 3,
      block: null,
      returnShape: f.returnShape?.type
        ? ({
          kind: 'ReferenceHir',
          syntaxLayer: 2,
          target: f.returnShape.type
        } as abstracts.translators.ReferenceHir)
        : null,
    },
  ];
}

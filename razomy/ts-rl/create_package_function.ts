import * as translators from '@razomy/abstracts/translators';

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
): [translators.FunctionDocsAst, translators.FunctionHir] {
  return [
    {
      kind: 'FunctionDocsAst',
      syntaxLayer: 1,
      title: f.title || f.name || '',
      description: f.description || '',
      performance: {
        timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
        memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
        history: f.performance?.history || [],
      },
      parameters: f.parameter || {},
      examples: f.examples || [],
    },
    {
      kind: 'FunctionHir',
      syntaxLayer: 3,
      symbolId: 0,
      modifiers: [
        f.isAsync ? {kind: 'ModifierHir', type: 'async'} : null,
        f.isGenerator ? {kind: 'ModifierHir', type: 'generator'} : null,
      ] as translators.ModifierHir[],
      identifier: f.name || '',
      parameters: Object.entries(f.parameter || {}).map(
        ([k, v]) =>
          ({
            kind: 'BindingHir',
            syntaxLayer: 3,
            modifiers: [],
            identifier: k,
            shape: {
              kind: 'ReferenceHir',
              symbolId: 0,
              targetSymbol: 0,
              syntaxLayer: 2,
              identifier: 'String'
            } as translators.ReferenceHir,
            value: null,
            symbolId: 0,
            externalSource: null,
          } as translators.BindingHir),
      ),
      block: {kind: 'BlockHir', symbolId: 0, type: 'return', syntaxLayer: 3, statements: f.body || []},
      returnShape: f.returnShape?.type
        ? ({
          kind: 'ReferenceHir',
          syntaxLayer: 2,
          symbolId: 0,
          targetSymbol: 0,
          identifier: f.returnShape.type
        } as translators.ReferenceHir)
        : null,
    },
  ];
}

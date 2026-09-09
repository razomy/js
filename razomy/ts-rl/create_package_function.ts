import * as abstracts from '@razomy/abstracts';

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
): abstracts.translators.FunctionDocsAstJoinFunctionAst {
  return [
    {
      kind: 'FunctionDocsAst',
      syntaxLayer: 3,
      title: f.title || f.name || '',
      description: f.description || '',
      performance: {
        timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
        memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
        history: f.performance?.history || [],
      },
      parameters: f.parameter!,
      examples: f.examples || [],
    },
    {
      kind: 'FunctionAst',
      syntaxLayer: 1,
      modifiers: [f.isAsync ? 'async' : undefined, f.isGenerator ? 'generator' : undefined].filter(Boolean) as any,
      identifier: {kind: 'Identifier', name: f.name || ''} as any,
      parameters: Object.entries(f.parameter || {}).map(
        ([k, v]) =>
          ({
            kind: 'ParameterAst',
            identifier: {kind: 'Identifier', name: k} as any,
            modifiers: [],
            shape: {kind: 'KeywordType', name: 'string'} as any,
            value: null,
            syntaxLayer: 1,
          } as abstracts.translators.ParameterAst),
      ),
      block: f.body || [],
      generics: [],
      returnShape: f.returnShape?.type ? ({kind: 'ShapeIdentifier', name: f.returnShape.type} as any) : null,
    }];
}

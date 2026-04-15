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
    return_: { description: string; type?: string };
  }>,
): abstracts.translators.FunctionBinding {
  return {
    kind: 'FunctionBinding',
    meta: {
      title: f.title || f.name || '',
      description: f.description || '',
      performance: {
        timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
        memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
        history: f.performance?.history || [],
      },

      examples: f.examples || [],
    },
    modifiers: [f.isAsync ? 'async' : undefined, f.isGenerator ? 'generator' : undefined].filter(Boolean) as any,
    identifier: { kind: 'Identifier', name: f.name || '' } as any,
    parameters: Object.entries(f.parameter || {}).map(
      ([k, v]) =>
        ({
          kind: 'ParameterBinding',
          description: v,
          identifier: { kind: 'Identifier', name: k } as any,
          isRest: false,
          type: { kind: 'KeywordType', name: 'string' } as any,
          expression: null,
        } as any),
    ),
    body: f.body || [],
    shapes: [],
    returnType: f.return_?.type ? ({ kind: 'ShapeIdentifier', name: f.return_.type } as any) : null,
  };
}

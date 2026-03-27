import * as abstracts from "@razomy/abstracts";

export function createPackageFunction(f:
  Omit<
    Partial<abstracts.translators.FunctionDeclaration>,
    'parameters' | 'return_' | 'identifier'
  > & Partial<{
    name: string;
    parameter: Record<string, string>;
    return_: { description: string; type?: string };
  }>
): abstracts.translators.FunctionDeclaration {
  return {
    ...f,
    kind: 'FunctionDeclaration',
    title: f.title || f.name || '',
    identifier: { kind: 'Identifier', name: f.name || '' },
    isPublic: f.isPublic ?? true,
    description: f.description || '',
    isAsync: f.isAsync ?? false,
    isGenerator: f.isGenerator ?? false,
    body: f.body || [],
    return_: {
      kind: 'ReturnDeclaration',
      identifier: { kind: 'Identifier', name: 'return' },
      isPublic: true,
      description: f.return_?.description || 'Nothing',
      type: f.return_?.type ? { kind: 'KeywordType', name: f.return_.type as any } : null,
    },
    performance: {
      timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      history: f.performance?.history || ([] as any),
    },
    parameters: Object.entries(f.parameter || {}).map(([k, v]) => ({
      kind: 'ParameterDeclaration',
      description: v,
      identifier: { kind: 'Identifier', name: k },
      isPublic: true,
      isRest: false,
      type: { kind: 'KeywordType', name: 'string' },
      expression: null,
    })),
    examples: f.examples || [],
  };
}

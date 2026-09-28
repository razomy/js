import * as abstracts from '@razomy/abstracts';
import * as random from '@razomy/random';

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
): abstracts.translators.FunctionSt {
  return {
    hir: {
      id: random.createUuid(),
      syntaxRole: 'statement',
      semanticLayer: 'state',
      kind: 'FunctionHir',
      name: f.name || '',
      modifiers: [
        f.isAsync ? { kind: 'LiteralHir', value: 'async' } : null,
        f.isGenerator ? { kind: 'LiteralHir', value: 'generator' } : null,
      ].filter((i) => i != null) as abstracts.translators.HirType[],
      parameters: Object.entries(f.parameter || {}).map(
        ([k, v]) =>
          ({
            id: random.createUuid(),
            kind: 'BindingHir',
            syntaxRole: 'statement',
            semanticLayer: 'generic',
            modifiers: [],
            name: k,
            description: { kind: 'LiteralHir', value: v },
            identifier: k,
            shape: {
              id: random.createUuid(),
              kind: 'ReferenceHir',
              syntaxRole: 'expression',
              semanticLayer: 'shape',
              target: null,
              property: null,
              arguments_: [],
            } satisfies abstracts.translators.ReferenceHir,
            value: null,
            externalSource: null,
          } as abstracts.translators.BindingHir),
      ) as abstracts.translators.BindingHir[],
      block: null,
      returnShape: f.returnShape?.type
        ? ({
            id: random.createUuid(),
            kind: 'ReferenceHir',
            syntaxRole: 'expression',
            semanticLayer: 'shape',
            property: null,
            arguments_: [],
            target: {
              id: random.createUuid(),
              kind: 'LiteralHir',
              syntaxRole: 'expression',
              semanticLayer: 'shape',
              value: f.returnShape.type,
            },
          } as abstracts.translators.ReferenceHir)
        : null,
    } satisfies abstracts.translators.FunctionHir,
    title: f.title!,
    description: f.description!,
    // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
    // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
    examples: f.examples || [],
    parent: null,
    children: null,
    prev: null,
    next: null,
  };
}

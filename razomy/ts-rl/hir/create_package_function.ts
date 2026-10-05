import * as abstracts from '@razomy/abstracts';
import * as random from '@razomy/random';

export function createPackageFunction(
  f: Partial<{
    title: string;
    performance: string;
    examples: abstracts.translators.FunctionDocExampleHir[];
    isAsync: boolean;
    isGenerator: boolean;
    name: string;
    description: string;
    parameter: Record<string, string>;
    returnShape: { description: string; type?: string };
  }>,
): abstracts.translators.FunctionHirn {
  return {
    id: random.createUuid(),
    syntaxRole: 'declaration',
    semanticLayer: 'state',
    kind: 'FunctionHirn',
    name: f.name || '',
    modifiers: [
      f.isAsync ? { kind: 'LiteralHirn', value: 'async' } : null,
      f.isGenerator ? { kind: 'LiteralHirn', value: 'generator' } : null,
    ].filter((i) => i != null) as abstracts.translators.HirType[],
    parameters: Object.entries(f.parameter || {}).map(
      ([k, v]) =>
        ({
          id: random.createUuid(),
          kind: 'BindingHirn',
          syntaxRole: 'statement',
          semanticLayer: 'state',
          modifiers: [],
          name: k,
          shape: {
            id: random.createUuid(),
            kind: 'ReferenceHirn',
            syntaxRole: 'expression',
            semanticLayer: 'shape',
            target: null,
            property: null,
            arguments_: [],
          } satisfies abstracts.translators.ReferenceHirn,
          doc:{description: v,},
          value: null,
        } satisfies abstracts.translators.BindingHirn),
    ) satisfies abstracts.translators.BindingHirn[],
    block: null,
    returnShape: f.returnShape?.type
      ? ({
          id: random.createUuid(),
          kind: 'ReferenceHirn',
          syntaxRole: 'expression',
          semanticLayer: 'shape',
          property: null,
          arguments_: [],
          target: {
            id: random.createUuid(),
            kind: 'LiteralHirn',
            syntaxRole: 'expression',
            semanticLayer: 'shape',
            value: f.returnShape.type,
          },
        } as abstracts.translators.ReferenceHirn)
      : null,
    doc: {
      title: f.title!,
      description: f.description!,
      returnDescription: '',
      // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      examples: f.examples! || [] as abstracts.translators.FunctionDocExampleHir[],
    },
  };
}

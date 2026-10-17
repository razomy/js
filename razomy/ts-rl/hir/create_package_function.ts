import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';

export function createPackageFunction(
  f: Partial<{
    title: string;
    performance: string;
    examples: abstractions.translators.FunctionDocExampleHirn[];
    isAsync: boolean;
    isGenerator: boolean;
    name: string;
    description: string;
    parameter: Record<string, string>;
    returnShape: { description: string; type?: string };
  }>,
): abstractions.translators.FunctionHirn {
  return {
    id: random.createUuid(),
    fnHashId: random.createUuid(),
    syntaxRole: 'declaration',
    semanticLayer: 'state',
    kind: 'FunctionHirn',
    name: f.name || '',
    next: null,
    children: [],
    parent: null,
    prev: null,
    modifiers: [
      f.isAsync ? { kind: 'LiteralHirn', value: 'async' } : null,
      f.isGenerator ? { kind: 'LiteralHirn', value: 'generator' } : null,
    ].filter((i) => i != null) as abstractions.translators.HirnType[],
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
            next: null,
            children: [],
            parent: null,
            prev: null,
          } satisfies abstractions.translators.ReferenceHirn,
          doc: { description: v },
          value: null,
          next: null,
          children: [],
          parent: null,
          prev: null,
        } satisfies abstractions.translators.BindingHirn),
    ) satisfies abstractions.translators.BindingHirn[],
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
            next: null,
            children: [],
            parent: null,
            prev: null,
          },
        next: null,
        children: [],
        parent: null,
        prev: null,
        } as abstractions.translators.ReferenceHirn)
      : null,
    doc: {
      title: f.title!,
      description: f.description!,
      returnDescription: '',
      // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      examples: f.examples! || ([] as abstractions.translators.FunctionDocExampleHirn[]),
    },
  };
}

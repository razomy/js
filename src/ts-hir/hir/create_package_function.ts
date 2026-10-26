import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';

export function createPackageFunction(
  f: Partial<{
    title: string;
    performance: string;
    examples: abstractions.hir.FunctionDocExampleHirn[];
    isAsync: boolean;
    isGenerator: boolean;
    name: string;
    description: string;
    parameter: Record<string, string>;
    returnShape: { description: string; type?: string };
  }>,
): abstractions.hir.FunctionHirn {
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
    modifiers: {
      isPublic: null,
      isAsync: f.isAsync!!,
      isGenerator: f.isGenerator!!,
    },
    parameters: Object.entries(f.parameter || {}).map(
      ([k, v]) =>
        ({
          id: random.createUuid(),
          kind: 'BindingHirn',
          syntaxRole: 'statement',
          semanticLayer: 'state',
          modifiers: {
            isPublic: null,
            isConst: null,
          },
          name: k,
          shape: {
            id: random.createUuid(),
            kind: 'VarRefHirn',
            syntaxRole: 'expression',
            semanticLayer: 'shape',
            next: null,
            children: [],
            parent: null,
            prev: null,
            name: '',
          } satisfies abstractions.hir.VarRefHirn,
          doc: { description: v },
          value: null,
          next: null,
          children: [],
          parent: null,
          prev: null,
        }) satisfies abstractions.hir.BindingHirn,
    ) satisfies abstractions.hir.BindingHirn[],
    block: null,
    returnShape: f.returnShape?.type
      ? ({
          id: random.createUuid(),
          kind: 'VarRefHirn',
          syntaxRole: 'expression',
          semanticLayer: 'shape',
          property: null,
          arguments_: [],
         name: f.returnShape.type,
          next: null,
          children: [],
          parent: null,
          prev: null,
        } as abstractions.hir.VarRefHirn)
      : null,
    doc: {
      title: f.title!,
      description: f.description!,
      returnDescription: '',
      // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      examples: f.examples! || ([] as abstractions.hir.FunctionDocExampleHirn[]),
    },
  };
}

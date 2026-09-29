import * as abstracts from '@razomy/abstracts';
import * as random from '@razomy/random';
import type {FunctionDocExampleHir} from "@razomy/abstracts/translators";

export function createPackageFunction(
  f: Partial<{
    title: string;
    performance: string;
    examples: FunctionDocExampleHir[];
    isAsync: boolean;
    isGenerator: boolean;
    name: string;
    description: string;
    parameter: Record<string, string>;
    returnShape: { description: string; type?: string };
  }>,
): abstracts.translators.FunctionHir {
  return {
    id: random.createUuid(),
    syntaxRole: 'declaration',
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
          semanticLayer: 'state',
          modifiers: [],
          name: k,
          shape: {
            id: random.createUuid(),
            kind: 'ReferenceHir',
            syntaxRole: 'expression',
            semanticLayer: 'shape',
            target: null,
            property: null,
            arguments_: [],
          } satisfies abstracts.translators.ReferenceHir,
          doc:{description: v,},
          value: null,
        } satisfies abstracts.translators.BindingHir),
    ) satisfies abstracts.translators.BindingHir[],
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
    doc: {
      title: f.title!,
      description: f.description!,
      returnDescription: '',
      // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      examples: f.examples! || [] as FunctionDocExampleHir[],
    },
  };
}

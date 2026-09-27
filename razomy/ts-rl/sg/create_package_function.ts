import * as abstracts from "@razomy/abstracts";
import * as random from "@razomy/random";

function getBase() {
  return {
    id: random.createUuid(),
    syntaxLayer: 'statement',
    semanticLayer: 'state',
    prev: null,
    next: null,
    parent: null,
  };
}

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
): abstracts.translators.FunctionHir {
  return {
    ...getBase(),
    kind: 'FunctionHir',
    syntaxLayer: 'statement',
    name: f.name || '',
    title: {...getBase(), kind: "LiteralHir", value: f.title},
    description: {...getBase(), kind: "LiteralHir", value: f.description},
    // timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
    // memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
    examples: f.examples || [],
    modifiers: [
      f.isAsync ? {...getBase(), kind: 'LiteralHir', value: 'async'} : null,
      f.isGenerator ? {...getBase(), kind: 'LiteralHir', value: 'generator'} : null,
    ].filter(i => i != null) as abstracts.translators.HirType[],
    parameters: Object.entries(f.parameter || {}).map(
      ([k, v]) => ({
        ...getBase(),
        kind: 'BindingHir',
        syntaxLayer: 'statement',
        semanticLayer: 'generic',
        modifiers: [],
        name: k,
        description: {...getBase(), kind: 'LiteralHir', value: v},
        identifier: k,
        shape: {
          ...getBase(),
          kind: 'ReferenceHir',
          syntaxLayer: 'expression',
          semanticLayer: 'shape',
          target: null,
          property: null,
          arguments_: [],
          modifiers: []
        } satisfies abstracts.translators.ReferenceHir,
        value: null,
        externalSource: null,
      } as abstracts.translators.BindingHir),
    ) as abstracts.translators.BindingHir[],
    semanticLayer: 'generic',
    block: null,
    returnShape: f.returnShape?.type
      ? ({
        ...getBase(),
        kind: 'ReferenceHir',
        syntaxLayer: 'expression',
        property: null,
        arguments_: [],
        modifiers: [],
        target: {...getBase(), kind: "LiteralHir", value: f.returnShape.type}
      } as abstracts.translators.ReferenceHir)
      : null,
  }
}

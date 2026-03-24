import * as abstracts from "@razomy/abstracts";

export function createPackageFunction(f:
                                        Omit<
                                          Omit<
                                            Partial<abstracts.ast.PackageFunction>,
                                            'parameter'>,
                                          'return_'>
                                        & Partial<{
                                        parameter: Record<string, string>,
                                        return_: { description: string, type?: string }
                                      }>) {
  return {
    ...f,
    kind: f?.kind || 'PackageFunction',
    title: f?.name || '',
    name: f?.name || '',
    description: f?.description || '',
    functionPath: f?.functionPath || [],
    return_: {
      kind: 'Reference',
      key: f.return_?.type || 'Void',
      description: f.return_?.description || 'Nothing',
      value: null,
    } as abstracts.ast.Reference,
    performance: {
      ...f.performance,
      timeDataSizeComplexityFn: f.performance?.timeDataSizeComplexityFn || '',
      memoryDataSizeComplexityFn: f.performance?.memoryDataSizeComplexityFn || '',
      history: f.performance?.history || [],
      // history: performance.PerformanceRecord[];
    },

    parameter: {
      kind: 'Object',
      items: (Object.entries(f.parameter || {}) || [])
        .map(([k, v]) => ({
            kind: 'Property',
            description: v,
            name: k,
            item: {
              kind: 'String',
              description: ''
            } as abstracts.ast.String,
            value: null,
          } satisfies abstracts.ast.Property
        ))
    } as abstracts.ast.Object,
    examples: f.examples || [],
  } satisfies abstracts.ast.PackageFunction;
}

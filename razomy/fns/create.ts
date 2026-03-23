import * as performance from '@razomy/performance';

export interface FunctionSpecificationParameter {
  name: string;
  type: string;
  description: string;
  defaultValue: string | null;
}

export interface FunctionSpecificationCore {
  name: string;
  description: string;
  parameters: FunctionSpecificationParameter[];
  returns: {
    type: string;
    description: string;
  };
}

export interface FunctionSpecification extends FunctionSpecificationCore {
  title: string;
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: performance.PerformanceRecord[];
  };
  examples: {
    code: string;
    expected: string;
  }[];
}

export interface FunctionPayloadArgument {
  name: string;
  value: string;
}

export interface FunctionPayload {
  name: string;
  arguments_: FunctionPayloadArgument[];
}

export function create(f:
                         Omit<Partial<FunctionSpecification>, 'parameters'>
                         & Partial<{ parameters: Partial<FunctionSpecificationParameter>[] }>)
  : FunctionSpecification {
  return {
    title: f.title || '',
    description: f.description || '',
    examples: f.examples || [],
    name: f.name || '',
    parameters: (f.parameters || []).map(f => ({
      name: f.name || '',
      type: f.type || '',
      description: f.description || '',
      defaultValue: f.defaultValue || null,
    })),
    performance: f.performance || {history: [], timeDataSizeComplexityFn: '', memoryDataSizeComplexityFn: ''},
    returns: f.returns || {type: 'void', description: 'Nothing'},
  } satisfies FunctionSpecification;
}

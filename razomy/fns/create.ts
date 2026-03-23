import * as performance from '@razomy/performance';

export interface WithDescription {
  description: string;
}

export interface WithName {
  name: string;
}

export interface WithType {
  type: string;

}

export interface Element extends WithDescription, WithName {
}

export interface Property extends Element, WithType {
  defaultValue: string | null;
}

export interface Parameter extends Property {
}

export interface Function_ extends Element {
  title: string;
  parameters: Parameter[];
  return_: WithType & WithDescription;
}

export interface FunctionSpecification extends Function_ {
  packagePath: string[];
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

export interface ParameterArgument extends WithName {
  value: string;
}

export interface FunctionArgument extends WithName {
  arguments_: ParameterArgument[];
}

export function create(f:
                         Omit<Partial<FunctionSpecification>, 'parameters'>
                         & Partial<{ parameters: Partial<Property>[] }>)
  : FunctionSpecification {
  return {
    title: f.title || '',
    description: f.description || '',
    examples: f.examples || [],
    name: f.name || '',
    packagePath: f.packagePath || [],
    parameters: (f.parameters || []).map(f => ({
      name: f.name || '',
      type: f.type || '',
      description: f.description || '',
      defaultValue: f.defaultValue || null,
    } satisfies Parameter)),
    performance: f.performance || {history: [], timeDataSizeComplexityFn: '', memoryDataSizeComplexityFn: ''},
    return_: f.return_ || {type: 'void', description: 'Nothing'},
  } satisfies FunctionSpecification;
}

import * as performance from '@razomy/performance';

export interface FunctionSpecification {
  name: string;
  title: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    description: string;
  }[];
  returns: {
    type: string;
    description: string;
  };
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

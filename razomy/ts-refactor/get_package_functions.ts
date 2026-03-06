import { camelCase } from '@razomy/string-case';
import * as directory from '@razomy/fs-directory';
import type { PerformanceRecord } from '../performance/weighted_moving_average_recorder';

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
    history: PerformanceRecord[];
  };
  examples: {
    code: string;
    expected: string;
  }[];
}

export function getPackageFunctions(dirPath: string) {
  return directory
    .get(dirPath)
    .filter((i) => i != 'dist' && !i.endsWith('.test.ts') && i != 'node_module' && !i.startsWith('index.') && i.endsWith('ts'))
    .map((n) => camelCase(n.replace('.ts', '')));
}

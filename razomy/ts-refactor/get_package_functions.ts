import { camelCase } from '@razomy/string-case';
import * as directory from '@razomy/fs-directory';

export interface FunctionSpecification {
  name: string;
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

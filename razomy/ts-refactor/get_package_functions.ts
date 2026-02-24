import {Project} from 'ts-morph';
import path from 'path';
import {camelCase, snakeCase} from '@razomy/string-case';
import * as fss from '@razomy/fss';
import {createDistSpecifications} from './create_dist_specifications';
import {createDistReadme} from './create_dist_readme';

export interface FunctionSpecification {
  name: string,
  description: string,
  parameters:
    {
      name: string,
      type: string,
      description: string
    }[],
  returns: {
    type: string,
    description: string
  },
  examples: {
    code: string,
    expected: string
  }[]
}

export function getPackageFunctions(dirPath: string) {
  return fss.directory.get(dirPath).filter(i =>
    i != 'dist'
    && !i.endsWith('.test.ts')
    && i != 'node_module'
    && !i.startsWith('index.')
    && i.endsWith('ts')
  ).map(n => camelCase(n.replace('.ts', '')));
}

export function extracyForIo(dirPath) {
  const functionsFiles = getPackageFunctions(dirPath);
  console.log(functionsFiles);
  const project = new Project({tsConfigFilePath: '../../' + 'tsconfig.json'});
  const f = (n) => createDistSpecifications(project, path.resolve(`${dirPath}${snakeCase(n)}.ts`), n)
  const files = functionsFiles.map(i => f(i));
  fss.file.setJson(`${dirPath}dist/specifications.json`, files);
  createDistReadme(fss.file.getJson(dirPath + '/package.json'), files)
  return files;
}

// console.log(JSON.stringify(extracyForIo('../string-case/'), null, 2));

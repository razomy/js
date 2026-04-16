import { Project } from 'ts-morph';

import * as abstracts from '@razomy/abstracts';
import * as path from 'path';
import * as tsRala from "@razomy/ts-rala";

export function getPackage(
  project: Project,
  dirPath: string,
  onlyPublic: boolean = true,
): abstracts.translators.PackageBinding {
  const packageJson = JSON.parse(project.getSourceFile(path.join(dirPath, 'package.json'))!.getText());
  if (!packageJson) {
    throw new Error('No package.json found at ' + dirPath);
  }
  const dependencies = Object.entries({
    ...(packageJson.dependencies || {}),
    ...(packageJson.peerDependencies || {}),
  }).map(
    ([k, v]) =>
      ({
        kind: 'DependencyBinding',
        path: k,
        version: v as string,
        identifier: { kind: 'Identifier', name: k },
      } satisfies abstracts.translators.DependencyBinding),
  );

  const packageDeclaration = {
    kind: 'PackageBinding',
    identifier: { kind: 'Identifier', name: packageJson.name },
    meta: {
      description: packageJson.description,
    },
    block: {
      kind: 'BlockStatement',
      declarations:tsRala.ast.bindings.parseModuleBody(
        project.getDirectory(dirPath)!.getSourceFile((f) => f.getBaseName().startsWith('index.'))!,
      )
    },
    version: packageJson.version,
    runtime: {
      kind: 'DependencyBinding',
      path: '',
      version: packageJson.engines['node'],
      identifier: { kind: 'Identifier', name: 'node' },
    },
    dependencies: dependencies,
  } satisfies abstracts.translators.PackageBinding;

  if (onlyPublic) {
    tsRala.ast.bindings.getPublicOnlyMut(packageDeclaration)!;
  }

  return packageDeclaration;
}

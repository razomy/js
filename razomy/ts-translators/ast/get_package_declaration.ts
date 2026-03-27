import {Project} from 'ts-morph';

import * as abstracts from "@razomy/abstracts";
import * as path from "path";
import {parseModuleDeclaration} from "./declarations";
import {filterPublicDeclaration} from "./functions";

export function getPackageDeclaration(project: Project, dirPath: string, onlyPublic: boolean = true): abstracts.translators.PackageDeclaration {
  const packageJson = JSON.parse(project.getSourceFile(path.join(dirPath, "package.json"))!.getText());
  if (!packageJson) {
    throw new Error("No package.json found at " + dirPath);
  }
  const dependencies = Object.entries({...(packageJson.dependencies || {}), ...(packageJson.peerDependencies || {})})
    .map(([k, v]) => ({
      kind: 'DependencyExpression',
      version: v as string,
      identifier: {kind: 'Identifier', name: k},
    } satisfies abstracts.translators.DependencyExpression));

  const packageDeclaration = {
    kind: "PackageDeclaration",
    identifier: {kind: 'Identifier', name: packageJson.name},
    description: packageJson.description,
    body: parseModuleDeclaration(project.getDirectory(dirPath)!),
    version: packageJson.version,
    isPublic: true,
    engine: {
      kind: 'DependencyExpression',
      version: packageJson.engines["node"],
      identifier: {kind: 'Identifier', name: "node"},
    },
    dependencies: dependencies,
  } satisfies abstracts.translators.PackageDeclaration;

  if (onlyPublic) {
    return filterPublicDeclaration(packageDeclaration)!;
  }

  return packageDeclaration;
}

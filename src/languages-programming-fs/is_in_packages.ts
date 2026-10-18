import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isInPackages(path: string): boolean {
  const pathComponents = languagesProgrammingFs.isPackageGetPathComponents(path);
  return languagesProgrammingFs.KNOWN_DEPENDENCIES.some((depDir) => pathComponents.includes(depDir));
}

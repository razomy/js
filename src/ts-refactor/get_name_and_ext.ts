import type { SourceFile } from 'ts-morph';

export function getNameAndExt(sourceFile: SourceFile) {
  let baseName = sourceFile.getBaseNameWithoutExtension();
  let ext = sourceFile.getExtension();

  if (baseName.endsWith('.test')) {
    baseName = baseName.replace('.test', '');
    ext = '.test' + ext;
  }
  if (baseName.endsWith('.spec')) {
    baseName = baseName.replace('.spec', '');
    ext = '.spec' + ext;
  }
  if (baseName.endsWith('.node')) {
    baseName = baseName.replace('.node', '');
    ext = '.node' + ext;
  }

  if (baseName.endsWith('.remote')) {
    baseName = baseName.replace('.remote', '');
    ext = '.remote' + ext;
  }

  if (baseName.endsWith('.browser')) {
    baseName = baseName.replace('.browser', '');
    ext = '.browser' + ext;
  }
  if (baseName.endsWith('.config')) {
    baseName = baseName.replace('.config', '');
    ext = '.config' + ext;
  }
  return { baseName, ext };
}

import type {SourceFile} from 'ts-morph';

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
  return {baseName, ext}
}


import {SourceFile} from 'ts-morph';

export function get_name_and_ext(source_file: SourceFile) {
  let base_name = source_file.getBaseNameWithoutExtension();
  let ext = source_file.getExtension();

  if (base_name.endsWith('.test')) {
    base_name = base_name.replace('.test', '');
    ext = '.test' + ext;
  }
  if (base_name.endsWith('.spec')) {
    base_name = base_name.replace('.spec', '');
    ext = '.spec' + ext;
  }
  return {base_name, ext}
}


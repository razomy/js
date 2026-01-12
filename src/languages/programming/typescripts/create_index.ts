import {Project} from 'ts-morph';

const to_snake_case = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const generate_default_index = async () => {
  const project = new Project({tsConfigFilePath: '../../../../tsconfig.json'});
  const directories = project.getDirectories();
  let count = 0;

  for (const dir of directories) {
    const dir_path = dir.getPath();
    const dir_name = dir.getBaseName();

    // The predefined name for the variable (e.g. 'fs' or 'dir')
    const const_name = to_snake_case(dir_name);

    const imports: string[] = [];
    const keys: string[] = [];

    // 1. Sub-Directories (Import Default)
    // Since we are changing logic to export default, we must import {default} from sub-dirs
    for (const sub_dir of dir.getDirectories()) {
      const sub_name = to_snake_case(sub_dir.getBaseName());
      imports.push(`import $sub_name from './$sub_dir.getBaseName()';`);
      keys.push(sub_name);
    }

    // 2. Files (Import Namespace)
    // Keeps all named exports from the file wrapped in an object
    for (const file of dir.getSourceFiles()) {
      const base_name = file.getBaseNameWithoutExtension();
      const fullName = file.getBaseName();
      if (base_name === 'index') continue;
      if (fullName.includes('.spec.')) continue;
      if (fullName.includes('.test.')) continue;

      let file_key = to_snake_case(base_name);
      if (file_key == 'index') file_key += '_';
      if (file_key == 'class') file_key += '_';
      if (file_key == 'function') file_key += '_';
      if (file_key == 'delete') file_key += '_';
      if (file_key == 'is') file_key += '_';
      if (file_key == 'with') file_key += '_';

      imports.push(`import * as $file_key from './${base_name}';`);
      keys.push(file_key);
    }

    if (keys.length > 0) {
      const index_content = [
        imports.join('\n'),
        '',
        `const ${const_name} = {`,
        `  ${keys.join(',\n  ')}`,
        `};`,
        '',
        `export default ${const_name};`
      ].join('\n');

      const index_file_path = `${dir_path}/index.ts`;
      project.createSourceFile(index_file_path, index_content, {overwrite: true});
      console.log(`[GENERATED] ${index_file_path}`);
      count++;
    }
  }

  if (count > 0) await project.save();
};

generate_default_index();
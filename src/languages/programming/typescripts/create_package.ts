import * as fs from 'fs';
import * as path from 'path';
import {read_file_json} from 'razomy.fs/file/read';
import {write_file_json} from 'razomy.fs/file/write';

export function create_package() {
  const src_dir: string = path.join(__dirname, '../../../');
  const prefix: string = 'razomy';

  interface PackageJson {
    name: string;

    [key: string]: any;
  }

// Validate directory
  if (!fs.existsSync(src_dir)) {
    console.error(`Error: '${src_dir}' directory not found.`);
    process.exit(1);
  }

  const files = fs.readdirSync(src_dir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  files.forEach((folder: fs.Dirent) => {
    const pkg_path = path.join(src_dir, folder.name, 'package.json');
    const new_name = `${prefix}.${folder.name}`;

    // Default structure
    let pkg_data: PackageJson = {
      name: new_name,
      version: '0.0.0',
      license: 'MIT',
      main: './index.js',
      types: './index.d.ts',
      files: ['*'],
      publishConfig: {
        access: 'public'
      }
    };

    // Read existing
    if (fs.existsSync(pkg_path)) {
      try {
        const content = fs.readFileSync(pkg_path, 'utf-8');
        pkg_data = {...JSON.parse(content), ...pkg_data};
      } catch (err) {
        console.warn(`Warning: Failed to parse ${pkg_path}, regenerating.`);
      }
    }

    // Force update name
    pkg_data.name = new_name;

    fs.writeFileSync(pkg_path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Updated: ${folder.name} -> ${new_name}`);
  });
  const packageFile = read_file_json('../../../../package.json');
  packageFile.workspaces = files.map(folder => 'src/' + folder.name)
  packageFile.dependencies = Object.fromEntries(
    files.map(folder => ['razomy.' + folder.name, './src/' + folder.name])
  );
  write_file_json('../../../../package.json', packageFile, true)

  const tsFile = read_file_json('../../../../tsconfig.json');
  tsFile.compilerOptions.paths = Object.fromEntries(
    files.map(folder => ['razomy.' + folder.name, ['./src/' + folder.name]])
  );
  tsFile.compilerOptions.paths.razomy = ['./src']
  write_file_json('../../../../tsconfig.json', tsFile, true)
}

create_package()

export default create_package;

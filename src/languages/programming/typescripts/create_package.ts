import * as fs from 'fs';
import * as path from 'path';
import {read_file_json} from 'razomy/fs/file/read';
import {write_file_json} from 'razomy/fs/file/write';

export function create_package() {
  const srcDir: string = path.join(__dirname, '../../../');
  const prefix: string = 'razomy';

  interface PackageJson {
    name: string;

    [key: string]: any;
  }

// Validate directory
  if (!fs.existsSync(srcDir)) {
    console.error(`Error: '${srcDir}' directory not found.`);
    process.exit(1);
  }

  const files = fs.readdirSync(srcDir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  files.forEach((folder: fs.Dirent) => {
    const pkgPath = path.join(srcDir, folder.name, 'package.json');
    const newName = `${prefix}.${folder.name}`;

    // Default structure
    let pkgData: PackageJson = {
      name: newName,
      version: '0.0.0',
      main: 'index.js',
      license: 'MIT'
    };

    // Read existing
    if (fs.existsSync(pkgPath)) {
      try {
        const content = fs.readFileSync(pkgPath, 'utf-8');
        pkgData = {...JSON.parse(content), ...pkgData};
      } catch (err) {
        console.warn(`Warning: Failed to parse ${pkgPath}, regenerating.`);
      }
    }

    // Force update name
    pkgData.name = newName;

    fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2));
    console.log(`✓ Updated: ${folder.name} -> ${newName}`);
  });
  const file = read_file_json('../../../../package.json');
  file.workspaces = files.map(folder => 'src/' + folder.name)
  file.dependencies = Object.fromEntries(
    files.map(folder => ['razomy.' + folder.name, './src/' + folder.name])
  );

  write_file_json('../../../../package.json', file)
}

create_package()
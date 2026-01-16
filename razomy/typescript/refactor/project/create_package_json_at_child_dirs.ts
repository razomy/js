import * as fs from 'fs';
import path from 'path';
import { file } from 'razomy/fs';

export function create_package_json_at_child_dirs(project_path: string) {
  const root_dir: string = path.resolve( project_path);
  const prefix: string = 'razomy';
  const folders = fs.readdirSync(root_dir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  folders.forEach((folder: fs.Dirent) => {
    const pkg_path = path.join(root_dir, folder.name, 'package.json');
    const new_name = `${prefix}.${folder.name}`;

    let pkg_data = {
      name: new_name,
    };

    const content = file.try_get_json(pkg_path) || {};
    pkg_data = {...content, ...pkg_data};

    fs.writeFileSync(pkg_path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${new_name}`);
  });
}

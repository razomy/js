import * as fs from "fs";
import * as path from "path";

export function create_package_json_at_child_dirs() {
    const root_dir: string = path.join(__dirname, '../../../../../');
    const prefix: string = 'razomy';
    const folders = fs.readdirSync(root_dir, {withFileTypes: true})
            .filter((dirent: fs.Dirent) => dirent.isDirectory());
    folders.forEach((folder: fs.Dirent) => {
    const pkg_path = path.join(root_dir, folder.name, 'package.json');
    const new_name = `${prefix}.${folder.name}`;

    let pkg_data = {
      name: new_name,
    };

    const content = fs.readFileSync(pkg_path, 'utf-8');
    pkg_data = {...JSON.parse(content), ...pkg_data};

    fs.writeFileSync(pkg_path, JSON.stringify(pkg_data, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${new_name}`);
    });
}

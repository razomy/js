import * as path from "path";
import { iterate } from "razomy.fs";
import { is_exist } from "razomy.fs/file";
import { sort_by } from "razomy.list";

export function get_all_package_jsons() {
    const root_dir: string = path.join(__dirname, '../../../../../');
    const package_jsons: { path: string, name: string }[] = [];
    iterate(root_dir, (iterate_node) => {
    if (iterate_node.path.includes('node_modules')) {
      return true;
    }
    if (iterate_node.stats.isFile()) {
      return true;
    }
    const try_package_json = path.join(iterate_node.path + '/package.json');
    if (is_exist(try_package_json)) {
      package_jsons.push({
        path: try_package_json,
        name: path.relative(root_dir, try_package_json)
          .replace('/package.json', '')
      })
    }
    })
    return sort_by(package_jsons, i => i.name);
}

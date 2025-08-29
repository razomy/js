import fs, {Stats} from 'fs';
import path from 'path';

export interface IterateNode {
  stats: Stats,
  slug: string,
  path: string,
}

export function iterate(dir_path: string, cb: (iterate_node: IterateNode) => void | boolean) {
  const child_slugs = fs.readdirSync(dir_path);

  for (const child_slug of child_slugs) {
    const child_path = path.join(dir_path, child_slug);
    const stats = fs.statSync(child_path);

    const is_end = cb({stats, path: child_path, slug: child_slug});

    if (is_end === undefined) {
      if (stats.isDirectory()) {
        iterate(child_path, cb);
      }
      continue;
    }

    if (is_end === true) {
      continue;
    }

    if (is_end === false) {
      return;
    }
  }
}

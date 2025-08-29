import fs, {Dirent} from 'fs';
import path from 'path';

export interface IterateNode {
  stats: Dirent,
  slug: string,
  path: string,
}

export function iterate(dir_path: string, cb: (iterate_node: IterateNode) => void | boolean) {
  const child_slugs = fs.readdirSync(dir_path, {withFileTypes: true});

  for (const child_slug of child_slugs) {
    const child_path = path.join(dir_path, child_slug.name);

    const is_end = cb({stats: child_slug, path: child_path, slug: child_slug.name});

    if (is_end === undefined) {
      if (child_slug.isDirectory()) {
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

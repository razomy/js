 import {Vrd, vrd} from './vrd';

export function pvaToVrd(rootPath: string, rows: { path: string, value: string }[]) {
  if (rows.length === 1 && rows[0].path === rootPath) {
    return rows[0].value
  }

  const rootLevel = rootPath.split('.').length;
  const result = vrd<string>({});
  for (const row of rows.slice(1)) {
    const pathStr = row.path; // e.g., "top.a.b.c"
    const value = row.value;

    // 1. Get keys relative to root: "top.a.b.c" -> ["b", "c"]
    // We slice from the root level to remove the prefix
    const parts = pathStr.split('.').slice(rootLevel);

    // 2. Traverse/Build the object structure
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      // Create intermediate object if it doesn't exist
      current[key] = current[key] || vrd<string>({});
      current = current[key] as Vrd<string> & object;
    }

    const key = parts[parts.length - 1];
    current[key] = value;
  }

  return result;
}
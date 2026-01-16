import fs from 'fs';

export function is_empty(path) {
  const stats = fs.statSync(path);
  return stats.size === 0;
}

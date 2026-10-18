import fs from 'fs';

export function isEmpty(path) {
  const stats = fs.statSync(path);
  return stats.size === 0;
}

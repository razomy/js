import fs from 'fs';

export function is_file_empty(path_) {
  const stats = fs.statSync(path_);
  return stats.size === 0;
}

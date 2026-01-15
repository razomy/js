import fs from 'fs';

export default function is_file_empty(path_) {
  const stats = fs.statSync(path_);
  return stats.size === 0;
}

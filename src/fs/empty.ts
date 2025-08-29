import fs from "fs";

export function is_file_empty(path_) {
  const stats = fs.statSync(path_);
  return stats.size === 0;
}

export function is_dir_empty(path_) {
  const files = fs.readdirSync(path_);
  return files.length === 0;
}

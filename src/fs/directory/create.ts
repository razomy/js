import fs from 'fs';
import log_inline from 'src/shell/log_inline';

export default function create_directory_if_not_exists(dir_path: string) {
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path, {recursive: true});
    log_inline(`Directory created: ${dir_path}`);
  } else {
    log_inline(`Directory already exists: ${dir_path}`);
  }
}

import {fileURLToPath} from 'url';

export function is_main(import_meta_url_or_require_main: string) {
  const current_path = fileURLToPath(import_meta_url_or_require_main);
  if (process.argv[1] === current_path) {
    return true;
  }

  if (require?.main?.path === current_path) {
    return true;
  }

  return false;
}

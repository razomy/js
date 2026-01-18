import fs from 'fs';
import {getJson} from './get_json';

export function tryGetJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return getJson(filePath);
}

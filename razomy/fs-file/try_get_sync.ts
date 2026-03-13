import fs from 'fs';
import {getSync} from './get_sync';

export function tryGetSync(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return getSync(filePath);
}
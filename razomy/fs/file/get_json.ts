import fs from 'fs';

export function getJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

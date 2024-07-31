import fs from 'fs';

export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function readFileJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function tryReadFileJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readFileJson(filePath);
}

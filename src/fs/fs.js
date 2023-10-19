import fs from 'fs';
import path from 'path';

export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export function readFileJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeFile(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function writeFileJson(filePath, content) {
  createPathIfNotExistsRecursive(filePath);
  return fs.writeFileSync(filePath,  JSON.stringify(content), 'utf8');
}

export const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directory created: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
};

export function createPathIfNotExistsRecursive(filePath) {
  const dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname)) {
    createPathIfNotExistsRecursive(dirname);
    fs.mkdirSync(dirname);
  }
}


export const clearDirectoryAsync = async (directoryPath) => {
  try {
    await fsExtra.emptyDir(directoryPath);
    console.log(`Directory cleared: ${directoryPath}`);
  } catch (error) {
    console.error(`Error clearing directory: ${directoryPath}`);
    console.error(error);
  }
};


export function writeToFileAsync(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function readFileFileAsync(filePath) {
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

export function waitAsync(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(); // or you can use reject() to reject the promise
    }, seconds); // convert seconds to milliseconds
  });
}

export function getAllFilesInDirectory(directory) {
  let files = [];

  function walk(currentDirPath) {
    const items = fs.readdirSync(currentDirPath);

    for (const item of items) {
      const itemPath = path.join(currentDirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isFile()) {
        files.push(itemPath);
      } else if (stat.isDirectory()) {
        walk(itemPath);
      }
    }
  }

  walk(directory);
  return files;
}


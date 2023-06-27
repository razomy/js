export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export function writeFile(filePath, content) {
  return fs.writeFileSync(filePath, content, 'utf8');
}

export function wait(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(); // or you can use reject() to reject the promise
    }, seconds); // convert seconds to milliseconds
  });
}

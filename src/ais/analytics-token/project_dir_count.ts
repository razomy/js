import fs from 'fs';
import * as path from 'path';

// Define the function to count the tokens in the project directory
export function projectDirCount(
  projectDir: string,
  fileRegex = /\.ts$/,
  // Define the regex pattern to exclude certain files/directories
  excludePattern = /^\.|node_modules/,
) {
  // Define the token count variable
  let tokenCount = 0;

  // Recursively traverse the project directory
  function traverseDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory() && !excludePattern.test(file)) {
        traverseDir(filePath);
      } else if (stats.isFile() && fileRegex.test(file)) {
        // console.log(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        const tokens = content.split(/\s+/).filter((token) => token !== '');
        tokenCount += tokens.length;
      }
    }
  }

  // Call the traverseDir function to count the tokens
  traverseDir(projectDir);

  // Return the total token count
  return tokenCount;
}

// const projectDir = '';
// const tokenCount = projectDirCount(
//   projectDir,
//   /\.cs$/,
//   /^\.|node_modules|dist/,
// );
//
// const tockenFormated = new Intl.NumberFormat('en-US', {
//   style: 'decimal',
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// }).format;
// // Log the total token count to the console
// console.log(`Total token count in ${projectDir}: ${tockenFormated(tokenCount)}`);

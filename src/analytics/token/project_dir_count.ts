import fs from 'fs';
import path from 'path';

// Define the function to count the tokens in the project directory
export function project_dir_count(
  project_dir: string,
  fileRegex = /\.ts$/,
  // Define the regex pattern to exclude certain files/directories
  excludePattern = /^\.|node_modules/) {
  // Define the token count variable
  let token_count = 0;


  // Recursively traverse the project directory
  function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const file_path = path.join(dir, file);
      const stats = fs.statSync(file_path);
      if (stats.isDirectory() && !excludePattern.test(file)) {
        traverseDir(file_path);
      } else if (stats.isFile() && fileRegex.test(file)) {
        // console.log(filePath);
        const content = fs.readFileSync(file_path, 'utf8');
        const tokens = content.split(/\s+/).filter(token => token !== '');
        token_count += tokens.length;
      }
    }
  }

  // Call the traverseDir function to count the tokens
  traverseDir(project_dir);

  // Return the total token count
  return token_count;
}



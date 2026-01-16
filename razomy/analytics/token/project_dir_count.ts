import fs from 'fs';
import path from 'path';

// Define the function to count the tokens in the project directory
export function project_dir_count(
  project_dir: string,
  file_regex = /\.ts$/,
  // Define the regex pattern to exclude certain files/directories
  exclude_pattern = /^\.|node_modules/) {
  // Define the token count variable
  let token_count = 0;


  // Recursively traverse the project directory
  function traverse_dir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const file_path = path.join(dir, file);
      const stats = fs.statSync(file_path);
      if (stats.isDirectory() && !exclude_pattern.test(file)) {
        traverse_dir(file_path);
      } else if (stats.isFile() && file_regex.test(file)) {
        // console.log(filePath);
        const content = fs.readFileSync(file_path, 'utf8');
        const tokens = content.split(/\s+/).filter(token => token !== '');
        token_count += tokens.length;
      }
    }
  }

  // Call the traverseDir function to count the tokens
  traverse_dir(project_dir);

  // Return the total token count
  return token_count;
}



import fs from 'fs';
import {FilePathString} from 'razomy/path/string/path_string';

function file_path_count(file_path: FilePathString) {
  try {
    const code = fs.readFileSync(file_path, 'utf8');
    const matches = code.trim().match(/\b\w+\b/g) || [];
    const tokens = matches;

    console.log(tokens.length);
    // Count the tokens by type
    const token_count_by_type = {};
    tokens.forEach(token => {
      if (token_count_by_type[token]) {
        token_count_by_type[token]++;
      } else {
        token_count_by_type[token] = 1;
      }
    });

    return token_count_by_type;
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    return null;
  }
}

// const filePath = '/Users/kamensky/Documents/_razomy/games/c.r.g.battlefield/razomy/Razomy.Ai/ChatGpt/code_refactor/from.txt';
// if (!filePath) {
//   console.error('Please provide the path to the JavaScript file as an argument.');
//   process.exit(1);
// }
//
// const tokenCount = countTokensByPath(filePath);
// if (tokenCount) {
//   console.log('Token count by type:');
//   console.log(tokenCount);
// }
export default file_path_count;

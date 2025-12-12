import fs from 'fs';
import {FilePath} from 'razomy.js/fs/path';

export function path_count(file_path: FilePath) {
  try {
    const code = fs.readFileSync(file_path, 'utf8');
    const matches = code.trim().match(/\b\w+\b/g) || [];
    const tokens = matches;

    console.log(tokens.length);
    // Count the tokens by type
    const tokenCountByType = {};
    tokens.forEach(token => {
      if (tokenCountByType[token]) {
        tokenCountByType[token]++;
      } else {
        tokenCountByType[token] = 1;
      }
    });

    return tokenCountByType;
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

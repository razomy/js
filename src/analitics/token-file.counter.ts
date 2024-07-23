import fs from "fs";
import esprima from "esprima";

export function countTokensByPath(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const tokens = esprima.tokenize(code, { loc: true });

    console.log(tokens.length);
    // Count the tokens by type
    const tokenCountByType = {};
    tokens.forEach(token => {
      const { type } = token;
      if (tokenCountByType[type]) {
        tokenCountByType[type]++;
      } else {
        tokenCountByType[type] = 1;
      }
    });

    return tokenCountByType;
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    return null;
  }
}

const filePath = '/Users/kamensky/Documents/_razomy/games/c.r.g.battlefield/razomy/Razomy.Ai/ChatGpt/code_refactor/from.txt';
if (!filePath) {
  console.error('Please provide the path to the JavaScript file as an argument.');
  process.exit(1);
}

const tokenCount = countTokensByPath(filePath);
if (tokenCount) {
  console.log('Token count by type:');
  console.log(tokenCount);
}

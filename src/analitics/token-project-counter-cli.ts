import { countProjectTokens } from 'razomy.js/analitics/token-project-counter';

// Call the countProjectTokens function with the specified project directory
const projectDir = '../../../';
const tokenCount = countProjectTokens(
  projectDir,
  /\.(js)$/,
  /^\.|node_modules|dist/,
);

const tockenFormated = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;
// Log the total token count to the console
console.log(`Total token count in ${projectDir}: ${tockenFormated(tokenCount)}`);

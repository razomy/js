import {String} from 'razomy.string';


export function marginString(string: String, margin: String) {
  const lines = string.split('\n')
  const shiftedLines = lines.map(line => margin + line);
  return shiftedLines.join('\n')
}



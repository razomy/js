import {String} from "razomy/string/string";


export function margin_string(string: String, margin: String) {
  const lines = string.split('\n')
  const shifted_lines = lines.map(line => margin + line);
  return shifted_lines.join('\n')
}


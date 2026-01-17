import {String} from 'razomy.string/string';

export function toCamelCase(input: String) {
  let text = input;

  // 1-5. Normalize the string using the same logic as snake_case
  // This breaks the string into segments separated by underscores
  text = text
    // Handle Acronyms: 'JSONData' -> 'JSON_Data'
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    // Handle CamelCase: 'camelCase' -> 'camel_Case'
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    // Handle Letters to Numbers: 'version2' -> 'version_2'
    .replace(/([a-zA-Z])([0-9])/g, '$1_$2')
    // Handle Numbers to Letters: '2beta' -> '2_beta'
    .replace(/([0-9])([a-zA-Z])/g, '$1_$2')
    // Replace delimiters with underscore
    .replace(/[ |_\-\.]+/g, '_')
    // Trim surrounding underscores
    .replace(/^_+|_+$/g, '')
    // Lowercase the entire normalized string first
    .toLowerCase();

  // 6. Convert snake_case segments to camelCase
  // Looks for an underscore followed by a character (letter or number)
  return text.replace(/_([a-z0-9])/g, (match, char) => char.toUpperCase());
}

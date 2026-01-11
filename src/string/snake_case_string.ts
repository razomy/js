import {String} from "razomy/string/string";

export function snake_case_string(input: String) {
  let text = String(input);

  return text
    // 1. Handle Acronyms: 'JSONData' -> 'JSON_Data'
    // Looks for Capital followed by Capital+Lower
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')

    // 2. Handle CamelCase: 'camelCase' -> 'camel_Case'
    // Looks for Lower followed by Capital
    .replace(/([a-z])([A-Z])/g, '$1_$2')

    // 3. Handle Letters to Numbers: 'version2' -> 'version_2'
    .replace(/([a-zA-Z])([0-9])/g, '$1_$2')

    // 4. Handle Numbers to Letters: '2beta' -> '2_beta'
    .replace(/([0-9])([a-zA-Z])/g, '$1_$2')

    // 5. Replace delimiters (spaces, hyphens, dots) with a single underscore
    // This collapses multiple separators (e.g. ' - ' becomes '_')
    .replace(/[ |_\-\.]+/g, '_')
    // from _text_ -> text
    .replace(/^_+|_+$/g, '')

    // 6. Final lowercase
    .toLowerCase();
}

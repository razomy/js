import * as languagesProgrammingFs from "@razomy/languages-programming-fs";

export function isInOutput(path: string): boolean {
  const pathComponents = languagesProgrammingFs.isOutputGetPathComponents(path);
  return languagesProgrammingFs.KNOWN_OUTPUT.some((outputDir) => pathComponents.includes(outputDir));
}

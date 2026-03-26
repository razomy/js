import { isOutputGetPathComponents } from './is_output_get_path_components';
import { KNOWN_OUTPUT } from './is_output';

export function isInOutput(path: string): boolean {
  const pathComponents = isOutputGetPathComponents(path);
  return KNOWN_OUTPUT.some((outputDir) => pathComponents.includes(outputDir));
}

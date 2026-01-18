import {isOutputGetPathComponents} from './is_output_get_path_components';
import {knownOutput} from './is_output';

export function isInOutput(path: string): boolean {
  const pathComponents = isOutputGetPathComponents(path);
  return knownOutput.some(outputDir => pathComponents.includes(outputDir));
}
